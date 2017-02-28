## Express


- Express ?
  - Nodejs 기반의 web aplication Framework

- 특징
  - __자유롭게 활용할 수 있는 수많은 HTTP 유틸리티 메소드 및 미들웨어를 통해 쉽고 빠르게 강력한 API를 작성할 수 있다.__
  - __Nodejs에서 Routing이나 ErrorHandler 요청에 대한 message body 분석 등 Nodejs를 쉽고 간결하게 사용 할 수 있게 해줌.__



- 설치
```javascript
$ npm install express --save
```

- 모듈 로딩
```javascript
var express = require("express");
var app = express();
app.listen(3000);
```


- __미들웨어 ?__
  - 요청 분석 ,처리하는 작은 모듈들
  - 여러개의 구성을 할 수 있다.

```javascript
app.use(fn);
app.use(fn,fn,fn) //미들웨어를 스택형태로 쌓을 수 있다.
```
- express의 미들웨어


- 애플리케이션 수준의 미들웨어
```javascript
var app = express(); //수준
```

- 라우터 수준의 미들웨어
```javascript
var Route = express.ROUTER() // 수준
```
- 그 외
  - 에러 처리 미들웨어
  - 빌트인 미들웨어
  - 써드파티 미들웨어


미들웨어 동작 순서 중요
- 미들웨어 동작 순서
 1. __파비콘 처리 미들웨어__
 2. __로깅__
 3. __정적파일__
```javascript
express.static() //정적파일 세팅메소드
```
 4. __서비스 미들웨어__
    - 내장 미들웨어 : 별도 설치없음

 5. __써드 파티 미들웨어__ : 설치해야 사용가능
 ```javascript
 //쿠키 분석 용 미들웨어 설치가 필요함.
var cookieParser = require("cookie-parser");
```

- __정적파일 요청 ?__
  - 위치가 고정되있는 파일 요청 js , html ,css, image

```javascript
//미들웨어 생성
express.static("path",[options]);
```
- express.static 메소드 옵션

| Option 이름 | Option 기능 |
| :------------ | :-----------: |
| etag   | etag 사용 여부, default : true |
| lastModified   | Last-Modified 헤더 사용. default : true  |
| maxAge   |   max-age 메세지 헤더. default : 0 |
| index   |   경로 요청시 기본 제공 파일. default : index.html |


- 예제보기
```javascript
 //정적 파일 서비스 ( 경로 정보 파라메터 필수 )
 app.use(express.static("images"));
 //-server-address = /cute1.jpg -> ./images/cute1.jpg
 //-server-address = /images/cute1.jpg -> ./images/image/cute1.jpg


 //가상경로 설정
 app.use("/static",express.static("files"));
//-server-address = /static/image.png -> ./files/image.png
```


- __라우팅__
  - 요청 -> 요청 처리 미들웨어로 분배
  - HTTP 메소드 별로 라우팅가능
  - URL 경로 별로 라우팅가능


- __Express 응답 메소드__

| method 이름 | method 기능 |
| :------------ | :-----------: |
| res.json()   | Json 응답 메세지 전송 |
| res.redirect()   | 리다이렉션 응답 전송  |
| res.render()   | 템플릿으로 렌더링  |
| res.send() | JSON, HTML, Buffer 전송 메세지 헤더에 Content-Type 자동 설정 |
| res.sendStatus() | 상태 코드와 상태 메세지 전송 |
| res.status() | 상태코드.( 설정 응답 메소드 종료안함 ) |
| res.download() | 파일 다운로드 |

---




# 서드파티 미들웨어

- __써드파티 미들웨어 사용해보기__

