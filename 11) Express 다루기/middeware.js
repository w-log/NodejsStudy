//써드파티 미들웨어 사용
/*
파비콘 담당 미들웨어
-serve-favicon

https://github.com/expressjs/serve-favicon

설치 npm install serve-favicon

예제 소스 :
var express = require("express");
var favicon = require("serve-favicon");

var app = express();
app.use(favicon(__dirname+"/public/favicon.ico"));

로그 남기기
개발용 , 버그분석
사용자 행위 기록
운영 기록

로그 기록 매체
콘솔에 출력
파일, 데이터베이스에 기록
이메일 , SMS 등

Console을 이용한 로그 남기기
console.lnfo("info message");
console.log('asd');
console.warn("asd");
console.error("error";)
로그 미들웨어
-morgan
-winston


간단한 설정
요청과 응답을 자동으로 로그 남기기
https://github.com/expressjs/morgan

npm install morgan

morgan 설정
-morgan(format , options);

로그 포맷
-combined
-common : addr , user , method, url status ,res
dev : method , url, status , response-time, res
short, tiny

사용 예
var morgan = require('morgan');
app.use(morgan("dev")); //developer level 의 log 로그 포맷 정의


별도 설치 Transports
DailyRotateFile
CouchDB , Redis , MongoDB
Mail Transports
Nootification Service (Amazon SNS)


날짜별로 로그파일 남기기 : DailyRotateFile

사이트 https://github.com/winstonjs/winston-daily-rotate-file

설치
npm install winston-daily-rotate-file
winston.add(require("winston-dailly-rotate-file"),options);



*/

var express = require("express");
var morgan =require("morgan");
var app = express();

app.use(morgan("dev"));

app.get("/hello", function(req ,res){
    res.send("GET request, /");
});

app.get("/movies", function(req, res){
    res.send("GET request, /movies");
});

app.listen(3000);


//body-parser 써보기
