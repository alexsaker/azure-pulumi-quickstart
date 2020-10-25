import * as pulumi from "@pulumi/pulumi";
import * as azure from "@pulumi/azure";

const resourceGropuName = "pulumiResourceGroup";
// Create an Azure Resource Group
const resourceGroup = new azure.core.ResourceGroup(resourceGropuName,{"name":resourceGropuName,location:"France Central"});

// Create an Azure resource (Storage Account)
const account = new azure.storage.Account("storage", {
    // The location for the storage account will be derived automatically from the resource group.
    resourceGroupName: resourceGroup.name,
    name: "pulumistorageasaker",
    accountTier: "Standard",
    accountReplicationType: "LRS",
    tags: {
        "Environment": "Dev",
    },
});

// Create an Azure function that prints a message and the request headers.
async function handler(context: azure.appservice.Context<azure.appservice.HttpResponse>, request: azure.appservice.HttpRequest) {
    let bodyExtra = "";
    const headers = request.headers;
    for (const h of Object.keys(request.headers)) {
        bodyExtra = bodyExtra + `${h} = ${headers[h]}\n`;
    }
    console.log(request)
    const body  =  request.query['extra']?`Greetings from Azure Functions!\n\n===\n\n${bodyExtra}`:"Greetings from Azure Functions!";
    return {
        status: 200,
        headers: {
            "content-type": "text/plain",
        },
        body: body,
    };
}

const fn = new azure.appservice.HttpEventSubscription("greetings", {
    resourceGroup,
    callback: handler,
    tags:{
        "Environment": "Dev",
    }
});

export const endpoint = fn.url;

// Export the connection string for the storage account
export const connectionString = account.primaryConnectionString;
