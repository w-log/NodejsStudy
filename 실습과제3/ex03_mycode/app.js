var express = require("express");

var app = express();
var bodyParser = require("body-Parser");
var route = require("./Route/router");
var conn = require("./DB/conn")("pool", 60);
app.set("DB",conn);

app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());




app.use(route);
app.listen(8000);
