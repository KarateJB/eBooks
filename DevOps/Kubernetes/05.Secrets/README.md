# Secrets

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


This article will focus on how to create Secrets that are "Opaque" and "kubernetes.io/dockerconfigjson" types.



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



We will some real samples of using Secrets in the manifest.
The sample code/file are located at [99.Samples\aspnet5\kubernetes\Secrets](../99.Samples/aspnet5/kubernetes/Secrets)

### Sample 1. of using Secrets

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




### Sample 2. of using Secret

Followed by the previous sample, now we will use the "env file" as the Secret.

```s
$ kubectl create secret generic demo-k8s-secret --from-file=./appsettings.Kubernetes.json -n demo-k8s
$ kubectl create secret generic demo-k8s-env-secret --from-env-file=./app.env -n demo-k8s
```

- pod_with_created_secret_2.yml

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
              name: demo-k8s-env-secret
              key: ASPNETCORE_ENVIRONMENT
        - name: ASPNETCORE_FORWARDEDHEADERS_ENABLED
          valueFrom:
            secretKeyRef:
              name: demo-k8s-env-secret
              key: ASPNETCORE_FORWARDEDHEADERS_ENABLED
      volumeMounts:
        - name: secret-volume
          mountPath: /app/appsettings.Kubernetes.json
          subPath: appsettings.Kubernetes.json
  volumes:
    - name: secret-volume
      secret:
        secretName: demo-k8s-secret
```



However, we can simply the manifest by using `envFrom`:

- pod_with_created_secret_2.yml

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
      envFrom:
        - secretRef:
            name: demo-k8s-env-secret
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


The result is as expected,

```s
$ kubectl -n demo-k8s exec -it demo-k8s-pod -- bash -c 'echo $ASPNETCORE_ENVIRONMENT $ASPNETCORE_FORWARDEDHEADERS_ENABLED'
Kubernetes true
```


### Create Secret by manifest file

We can write the yaml file as the Secret manifest.

- secret-env.yml

```yaml
apiVersion: v1
kind: Secret
type: Opaque
metadata:
  name: demo-k8s-env-secret
  labels:
    app: demo-k8s
data:
  ASPNETCORE_ENVIRONMENT: S3ViZXJuZXRlcw==
  ASPNETCORE_FORWARDEDHEADERS_ENABLED: dHJ1ZQ==
```

- secret-appsettings.yml

```yaml
apiVersion: v1
kind: Secret
type: Opaque
metadata:
  name: demo-k8s-secret
  labels:
    app: demo-k8s
data:
  appsettings.Kubernetes.json: ew0KICAiTG9nZ2luZyI6IHsNCiAgICAiTG9nTGV2ZWwiOiB7DQogICAgICAiRGVmYXVsdCI6ICJJbmZvcm1hdGlvbiIsDQogICAgICAiTWljcm9zb2Z0IjogIldhcm5pbmciLA0KICAgICAgIk1pY3Jvc29mdC5Ib3N0aW5nLkxpZmV0aW1lIjogIkluZm9ybWF0aW9uIg0KICAgIH0NCiAgfSwNCiAgIkN1c3RvbWl6ZSI6IHsNCiAgICAiVGhlbWUiOiAiIzlkOTVkZiINCiAgfQ0KfQ0K``
```


Create the Secrests by,

```s
$ kubectl apply -f secret-env.yml -n demo-k8s
$ kubectl apply -f secret-appsettings.yml -n demo-k8s
```

Now we can use the same [manifest](#Sample-2-of-using-Secret) to create the Pod.

```s
$ kubectl apply -f pod_with_created_secret_2.yml -n demo-k8s
```


### A full sample of creating Deployment

In summary, we can create the Deployment manifest as following.

```yaml
apiVersion: v1
kind: Secret
type: Opaque
metadata:
  name: demo-k8s-env-secret
  labels:
    app: demo-k8s
data:
  ASPNETCORE_ENVIRONMENT: S3ViZXJuZXRlcw==
  ASPNETCORE_FORWARDEDHEADERS_ENABLED: dHJ1ZQ==

---
apiVersion: v1
kind: Secret
type: Opaque
metadata:
  name: demo-k8s-secret
  labels:
    app: demo-k8s
data:
  appsettings.Kubernetes.json: ew0KICAiTG9nZ2luZyI6IHsNCiAgICAiTG9nTGV2ZWwiOiB7DQogICAgICAiRGVmYXVsdCI6ICJJbmZvcm1hdGlvbiIsDQogICAgICAiTWljcm9zb2Z0IjogIldhcm5pbmciLA0KICAgICAgIk1pY3Jvc29mdC5Ib3N0aW5nLkxpZmV0aW1lIjogIkluZm9ybWF0aW9uIg0KICAgIH0NCiAgfSwNCiAgIkN1c3RvbWl6ZSI6IHsNCiAgICAiVGhlbWUiOiAiIzlkOTVkZiINCiAgfQ0KfQ0K

