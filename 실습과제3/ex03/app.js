var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');

var app = express();
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use(require('./movieRouter'));
app.use(handleError);

app.listen(3000);

function handleError(err, req, res, next) {
   res.status(err.code).send({msg:err.message});
}