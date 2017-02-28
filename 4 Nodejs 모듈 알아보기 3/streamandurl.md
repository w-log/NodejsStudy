
# Stream 과 URL 알아보기


## Stream 알아보기


###  읽기 스트림

| mode | flowing , paused  |
| :------------: | :------------: |


- __flowing mode__
  - 데이터를 자동으로 읽는 모드
  - 전달되는 데이터를 다루지 않으면 데이터 유실

- __paused mode__
  - 데이터가 도착하면 대기
  - read() 함수로 데이터 읽기

- Event list

| Event | on("value")  |
| :------------: | :------------: |
| readable | 읽기 가능한상태 |
| data | 읽을 수 있는 데이터 도착 |
| end | 더 이상 읽을 데이터가 없는 상태 |
| close | 스트림이 닫힌 상태 |
| error | 에러 |


### 쓰기스트림

- Writable Stream (데이터 출력)


| Writable Stream (데이터 출력) ? 예 |
| :------------: |
| http 클라이언트의 요청 |
| http 서버의 응답 |
| 파일 쓰기 스트림 |
| tcp 소켓 |


- 메소드
  - 인코딩 설정 , 데이터 쓰기
```javascript
Writable.setDefaultEncoding(encoding); // 인코딩 설정
writable.write(chunk[,encoding][, callback]); // 데이터 쓰기
writable.end([chunk][,encoding][,callback]); // 데이터 end

// buffer
writable.cork();
writable.uncork();
```


| Event | on("value") |
| :------------: | :------------: |
| error | 출력 스트림에 남은 데이터를 모두 보낸 이벤트 |
| error | 에러 |
| finish | 모든데이터를 쓴 이벤트 |
| pipe | 읽기 스트림과 연결(pipe)된 이벤트 |
| unpipe | 연결(pipe) 해제 이벤트 |


- 표준 입출력 스트림
```javascript
process.stdin : 콘솔 입력
process.stdout : 콘솔 출력
```

- 간단한 예제보기
```javascript
var fs = require("fs");

var os = fs.createWriteStream("./output2.txt");

os.on("finish", function(){
      console.log("끝!");
});

var is = process.stdin;
is.pipe(os);
```

---

## URL 알아보기


- URL 다루기



| URL 구성요소 |
| :------------: |
| 프로토콜(protocol) |
| 포트번호(Port) |
| 경로(path) |
| 쿼리(Query) |
|  프래그먼트(Fragment) |

- URL 구조
```
   (protocol)                 (           path          )
      http: // www.naver.com/ search?q=iphone&format=json
    (스키마)  (    호스트   )        (       query       )
```

- Nodejs 내장 모듈인 URL Module 알아보기
```javascript
var url = require("url");

url.parse(urlstr[,parseQueryString][,slashesDenoteHost]);

urlStr : Url 문자열
parseQueryString  //쿼리 문자열 파싱 , (default : 기본값 false)
slashesDenotehost  // 로 시작하는 주소의 경우 호스트인식 여부, (default : false)
```

- 쿼리스트링
  - 이름=값&이름=값 형태로 정보 전달
  - 예) http://taewoong.com/q?name=김태웅&age=24&since=1994....

- url 모듈로 쿼리스트링 파싱
```javascript
//두번째 인자값을 true로 주면  query 프로퍼티를 통해 파싱된 쿼리스트링에 접근가능
var parsing = url.parse("url",true);
parsing.query // queryString
```

```javascript
var urlString = "http://naver.com/?name=김태웅&age=24";

url.parse(urlString,true).query.name // 김태웅
url.parse(urlString,true).query.age // 24
```


- URL 만들기
```javascript
url.format(urlObj);
```


- URL 변환
```javascript
url.resolve(from,to);
```

- URL format object 예제
```javascript
var urlObj = {
  protocol : 'http',
  host : "idols.com",
  pathname : "schedule/radio",
  search : "time=9pm&day=monday"
}

var urlstr = url.format(urlObj);
console.log(urlstr)// http://idols.com/schedule/radio?time=9pm&day=monday
```

- URL 인코딩
  - URL에 허용되는 문자 ?
    - 알파벳,숫자,하이픈,언더스코어, 점 , 틸드
    - 한글은 Encoding 필요
    - 써드파티 모듈
    - urlencode 가 존재함



- 예제보기
```javascript
var url = require("url");

var urlStr = "http://idols.com/hot/q?group=EXID&name=하니&since=";

var parsed = url.parse(urlStr);
console.log(parsed); //object {....}

console.log("protocol : ",parsed.protocol); // http
console.log("host : ",parsed.host); // idols.com:80
console.log("query : ",parsed.query); //?group=EXID&name=하니&since=

```


-  쿼리스트링 모듈



```javascript
var queryString = require("querystring");
//쿼리문자열 분석하기
//queryString.parse(str[,sep][,eq][,option]);
var que = "group=EXID&name=하니&since=";
parsed = queryString.parse(que);

console.log(parsed.group);// EXID
console.log(parsed.name); // 하니
console.log(parsed.since); // 빈값
console.log(parsed.last); // undefined


//쿼리스트링 모듈로 객체를 쿼리스트링으로 파싱하는 메소드
stringify(object[,option]);

//간단한 예제
var obj = {
  name : "IU",
  best : "좋은날"
};
var queryStr = queryString.stringify(obj);
console.log(queryStr); // ?name=IU&best=좋은날
```


---


### 포스팅 마치며..

  - __스트림이나 URL 같은경우는 Nodejs에서만 쓰는개념이라기 보다는 스트림은 데이터를 주고받는데에 있어서 쓰사용하는 하나의 방식이고, URL같은 경우는 웹에서 HTTP 프로토콜을 사용하는데에 있어 필수적으로 알아야 될개념이다. Nodejs는 생각보다 이런 기능들을 사용하기 쉽게 구현해놓았고, URL 과 queryString 모듈은 기본모듈이니 잘알아두자__




  - __위 포스팅은 T아카데미 Nodejs 서버개발 강의를 바탕으로 작성된 내용입니다.__
