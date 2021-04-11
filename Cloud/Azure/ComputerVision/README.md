
# Create Resource Group

```s
$ az group create --location japan --name EventHub [--subscription]
```

> To see available locations, use 
> 
> `az account list-locations --output table`
> or 
> `az account list-locations --query [].[displayName,name]`

# Create a Cognitive Service Account

```s
$ az cognitiveservices account create \
--kind ComputerVision \
--name ComputerVisionService \
--sku S1 \
--resource-group EventHub \
--location japaneast
```

## List Cognitive Service Account(s)

```s
$ az cognitiveservices account list
```

Or by specified account name and resource group,

```s
$ az cognitiveservices account show \
--name ComputerVisionService \
--resource-group EventHub
```


# Get the keys

To get the list of keys that we can use to do RESTful API calls,

```s
$ az coginitiveservices account keys list \
--name ComputerVisionService \
--resource-group EventHub

{                                            
  "key1": "xxxxxxxxxxxxxxxxxx",
  "key2": "yyyyyyyyyyyyyyyyyy" 
}                                            
```


Now we save the value of `key1` to a variable like this (in bash),

```s
$ export key=$(az coginitiveservices account keys list \
--name ComputerVisionService \
--resource-group EventHub \
--query key1 -o tsv)


$ echo $key
xxxxxxxxxxxxxxxxxxxxx
```


# Computer Vision API

> Reference
>
> - [API Document](https://westcentralus.dev.cognitive.microsoft.com/docs/services/computer-vision-v3-1-ga)


The endpoint is 
```
https//{region}.api.cognitive.microsoft.com/
```

You can find it on Azure Portal as well.

![](assets/keys_n_endpoint.jpg)



For example, the **Analyze Image** API (v3.1):

```s
https://{endpoint}/vision/v3.1/analyze[?visualFeatures][&details][&language]
```




```
https://japaneast.api.cognitive.microsoft.com/

```