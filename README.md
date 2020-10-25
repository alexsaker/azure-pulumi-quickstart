# AZURE PULUMI QUICKSTART

This is a the implementation of the pulumi quickstart for AWS using Typescript.
https://www.pulumi.com/docs/get-started/azure/

## Prerequisites
- Install pulumi 
```bash
curl -fsSL https://get.pulumi.com | sh
```
- Install Azure cli 
```bash
# For debian users
curl -sL https://aka.ms/InstallAzureCLIDeb | sudo bash
az login
```

## Launch storage account and azure function creation
```bash
pulumi stack init
pulumi up -y
```

## Get Connection string
```bash
pulumi stack output connectionString
pulumi stack output endpoint
```

## Test deplyed azure function
```bash
curl https://greetingse58e46ce.azurewebsites.net/api/greetings
curl https://greetingse58e46ce.azurewebsites.net/api/greetings?extra=true

```

## Benchmark solution
```bash
sudo apt install -y apache2-utils
ab -n 1000 -c 50 https://greetingse58e46ce.azurewebsites.net/api/greetings
```

## Destroy AWS deployment and stack
```bash
pulumi destroy -y
pulumi stack rm dev 
```