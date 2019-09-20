# Open-source images

| Project | Docker Hub | Github | Description  |
|:-------:|:------:|:------:|:-------------|
| [wernight/ngrok](#wernight/ngrok) | [wernight/ngrok](https://hub.docker.com/r/wernight/ngrok/) | [wernight/ngrok](https://github.com/wernight/docker-ngrok) | An Ngrok v2 container |
| [osixia/openldap](#osixia/openldap) | [osixia/openldap](https://hub.docker.com/r/osixia/openldap/) | [osixia/docker-openldap](https://github.com/osixia/docker-openldap) | A docker image to run OpenLDAP |
| [grafana/grafana](#grafana/grafana) | [grafana/grafana](https://hub.docker.com/r/grafana/grafana/) | [grafana/grafana](https://github.com/grafana/grafana) | Grafana is an open source, feature rich metrics dashboard and graph editor for Graphite, Elasticsearch, OpenTSDB, Prometheus and InfluxDB. |
| [caddyserver/caddy](#caddyserver/caddy) | [stefanprodan/caddy](https://hub.docker.com/r/osixia/openldap/) | [caddyserver/caddy](https://github.com/caddyserver/caddy) | Caddy is a general-purpose HTTP/2 web server that serves HTTPS by default. |




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
$ docker run -e LDAP_ADMIN_PASSWORD="<new_password>" -d  -p 389:389 -p 636:636 --name <container_name> osixia/openldap:1.2.4
```

### Specify the domain

For example, use `jb.org` instead of `example.org`,

```
$ docker run -e LDAP_ORGANISATION="jb" --env LDAP_DOMAIN="jb.org" --env LDAP_ADMIN_PASSWORD="12qwaszx" -d  -p 389:389 -p 636:636 --name <container_name> osixia/openldap:1.2.4
```

### Search an OU

```
$ docker exec <container_name> ldapsearch -x -H ldap://localhost -b dc=example,dc=org -D "cn=admin,dc=example,dc=org" -w admin
```


## grafana/grafana


### HTTPS configuration

1. Create SSL Cert and set permission

```
$ cd /usr/share/grafana
$ openssl req -newkey rsa:4096 -nodes -sha256 -keyout certs/grafana.key -x509 -days 3650 -out certs/grafana.crt
$ chown 472:472 certs/grafana.crt
$ chown 472:472 certs/grafana.key
```

2. Enable Https

```
$ cd /usr/share/grafana/conf
$ vim defaults.ini
```

Modify the following settings in `defaults.ini`

```
[server]

protocal = https

cert_file = /usr/share/grafana/certs/grafana.crt

cert_key =  /usr/share/grafana/certs/grafana.key
```



### Enable embeded by iframe

```
$ docker exec -u root -it my-grafana /bin/bash
$ cd /usr/share/grafana/conf
$ vim defaults.ini
```

Modify the following settings in `defaults.ini`

```
[security]

cookie-samesite = none

allow_embedding = true
```



# caddyserver/caddy


## Enable Https connetion by self-signed SSL cert

1. Create Self-signed SSL cert

```
$ docker exec -it my-caddy /bin/sh
$ cd etc/caddy
$ mkdir certs
$ openssl req -newkey rsa:4096 -nodes -sha256 -keyout certs/caddy.key -x509 -days 3650 -out certs/caddy.crt
```

2. Update Caddy file

```
$ vim /etc/caddy/Caddyfile
```

Set `tls` with the pathes of SSL cert and key, for example,

```
:443 {
   proxy / grafana:3000 {
       transparent
       websocket
   }

   errors stderr
   tls /etc/caddy/certs/caddy.crt /etc/caddy/certs/caddy.key
}
```

