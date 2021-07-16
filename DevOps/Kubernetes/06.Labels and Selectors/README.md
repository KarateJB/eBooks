# Labels and Selectors


***
## Labels


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



### How to apply label

Here is a sample.

```s
$ kubectl run demo-k8s-beta \
  --image=karatejb/demo-k8s:grey-theme \
  --namespace demo-k8s \
  --labels="ver=1.1,app=demo-k8s,env=beta"
$ kubectl run demo-k8s-prod \
  --image=karatejb/demo-k8s:blue-theme \
  --namespace demo-k8s \
  --labels="ver=1.0,app=demo-k8s,env=production"
$ kubectl run demo-k8s-web-beta \
  --image=karatejb/demo-k8s-web:grey-theme \
  --namespace demo-k8s \
  --labels="ver=2.1,app=demo-k8s-web,env=beta"
$ kubectl run demo-k8s-web-prod \
  --image=karatejb/demo-k8s-web:blue-theme \
  --namespace demo-k8s \
  --labels="ver=2.0,app=demo-k8s-web,env=production"
```

We can show the labels of the Pods:

```s
$ kubectl get pod --show-labels -n demo-k8s
NAME                READY   STATUS    RESTARTS   AGE     LABELS
demo-k8s-beta       1/1     Running   0          10m     app=demo-k8s,env=beta,ver=1.1
demo-k8s-prod       1/1     Running   0          94s     app=demo-k8s,env=production,ver=1.0       
demo-k8s-web-beta   1/1     Running   0          4m1s    app=demo-k8s-web,env=beta,ver=2.1
demo-k8s-web-prod   1/1     Running   0          2m43s   app=demo-k8s-web,env=production,ver=2.0 

# Or list the pods by specified label
$ kubectl get pod -L env,ver -n demo-k8s
NAME                READY   STATUS    RESTARTS   AGE   ENV          VER
demo-k8s-beta       1/1     Running   0          58m   beta         1.1
demo-k8s-prod       1/1     Running   0          49m   production   1.0
demo-k8s-web-beta   1/1     Running   0          52m   beta         2.1
demo-k8s-web-prod   1/1     Running   0          50m   production   2.0
```


### Update labels

The command:

```s
$ kubectl label <resource> <resource-name> <label>=value [--overwrite]
```

For example...
To overwrite an exist label:

```s
$ kubectl label pod demo-k8s-beta env=beta -n demo-k8s
# Or
$ kubectl label pod demo-k8s-beta "env=beta" -n demo-k8s
```

To add a new label:

```s
$ kubectl label pod demo-k8s-beta user=marketing -n demo-k8s
```

To revoke an exist label, just put the postfix: `-` at the name of the label:

```s
$ kubectl label pod demo-k8s-beta user- -n demo-k8s
```


***
## Label selectors

We can identify a set of objects by the label selector.
The API currently supports two types of selectors: equality-based and set-based. 

> See [Label selectors](https://kubernetes.io/docs/concepts/overview/working-with-objects/labels/#label-selectors)

### API

The command:

```s
$ kubectl get <resource> --lable|-l <filter>
```

Or

```s
$ kubectl get <resource> --selector=<filter>
```



#### Samples

For example, we would like to get the Pods that are labeled with "app=demo-k8s" and "env=production".

By using **equality-based** requirements:

```s
$ kubectl get pod -l app=demo-k8s,env=production --show-labels -n demo-k8s
NAME            READY   STATUS    RESTARTS   AGE   LABELS
demo-k8s-prod   1/1     Running   0          83m   app=demo-k8s,env=production,ver=1.0
```

By using **set-based** requirements:

```s
$ kubectl get pod -l 'app in (demo-k8s),env in (production)' --show-labels -n demo-k8s
```

The other example, we would like to get the Pods that are labeled with "app=demo-k8s-web" but "env!=production".

```s
# equality-based
$ kubectl get pod -l app=demo-k8s-web,env!=production --show-labels -n demo-k8s

# set-based
$ kubectl get pod -l 'app in (demo-k8s-web), env notin (production)' --show-labels -n demo-k8s 
```




We can use **set-based** requirements to do more expressive search.

- (app = "demo-k8s" or "demo-k8s-web") and (env = "beta" or "production") and (ver != "2.1")

```s
$ kubectl get pod -l 'app in (demo-k8s,demo-k8s-web),env in (beta,production),ver notin (2.1)' --show-labels -n demo-k8s
```

- (app = "demo-k8s") and (Have no label named "user")

```s
$ kubectl get pod -l 'app in (demo-k8s),!user' --show-labels -n demo-k8s
```



The Selector is useful with other commands, e.q.

```s
$ kubectl delete pod -l 'app in (demo-k8s,demo-k8s-web)' -n demo-k8s
```


### Supported operators in set-based requirements

| Operator | Description |
|:---------|:------------|
| key=value | |
| key!=value | |
| key in (value1, value2, ...) | key=value1 or key=value2 or ...|
| key notin (value1, value2, ...) | Not in the list. |
| !key | Not set with label: `key` |





### Use Selectors in manifest

We can use Selectors with **equality-based** requirements in a manifest, e.q.

```yaml
selector: # The label selector
  matchLabels:
    app: demo-k8s
    env: beta
```


But only newer resource as following, supports using Selector with **set-based** requirements:

| Resource type |
|:-------------:|
| Job |
| Deployment |
| ReplicaSet |
| DaemonSet |



```yaml
selector:
  matchLabels:
    app: demo-k8s-web
  matchExpressions:
    - {key: env, operator: In, values: [production]}
    - {key: ver, operator: NotIn, values: [3]}
```



