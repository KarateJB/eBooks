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





## Pods

> Pods are the smallest deployable units in Kubernetes.
> See [official document](https://kubernetes.io/docs/concepts/workloads/pods/).


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


To create a pod: `demo-k8s-pod`:

```s
$ kubectl apply -f kubernetes-idsrv.ymal
$ kubectl get pods --namespace demo-k8s
$ kubectl get pods -o wide | grep demo-k8s-pod

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

> An abstract way to expose an application running on a set of Pods as a network service.
> See [official document](https://kubernetes.io/docs/concepts/services-networking/service/).


### yaml sample

```yaml
apiVersion: v1
kind: Service
metadata:
  name: demo-k8s-service # The name of the service
spec:
  selector:
    app: demo-k8s # The lable of pods
  type: NodePort
  ports:
    - name: http-port
      protocol: TCP
      port: 5000 # The port of pod
      targetPort: 5000 # The port that service will send requests to, that your pod will be listening on.
      nodePort: 30500 # The port mapped to node
    - name: https-port
      protocol: TCP
      port: 5001
      targetPort: 5001
      nodePort: 30501
```

To create a service:

```s
$ kubectl create -f service.yaml --namespace demo-k8s
$ kubectl get services --namespace demo-k8s
$ kubectl get services -o wide | grep demo-k8s-service
$ kubectl describe service demo-k8s-service
Name:                     demo-k8s-service
Namespace:                demo-k8s
Labels:                   <none>
Annotations:              <none>
Selector:                 app=demo-k8s
Type:                     NodePort
IP:                       10.103.20.41
LoadBalancer Ingress:     localhost
Port:                     http-port  5000/TCP
TargetPort:               5000/TCP
NodePort:                 http-port  30500/TCP
Endpoints:                10.1.7.241:5000
Port:                     https-port  5001/TCP
TargetPort:               5001/TCP
NodePort:                 https-port  30501/TCP
Endpoints:                10.1.7.241:5001
Session Affinity:         None
External Traffic Policy:  Cluster
Events:                   <none>
```


To delete a service:

```s
$ kubectl delete services demo-k8s-service
```



## Deployments

> A Deployment provides declarative updates for Pods and ReplicaSets.
> See [official document](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/).




### yaml sample

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: demo-k8s-deployment # The name of Deployment
spec:
  replicas: 3 # The number of 
  template:
    metadata:
      labels:
        app: demo-k8s
    spec:
      containers:
        - name: demok8s
          image: karatejb/demo-k8s:latest # The Docker image
          ports:
            - containerPort: 5000
            - containerPort: 5001
  selector:
    matchLabels:
      app: demo-k8s
```


### Create Deployment

```s
$ kubectl create -f kubernetes-idsrv-deployment.yaml --namespace demo-k8s
deployment.apps/demo-k8s-deployment created

$ kubectl get deployment demo-k8s-deployment --namespace demo-k8s
NAME                  READY   UP-TO-DATE   AVAILABLE   AGE
demo-k8s-deployment   3/3     3            3           2m5s

$ kubectl get pods --namespace demo-k8s
NAME                                   READY   STATUS    RESTARTS   AGE
demo-k8s-deployment-7f8947b854-jcbfd   1/1     Running   0          42s
demo-k8s-deployment-7f8947b854-qwbvw   1/1     Running   0          42s
demo-k8s-deployment-7f8947b854-rsf5n   1/1     Running   0          42s

$ kubectl get rs --namespace demo-k8s
NAME                             DESIRED   CURRENT   READY   AGE
demo-k8s-deployment-7f8947b854   3         3         3       49m
```



### Update Deployment

We can update the deployment spec on the fly by

```s
$ kubectl edit deployment demo-k8s-deployment --namespace demo-k8s
```

Kubernetes will update the changes but keep 3 pods running. We can see the pods' states as following,

```s
$ kubectl get pods --namespace demo-k8s
NAME                                   READY   STATUS              RESTARTS   AGE
demo-k8s-deployment-7f8947b854-jcbfd   1/1     Running             0          14m
demo-k8s-deployment-7f8947b854-qwbvw   1/1     Terminating         0          14m
demo-k8s-deployment-7f8947b854-rsf5n   1/1     Running             0          14m
demo-k8s-deployment-86b9965c9d-clp26   1/1     Running             0          5s
demo-k8s-deployment-86b9965c9d-hg8n9   0/1     ContainerCreating   0          1s
```



Or rollback to the certain changes as following,

```s
$ kubectl rollout history deployment demo-k8s-deployment --namespace demo-k8s
REVISION    CHANGE-CAUSE
1           <none>
2           <none>

$ kubectl rollout history deployment demo-k8s-deployment --namespace demo-k8s --revision=1
deployment.apps/demo-k8s-deployment with revision #1
Pod Template:
  Labels:       app=demo-k8s
        pod-template-hash=7f8947b854
  Containers:
   demok8s:
    Image:      karatejb/demo-k8s:latest
    Ports:      5000/TCP, 5001/TCP
    Host Ports: 0/TCP, 0/TCP
    Environment:        <none>
    Mounts:     <none>
  Volumes:      <none>

$ kubectl rollout undo deployment demo-k8s-deployment --namespace demo-k8s [--to-revision=1]
```


To delete a deployment:

```s
$ kubectl delete deployment kubernetes-idsrv-deployment
```



## Ingress

> It exposes HTTP and HTTPS routes from outside the cluster to services within the cluster. Traffic routing is controlled by rules defined on the Ingress resource.
>
> See 
> - [official document](https://kubernetes.io/docs/concepts/services-networking/ingress/)
> - [Additional Controllers](https://kubernetes.io/docs/concepts/services-networking/ingress-controllers/#additional-controllers)






## Ingress






