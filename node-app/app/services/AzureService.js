var azure = require('azure-storage');
var azureConfig = require('@config/azure.js');
const {
    AccountSASPermissions,
    AccountSASResourceTypes,
    AccountSASServices,
    generateAccountSASQueryParameters,
    StorageSharedKeyCredential,
    SASProtocol
  } = require("@azure/storage-blob");

class AzureService {

    generateSasToken(){
      const account = azureConfig.account;
      const accountKey = azureConfig.accountKey;
      const sharedKeyCredential = new StorageSharedKeyCredential(account, accountKey);
      const accountUrl = `https://${account}.blob.core.windows.net/`;
      const now = new Date();
      now.setMinutes(now.getMinutes() - 5); // Skip clock skew with server
    
      const tmr = new Date();
      tmr.setDate(tmr.getDate() + 1);
      
      const sas = generateAccountSASQueryParameters(
          {
            expiresOn: tmr,
            ipRange: { start: "0.0.0.0", end: "255.255.255.255" },
            permissions: AccountSASPermissions.parse("rwdlacup"),
            protocol: SASProtocol.HttpsAndHttp,
            resourceTypes: AccountSASResourceTypes.parse("sco").toString(),
            services: AccountSASServices.parse("btqf").toString(),
            startsOn: now,
            version: "2016-05-31"
          },
          sharedKeyCredential
        ).toString();

      return {
          storageUri: accountUrl,
          storageAccessToken: sas
      };
        
    } 

    updateAzureProperties(){
        var connString = azureConfig.connString;
        var blobService = azure.createBlobService(connString);
        var serviceProperties = generateServiceProperties(); 
      
        blobService.setServiceProperties(serviceProperties, function(error, result, response) {  
          if (!error) {
              console.log("Volla!")
          }
        });  
    }

    generateServiceProperties() {
            return serviceProperties = {
              Logging: {
                Version: '1.0',
                Delete: true,
                Read: true,
                Write: true,
                RetentionPolicy: {
                  Enabled: true,
                  Days: 10,
                },
              },
              HourMetrics: {
                Version: '1.0',
                Enabled: true,
                IncludeAPIs: true,
                RetentionPolicy: {
                  Enabled: true,
                  Days: 10,
                },
              },
              MinuteMetrics: {
                Version: '1.0',
                Enabled: true,
                IncludeAPIs: true,
                RetentionPolicy: {
                  Enabled: true,
                  Days: 10,
                },
              },
              Cors: {
                CorsRule: [
                  {
                    AllowedOrigins: ['*'],
                    AllowedMethods: ['GET', 'PUT','POST','PATCH','OPTIONS'],
                    AllowedHeaders: ['*'],
                    ExposedHeaders: ['*'],
                    MaxAgeInSeconds: 500,
                  },
                ],
              },
            };
    }

}

module.exports = AzureService;