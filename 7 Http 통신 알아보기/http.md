## HTTP 통신 알아보기

- HTTP ?
  - __Hyper Text Transfer Protocol__
  - __Hyper Text : 하이퍼 링크로 논리적으로 연결된 문서__
  - ex ) HTML

- __통신의 종류__
  - 요청 ( __Request__ )
  - 응답 ( __Response__ )


- __요청과 응답의 과정__
  1. 웹 브라우저
  2. URL or URI 입력
  3. 서버에 요청
  4. 웹 서버는 응답 정보에 따른 응답
  5. 응답에 따른 data를 기반으로  브라우저가 정보를 화면상에 보여줌


- __브라우저 마다 개발자 도구가 존재함 개발자 도구는 브라우저 요청에 따른 정보와 응답한 Data를 볼 수 있음__

#### HTTP Request

- http 요청 메세지 ( HTTP Request )

  | 구조 |
  | :------------: |
  | 요청 Line  |
  | 요청 Header   |  
  | 요청 Body |


- 예제( 요청 형태 )

| HTTP Request | value |
| :------------: | :------------ |
| Line  | GET / HTTP/1.1 |
| Host   | 127.0.0.1:8080 |
| Connection | keep-alive |
| Cache-Control | max-age=0 |
| Accept | text/html,application/xhtml+xml,application/xml;q=0.9.image/webp.*\*;q=0.8 |
| Upgrade-Insecure-Requests | 1 |
| User-Agent | Mozilla/5.0 |
| Accecpt-Encoding | gzip, deflate, sdch |
| Accept-Language | ko-KR,ko;q=0.8,en_US;q=0.6,en;q=0.4 |
| CR | LF |
| Message | body |




- 요청 라인

| Line | 요청 메소드 , 요청 URL  |
| :------------: | :------------ |
| 예 | GET http://en.wikipedia.org/wiki/The_Scream HTTP/1.1  |

- __HTTP method__

| method | 기능  |
| :------------: | :------------ |
| GET | 리소스를 얻어오는 요청  |
| POST | 리소스 전송 요청|
| PUT | 저장 요청 ( 수정 )|
|DELETE | 삭제|

- __이외에 여러가지 HTTP 메소드가 존재한다.__


- 요청 헤더
  - 헤더 {key : value} 값 방식으로 작성한다.
  - 주요 요청 Header

| method | 기능  |
| :------------: | :------------ |
| Accept | 클라이언트가 받을 수 있는 컨텐츠  |
| Cookie | 쿠키 |
| Content-Type | Message Body 의 종류 |
| Content-Length | Message Body의 길이 |
| if-Modified-Since | 특정 날짜 이후에 변경됐을 때만 |


- URL을 이용해서 요청 정보 전달
  - 메소드 종류 : GET , TRACE Method
  - 특징
    - Message Body를 이용하지않는다.
    - 경로와 쿼리 스트링 사용 http://idols.com/snsd/taeyon.png == path(경로) 를 사용
    - 또는 http://idols.com/snsd/q?group=snsd&name=jessica == QueryString 사용해서 요청정보 전달

- 요청 정보 전달
  - URLencodeded
  - Message Header ( Comtent-Type : application/x-www-form-urlencodeded )
  - Message body : QueryString
- 메세지 예
```javascript
//header
Content-Type : application/x-www-form-urlencodeded
//body
title=Madmax&Directio=George+Miller
```

- 다른 방식
  - JSON
  - XML
  - Mulltipart/form-data


- JSON 예제  
```javascript
//header
Content-Type : application/json
//body
{
  "name" : "kim tae woong", "best" : "good~"
}
```


- Mulltipart/form-data를 이용한 요청 정보 전달
    - Binary 파일을 올리는 경우에 주로 사용
    - 하나의 Message Body에 파트를 나눠서 작성

Message Header ( Content-Type )
```javascript
Content-Type : multpart/form-data;boundary=frontier

//boundary 라는 구분자의 내용을 통해 파트별로 나눠지는모습을 볼 수 있다.
--frontier
Content-Type : text/plain

--frontier
Content-Type: application/octet-stream
Content-Transfer-Encoding : base64

BinaryData==
--frontier--
```



