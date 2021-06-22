# Basic

## Before we get started

The sample docker image is [karatejb@demok8s:latest]().
You can build the same image to your repositories in Docker Hub by the following command.

```s
$ cd "99.Samples/aspnet5"
$ docker build -t <Docker_ID>/demo-k8s -f docker/dockerfile .
$ docker push <Docker_ID>/demo-k8s:latest
```

## Namespace

### Create Namespace

```s
$ kubectl create namespace demo-k8s
```

Or use a yaml file.

```s
$ kubectl create -f namespace.yml
namespace/demo-k8s created
```

- namespace.yml

```yaml
apiVersion: v1
kind: Namespace
metadata:
  name: demo-k8s
```

### Delete namespace

```s
$ kubecrl delete namespace demo-k8s
namespace/demo-k8s deleted
```





## Pod

### yaml sample

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: demo-k8s-pod
  labels:
    app: demo-k8s
spec:
  containers:
    - name: kubernetes-idsrv-backend
      image: karatejb/idsrv4-backend
      ports:
        - containerPort: 5000
        - containerPort: 5001
```


To create a pod: ``:

```s
$ kubectl create -f kubernetes-idsrv.ymal
$ kubectl get pods
$ kubectl get pods -o wild | grep kubernetes-idsrv-pod

$ kubectl port-forward kubernetes-idsrv-pod 5001:5001
```

To delete a pod,

```s
$ kubectl delete pods kubernetes-idsrv-pod
```

### Use Port Forwarding to access the AP in a cluster

```s
$ kubectl port-forward demo-k8s-pod 80:5000 443:5001 --namespace demo-k8s
```

We can assign the IP as well:

```s
$ kubectl port-forward --address 192.168.xxx.xxx demo-k8s-pod 80:5000 443:5001 --namespace demo-k8s
```


## Service

### yaml sample

```yaml
apiVersion: v1
kind: Service
metadata:
  name: kubernetes-idsrv-service
spec:
  selector:
    app: idsrv-demo
  type: NodePort
  ports:
    - protocol: TCP
      port: 5001 # The port for pod
      targetPort: 5001 # The port mapped to service
      nodePort: 30501 # The port mapped to node
```

To create a service:

```s
$ kubectl create -f kubernetes-idsrv-service.yaml
$ kubectl get services
$ kubectl get services -o wide | grep kubernetes-idsrv-service
$ kubectl describe service kubernetes-idsrv-service
```


To delete a service:

```s
$ kubectl delete services kubernetes-idsrv-service
```


## Deployment

### yaml sample

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: kubernetes-idsrv-deployment
spec:
  replicas: 3
  template:
    metadata:
      labels:
        app: idsrv-demo
    spec:
      containers:
        - name: kubernetes-idsrv-backend
          image: karatejb/idsrv4-backend
          ports:
            - containerPort: 5001
  selector:
    matchLabels:
      app: idsrv-demo
```

To create a deployment:

```s
$ kubectl create -f kubernetes-idsrv-deployment.yaml
$ kubectl get kubernetes-idsrv-deployment
```

To delete a deployment:

```s
$ kubectl delete deployment kubernetes-idsrv-deployment
```

We can update the deployment spec on the fly by

```s
$ kubectl edit deployments kubernetes-idsrv-deployment
```

Or rollback to the certain changes as following,

```s
$ kubectl rollout history deployment kubernetes-idsrv-deployment
REVISION    CHANGE-CAUSE
1           <none>

$ kubectl rollout undo deployment kubernetes-idsrv-deployment [--to-revision=2]
```


## Ingress





