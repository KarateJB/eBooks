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
     --name <account_name> \
     --resource-group <resource group> \
     --location japaneast \
     --sku Premium_LRS \
     --kind FileStorage
```


To delete it,

```s
$ az storage account delete \
     --name <storage_account> \
     --resource-group <resource_group>
```



## Add a File Share

> See [az storage share](https://docs.microsoft.com/en-us/cli/azure/storage/share?view=azure-cli-latest#az_storage_share_list)


```s
$ az storage share-rm create \
     --resource-group <resource_group>
     --storage-account <storage_account_name>
     --name <file_share_name>
     --quota 1024 \
     --output none
```

PS. The quota must be between `100` and `102400` GiB.


To change the tier of File Share,

```s
$ az storage share-rm update \
     --resource-group <resource_group> \
     --storage-account <storage_account> \
     --name <file_share_name> \
     --access-tier "Cool"
```


> Notice that we can manage the File Share and it's files by [Account Key](https://docs.microsoft.com/en-us/azure/storage/common/storage-account-keys-manage?tabs=azure-portal) or [SAS Token](https://docs.microsoft.com/en-us/azure/storage/common/storage-account-keys-manage?tabs=azure-portal).
> We will talk about how to get them later in this article.

After having the Account Key or SAS Token.
We can list File Share(s),


```s
$ az storage share list --account-key <account_key> --account-name <account_name>
```


Or show a File Share

```s
$ az storage share show --name myfileshare --account-name <account_name> --account-key $key
```


## List/Show direcory or file

### List directory and file

> See [az storage file list](https://docs.microsoft.com/en-us/cli/azure/storage/file?view=azure-cli-latest#az_storage_file_list)

```
$ az storage file list \
     --account-name <storage_account> \
     --account-key $key \
     --share-name <file_share_name> \
     [--path]
```


For example, I want to list anything inside the direcory `assets` of File Share: `myfileshare`:

```s
$ az storage file list --share-name myfileshare --account-name eventhub0933298858 --account-key $key --path "assets"
```

### Show file

> See [az storage file show](https://docs.microsoft.com/en-us/cli/azure/storage/file?view=azure-cli-latest#az_storage_file_show)

```s
$ az storage file show \
     --account-name <storage_account> \
     --account-key $key \
     --share-name <file_share_name> \
     --path <file_path>
```

e.q. 

```s
$ az storage file show --share-name myfileshare --account-name eventhub0933298858 --sas-token $sastoken --path "assets/User.gif"
{
  "content": "",
  "metadata": {},
  "name": "User.gif",
  "properties": {
    "contentLength": 34288,
    "contentRange": null,
    "contentSettings": {
      "cacheControl": null,
      "contentDisposition": null,
      "contentEncoding": null,
      "contentLanguage": null,
      "contentMd5": null,
      "contentType": "image/gif"
    },
    "copy": {
      "completionTime": null,
      "id": null,
      "progress": null,
      "source": null,
      "status": null,
      "statusDescription": null
    },
    "etag": "\"0x8D9008510E7AA1D\"",
    "lastModified": "2021-04-16T03:09:36+00:00",
    "serverEncrypted": true
  }
}
```


## Get Access Key (Account Key)


```s
$ az storage account keys list \
     --resource-group <resource_group> \
     --account-name <storage_account> 
```


Save the key to variable,

```s
export storageAccountKey=$(az storage account keys list \
    --resource-group <resource_group> \
    --account-name <storage_account> \
    --query "[0].value" | tr -d '"')
```


## Upload file to File Share

### (Optional) Create a directory

```s
$ az storage directory create \
     --account-name <storage_account> \
     --account-key $key \
     --share-name <file_share_name> \
     --name "myDirectory" \
```

### Upload a file

```s
$ az storage file upload \
   --account-name <storage_account> \
   --account-key $key \
   --share-name <file_share_name> \
   --path "myDirectory/User.gif" \
   --source "~/My Documents/My Pictures/User.gif"
```




---
## Access file by SAS(Shared access signature)

> See [Grant limited access to Azure Storage resources using shared access signatures (SAS)](https://docs.microsoft.com/en-us/azure/storage/common/storage-sas-overview)

![](assets/sas.jpg)

```s
$ az storage share generate-sas \
    --account-name <storage_account> \
    --account-key $key
    --name <file_share_name> \
    --permissions acdlrw \
    --start <datetime> \
    --expiry <datetime> \
    --ip <allowed_ips>
    [--https-only]
```



For example, the following command will generate a SAS token.

```s
$ export end=`date -u -d "30 minutes" '+%Y-%m-%dT%H:%MZ'`
$ az storage share generate-sas \
     --account-name myaccount \
     --account-key $key \
     --name myfileshare  \
     --permissions acdlrw \
     --expiry $end \
     --https-only

"se=2021-04-17T03%3A41Z&sp=rwdl&spr=https&sv=2018-11-09&sr=s&sig=xxxxxxxxxxxxxxxxxxx"
```


We can use **SAS token** instead of **Account Key** to upload a file, e.q.

```s
$ export end=`date -u -d "1 days" '+%Y-%m-%dT%H:%MZ'`
$ export sastoken=`az storage share generate-sas --account-name myaccount --account-key $key --name myfileshare --permissions dlrw --expiry $end --https-only -o tsv`
$ az storage file upload \
   --account-name myaccount \
   --share-name myfileshare \
   --sas-token $sastoken \
   --path "assets/Sabers.jpg" \
   --source "~/My Documents/My Pictures/sabers.jpg"
```



### Get the file by SAS Token

Now we can append the SAS token to the URL of a file to get it.

For example, the URL of my file is `https://<storage_account>.file.core.windows.net/<file_share_name>/assets/Sabers.jpg`, we can append the SAS Token to the URL and get the file by

```
https://<storage_account>.file.core.windows.net/<file_share_name>/assets/Sabers.jpg?se=2021-04-17T03%3A41Z&sp=rwdl&spr=https&sv=2018-11-09&sr=s&sig=xxxxxxxxxxxxxxxxxxxxxxx
```








