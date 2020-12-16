# Data volumes
---


## Create Docker Volume

```
$ docker volume create <volume_name> [Options]
```

> Referenc: [docker volume create](https://docs.docker.com/engine/reference/commandline/volume_create/)



In [docker compose file](https://docs.docker.com/compose/compose-file/#volume-configuration-reference), 

```
volumes:
    <your-volume-name>:
```

Notice that the volume name will be with prefix of the directory name. 

For example, 

- my-project
  |- docker-compose.yml

So the volume name will be `my-project_your-volume-name`


## Remove volume

```
$ docker volume rm [-f] <volume-name>
```


#### Remove dangling volumes

```
$ docker volume ls -qf dangling=true | xargs -r docker volume rm
```



## List volumes in the container

```bash
$ docker inspect -f '{{ .Mounts }}' <container_name_or_id>
```




## Mount a container's data volume


> There are `--mount` and `--volume (-v)` flags can be used in standalone containers since Docker 17.06 , check the [document](https://docs.docker.com/storage/volumes) for details.


````
$ docker run -d --name xxx -v </directory path> <image>[:tag]
````

ex.  Create an /app directory inside the container

```
$ docker run -d --name devtest -v /app nginx:latest
```

## Mount a local directory to container's data volume

Mount a local directory (if not exist, will create it) to the container,

```
$ docker run -d --name xxx -v <local directory path>:</container directory path>[:rw|:ro] <image>[:tag]
```
|        Parameter        | in short | Value | Description |
|:------------------------|:--------:|:-----:|:------------|
| :rw |  | | Read and write, default value |
| :ro |  | | Read only |

ex.
```
$ docker run -d --name my-dev -v /jb/volume:/app:ro nginx:latest
```



## Create a sharing data volumn between containers

1. Create a sharing data-volume container

    ```
    $ docker run -it -v /dbdata --name dbdata ubuntu
    
    $ root@xxxx:/# ls
    bin boot dbdata ... 

    $ root@xxxx:/# touch test.file
    $ root@xxxx:/# ls dbdata
    test.file 

    ```

2. Create other containers and mount the previous data volume

    ```
    $ docker run -it --volumes-from dbdata --name db1 ububtu
    $ docker run -it --volumes-from dbdata --name db2 ububtu
    ```

3. Check the data volume in db1 or db2

    ```
    $ docker start db1
    $ docker exec -it db1 /bin/bash
    $ root@xxxx:/# ls dbdata
    test.file
    ```

4. Backup the data volume from one container to another

   ```
   $ docker run -it --volumes-from dbdata -v "$(pwd)/backup":/backup --name dbbackup ubuntu 
   $ root@xxxx:/# tar cvf /backup/backup.tar /dbdata
   ```

   The above cmd can be shorten in to one line like this,
   ```
   $ docker run --volumes-from dbdata \ 
     -v "$(pwd)/backup":/backup --name dbbackup ubuntu \
     tar cvf /backup/backup.tar /dbdata 
   ```

   This will result in packing `/dbdata` to `backup.tar` 

5. Restore the data volume
   
   ```
   $ docker start dbbackup
   $ docker exec -it dbbackup /bin/bash
   $ root@xxxx:/# tar -xvf /backup/backup.tar 
   ```
   
   > The commnad `tar -xvf /xxxx.tar -C /zzz/yyyy` to unpack it to specified path.

