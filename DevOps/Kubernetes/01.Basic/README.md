# Basic

## Pod

### yaml sample

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: kubernetes-idsrv-pod
  labels:
    app: idsrv-demo
spec:
  containers:
    - name: kubernetes-idsrv-backend
      image: karatejb/idsrv4-backend
      ports:
        - containerPort: 5001
```


To create a pod: `kubernetes-idsrv-pod`:

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



