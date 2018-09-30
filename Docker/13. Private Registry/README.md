# Private Docker Registry
---

> The Registry is a stateless, highly scalable server side application that stores and lets you distribute Docker images. (See reference: [Docker Registry](https://docs.docker.com/registry/))

We are going to use the official Docker image: [registry](https://hub.docker.com/_/registry/) to create our private Docker Registry. 


## Install Docker Registry

The docker image can be found on [Docker Hub](https://hub.docker.com/_/registry/)

```
$ docker run -d -p 5000:5000 --restart=always --name <container name> registry[:<tag>]
```

For example, to put the private images in local directory:

```
docker run -d -p 5000:5000 \
              --restart=always \
              --name my-registry \
              -v /opt/data/registry:/var/lib/registry \
              registry
```


However the Registry is insecure with no HTTPS support, we will use self-signed certificates to secure the private Registry at next step.

For more information about how to pull/push images from/to an insecure Registry, see [03. Local registry]().



## Architecture for this tutorial

We will create 2 containers:
1. Private Registry
2. Docker on client side (=Docker in docker)

> You can skip 2. if you want to use the Docker on host.





## Modify hosts

In this example, we will use `jb.com` as the domain name.
First add the host name and IP mapping to `hosts` file.

> `hosts` file location:
> - Linux: `/etc/hosts`
> - Windows: `C:\Windows\System32\drivers\etc\hosts`

For example,

```
192.168.99.100  jb.com 
```

## Make self-signed certificates

```
$ openssl req -newkey rsa:4096 -nodes -sha256 -keyout certs/<domain>.key -x509 -days 365 -out certs/<domain>.crt
```

Assume 


```
docker run -d -p 443:443 \
              --restart=always \
              --name my-registry \
              -v /opt/data/registry:/var/lib/registry \
              -e REGISTRY_HTTP_ADDR=0.0.0.0:443 \
              -e REGISTRY_HTTP_TLS_CERTIFICATE=/opt/data/registry/certs/<domain>.crt \
              -e REGISTRY_HTTP_TLS_KEY=/opt/data/registry/certs/<domain>.key \
              registry
```

docker run -d -p 443:443 \
              --restart=always \
              --name my-registry  \
              -v /registry:/var/lib/registry \
              -e REGISTRY_HTTP_ADDR=0.0.0.0:443 \
              -e REGISTRY_HTTP_TLS_CERTIFICATE=/registry/certs/jb.crt \
              -e REGISTRY_HTTP_TLS_KEY=/registry/certs/jb.key \
              registry:2.6.2



## Reference

- [docker.github.io](https://github.com/docker/docker.github.io/blob/master/registry/deploying.md)
- [Running your own Docker Registry](https://www.admintome.com/blog/running-your-own-docker-registry/)