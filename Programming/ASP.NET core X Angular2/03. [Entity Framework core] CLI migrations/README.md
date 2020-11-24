## Introduction

So in .NET Core projects, we can use EF Command to execute database migrations. 
However, in current DOTNET Core 1.0.0-preview, the EF Command only works on the runnable projects (such like Website, Console…)*.

> See issue : 
> [CLI Commands: support targeting .NET Core class library projects #5320](https://github.com/aspnet/EntityFramework/issues/5320)

And that means we could only put our `DbContext` and `DAOs` in the website project?
That seems it will mess up the website with too much responsibility within it.

In this article, we will try to make a clean architecture for Entity framework Core and let the EF Command works.


#### Supported framework

EF supports .NET Core CLI commands on these frameworks:
* .NET Framework 4.5.1 and newer. (“net451”, “net452”, “net46”, etc.)
* .NET Core App 1.0. (“netcoreapp1.0”)


## Environment

* Visual Studio 2015 Update 3
* DOTNET Core 1.0.0- DOTNET Core 1.0.0-preview


## Implement

Create two projects
1. Sample.Website : ASP.NET Core
2. Sample.DAL : Class library (.NET Core)

Sample.DAL will have the DbContext, Database Models.

### Data Access layer (DAL)

Install the following package(s):
[Microsoft.EntityFrameworkCore.SqlServer](https://www.nuget.org/packages/Microsoft.EntityFrameworkCore.SqlServer/)

* /Models/DAO/Customer.cs

You can create your own DAO. This one is just for reference. 

```
    public class Customer
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        [StringLength(100)]
        [Required]
        public string Name { get; set; }
        [StringLength(100)]
        public string Phone { get; set; }
        public int Age { get; set; }
        [StringLength(200)]
        public string  Description { get; set; }
    }
```

* /DbContext/NgDbContext.cs

```
    public class NgDbContext : DbContext
    {
       public NgDbContext(DbContextOptions options) : base(options) 
       { }
       public DbSet<Customer> Customers { get; set; }
    }
```

### Presentation Layer (Website)

Install the packages.
1. [Microsoft.AspNetCore.Identity.EntityFrameworkCore](https://www.nuget.org/packages/Microsoft.AspNetCore.Identity.EntityFrameworkCore/)
2. [Microsoft.EntityFrameworkCore](https://www.nuget.org/packages/Microsoft.EntityFrameworkCore/)
3. [Microsoft.EntityFrameworkCore.Tools](https://www.nuget.org/packages/Microsoft.EntityFrameworkCore.Tools/)

(For Sql server)
4. [Microsoft.EntityFrameworkCore.Relational](https://www.nuget.org/packages/Microsoft.EntityFrameworkCore.Relational/)
5. [Microsoft.EntityFrameworkCore.SqlServer](https://www.nuget.org/packages/Microsoft.EntityFrameworkCore.SqlServer/1.0.1)


The most important is **Microsoft.EntityFrameworkCore.Tools**, which supports the **EF Command Line** tooling.


#### Test if the EF command works

Open command line or Powershell or Package Management Console*, change directory to the root of the website, and type the command to see if EF Command works.

`dotnet ef –-version`

Or `dotnet ef --help` to see the helps.


Sometimes you may see the following error message:
`dotnet ef throws Could not load file or assembly Microsoft.DotNet.Cli.Utils`

Clear(delete) the nuget caches will helps
1. `C:\Users\{LoginName}\.nuget\packages\.tools\Microsoft.EntityFrameworkCore.Tools`
2. `C:\Users\{LoginName}\.nuget\packages\Microsoft.EntityFrameworkCore.Tools`

and restore them under the website's root. (`dotnet restore`)

> Also see this [reference](https://github.com/aspnet/EntityFramework/issues/5458#issuecomment-221912806).


### Start Migration 

The original *add-migration* and *update-database* commands are simple, like this

`dotnet ef migrations add [migration_name] –c [DbContext_name]`

`dotnet ef database update [migration_name]`

PS. `[migration_name] = "0"` will revert all migrations, or skip this argument to apply all pending migrations.

However, while we put the DbContext in the other project but not the one we are running EF Command, so we have to appoint the target project with **DbContext** and the **startup project** for EF Command.


#### Add migration
```
dotnet ef  --project ../Sample.DAL --startup-project . migrations add [migration_name] -c [DbContext_name]
```

#### Update database
```
dotnet ef  --project ../Sample.DAL --startup-project . database update
```

### Implement IDbContextFactory<DbContext>

Okay, now it seems works but right away we get the following error:

`No parameterless constructor was found on 'NgDbContext'. Either add a parameterless constructor to 'NgDbContext' or add an implementation of 'IDbContextFactory<NgDbContext>' in the same assembly as 'NgDbContext'.`

This error is telling us that the migration would need to create a `DbContext` instance to get things done.  We will create a class and implement `IDbContextFactory<TContext>` in `Sample.DAL`.


* MigrationFactory.cs

```
    public class MigrationFactory : IDbContextFactory<NgDbContext>
    {
        public NgDbContext Create()
        {
            var builder = new DbContextOptionsBuilder<NgDbContext>();
            builder.UseSqlServer(Configuration.DEFAULT_CONNECT_STR);
            return new NgDbContext(builder.Options);
        }
    }
```

PS. I create another class: `Configuration`, to store the database connection string.

Re-run the add-migration and update-database commands, the CLI create/update the table: Customers for us.
For more EF Command usage, take a look at [docs.efproject.net](https://docs.microsoft.com/en-us/ef/core/miscellaneous/cli/dotnet#dotnet-ef-database-update)

### How to initialize data

The data initializing function is on the roadmap of Entity framework Core team and will be released in the future.
However we can make a trick to achieve the data-initializing.

Create a class: `Configuration`,

* Configuration.cs

```
    public class Configuration
    {
        //Connection string for code first
        public static string DEFAULT_CONNECT_STR = "Server=.;Database=XXX;Trusted_Connection=True;MultipleActiveResultSets=true";

        public void Seed()
        {
            var dbContext = DbContextFactory.Create(DEFAULT_CONNECT_STR);

            this.initCustomers(dbContext);
        }

        private void initCustomers(NgDbContext dbContext)
        {
            dbContext.Customers.Add(new Customer { Name = "JB",  Phone = "0933XXXXXX", Age = 35, Description = "JB is a good programmer :)" });
            dbContext.Customers.Add(new Customer { Name = "Leia",Phone = "-", Age = 3, Description = "A cute girl!" });
            dbContext.SaveChanges();
        }
    }
``` 

We should call the Seed function after running *add-migration* command but before *update-database* command. Add the Seed function to the migration class which is created by the CLI.

![](https://3.bp.blogspot.com/-t2peGURJmBs/WBOJ3IgTSNI/AAAAAAAAD9E/wtlO20rw0Q8NysWqQuZPZ9RZCB75_4XlACLcB/s1600/image001.png)

So when the update-database command is executed, the data is also be initialized.


## Reference

1. [docs.efproject.net - .NET Core CLI](https://docs.microsoft.com/en-us/ef/core/miscellaneous/cli/dotnet#dotnet-ef-database-update)
2. [Dotnet EF Migrations for ASP.NET Core](http://benjii.me/2016/05/dotnet-ef-migrations-for-asp-net-core/)
3. [How to migrate dbcontext in class library?](https://github.com/aspnet/EntityFramework/issues/5460#issuecomment-221167712)





