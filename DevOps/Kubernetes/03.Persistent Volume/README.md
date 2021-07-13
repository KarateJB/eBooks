# Persitent Volume

> See [Persistent Volumes](https://kubernetes.io/docs/concepts/storage/persistent-volumes/)


***
## Resource object

### Persistent Volume (PV)

PVs are resources in the cluster.

### Persistent Volume Claim (PVC)

PVCs are requests for resources and act as claim checks to the resource.


***
## Lifecycle of volume and claim

- Provisioning
- Binding
- Using
- Storage Object in Use Protection
- Reclaiming
- Expanding Persisten Volumes Claims



***
## Provisioning

PVs may be provisioned: statically or dynamically.

### Static

Static PVs are created in advance before PVCs claim to use them.
They exist in the Kubernetes API.

#### Example

- redis-pv.yaml

```yaml
apiVersion: v1
kind: PersistentVolume
metadata:
  name: redis-pv
spec:
  volumeMode: Filesystem
  storageClassName: ""
  capacity:
    storage: 200Mi # Ei,Pi,Ti,Gi,Mi,Ki...
  accessModes:
    - "ReadWriteOnce"
  hostPath:
    path: "/mnt/data"
```

- redis-pvc.yaml

```yaml
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: idsrv-redis-pvc
spec:
  volumeMode: Filesystem
  volumeName: redis-pv # Opentional, 
  storageClassName: ""
  accessModes:
    - "ReadWriteOnce" # Mounted by a single node
  resources:
    requests:
      storage: 200M
```

- redis-pod.yaml

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: idsrv-redis
    metadata:
      labels:
        app: idsrv-demo-redis
spec:
  containers:
    - name: idsrv-redis
      image: redis:6.2
      ports:
        - containerPort: 6379
      volumeMounts:
        - name: redis-storage
          mountPath: /data
  volumes:
    - name: redis-storage
      persistentVolumeClaim:
        claimName: redis-pvc
```


```s
$ kubectl create -f redis-pv.yaml
$ kubectl get persistentvolumes
NAME             CAPACITY   ACCESS MODES   RECLAIM POLICY   STATUS      CLAIM   STORAGECLASS   REASON   AGE
redis-pv         200Mi      RWO            Retain           Available                                   2m55s

$ kubectl create -f redis-pvc.yaml
$ kubectl create -f redis-pod.yaml

$ kubectl get pv
NAME             CAPACITY   ACCESS MODES   RECLAIM POLICY   STATUS   CLAIM                     STORAGECLASS   REASON   AGE
redis-pv         200Mi      RWO            Retain           Bound    default/redis-pvc                           111m
```




### Dynamic

PVC can create a dynmaic PV when none of the static PVs match it's requirement. This provisioning is based on [StorageClasses](https://kubernetes.io/docs/concepts/storage/storage-classes/) so we have to configure StorageClass before PVC request for a dynamic PV.

