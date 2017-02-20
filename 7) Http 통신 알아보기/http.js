//Http 통신
/*
HTTP : Hyper Text Transfer Protocol // 하이퍼 텍스트 = 하이퍼 링크로 논리적으로 연결된 문서
ex ) HTML

통신의 종류
요청 ( Request )
응답 ( Response )
요청과 응답의 과정
웹 브라우저 -> URL or URI 입력 -> 서버에 요청 -> 웹 서버는 응답 정보에 따른 응답
-> 응답에 따른 브라우저 정보를 화면상에 보여줌

URL은
../Nodejs 모듈 알아보기 3/URL.js << 참고할것


브라우저 마다 개발자 도구가 존재함
개발자 도구는 브라우저 요청에 따른 정보와
응답한 Data를 볼 수 있음

http 요청 메세지 ( HTTP Request )
구조
{
요청 Line
요청 Header
요청 Body
}
예제
Line : GET / HTTP/1.1

Host : 127.0.0.1:8080 //포트번호는 항상 URL에 포트번호를 안준다면 항상 HTTP 기준 80번
Connection : keep-alive
Cache-Control: max-age=0
Accept:text/html,application/xhtml+xml,application/xml;q=0.9.image/webp.*\*;q=0.8
Upgrade-Insecure-Requests:1
User-Agent:Mozilla/5.0
Accecpt-Encoding: gzip, deflate, sdch
Accept-Language:ko-KR,ko;q=0.8,en_US;q=0.6,en;q=0.4

CRLF

MESSAGE BODY
-----------------------------------------
요청 라인
[요청 메소드 , 요청 URL , {HTTP버전 : GET http://en.wikipedia.org/wiki/The_Scream HTTP/1.1 }]
HTTP method 종류
GET : 리소스를 얻어오는 요청
POST : 리소스 전송 요청
PUT : 저장 요청 ( 수정 )
DELETE : 삭제
등등

요청 헤더
헤더 {key : value} 값 방식으로 작성한다.
주요 요청 Header
Accept : 클라이언트가 받을 수 있는 컨텐츠
Cookie : 쿠키
Content-Type : Message Body 의 종류
Content-Length : Message Body의 길이
if-Modified-Since : 특정 날짜 이후에 변경됐을 때만

URL을 이용해서 요청 정보 전달
메소드 종류 : GET , TRACE Method

특징
Message Body를 이용하지않는다.


경로와 쿼리 스트링 사용
http://idols.com/snsd/taeyon.png == path(경로) 를 사용
혹은
http://idols.com/snsd/q?group=snsd&name=jessica == QueryString 사용해서 요청정보 전달

요청 정보 전달
URLEncodeded
Message Header ( Comtent-Type )
application/x-www-form-urlencodeded

메세지 바디 : QueryString

메세지 예 {
Content-Type : application/x-www-form-urlencodeded
title=Madmax&Directio=George+Miller
}

다른 방식
JSON/XML
//JSON 예제보기
메세지 헤더( Content-Type )
  - application/json
메세지 예
Content-Type:application/json
{
  "name" : "iu", "best" : "좋은날"
}

Mulltipart/form-data를 이용한 요청 정보 전달
Binary 파일을 올리는 경우에 주로 사용
하나의 Message Body에 파트를 나눠서 작성

Message Header ( Content-Type )
multpart/form-data;boundary=frontier

예제 보기
--frontier
Content-Type : text/plain

This is the body of the message.
--frontier
Content-Type: application/octet-stream
Content-Transfer-Encoding : base64

BinaryData==
--frontier--



차이점 보기
메세지 Body를 사용 여부 (get or Trace 방식을 사용 할 것이냐) or (그외에 post,put,delete를 사용 할 것이냐)
Body의 Encoding 방식

URL로 요청정보 전달 (get , Trace method 사용시)
- Message Body 영역을 분석할 필요가 없음.
--------------------------------------------------------
*/





