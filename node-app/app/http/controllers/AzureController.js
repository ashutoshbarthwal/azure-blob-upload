const AzureService = require('@app/services/AzureService');
const azureService = new AzureService;


module.exports = {

   /**
   * generate shared access token for azure storage
   *
   * @return {storageUri,storageAccessToken}
   */

   generateSASToken: (req, res, next) => {
        const accessTokenWithUri = azureService.generateSasToken();
        return res.json(accessTokenWithUri);
   }
}