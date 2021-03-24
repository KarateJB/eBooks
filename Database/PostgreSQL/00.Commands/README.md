# Commands

## Find postgresql.conf

```s
$ psql -U postgres -c 'SHOW config_file'
```


## Create database

```s
$ su postgres # optional
$ createdb --owner=postgres {dbname}
```

See help by `createdb -?` or `createdb --help`.
Reference: [Official document](https://www.postgresql.org/docs/9.3/app-createdb.html).



## Drop database

```s
$ su postgres # optional 
$ dropdb {dbname}
```

See help by `dropdb -?` or `dropdb --help`.
Reference: [Official document](https://www.postgresql.org/docs/9.3/app-dropdb.html).