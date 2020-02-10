var AzureController = require('@app/http/controllers/AzureController.js');
const asyncHandler = require('express-async-handler');

var appRouter = function(app) {


    app.get("/generateSasToken", asyncHandler(AzureController.generateSASToken));


}


module.exports = appRouter;