- 차이점 ?
  - 메세지 Body를 사용 여부 (get or Trace 방식을 사용 할 것이냐) or (그외에 post,put,delete를 사용 할 것이냐)
  - Body의 Encoding 방식



- URL로 요청정보 전달 (get , Trace method 사용시)
  - Message Body 영역을 분석할 필요가 없음.


-----------

#### HTTP Response

- HTTP 응답메세지 ( __HTTP Response__ ) 알아보기
  - 응답의 구성

| 구조 |
| :------------: |
| 응답 Line  |
| 응답 Header   |  
| 응답 Body |


- 예제 Line
```javascript
HTTP/1.1
statusCode : (data : 1xx , Success : 2xx, redirection : 3xx, Error : 4xx, 5xx 등등)
command : (OK , Error)
```

- 상태코드별 의미

| 상태코드 | 내용 |
| :------------: | :------------ |
| 200  | 요청 성공 Ok |
| 201  | Created. 생성 요청 성공 |
| 202 | Accepted 요청 수락. |   
| 203 | Non-authoritavive Information |
| 204 | Non-Content*** |
| 300 | Multiple choices. 여러 리소스에 대한 요청 결과 목록|
| 301, 302, 303 | Redirect. 리소스 위치가 변경된 상태 |
| 304 | Not motified. 리소스가 수정되지 않았음*** |
| 400 | Bad Request. 요청 오류 |
| 401 | Unauthorized. 권한 없는 상태 |
| 403 | Forbidden. 요청 거부 상태 |
| 404 | Not Found. 리소스가 없는 상태 |
| 500 | Internal Server Error. 서버가 요청 처리를 못하는 상태 |
| 501 | Not Implemented. 서버가 지원하지 않는 요청 |
| 503 | Service Unavailable. 과부하 등으로 당장 서비스가 불가능한 상태 |

```javascript

//Header
  Date : Mon, 23 may 2005 22:38:34 GMT
  Server : Apache/1.3.3.7 (Unix) (Red-Hat/Linux)
  Last-Modified: Wed, 08 Jan 2003 23:11:55 GMT
  ETag : "3f80f-1b6-3e1cb03b"
  Content-Type: text/html; charset=UTF-8
  Content-Length : 138
CRLF ---------------------------------
//Body
===html Data===
```
- 응답메세지 Header 주요 field

| field | value |
| :------------: | :------------: |
| Content-Type  | 바디 데이터의 타입 |
| Content-Length | 바디 데이터 크기 |  
| Set-Cookie | 쿠키 설정 |
| ETag | 엔티티 태그 |


- 바디 데이터 타입 종류


| Type |
| :------------: |
| text/html  |
| text/plain   |  
| application/json |
| application/xml |
| application/OctetStream |
| image/jpg |
| image/png |
| audio/mp3 |
| video/mp4 |
- 주요 타입들 이외에도 여러가지가 있다.
- 응답 메세지와 Content-Type이 안맞으면 데이터의 제대로된 표현이 불가능

---

#### HTTP Module 알아보기


- __http 모듈알아보기__

```javascript
var http = require("http");
http.Server : HTTP 서버
http.IncomingMessage : HTTP 서버의 요청 메세지, Readable Stream
http.ServerPesponse : HTTP 서버의 응답 클래스
//HTTP 클라이언트
http.Client: HTTP 클라이언트
http.ClientRequest : HTTP 클라이언트의 요청 메세지
http.IncomingMessage : HTTP 서버의 응답메세지. ,Readable Stream


//http 모듈의 주요 이벤트
http.on("request",fn);
http.on("connection",fn);
http.on("close",fn);

//http 모듈의 주요 메소드
server.listen();
server.close();
server.setTimeout();

// 서버 객체 생성
// 클라이언트 접속 대기(listening)

var server = http.createServer();
server.listen(포트번호Number);
```
포트 알아보기


| Port | Number |
| :------------: | :------------ |
| 0 ~ 1023  | well-known port. 미리 정의된 포트 , 관리자 권한 필요 |
| 1024 ~ 49151   | registered port |   
| 49152 ~ 65535 | dynamic port |

- 포트 바인딩 실패
  - 이미 사용중
  - 권한 없음

