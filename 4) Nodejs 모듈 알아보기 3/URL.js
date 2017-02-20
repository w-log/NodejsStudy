//URL 다루기
/*
구성요소 {
 프로토콜(protocol)
 호스트(Host)
 포트번호(Post)
 경로(path)
 쿼리(Query)
 프래그먼트(Fragment)
   (protocol)                 (           path          )
 예 : http: // www.naver.com/ search?q=iphone&format=json
    (스키마)  (    호스트   )        (    query         )
}

var url = require("url");

url.parse(urlstr[,parseQueryString][,slashesDenoteHost]);

urlStr : Url 문자열
parseQueryString : 쿼리 문자열 파싱 , 기본값 false
slashesDenotehost : // 로 시작하는 주소의 경우 호스트인식 여부,
(default : false)

쿼리스트링
이름=값&이름=값 형태로 정보 전달
http://idols.com/q?group=EXID&name=하니&since=....

url 모듈로 쿼리스트링 파싱
url.parse("url",true);
//두번째 인자값을 true로 주면  query 프로퍼티를 통해 파싱된 쿼리스트링에 접근가능

예 : ?name=김태웅&age=24

url.parse("url",true).query.name // 김태웅
url.parse("url",true).query.age // 24

//URL 만들기
url.format(urlObj);

//URL 변환
url.resolve(from,to);


URL format object
//예제
var urlObj = {
protocol : 'http',
host : "idols.com",
pathname : "schedule/radio",
search : "time=9pm&day=monday"
}

var urlstr = url.format(urlObj);
// http://idols.com/schedule/radio?time=9pm&day=monday


URL 인코딩
URL에 허용되는 문자
 * 알파벳,숫자,하이픈,언더스코어, 점 , 틸드
 한글은 Encoding 필요
 써드파티 모듈
 urlencode 가 존재함
*/

//사용해보기

var url = require("url");

var urlStr = "http://idols.com/hot/q?group=EXID&name=하니&since=";

var parsed = url.parse(urlStr);
console.log(parsed);

console.log("protocol : ",parsed.protocol);
console.log("host : ",parsed.host);
console.log("query : ",parsed.query);

// 쿼리스트링 알아보기
var queryString = require("querystring");
//쿼리문자열 분석하기
//queryString.parse(str[,sep][,eq][,option]);
var que = "group=EXID&name=하니&since=";
parsed = queryString.parse(que);
console.log(parsed.group);
console.log(parsed.name);
console.log(parsed.since);
console.log(parsed.last);


//쿼리스트링 모듈로 객체를 쿼리스트링으로 파싱하는 메소드
/*
stringify(object[,option]);
*/
var obj = {
  name : "IU",
  best : "좋은날",
};
var queryStr = queryString.stringify(obj);
console.log(queryStr);
