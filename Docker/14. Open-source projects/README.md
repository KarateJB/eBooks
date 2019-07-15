# Open-source images

| Project | Docker Hub | Github | Description  |
|:-------:|:------:|:------:|:-------------|
| [wernight/ngrok](#wernight/ngrok) | [wernight/ngrok](https://hub.docker.com/r/wernight/ngrok/) | [wernight/ngrok](https://github.com/wernight/docker-ngrok) | An Ngrok v2 container |
| [osixia/openldap](#osixia/openldap) | [osixia/openldap](https://hub.docker.com/r/osixia/openldap/) | [osixia/docker-openldap](https://github.com/osixia/docker-openldap) | A docker image to run OpenLDAP |




## wernight/ngrok

To start a [Ngrok](https://ngrok.com/) container,

```
$ docker run --rm -it --link <target_container_name> wernight/ngrok ngrok http <target_container_name>:<target_container_expose_port>
```


## osixia/openldap


### Standard OpenLDAP with user:`admin`/`admin` at domain: `example.org`

```
$ docker run -e -d  -p 389:389 -p 636:636 --name <container_name> osixia/openldap:1.2.4
```

### Specify the password for admin

```
$ docker run -e LDAP_ADMIN_PASSWORD="<new_password>" -d  -p 389:389 -p 636:636 --name tis-openldap osixia/openldap:1.2.4
```

### Specify the domain

For example, use `jb.org` instead of `example.org`,

```
$ docker run -e LDAP_ORGANISATION="jb" --env LDAP_DOMAIN="jb.org" --env LDAP_ADMIN_PASSWORD="12qwaszx" -d  -p 389:389 -p 636:636 --name tis-openldap osixia/openldap:1.2.4
```