
## Export

Export a table's records to .csv file.

```s
$ docker exec -it <container_1> bash
$ psql -h 127.0.0.1 -d <db> -U <user> -W
Password: xxxxx

MyDB=# \COPY <table_name> TO '/tmp/data.csv' DELIMITER ',' CSV HEADER;
```

scp the file from remote and copy it to other container.

```s
$ scp -P 22 root@xxx.xxx.xxx.xxx:/tmp/data.csv ./
$ docker cp ./data.csv <container_2>:/tmp/
```

## Import

```s
$ docker exec -it <container_2> bash
$ psql -h 127.0.0.1 -d <db> -U <user> -W
MyDB=# \COPY <table name> FROM /tmp/data.csv DELIMITER ',' CSV HEADER;
```


### Reference

- [How to import and export data using CSV files in PostgreSQL](https://www.enterprisedb.com/postgres-tutorials/how-import-and-export-data-using-csv-files-postgresql)