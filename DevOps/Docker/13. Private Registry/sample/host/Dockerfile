FROM ubuntu:16.04

RUN apt-get update
RUN apt-get -y install \
    apt-transport-https \
    ca-certificates \
    curl \
    software-properties-common
RUN curl -fsSL https://download.docker.com/linux/ubuntu/gpg | apt-key add -
RUN apt-key fingerprint 0EBFCD88
RUN add-apt-repository \
   "deb [arch=amd64] https://download.docker.com/linux/ubuntu \
   $(lsb_release -cs) \
   stable"
RUN apt-get update
RUN apt-get -y install docker-ce
RUN apt-get update
RUN apt-get -y install nginx
RUN mkdir -p /etc/docker/certs.d/jb.com:443/ \
    mkdir -p /etc/docker/certs.d/jb.com:443/keys/

COPY /certs/jb.crt /etc/docker/certs.d/jb.com:443/
COPY /certs/jb.key /etc/docker/certs.d/jb.com:443/keys/
COPY /nginx/docker-registry.conf /etc/nginx/sites-available/

RUN ln -s /etc/nginx/sites-available/docker-registry.conf  /etc/nginx/sites-enabled/docker-registry.conf

WORKDIR /etc/docker/certs.d/jb.com:443/