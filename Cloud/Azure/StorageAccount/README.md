# Storage Account

```s
$ az group create --location japan --name EventHub [--subscription]
```

> To see available locations, use 
> 
> `az account list-locations --output table`
> or 
> `az account list-locations --query [].[displayName,name]`


# File Storage

## Create a Storage Account

```s
$ az storage account create \
     --name {account_name} \
     --resource-group {resource group} \
     --location japaneast \
     --sku Premium_LRS \
     --kind StorageV2
```


To delete it,

```s
$ az storage account delete \
     --name {storage_account} \
     --resource-group {resource_group}
```
## Add a File Share

```s
$ az storage share-rn create \
     --resource-group {resource_group}
     --storage-account {storage_account_name}
     --name {file_share_name}
     --access-tier "TransactionOptimized" \
     --quota 1024 \
     --output none
```

PS. The quota must be between 100 and 102400 GiB.


To change the tier of File Share,

```s
$ az storage share-rm update \
     --resource-group {resource_group} \
     --storage-account {storage_account} \
     --name {file_share_name} \
     --access-tier "Cool"
```