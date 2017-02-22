var express = require("express");
var bodyParser = require("body-Parser");


var Route = require("./Route/route");

var DB = require("./DB/connect")("nodeDB");



var app = express();

app.set("DB", DB);


app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());

app.use(Route);

app.listen(8000);
