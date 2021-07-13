# ConfigMap

A ConfigMap is an API object used to store non-confidential data in key-value pairs. Pods can consume ConfigMaps as environment variables, command-line arguments, or as configuration files in a volume.

> See [ConfigMaps](https://kubernetes.io/docs/concepts/configuration/configmap/) and [Configure a Pod to Use a ConfigMap](https://kubernetes.io/docs/tasks/configure-pod-container/configure-pod-configmap/).


***
## Create/Delete a ConfigMap

### Create

```s
$ kubectl create configmap|cm <map-name> [--from-file=[key=]source] [--from-env-file=source] [--from-literal=key1=value1] [--dry-run]
```

### Delete

```s
$ Kubectl delete configmap|cm <map-name>
```



## Samples

The sample code/file are located at [99.Samples\aspnet5\kubernetes\configmap](../99.Samples/aspnet5/kubernetes/ConfigMap)

### Sample 1. Create ConfigMap from a file

```s
$ kubectl create configmap ap-config --from-file=./appsettings.kubernetes.json  --namespace demo-k8s

$ kubectl describe configmap ap-config -n demo-k8s
Name:         ap-config
Namespace:    demo-k8s 
Labels:       <none>   
Annotations:  <none>

Data
====
appsettings.kubernetes.json:
----
{
  "Customize": {
    "Theme": "#00BFFF"
  }
}

Events:  <none>

$ kubectl get configmap ap-config -o yaml -n demo-k8s
apiVersion: v1
data:
  appsettings.kubernetes.json: "{\r\n \"Customize\": {\r\n    \"Theme\": \"#00BFFF\"  }\r\n}\r\n"
kind: ConfigMap
metadata:
  creationTimestamp: "2021-07-12T11:09:20Z"
  name: ap-config
  namespace: demo-k8s
  resourceVersion: "813767"
  uid: 60767a5f-b136-4037-93e0-b624d89f9b66
```


### Sample 2. Create ConfigMap from multiple files

```s
$ kubectl create configmap ap-config --from-file=config1=./appsettings.json --from-file=ap-config-docker=./appsettings.Docker.json --namespace demo-k8s
$ kubectl describe configmap ap-config -n demo-k8s
Name:         ap-config
Namespace:    demo-k8s
Labels:       <none>
Annotations:  <none>

Data
====
config1:
----
{
  "Customize": {
    "Theme": "#00BFFF"
  }
}

config2:
----
{
  "Customize": {
    "Theme": "#808080"
  }
}

Events:  <none>
```

### Sample 3. Create ConfigMap by env file

> Cautions:
> 1. `from-env-file` cannot be combined with `from-file` or `from-literal`.
> 2.  When passing `--from-env-file` multiple times to create a ConfigMap from multiple data sources, only the last env-file is used.


- app.env

```
ASPNETCORE_ENVIRONMENT=kubernetes
ASPNETCORE_FORWARDEDHEADERS_ENABLED=true
```

```s
$ kubectl create configmap ap-config --from-env-file=./app.env --namespace demo-k8s
$ kubectl describe configmap ap-config -n demo-k8s
Name:         ap-config
Namespace:    demo-k8s
Labels:       <none>
Annotations:  <none>

Data
====
ASPNETCORE_FORWARDEDHEADERS_ENABLED:
----
true
ASPNETCORE_ENVIRONMENT:
----
kubernetes
Events:  <none>
```



### Sample 4. Create ConfigMap by literal(s)

```s
$ kubectl create configmap ap-config --from-literal=db1="Postgres" --from-literal=db2="SQL Server" --namespace=demo-k8s
$ kubectl describe configmap ap-config -n demo-k8s
Name:         ap-config
Namespace:    demo-k8s
Labels:       <none>
Annotations:  <none>

Data
====
db1:
----
Postgres
db2:
----
SQL Server
Events:  <none>
```


### Sample 5. Create ConfigMap by file and literal

```s
$ kubectl create configmap ap-config --from-file=./appsettings.k8s.json --from-literal=ap-env="k8s" --namespace=demo-k8s
$ kubectl describe configmap ap-config -n demo-k8s
Name:         ap-config
Namespace:    demo-k8s
Labels:       <none>
Annotations:  <none>

Data
====
ap-env:
----
k8s
appsetting.k8s.json:
----
{
  "Customize": {
    "Theme": "#E5CCFF"
  }
}
Events:  <none>
```



***
## Bind ConfigMap to yaml file

### Sample 1. for understanding how to apply ConfigMap

Lets see how ConfigMap can be used in our manifest.

First, let's make an experiment and create a ConfigMap by defining:

- file: `appsettings.kubernetes.json`
- literal as a environment variable: `aspnetcore-environment="Docker"`
- literal as a environment variable: `aspnetcore-forwardedheaders-enabled="true"`

```s
$ kubectl create cm demo-k8s-configmap --from-file=./appsettings.kubernetes.json --from-literal=aspnetcore-environment="Docker" --from-literal=aspnetcore-forwardedheaders-enabled="true" -n demo-k8s
```

Then create a pod's yaml file:

- pod_with_created_configmap_1.yml

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
            configMapKeyRef:
              name: demo-k8s-configmap
              key: aspnetcore-environment
        - name: ASPNETCORE_FORWARDEDHEADERS_ENABLED
          valueFrom:
            configMapKeyRef:
              name: demo-k8s-configmap
              key: aspnetcore-forwardedheaders-enabled
      volumeMounts:
        - name: config-volume
          mountPath: /app/config
  imagePullSecrets:
    - name: acrcred
  volumes:
    - name: config-volume
      configMap:
        name: demo-k8s-configmap
```

Create the pod by `kubectl apply -f pod_with_created_configmap.yml -n demo-k8s` and we will find there are 3 files at "/app/config" in the container.

```s
$ kubectl -n demo-k8s-pod exec -it demo-k8s-pod -- bash

# List files in /app/config/
root@demo-k8s-pod:/app# ls -1 config
appsettings.kubernetes.json
aspnetcore-environment
aspnetcore-forwardedheaders-enabled

# See what is inside the file
root@demo-k8s-pod:/app# cat config/aspnetcore-forwardedheaders-enabled 
true

# See if the environment variable is set correctly
root@demo-k8s-pod:/app# echo $ASPNETCORE_FORWAREDHEADERS_ENABLED
true
```

> !! Notice that using ConfigMap with `volumeMounts` like the above will DELETE and RECREATE the mounted path (directory and subpaths), see [Issue#51165: config map deletes existing files and sub directory at mount point](https://github.com/kubernetes/kubernetes/issues/51165). The next sample will show how to avoild this case.




### Sample 2. of using ConfigMap


Now we would like to put the file: `appsettings.kubernetes.json` under "/app" of the container and ignore the other 2 files (which are literals for setting the environment variables).

First change our ConfigMap as follwoing,

```s
$ kubectl delete cm demo-k8s-configmap -n demo-k8s
$ kubectl create cm demo-k8s-configmap --from-file=./appsettings.kubernetes.json --from-literal=aspnetcore-environment="kubernetes" --from-literal=aspnetcore-forwardedheaders-enabled="true" -n demo-k8s
```


Here is the correct manifest to copy the file and set the env variables from ConfigMap:

- pod_with_created_configmap_1.yml

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
            configMapKeyRef:
              name: demo-k8s-configmap
              key: aspnetcore-environment
        - name: ASPNETCORE_FORWARDEDHEADERS_ENABLED
          valueFrom:
            configMapKeyRef:
              name: demo-k8s-configmap
              key: aspnetcore-forwardedheaders-enabled
      volumeMounts:
        - name: config-volume
          mountPath: /app/appsettings.kubernetes.json
          subPath: appsettings.kubernetes.json
  imagePullSecrets:
    - name: acrcred
  volumes:
    - name: config-volume
      configMap:
        name: demo-k8s-configmap

```

The result is as expected,

```s
# Try to grep "appsettings.kubernetes.json", "aspnetcore-environment", "aspnetcore-forwardedheaders-enabled"
$ kubectl -n demo-k8s exec demo-k8s-pod -- ls -1 | grep "appsettings.kubernetes.json\|aspnetcore-environment\|aspnetcore-forwardedheaders-enabled"
appsettings.kubernetes.json
# Check the environment variables
$ kubectl -n demo-k8s exec -it demo-k8s-pod -- bash -c 'echo $ASPNETCORE_ENVIRONMENT $ASPNETCORE_FORWARDEDHEADERS_ENABLED'
kubernetes true
```



### Sample 3. of using ConfigMap

Followed by the previous sample, now we will use the "env file" in the ConfigMap.

```s
$ kubectl create cm demo-k8s-configmap --from-file=./appsettings.kubernetes.json -n demo-k8s
$ kubectl create cm demo-k8s-configmap --from-env-file=./app.env -n demo-k8s
```

- pod_with_created_configmap_2.yml

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
            configMapKeyRef:
              name: demo-k8s-env-configmap
              key: ASPNETCORE_ENVIRONMENT
        - name: ASPNETCORE_FORWARDEDHEADERS_ENABLED
          valueFrom:
            configMapKeyRef:
              name: demo-k8s-env-configmap
              key: ASPNETCORE_FORWARDEDHEADERS_ENABLED
      volumeMounts:
        - name: config-volume
          # mountPath: /app/config # DO NOT use this line, it will DELETE and RECREATE the /app
          mountPath: /app/appsettings.kubernetes.json
          subPath: appsettings.kubernetes.json
  imagePullSecrets:
    - name: acrcred
  volumes:
    - name: config-volume
      configMap:
        name: demo-k8s-configmap
```


However, we can simply the manifest by using `envFrom`:

- pod_with_created_configmap_2.yml

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
        - configMapRef:
            name: demo-k8s-env-configmap
      volumeMounts:
        - name: config-volume
          mountPath: /app/appsettings.kubernetes.json
          subPath: appsettings.kubernetes.json
  imagePullSecrets:
    - name: acrcred
  volumes:
    - name: config-volume
      configMap:
        name: demo-k8s-configmap
```

The result is as expected,

```s
$ kubectl -n demo-k8s exec -it demo-k8s-pod -- bash -c 'echo $ASPNETCORE_ENVIRONMENT $ASPNETCORE_FORWARDEDHEADERS_ENABLED'
kubernetes true
```



***
## Create ConfigMap in manifest file

### ConfigMap manifest

We can write the yaml file as the ConfigMap manifest.

- configmap-env.yml

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: demo-k8s-env-configmap
  labels:
    app: demo-k8s
data:
  ASPNETCORE_ENVIRONMENT: "kubernetes"
  ASPNETCORE_FORWARDEDHEADERS_ENABLED: "true"
```


- configmap-appsettings.yml

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: demo-k8s-configmap
  labels:
    app: demo-k8s
data:
  appsetting.kubernetes.json: |-
    {
      "Logging": {
        "LogLevel": {
          "Default": "Information",
          "Microsoft": "Warning",
          "Microsoft.Hosting.Lifetime": "Information"
        }
      },
      "Customize": {
        "Theme": "#9d95df"
      }
    }
```

Create the ConfigMaps by,

```s
$ kubectl apply -f configmap-env.yml -n demo-k8s
$ kubectl apply -f configmap-appsettings.yml -n demo-k8s
```


Now we can use the same [manifest](#Sample-3-of-using-ConfigMap) to create the Pod.

```s
$ kubectl apply -f pod_with_created_configmap_2.yml -n demo-k8s
```



### A full sample of creating deployment

In summary, we can create the runnable application by the following yaml file of Deployment.

```yaml
---
apiVersion: v1
kind: ConfigMap
metadata:
  name: demo-k8s-env-configmap
  labels:
    app: demo-k8s
data:
  ASPNETCORE_ENVIRONMENT: "kubernetes"
  ASPNETCORE_FORWARDEDHEADERS_ENABLED: "true"

---
apiVersion: v1
kind: ConfigMap
metadata:
  name: demo-k8s-configmap
  labels:
    app: demo-k8s
data:
  appsettings.kubernetes.json: |-
    {
      "Logging": {
        "LogLevel": {
          "Default": "Information",
          "Microsoft": "Warning",
          "Microsoft.Hosting.Lifetime": "Information"
        }
      },
      "Customize": {
        "Theme": "#9d95df"
      }
    }

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
          image: karatejbacr.azurecr.io/demo-k8s:latest # The Docker image
          ports:
            - containerPort: 5000
            - containerPort: 5001
          envFrom:
            - configMapRef:
                name: demo-k8s-env-configmap
          volumeMounts:
            - name: config-volume
              mountPath: /app/appsettings.kubernetes.json
              subPath: appsettings.kubernetes.json
      imagePullSecrets:
        - name: acrcred
      volumes:
        - name: config-volume
          configMap:
            name: demo-k8s-configmap
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


