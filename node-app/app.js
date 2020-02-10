var express = require("express");
var cors = require('cors')
var bodyParser = require("body-parser");
var app = express();
require('module-alias/register');

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var routes = require("./routes/routes.js")(app);

var server = app.listen(3001, function () {
    console.log("Listening on port %s...", server.address().port);
});