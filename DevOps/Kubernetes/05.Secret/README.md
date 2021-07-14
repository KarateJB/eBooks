# Secret

Kubernetes Secrets let you store and manage sensitive information and confidential information, such as passwords, OAuth tokens, and ssh keys.

> See [Secrets](https://kubernetes.io/docs/concepts/configuration/secret/)


***
## Type of Secret

| Builtin Type | Usage |
|:-------------|:------|
| Opaque | arbitrary user-defined data |
| kubernetes.io/service-account-token | service account token |
| kubernetes.io/dockercfg | serialized ~/.dockercfg file |
| kubernetes.io/dockerconfigjson | serialized ~/.docker/config.json file |
| kubernetes.io/basic-auth | credentials for basic authentication |
| kubernetes.io/ssh-auth | credentials for SSH authentication |
| kubernetes.io/tls | data for a TLS client or server |
| bootstrap.kubernetes.io/token | bootstrap token data |


***
## Create/Delete Secret

### Create

```s
$ kubectl create secret [generic|docker-registry|tls] <secret-name> [options]
```

### Delete

```s
$ kubectl delete secret <secret-name>
```


***
## Create Opaque Secret

Like [ConfigMap](../04.ConfigMap), the command:

```s
$ kubectl create secret generic

$ kubectl create secret generic <secret-name> [--type=string] [--from-file=[key=]source] [--from-env-file=source] [--from-literal=key1=value1] [--dry-run=server|client|none]
```


### Samples

We will some real samples of using Secrets in the manifest.
The sample code/file are located at [99.Samples\aspnet5\kubernetes\Secrets](../99.Samples/aspnet5/kubernetes/Secrets)

#### Sample 1. of using Secrets

We will use Secrects to put the file: `appsettings.Kubernetes.json` under "/app" of the container and set the environment variabels.

```s
$ kubectl create secret generic demo-k8s-secret --from-file=./appsettings.Kubernetes.json --from-literal=aspnetcore-environment="Kubernetes" --from-literal=aspnetcore-forwardedheaders-enabled="true" -n demo-k8s
$ kubectl get secret demo-k8s-secret -n demo-k8s -o yaml
apiVersion: v1
data:
  appsettings.Kubernetes.json: ew0KICAiTG9nZ2luZyI6IHsNCiAgICAiTG9nTGV2ZWwiOiB7DQogICAgICAiRGVmYXVsdCI6ICJJbmZvcm1hdGlvbiIsDQogICAgICAiTWljcm9zb2Z0IjogIldhcm5pbmciLA0KICAgICAgIk1pY3Jvc29mdC5Ib3N0aW5nLkxpZmV0aW1lIjogIkluZm9ybWF0aW9uIg0KICAgIH0NCiAgfSwNCiAgIkN1c3RvbWl6ZSI6IHsNCiAgICAiVGhlbWUiOiAiIzlkOTVkZiINCiAgfQ0KfQ0K
  aspnetcore-environment: a3ViZXJuZXRlcw==
  aspnetcore-forwardedheaders-enabled: dHJ1ZQ==
kind: Secret
metadata:
  creationTimestamp: "2021-07-14T08:16:06Z"
  name: demo-k8s-secret
  namespace: demo-k8s
  resourceVersion: "909976"
  uid: 4b9bd54d-c8e6-4458-803a-773570573fe1
type: Opaque
```

- pod_with_created_secret_1.yml

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: demo-k8s-pod # The name of the pod
  labels:
    app: demo-k8s
spec:
  containers:
    - name: demok8s
      image: karatejb/demo-k8s:latest # The Docker image
      ports:
        - containerPort: 5000
        - containerPort: 5001
      env:
        - name: ASPNETCORE_ENVIRONMENT
          valueFrom:
            secretKeyRef:
              name: demo-k8s-secret
              key: aspnetcore-environment
        - name: ASPNETCORE_FORWARDEDHEADERS_ENABLED
          valueFrom:
            secretKeyRef:
              name: demo-k8s-secret
              key: aspnetcore-forwardedheaders-enabled
      volumeMounts:
        - name: secret-volume
          # mountPath: /app/config # DO NOT use this line, it will DELETE and RECREATE the /app
          mountPath: /app/appsettings.Kubernetes.json
          subPath: appsettings.Kubernetes.json
  volumes:
    - name: secret-volume
      secret:
        secretName: demo-k8s-secret
```




### Sample 2. of using ConfigMap

Followed by the previous sample, now we will use the "env file" as the Secret.

```s
$ kubectl create secret generic demo-k8s-secret --from-file=./appsettings.Kubernetes.json -n demo-k8s
$ kubectl create secret generic demo-k8s-env-secret --from-env-file=./app.env -n demo-k8s
```

- pod_with_created_secret_2.yml

```yaml

```




***
## Create a secret for use with a Docker registry


> See [Creating a secret with a Docker config](https://kubernetes.io/docs/concepts/containers/images/#creating-a-secret-with-a-docker-config)

```s
$ kubectl create secret docker-registry <secret_name> --docker-server=<docker_registry_host> --docker-username=<user_name> --docker-password=<password> --docker-email=<email_addr> --namespace <namespace-name>
```


For example, the following sample shows how to create the [Azure Container Registry(ACR)](https://azure.microsoft.com/en-us/services/container-registry/)'s credential as the Secret to pull image from it on our manifest file.

> To create ACR with your subscription, you could have a look my article: [Azure Container Registry](https://github.com/KarateJB/JB-eBooks/tree/master/Cloud/Azure/ContainerRegistry).


```s
$ kubectl create secret docker-registry acrcred --docker-server=myacr.azurecr.io --docker-username=user --docker-password=mypassword --docker-email=user@demo.com --namespace demo-k8s
$ kubectl get secret acrcred -n demo-k8s -o yaml
apiVersion: v1
data:
  .dockerconfigjson: eyJhdXRocyI6eyJteWFjci5henVyZWNyLmlvIjp7InVzZXJuYW1lIjoidXNlciIsInBhc3N3b3JkIjoicGFzc3dvcmQiLCJlbWFpbCI6InVzZXJAZGVtby5jb20iLCJhdXRoIjoiZFhObGNqcHdZWE56ZDI5eVpBPT0ifX19
kind: Secret
metadata:
  creationTimestamp: "2021-07-14T07:38:31Z"
  name: my-acrcred
  namespace: demo-k8s
  resourceVersion: "906837"
  uid: 11d5cec2-5346-4ff9-8f26-6c4b492a500b
type: kubernetes.io/dockerconfigjson
```

Lets see the decoded base64 string:

```
{"auths":{"myacr.azurecr.io":{"username":"user","password":"password","email":"user@demo.com","auth":"dXNlcjpwYXNzd29yZA=="}}}
```


Now we can use the Secret to pull our image from the private Docker Registry.

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: demo-k8s-deployment
spec:
  replicas: 3
  template:
    metadata:
      labels:
        app: demo-k8s
    spec:
      containers:
        - name: demok8s
          image: myacr.azurecr.io/demo-k8s:latest # The Docker image
          ports:
            - containerPort: 5000
            - containerPort: 5001
      imagePullSecrets:
        - name: acrcred
  selector: # The label selector
    matchLabels:
      app: demo-k8s
```



```s
$ kubectl apply -f deployment.yml -n demo-k8s
```



***
## Create 


