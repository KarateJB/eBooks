
# Create Resource Group

```s
az group create --location japan --name EventHub [--subscription]
```

> To see available locations, use 
> 
> `az account list-locations --output table`
> or 
> `az account list-locations --query [].[displayName,name]`

# Create a Cognitive Service account

```s
az cognitiveservices account create \
--kind ComputerVision \
--name ComputerVisionService \
--sku S1 \
--resource-group EventHub \
--location japaneast
```
