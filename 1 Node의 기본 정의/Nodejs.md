# Nodejs 알아보기 !

### Node.js ?
```
node.js란
비동기 방식의 js 기반의 네트워크 애플리케이션 플랫폼 제작에 적합한 서버사이드 프레임워크


Node.js의 프로그래밍 모델
비동기 방식의 (Callback : 함수를 인자로 넘겨 결과 결과 값을 인자로 넘긴함수로 전달하는 방식)
callback 패턴으로 코드를 작성

Nodejs 환경
Node Packge Manager (npm) 이라는 모듈의 생태계가 존재함. (나중 시간에 정리 할 예정임)
API 문서의 존재
잘읽어야함 (영어를 잘하면좋음!)
```
### 특징 ?
  - 자바스크립트로 만드는 서버환경
  - Google javascript V8 엔진위에서 작동
  - Event-driven  기반의 non-blocking
  - Nodejs는 내부적으로 Event-loop내에 여러개의 스레드를 생성해서 이벤트처리를 담당하는 보조 스레드와 메인로직을 수행하는 스레드가 존재하고 메인로직을 사용하는 스레드는 콜백패턴으로 인해서 클라이언트의 요청이 들어오면 이벤트가 발생되고 서버내부 이벤트루프에 명령수행을 전달하고 이벤트 루프가 처리하는동안 메인로직은 그다음 로직을 수행합니다.


[Nodejs Api 문서](https://nodejs.org/dist/latest-v6.x/docs/api/)

- 간단한 hello world 출력


```javascript
var http = require("http");
http.createServer(function(req, res){
    console.log("hello world")
    res.writeHead(200, {"Content-Type" : "text/html"});
    res.end("<h1>hello World</h1>");
}).listen(3000);
```
### 포스팅 마치며..


  - __Nodejs 기초 작동원리를 잘알아두자
  내용이 좀 부족하지만 추후에 좀 더 보강하겠습니다.__


  - __위 포스팅은 T아카데미 Nodejs 서버개발 강의를 바탕으로 작성된 내용입니다.__
