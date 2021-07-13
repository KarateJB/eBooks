# Minikub

***
## Install Minikub

> Reference: [minikub start](https://minikube.sigs.k8s.io/docs/start/)

```s
$ curl -LO https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64
$ sudo install minikube-linux-amd64 /usr/local/bin/minikube
$ apt-get install -y conntrack 
```

***
## Start Minikub

```s
$ minikub start --driver=none
```

and install [kubectl](https://kubernetes.io/docs/reference/kubectl/overview/)

```s
$ snap install kubectl --classic
$ kubectl version --client
```