### 1.파비콘 담당 미들웨어
- serve-favicon module
- [gitURL](https://github.com/expressjs/serve-favicon)
- 설치
```
$ npm install serve-favicon
```
- 모듈로딩
```javascript
var express = require("express");
var favicon = require("serve-favicon");

var app = express();
app.use(favicon(__dirname+"/public/favicon.ico"));
```

- 로그 남기기
  - 개발용 , 버그분석
  - 사용자 행위 기록
  - 운영 기록
  - 로그 기록 매체
  - 콘솔에 출력
  - 파일, 데이터베이스에 기록 이메일 , SMS 등

Console을 이용한 로그 남기기
```javascript
console.lnfo("info message");
console.log('asd');
console.warn("asd");
console.error("error");
```

### 로그 미들웨어
- __morgan__
- __winston__


- 간단한 설정
- 요청과 응답을 자동으로 로그 남기기
- [git morgan](https://github.com/expressjs/morgan)

- 설치
```
$ npm install morgan
```

morgan 설정
```javascript
morgan(format , options);
```
- 로그 포맷
  - combined
  - common : addr , user , method, url status ,res
  - dev : method , url, status , response-time, res
  - short, tiny

- 사용예제
```javascript
var morgan = require('morgan');
app.use(morgan("dev")); //developer level 의 log 로그 포맷 정의
```

- 별도 설치
  - Transports
  - DailyRotateFile
  - CouchDB , Redis , MongoDB
  - Mail Transports
  - Nootification Service (Amazon SNS)


- 요청 log 남기는 예제
```javascript
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
```



### body-parser 알아보기

- __body-parser ?__
  - __모듈이름이 잘설명해준다.__
  - __request (클라이언트 요청) method가 post 일떄 message body에 같이넘어오는 data들을 parsing 해준다.__


- 설치
```javascript
$ npm install body-parser
```

- 모듈로딩 (code)
```javascript
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
```

### bodyparser 더 자세히 알아보기 !

- __body-parser message incoding type__
  - json
  - RAW
  - TEXT
  - urlencoded

- __참고사항__
  - __Content-Type : multipart/form-data__ = 멀티파트 지원 안됨
  - 바디파서는 멀티파트 메세지 파싱 불가능
  - 멀티파트는 fomidable, multer 등 다른 써드파티 미들웨어 사용

- json 요청 처리시
```javascript
bodyParser.json(options);
```

- json options

| option 이름 | option 기능 |
| :------------ | :-----------: |
| inflate  | 압축된 메세지 바디 다루기. default : true |
| limit   | 바디 메세지 크기. default : 100kb  |
| strict   | JSON의 루트 항목이 배열이나 객체만 접수. default : true  |



- json 사용 예
```javascript
app.use(bodyParser.json(options));
```

- urlencoded 요청 처리시
```javascript
bodyParser.urlencoded(options);
```

- urlencoded Options

| option 이름 | option 기능 |
| :------------ | :-----------: |
| extended  | true 면 기본 모듈 queryString으로 파싱 false면 body-Parser 내장기능으로 parsing default : true 보통은 false로 / 사용함 |
| parameterLimit   |  메세지 바디 내 파라미터 개수 제한. default : 1000  |
| inflate   | 압축된 메세지 바디 다루기. default : true  |
| limit   | 바디 메세지 크기. default : 100kb  |

- 사용 예
```javascript
app.use(bodyParser.urlencoded({extended:false}));
```


### body-parser parsing 결과 ?

- __바디 파싱 결과 사용하기__
- __JSON, URLencoded 모두 적용__
- __req.body를 사용하는 미들웨어보다 먼저 동작하도록 설정__
```javascript
app.post("/", function(req, res){
    console.log(req.body) // body-parser parsing parameters
});
//파싱 결과 : req.body
```
---

## 메소드 오버라이드
- __method-override ?__
  - HTML5 form tag 내에서 사용가능한 메소드는 get/post뿐임
  하지만 메소드 오버라이드를 사용하면 get post 뿐만아니라 delete ,put
  등을 사용할 수 있음

```
$ npm install method-override
```


- 사용 방법


```javascript
<form action ="/login?_method=(put,delete)">...</formm>
```

---
## Express Error Handler


- __Express 에서의 Error 처리방법 알아보기__


- __Express 에러 처리 방법__
    - 미들웨어 내부에서 처리
      - 각각 미들웨어에서 에러 처리
      - 위와 같이 이렇게 처리하면 ?
        - 에러 처리 로직이 제각각
        - 에러 처리 코드 중복

    - 에러처리 미들웨어에게 위임
    - 이렇게 처리하면 ?
       - 일관된 에러 처리 가능
    - 에러를 담당하는 미들웨어 함수의 첫번째 인자는 대게 Error 객체임


- __code 살펴보기__

```javascript
app.use(function (req, res ,next) {
  var error = new Error("에러 메세지");

  error.code = 100;
  next(error);
});



app.use(function(err, req  , res, next){
  res.status(500).send("에러 발생");
});
// 주의점 : 에러 처리 미들웨어는 제일 후순위로 해준다.
```



- 에러 정보 출력 방법
  - __개발자 입장 ?__
    - 개발 중 에러처리 = 에러 정보를 출력함
  - __클라이언트 입장 ?__
    - 서비스중 에러 처리 = 사용자 친화적 메세지 : "잠시 후 다시 시도해주세요." 등

- __위와 같은 환경 설정하기__


- window 서비스 환경
```
set NODE_ENV = product
node myapp.js
```
- LINUX - 개발환경
```
NODE_ENV=product node myapp.js
NODE_ENV=development node myapp.js
```

- 환경 설정 읽기
```javascript
app.get("env");
```

- 읽어서 개발 버전 / 서비스 버전 따로 처리하기
```javascript
if (app.get("env") === "development"){
    app.use(function(err, req, res ,next){
      res.end(err.stack);
  });
} else {
  app.use(function(err){
    res.status(err.code || 500);
    res.end("잠시 후 다시 시도해주세요.");
  });
}
```

---

### 포스팅 마치며..

  - __nodejs 기반 웹 애플리케이션인 Express 프레임워크에 대해서 배워보았다. 미들웨어설정 서드파티 미들웨어를 통한
  서버 처리의 개발자에 대한 부담을 확낮추었다는게 눈에 뛴다. 보통 Nodejs만 사용한다고 치면 라우팅이나 요청에 따른 메세지 바디에 파라메터들을 파싱해야하는부담과 라우팅로직도 설정해야하는 부담이 있지만 express덕분에 그런 부담들을 덜 수 있고 조금 더 효율적이고 구조적인 프로그래밍 방법으로 효율적인 웹앱을 만들수있게된게 특징이었다.__



  - __위 포스팅은 T아카데미 Nodejs 서버개발 강의를 바탕으로 작성된 내용입니다.__
