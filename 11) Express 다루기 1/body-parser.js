var express = require("express");

var bodyParser = require("body-parser");

var app = express();
app.listen(3000);

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.post("/", function(req, res){
    var title = req.body.title;
    var name = req.body.name;

    res.send("보낸 메세지 :"+title+","+name);
});
/*
bodyparser 알아보기

바디 파서
body 메세지 인코딩 타입
json
RAW
TEXT
urlencoded

멀티파트 지원 안됨
바디파서는 멀티파트 메세지 파싱 불가능
formidable , multer 등 써드파티 미들웨어 사용

json 요청 처리시
bodyParser.json(options);
options-inflate : 압축된 메세지 바디 다루기. 기본 true
limit : 바디 메세지 크기. 기본 100kb
strict : JSON의 루트 항목이 배열이나 객체만 접수. 기본 true

사용 예
app.use(bodyParser.json());
bodyParser.urlencoded(options)

extended:true 면 기본 모듈 queryString으로 파싱
parameterLimit : 메세지 바디 내 파라미터 개수 제한. 기본1000
inflate, limit:JSON 바디 파서 옵션과 동일

사용 예

app.use(bodyParser.urlencoded({extended:false}));


바디 파서의 결과
바디 파싱 결과 사용하기
파싱 결과 : req.body
JSON, URLENcoded 모두 적용
req.body를 사용하는 미들웨어보다 먼저 동작하도록 설정

메소드 오버라이드
npm install mothod-override
form 내에서 사용하는 메소드는 get/post뿐임
하지만 메소드 오버라이드를 사용하면 get post 뿐만아니라 delete ,put
등을 사용할 수 있음

*/
