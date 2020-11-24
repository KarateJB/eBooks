![](https://1.bp.blogspot.com/-_qRAE-I3S7c/WFx1gKrusvI/AAAAAAAAEBs/P9G-khfc3oUCj9VjuhcvLWALW9zNxk4twCLcB/s1600/jsnlog.png)

![](https://camo.githubusercontent.com/2730f9abccccfab85cf75426545685c4a500c4cd/687474703a2f2f6e6c6f672d70726f6a6563742e6f72672f696d616765732f4e4c6f672e706e67)

## Introduction

Before we go farther, I want to talk about the logging and use the logging framework for both the frontend and backend.
We will us [NLog](http://nlog-project.org/) and [JSNLog](http://jsnlog.com/) to fulfill the purpose.


## Environment


* Visual Studio 2015 Update 3
* NPM: 3.10.3                                    
* Microsoft.AspNetCore.Mvc 1.0.0
* angular2: 2.1.0
* NLog.Extensions.Logging 1.0.0-rtm-alpha5
* System.Data.SqlClient 4.1.0
* JSNLog.AspNetCore 2.22.0
* Newtonsoft.Json 9.0.1

## Packages/JS/type definition

We will install the following packages thru Nuget
1. [NLog.Extensions.Logging](https://www.nuget.org/packages/NLog.Extensions.Logging/1.0.0-rtm-alpha4)
2. [NLog configuration](https://www.nuget.org/packages/NLog.Config/)
3. [System.Data.SqlClient](https://www.nuget.org/packages/System.Data.SqlClient/) (Optional, install it when you wanna keep the log in sql server)
4. [JSNLog.AspNetCore](https://www.nuget.org/packages/JSNLog.AspNetCore/)
5. [Newtonsoft.Json](https://www.nuget.org/packages/Newtonsoft.Json/)

And install the **JSNLog js files** by NPM.

```
npm intall jsnlog --save
```

#### Include jsnlog js

* Layout.cshtml

```
<head>
    <!-- ... -->
    <script src="~/lib-npm/jsnlog/jsnlog.min.js"></script>
</head>
```

#### Install packages

* project.json

```
{
  "dependencies": {
    "Microsoft.NETCore.App": {
      "version": "1.0.0",
      "type": "platform"
    },
    "Microsoft.AspNetCore.Diagnostics": "1.0.0",
    "Microsoft.AspNetCore.Server.IISIntegration": "1.0.0",
    "Microsoft.AspNetCore.Server.Kestrel": "1.0.0",
    "Microsoft.Extensions.Logging": "1.0.0",
    "Microsoft.Extensions.Logging.Console": "1.0.0",
    "Microsoft.Extensions.Logging.Debug": "1.0.0",
    "Microsoft.Extensions.Logging.Filter": "1.0.0",
    "Microsoft.AspNetCore.Mvc": "1.0.0",
    "Microsoft.AspNetCore.StaticFiles": "1.0.0",
    "Microsoft.AspNet.StaticFiles": "1.0.0-rc1-final",
    "es6-shim.TypeScript.DefinitelyTyped": "0.8.1",
    "NLog.Extensions.Logging": "1.0.0-rtm-alpha4",
    "System.Data.SqlClient": "4.1.0",
    "JSNLog.AspNetCore": "2.20.0",
    "Newtonsoft.Json": "9.0.1"
  },

  "tools": {
    "Microsoft.AspNetCore.Server.IISIntegration.Tools": "1.0.0-preview2-final"
  }
  //....
}
```

## NLog config

We have to update NLog settings in NLog.config.

#### NLog.config

Copy the following content to your `NLog.config`, and modify the file pathes, database connection string, targets and rules.

```
<?xml version="1.0" encoding="utf-8" ?>
<nlog xmlns="http://www.nlog-project.org/schemas/NLog.xsd"
      xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
      xsi:schemaLocation="http://www.nlog-project.org/schemas/NLog.xsd NLog.xsd"
      autoReload="true"
      throwExceptions="true"
      internalLogLevel="Error" internalLogFile="c:\temp\nlog-internal.log" >

  <!—LOG format-->
  <variable name="Layout" value="${longdate} | ${level:uppercase=true} | ${logger} | ${message} ${newline}"/>
  <variable name="LayoutFatal" value="${longdate} | ${level:uppercase=true} | ${logger} | ${message} | ${exception:format=tostring} ${newline}"/>
  <variable name="LayoutEvent" value="${date}: ${message} ${stacktrace}"/>

  <!—LOG path -->
  <variable name="LogTxtLocation" value="${basedir}/App_Data/Logs/${shortdate}/${logger}.log"/>
  <variable name="LogTxtLocationFatal" value="${basedir}/App_Data/Logs/${shortdate}/FatalFile.log"/>
  <variable name="ProjectName" value="Angular.Mvc"/>


  <targets>
    <!—Text file-->
    <target name="File" xsi:type="File" fileName="${LogTxtLocation}" layout="${Layout}" />
    <target name="FileFatal" xsi:type="File" fileName="${LogTxtLocationFatal}" layout="${LayoutFatal}"/>
    <!—Event log-->
    <!--<target name="Event" xsi:type="EventLog" source="${ProjectName}" log="Application" layout="${LayoutEvent}" />-->
    <!—Log Viewer(Optional)-->
    <target name="LogViewer" xsi:type="NLogViewer" address="udp://127.0.0.1:3333"/>
    <!--Database-->
    <target name="LogDatabase" xsi:type="Database" >
      <connectionString>
        Data Source=Your-DB-Server-name;Initial Catalog=Your-DB-Name;Integrated Security=True;
      </connectionString>
      <commandText>
         INSERT INTO AspnetCoreLog (
              Application, Logged, Level, Message,
              Logger, CallSite, Exception
              ) values (
              @Application, @Logged, @Level, @Message,
              @Logger, @Callsite, @Exception
              );
      </commandText>
    
      <parameter name="@application" layout="AspNetCoreNlog" />
          <parameter name="@logged" layout="${date}" />
          <parameter name="@level" layout="${level}" />
          <parameter name="@message" layout="${message}" />
          <parameter name="@logger" layout="${logger}" />
          <parameter name="@callSite" layout="${callsite:filename=true}" />
          <parameter name="@exception" layout="${exception:tostring}" />
    </target>
  </targets>

  <rules>
    <logger name="*" levels="Trace, Debug, Info, Warn"  writeTo="File" />
    <logger name="*" levels="Error, Fatal"                           writeTo="FileFatal,LogDatabase" />
    <logger name="*" levels="Trace, Debug, Info, Warn, Error, Fatal" writeTo="LogViewer" />
  </rules>
</nlog>
```

Don’t forget to create the logging table in your database.

```
CREATE TABLE [dbo].[AspnetCoreLog] (
      [Id] [int] IDENTITY(1,1) NOT NULL,
      [Application] [nvarchar](50) NOT NULL,
      [Logged] [datetime] NOT NULL,
      [Level] [nvarchar](50) NOT NULL,
      [Message] [nvarchar](max) NOT NULL,
      [Logger] [nvarchar](250) NULL,
      [Callsite] [nvarchar](max) NULL,
      [Exception] [nvarchar](max) NULL,
    CONSTRAINT [PK_dbo.Log] PRIMARY KEY CLUSTERED ([Id] ASC)
      WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
  ) ON [PRIMARY]
```

##  Configure ASP.NET Core

Open `Startup.cs` and update the Configure function,
1. Add `NLog` to the Logger factory
2. Set the `jsnlog adapter` to Logger factory


#### Startup.cs

```
public class Startup
{
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc();
        }

        public void Configure(
            IApplicationBuilder app,
            IHostingEnvironment env,
            ILoggerFactory loggerFactory)
        {
            #region NLog
            //add NLog to ASP.NET Core
            loggerFactory.WithFilter(new FilterLoggerSettings{
                    { "Microsoft", LogLevel.Warning },
                    { "System", LogLevel.None },
                    { "Default", LogLevel.Debug }
            }).AddNLog();

            env.ConfigureNLog("NLog.config");

            #endregion

            #region JSNLog
            // Configure JSNLog
            // See jsnlog.com/Documentation/Configuration
            var jsnlogConfiguration = new JsnlogConfiguration();
            app.UseJSNLog(new LoggingAdapter(loggerFactory), jsnlogConfiguration);
            #endregion

            // …
        }
    }
}
```

#### Copy jslog: js and type definitions

* gulpfile.js

```
    //skip...

    //jsnlog
    gulp.task('copy-jsnlog', function () {
        return gulp.src(root_path.nmSrc + "/jsnlog/jsnlog*.js", {
            base: root_path.nmSrc + '/jsnlog/'
       }).pipe(gulp.dest(root_path.package_lib + '/jsnlog/'));
    });

    gulp.task('copy-jsnlog-typing', function () {
        return gulp.src(root_path.nmSrc + "/jsnlog/Definitions/jsnlog.d.ts", {
            base: root_path.nmSrc + '/jsnlog/Definitions/'
        }).pipe(gulp.dest(root_path.package_lib + '/typings/'));
    });


    gulp.task("copy-all", [
       //...
      "copy-jsnlog",
      "copy-jsnlog-typing"
    ])
```

Run the task to copy them to `$/wwwroot/lib-npm`

![](https://3.bp.blogspot.com/-9dGRjBosS7k/WBDIUbJnkPI/AAAAAAAAD8s/5eSZnGqXfh4AOSPahNPQqi7QYeCh2fsGACLcB/s1600/image002.png)


## Start logging


* Backend (MVC controller)

```
public class BaseController: Controller
    {
       
        protected static Logger _logger = LogManager.GetCurrentClassLogger();

        [Route("[action]")]
        public IActionResult Index()
        {
            _logger.Debug($"Areas:Basic,Controller:Customer,Action:Index");
            _logger.Error($"Areas:Basic,Controller:Customer,Action:Index");
            return View();
        }
}
```

* Frontend

Add the reference path to the `jsnlog type definitions` in the typescript for intelliSense.

```
/// <reference path="../../../lib-npm/typings/jsnlog.d.ts" />
```

And now we can log eveything in angular components.

```
JL("Angular2").debug("Saving a customer!");
```

### Demo

![](https://3.bp.blogspot.com/-Eh4t6asoMSw/WBDIgYUR2EI/AAAAAAAAD8w/xtZfoIaaibE9QHenaXvKAHkbfd0hRTMewCLcB/s1600/image003.gif)


## Reference

1. [JavaScript Logging for ASP.NET Core](http://jsnlog.com/Documentation/DownloadInstall/ForAspNetCore)
2. [mperdeck/jsnlog.AspNet5Demo](https://github.com/mperdeck/jsnlog.AspNet5Demo/blob/master/WebSite/src/WebSite/wwwroot/js/site.js)
3. [docs.nuget.org : Target framework](http://docs.nuget.org/ndocs/schema/target-framework)
4. [Running .NET Core apps on multiple frameworks and What the Target Framework Monikers (TFMs) are about](https://blogs.msdn.microsoft.com/cesardelatorre/2016/06/28/running-net-core-apps-on-multiple-frameworks-and-what-the-target-framework-monikers-tfms-are-about/)