- 간단한 예제코드
```javascript
var http = require("http");

var server = http.createServer();
server.listen(8000);

server.on("request",function(req, res){
    console.log("request 이벤트 실행");
});
server.on("connection" , function(req ,res){
    console.log("connection Event");
});
server.on("close", function(req, res){
    console.log("close");
});
```

- 좀 더 간단하게 작성
```javascript
var http = require("http");

var server = http.createServer(function(req , res){
    res.end("hello World");
}).listen(8000);


//http 객체의 클라이언트 요청
http.request(options[,callback]);
http.get(options[,callback]);

// request 는 request 요청 message body 에 데이터를 담아 보낼 수 있으며,
// get 은 request 요청에 message body 없이 요청을 보낼 수 있음.
```


- __요청분석__
```javascript
var http = require("http");
var server = http.createServer().listen(8000);
server.on("request" ,function(req , res){

    console.log(req.method);
    console.log(req.url);
    console.log(req.headers);
    res.end("hello nodejs");
});

//request 요청 분석
var message = request.IncomingMessage;
message.url; // 요청 url
message.method; // 요청 method
message.headers; // 요청 메세지의 헤더
message(streamable); // 요청 메세지 바디

```
- __응답분석__
```javascript
//response 응답 분석
res.IncomingMessage
//상태코드와 메세지
res.statusCode
res.status.Message

//메세지 헤더
res.writeHead(statusCode[,statusMessage],[,headers]);
res.removeHeader(name)
res.getHeader(name);
res.setHeader(name,value);

//메세지 바디
res.end([data][,encoding][, callback]);
res.write(chunk[, encoding][, callback]);


//상태코드 && 메세지 예제
//200 OK
res.statusCode = 200;
res.statusMessage="OK";

//404 Error
res.statusCode = 404;
res.statusMessage="Not found";
```

- __간단한 응용예제__
```javascript
var http = require("http");
var server = http.createServer(function(req , res){
    res.statusCode = 200;
    res.statusMessage="OK";
    res.setHeader("content-type", "text/plain");

    res.end("<h1>hello world</h1>");
}).listen(8000);
```

---


#### 정적 파일 요청에 대한 응답

- 정적 파일 요청에 대한 응답해보기
    1. 정적인 컨텐츠 (image 파일 , html 파일 , 음악 등) 요청
    2. 미리 작성된 파일로 응답

- 요청 방법
  - http://myserver.com/myimg.png
  - http://myservice.com/music.mp3

정적 파일 요청 : 응답
- 정적 파일 찾기
- 파일을 로드한 후 응답
- fs module

```javascript
var fs = require("fs");
fs.readFile(FilePath , callback);
```
- 응답 메세지에 파일 내용 쓰기
  - image 타입과 html 타입등의 컨텐츠 타입이 서로 다름
주요 컨텐츠 타입

  | Content-Type |
  | :------------: |
  | text/html  |
  | text/plain   |  
  | application/json |
  | application/xml |
  | application/OctetStream |
  | image/jpg |
  | image/png |
  | audio/mp3 |
  | video/mp4 |


- 스트림 파이프
  - 입력 스트림 : fs.createReadStream()
  - 출력 스트림 : res
```javascript
var fs = require("fs");
fs.createReadStream(path).pipe(res);
```

#### 정작 파일 서비스
- __요청 URL의 경로를 실제 파일 경로 매핑__
myServier.com/resource/image.png -> ./resource/image.png
myServier.com/resource/audio.mp3 -> ./resource/audio.mp3
- __응답 과정에서 data를 전달하는게 아닌 요청에 따른 파일에 직접적인 접근이 가능해짐.__


---

#### 포스팅 마치며..

  - __내용이 여태껏중에 제일많았던것같다.. 내용에서 증명해주듯이 웹개발자가 http 프로토콜을 모른다는건 음.. 어떤의미로도 비유는 할 수 없다고 생각하며, 반드시 알아야할 필수 내용이라고 생각된다. 결과적으로 프론트엔드던 백엔드던간애 클라이언트와 서버간의 요청, 응답방식을 잘알고있어야 효율적인 웹개발이 가능해지는것같다.__




  - __위 포스팅은 T아카데미 Nodejs 서버개발 강의를 바탕으로 작성된 내용입니다.__
