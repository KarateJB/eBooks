# Create local registry

## Without Certification

```
$ docker pull registry
$ docker run --restart=always -d -p 5000:5000 [--name my-registry] registry[:tag]
```

See what ip docker use
```
$ echo $(docker-machine ip default)
```

Output (for example): `192.123.45.678`


### Push image to local registry

```
$ docker tag {image name}:{tag} 192.123.45.678:5000/{name}[:tag]
$ docker push 192.123.45.678:5000/{name}[:tag]
```

ex.
```
$ docker tag centos:latest 192.123.45.678:5000/centos
$ docker push 192.123.45.678:5000/centos
$ curl http://$(docker-machine ip default):5000/v2/_catalog 
```

The pushing result will be like this,

![](assets/001.png)

![](assets/002.png)


### Pull image from local registry

```
$ docker pull 192.123.45.678:5000/{name}[:tag]
```

ex. 
```
$ docker pull 192.123.45.678:5000/centos
```


