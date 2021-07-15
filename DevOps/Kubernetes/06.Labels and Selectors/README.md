# Labels and Selectors

Labels are key/value pairs that are attached to objects, such as pods. 
Each object can have a set of key/value labels defined. Each key must be unique for a given object.

For example,

| Label | Values |
|:------|:-------|
| "release" | `stable`, `release`, `canary` |
| "environment" | `dev`, `sit`, `production` |
| "tier" | `frontend`, `backend`, `cache` |
| "track" | `daily`, `track`, `weekly` |
| "department" | `sales`, `enginnering` |



***
## How to apply label

Here is a sample.

```s
$ kubectl run demo-k8s-beta \
  image=karatejb/demo-k8s:grey-theme \
  --replicas=2 \
  --labels="ver=1.1,app=demo-k8s,env=beta"
$ kubectl run demo-k8s-prod \
  image=karatejb/demo-k8s:blue-them \
  --replicas=2 \
  --labels="ver=1.0,app=demo-k8s,env=prodcution"
$ kubectl run demo-k8s-web-beta \
  image=karatejb/demo-k8s-web:grey-theme \
  --replicas=2 \
  --labels="ver=2.1,app=demo-k8s-web,env=beta"
$ kubectl run demo-k8s-web-prod \
  image=karatejb/demo-k8s-web:blue-theme \
  --replicas=2 \
  --labels="ver=2.0,app=demo-k8s-web,env=production"
```