/*
HTTP 응답메세지 ( HTTP Response ) 알아보기
요청과 같이
-응답 Line
-응답 Header
-응답 Body로 구성된다.


예제
Line : {
HTTP/1.1
statusCode : (data : 1xx , Success : 2xx, redirection : 3xx, Error : 4xx, 5xx 등등)
command : (OK , Error)
}
//상태코드 2xx : 200 = 요청 성공 Ok , 201 = Created. 생성 요청 성공 ,
          202 : Accepted : 요청 수락.
          203 : Non-authoritavive Information
          204 : Non-Content***
          3xx
          300 : Multiple choices. 여러 리소스에 대한 요청 결과 목록
          301, 302, 303 : Redirect. 리소스 위치가 변경된 상태
          304 : Not motified. 리소스가 수정되지 않았음***
          4xx
          400 : Bad Request. 요청 오류
          401 : Unauthorized. 권한 없는 상태
          403 : Forbidden. 요청 거부 상태
          404 : Not Found. 리소스가 없는 상태
          500 : Internal Server Error. 서버가 요청 처리를 못하는 상태
          501 : Not Implemented. 서버가 지원하지 않는 요청
          503 : Service Unavailable. 과부하 등으로 당장 서비스가 불가능한 상태
Header{
Date : Mon, 23 may 2005 22:38:34 GMT
Server : Apache/1.3.3.7 (Unix) (Red-Hat/Linux)
Last-Modified: Wed, 08 Jan 2003 23:11:55 GMT
ETag : "3f80f-1b6-3e1cb03b"
Content-Type: text/html; charset=UTF-8
Content-Length : 138
}
CRLF {}
MESSAGE Body{
<html Data>
}
응답메세지 Header 주요 field
Content-Type : 바디 데이터의 타입
Content-Length : 바디 데이터 크기
Set-Cookie : 쿠키 설정
ETag : 엔티티 태그

바디 데이터 종류
text / plain or html
application / json or xml or OctetStream 등

컨텐츠 타입
메세지 헤더에 기록
field Name : Content-Type
대분류 / 소분류
주요 컨텐츠 타입
text/plain , text/html
application/xml , application/json
image/png, image/jpg
audio/mp3, video/mp4

응답 메세지와 Content-Type이 안맞으면 데이터의 제대로된 표현이 불가능

http 모듈알아보기
var http = require("http");
http.Server : HTTP 서버
http.IncomingMessage : HTTP 서버의 요청 메세지, Readable Stream
http.ServerPesponse : HTTP 서버의 응답 클래스
HTTP 클라이언트
http.Client: HTTP 클라이언트
http.ClientRequest : HTTP 클라이언트의 요청 메세지
http.IncomingMessage : HTTP 서버의 응답메세지. ,Readable Stream


http 모듈의 주요 이벤트
http.on("request",fn);
http.on("connection",fn);
http.on("close",fn);

http 모듈의 주요 메소드
server.listen();
server.close();
server.setTimeout();

서버 객체 생성
클라이언트 접속 대기(listening)

var server = http.createServer();
server.listen(포트번호Number);

포트 알아보기
- 0 ~ 1023 : well-known port. 미리 정의된 포트 , 관리자 권한 필요
- 1024 ~ 49151 : registered port
- 49152 ~ 65535 : dynamic port
포트 바인딩 실패
- 이미 사용중
- 권한 없음
*/
//간단한 예제 코드 보기
/*
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
*/

//좀 더 간단하게 작성
/*
var http = require("http");

var server = http.createServer(function(req , res){
    res.end("hello World");
}).listen(8000);
*/

/*
http 객체의 클라이언트 요청
http.request(options[,callback]);
http.get(options[,callback]);

request 는 request 요청 message body 에 데이터를 담아 보낼 수 있으며,
get 은 request 요청에 message body 없이 요청을 보낼 수 있음.
*/
