# ConfigMap

A ConfigMap is an API object used to store non-confidential data in key-value pairs. Pods can consume ConfigMaps as environment variables, command-line arguments, or as configuration files in a volume.

> See [ConfigMaps](https://kubernetes.io/docs/concepts/configuration/configmap/) and [Configure a Pod to Use a ConfigMap](https://kubernetes.io/docs/tasks/configure-pod-container/configure-pod-configmap/).


## Create/Delete a ConfigMap

```s
# Create
$ kubectl create configmap <map-name> [--from-file=[key=]source] [--from-literal=key1=value1] [--dry-run]
# Delete
$ Kubectl delete configmap <map-name>
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



## Bind ConfigMap to yaml file


