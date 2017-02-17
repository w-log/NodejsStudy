// Express를 이용해서 RESTful 서비스 작성
// 1. 영화 목록과 영화 상세보기 : JSON
// 2. 영화 리뷰 기능 추가 : JSON
// 3. 라우터 분리
// 4. 템플릿 적용
var express = require("express");
var app = express();
var bodyParser = require("body-Parser");
var index = require("./router");


app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());


app.set("views" , __dirname+"/views");
app.set("view engine" , "ejs");


app.use(index);


app.listen(8000);
