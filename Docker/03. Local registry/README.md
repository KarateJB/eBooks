# Create local registry
---

> The Registry is a stateless, highly scalable server side application that stores and lets you distribute Docker images. (See reference: [Docker Registry](https://docs.docker.com/registry/))

We are going to use the official Docker image: [registry](https://hub.docker.com/_/registry/) to create a local insecure Docker Registry. 

For a secure Docker Registry with TSL certificates, see [13. Private Registry]().


## Without Certificates

```
$ docker pull registry
$ docker run --restart=always -d -p 5000:5000 [--name my-registry] registry[:tag]
```

See what ip docker use
```
$ echo $(docker-machine ip default)
```

Output (for example): `192.123.45.678`


### Insecure registry setting

The local registry is insecure as a plain HTTP registry.
We cannot pull/push images from/to a insecure registry until we configure Docker to entirely disregard security for the registry.

Edit the `daemon.json` file, whose default location is
- Linux: `/etc/docker/daemon.json`
- Windows:  `C:\ProgramData\docker\config\daemon.json`

If it doesn't exist, create one with the content:

```
{
  "insecure-registries" : [
	"192.123.45.678:5000"
  ]
}
```

and restart Docker by 

```
$ service docker stop
$ service docker start
```


### Push image to local registry

Tag a image as `<registry ip>:<port>/<image name>[:tag]`

```
$ docker tag <image name>:<tag> 192.123.45.678:5000/<image name>[:tag]
$ docker push 192.123.45.678:5000/<name>[:tag]
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
$ docker pull 192.123.45.678:5000/<name>[:tag]
```

ex. 
```
$ docker pull 192.123.45.678:5000/centos
```


## Reference

- [Test an insecure registry](https://docs.docker.com/registry/insecure/)