---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: demo-k8s-deployment
spec:
  replicas: 2
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
          envFrom:
            - secretRef:
                name: demo-k8s-env-secret
          volumeMounts:
            - name: secret-volume
              mountPath: /app/appsettings.Kubernetes.json
              subPath: appsettings.Kubernetes.json
      # imagePullSecrets:
      #   - name: acrcred
      volumes:
        - name: secret-volume
          secret:
            secretName: demo-k8s-secret
  selector: # The label selector
    matchLabels:
      app: demo-k8s

---
apiVersion: v1
kind: Service
metadata:
  name: demo-k8s-service
spec:
  selector:
    app: demo-k8s
  ports:
    - name: http-port
      protocol: TCP
      port: 5000
      targetPort: 5000
    - name: https-port
      protocol: TCP
      port: 5001
      targetPort: 5001
  type: LoadBalancer
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
  name: acrcred
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
## Update Secret

> Notice that any update on the exist Secret will not take effect on a running Deployment event if you "replace" or "apply" the Deployment after "edit" or "replace" the Secret.



### Edit Secret

```s
$ kubectl edit secret <secret-name>
```

This will open the editor and we can edit it on the fly.



### Edit manifest and Replace Secret

If you are using a manifest to manage the content of Secret, we can edit the manifest and then replace the exist Secret by,

```s
$ kubectl replace -f <manifest file>
```

For example, we update the Secret manifest from

- secret-env.yml

```yaml
apiVersion: v1
kind: Secret
type: Opaque
metadata:
  name: demo-k8s-env-secret
  labels:
    app: demo-k8s
data:
  ASPNETCORE_ENVIRONMENT: S3ViZXJuZXRlcw==
  ASPNETCORE_FORWARDEDHEADERS_ENABLED: dHJ1ZQ==
```

to

```yaml
apiVersion: v1
kind: Secret
type: Opaque
metadata:
  name: demo-k8s-env-secret
  labels:
    app: demo-k8s
data:
  ASPNETCORE_ENVIRONMENT: RG9ja2Vy
  ASPNETCORE_FORWARDEDHEADERS_ENABLED: ZmFsc2U=
```

then replace the Secret by `kubectl replace -f secret-env.yml -n demo-k8s`.



### Update from new content of a file or literal

If we created the Secret by `from-file`, `from-env-file` or `from-literal` and want to update the value.
There is no direct way to replace the value but we can use the "stdout" and "pipe" to do the trick.

The command should be looked like this:

```s
$ kubectl create secret generice <exist-secret-name> [--from-file=source|--from-env-file=source|--from-literal=key=value] \
  --dry-run -o yaml \
  | kubectl apply -f -
```

For example,

```s
$ kubectl create secret generic demo-k8s-secret --from-file=./appsettings.Kubernetes.json -n d
emo-k8s --dry-run=client -o yaml | kubectl apply -f -
```


```s
$ kubectl create secret generic demo-k8s-env-secret --from-env-file=./app.env -n demo-k8s --dr
y-run=client -o yaml | kubectl apply -f -
```


```s
$ kubectl create secret generic ap-secret --from-literal=aspnetcore-environment="Kubernetes" --from-literal=aspnetcore-forwardedheaders-enabled="true" -n demo-k8s
secret/ap-secret created
$ kubectl get secret ap-secret -n demo-k8s -o yaml
apiVersion: v1
data:
  aspnetcore-environment: S3ViZXJuZXRlcw==     
  aspnetcore-forwardedheaders-enabled: dHJ1ZQ==
kind: Secret
metadata:
  creationTimestamp: "2021-07-14T10:57:32Z"    
  name: ap-secret
  namespace: demo-k8s
  resourceVersion: "923552"
  uid: aaf72e57-eb7a-4f39-8327-cd39ef918b38    
type: Opaque

$ kubectl create secret generic ap-secret --from-literal=aspnetcore-environment="Docker" --from-literal=aspnetcore-forwardedheaders-enabled="false" -n demo-k8s --dry-run=client -o yaml | kubectl apply -f - 
$ kubectl get secret ap-secret -n demo-k8s -o yaml
apiVersion: v1
data:
  aspnetcore-environment: RG9ja2Vy
  aspnetcore-forwardedheaders-enabled: ZmFsc2U=
kind: Secret
metadata:
  annotations:
    kubectl.kubernetes.io/last-applied-configuration: |
      {"apiVersion":"v1","data":{"aspnetcore-environment":"RG9ja2Vy","aspnetcore-forwardedheaders-enabled":"ZmFsc2U="},"kind":"Secret","metadata":{"annotations":{},"creationTimestamp":null,"name":"ap-secret","namespace":"demo-k8s"}}
  creationTimestamp: "2021-07-14T11:01:58Z"
  name: ap-secret
  namespace: demo-k8s
  resourceVersion: "924147"
  uid: 17dc617a-0edf-4aa8-8c91-f52296ad53f0
type: Opaque
```




