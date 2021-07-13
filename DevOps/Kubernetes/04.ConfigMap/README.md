# ConfigMap

A ConfigMap is an API object used to store non-confidential data in key-value pairs. Pods can consume ConfigMaps as environment variables, command-line arguments, or as configuration files in a volume.

> See [ConfigMaps](https://kubernetes.io/docs/concepts/configuration/configmap/) and [Configure a Pod to Use a ConfigMap](https://kubernetes.io/docs/tasks/configure-pod-container/configure-pod-configmap/).


***
## Create/Delete a ConfigMap

```s
# Create
$ kubectl create configmap|cm <map-name> [--from-file=[key=]source] [--from-literal=key1=value1] [--dry-run]
# Delete
$ Kubectl delete configmap|cm <map-name>
```


### Sample 1. Create ConfigMap from a file

```s
$ kubectl create configmap ap-config --from-file=./appsettings.Docker.json  --namespace demo-k8s

$ kubectl describe configmap ap-config -n demo-k8s
Name:         ap-config
Namespace:    demo-k8s 
Labels:       <none>   
Annotations:  <none>

Data
====
appsettings.Docker.json:
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
  appsettings.Docker.json: "{\r\n \"Customize\": {\r\n    \"Theme\": \"#00BFFF\"  }\r\n}\r\n"
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


### Sample 3. Create ConfigMap by literal(s)

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


### Sample 4. Create ConfigMap by file and literal

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

### Sample for understanding how to apply ConfigMap

Lets see how ConfigMap can be used in our manifest.

First, let's make an experiment and create a ConfigMap by defining:

- file: `appsettings.kubernetes.json`
- literal as a environment variable: `aspnetcore-environment="Docker"`
- literal as a environment variable: `aspnetcore-forwardedheaders-enabled="true"`

```s
$ kubectl create cm demo-k8s-configmap --from-file=./appsettings.kubernetes.json --from-literal=aspnetcore-environment="Docker" --from-literal=aspnetcore-forwardedheaders-enabled="true" -n demo-k8s
```

Then create a pod's yaml file:

- pod_with_created_configmap.yml

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
$ kubectl -n demo-k8s exec -it demo-k8s-pod -- bash

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

> !! Notice that using ConfigMap with `volumeMounts` like the above will DELETE and RECREATE the mounted path (directory and subpaths). The next sample will show how to avoild this case.




### Sample of using ConfigMap


Now we would like to put the file: `appsettings.kubernetes.json` under "/app" of the container and ignore the other 2 files (which are literals for setting the environment variables).

Here is the correct manifest to copy the file and set the env variables from ConfigMap:

```yaml
```
