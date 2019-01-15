# Microsoft SQL Server for Linux
---

## Run

```bash
$ docker run -d --name <container_name> \
             -p <port>:1433 \
             -v <local_path>:/var/opt/mssql
             -e ACCEPT_EULA=Y \ 
             -e SA_PASSWORD=<SA_PWD> \
             microsoft/mssql-server-linux:<tag> \
```

Environment variables

| Variable | Description | Required | Default value | 
|:---------|:------------|:--------:|:--------------|
| ACCEPT_EULA | Do you agree the end-user license agreements(EULA) | Yes | |
| SA_PASSWORD | Password for SA. It must be at least 8 characters long<br /> and contain characters from three of the following four sets:<br /> Uppercase letters, Lowercase letters, Base 10 digits, and Symbols. | Yes | |
| MSSQL_PID | Product id or edition  | Yes | Developer |



For example, to run a SQL Server express:

```bash
$ docker run -d --name=demo-sqlserver
             -p 1433:1433 \
             -v ./mssql:/var/opt/mssql \
             -e ACCEPT_EULA=Y \ 
             -e SA_PASSWORD=1qaz@WSX \
             -e MSSQL_PID=Express \
             microsoft/mssql-server-linux:2017-CU12 \
```


```
$ docker run -d --name tis-sqlserver  -p 1433:1433  -v /mssql:/var/opt/mssql -v /mssql/log:/var/opt/mssql/log -v /var/opt/mssql/data -e ACCEPT_EULA=Y -e SA_PASSWORD=1qaz2wsx! -e MSSQL_PID=Express microsoft/mssql-server-linux:2017-CU12
```



## Reference

- [Configure SQL Server container images on Docker](https://docs.microsoft.com/en-us/sql/linux/sql-server-linux-configure-docker?view=sql-server-2017#persist)
- [Backup and restore SQL Server databases on Linux](https://docs.microsoft.com/en-us/sql/linux/sql-server-linux-backup-and-restore-database?view=sql-server-2017)
- [Mount a host directory as data volume - error. Docker toolbox on Windows 7 #103](https://github.com/Microsoft/mssql-docker/issues/103)
- [Locating data volumes in Docker](https://stackoverflow.com/a/43182885)

