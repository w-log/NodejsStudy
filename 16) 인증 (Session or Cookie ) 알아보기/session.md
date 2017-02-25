## 보안과 인증

  - __인증__
    1. 등록된 사용자 식별
    2. 사용자 별 권한

  - __보안__
    1. 정보 노출 방지 : 암호화 통신 방법__(HTTPS)__
    2. 정보 해독 방지 : 데이터 암호화 저장

---

## Session 알아보기

  - __특징 ?__
    1. 서버에 정보 저장
    2. 클라이언트에는 세션 식별 정보(세션ID)
    3. 세션ID는 Cookie 사용

  > session 모듈 : express-session
  ```
  $ npm install express-session
  ```
![session 작동원리](http://i.imgur.com/KZA7rDn.png)


> __위와 같이 클라이언트는 Cookie를 통해서session ID를 가지고 서버에 요청을 보내면 서버는 맞는 session 정보와 매핑 시켜주는 구조를 가지고있습니다.__

---

### 세션 읽고 쓰기
  - __모듈 로딩 과정__
  ```javascript
  var express = require("express");
  var session = require("express-session");

  var app = express();
  app.use(session(option))
  //option Object
  /*
  option list :
  name : 세션 ID의 key name (cookie). default connect.sid
  resave : 변경이 없어도 저장
  secret : session ID 서명
  saveUninitialized : 세션 초기화 전에도 저장
  store : 세션 저장소
  cookie : 쿠키 파서 옵션. 쿠키 파서 없이 사용가능
  */
  ```

  - __세션 접근__
  ```javascript
  request.session
  ```

  - __세션 ID__
  ```javascript
  var sessionID = request.sessionID;
  ```

  - __세션 쓰기__
  ```javascript
  request.session.visit = "123";
  ```

  - __세션 읽기__
  ```javascript
  var visit = request.session.visit;
  ```
  - __request header__
![session 클라이언트 요청header](http://i.imgur.com/txcyVgT.png)

> 위와 같이 session 설정시 cookie를 통해 session ID가 request 요청에 header에 저장된 걸 볼 수 있다.

### __세션 저장__

  - __session - 서버에 기록__
    1. 서버 재시작 ▶ 세션 기록 삭제
    2. 서버 메모리
    3. 서버 클러스터링

  - __세션을 데이터베이스에 저장 && Session Store 모듈__
    - connect-mongo
    - connect-redis


  - __MongoDB에 저장 : connect-mongo__
    > $ npm install connect-mongo

  - __connect-mongo 설정코드__
  ```javascript
  var sessionStoreOptions = {
      url : "mongodb://localhost:27017/session"
  }
  app.use(session({
      store : new MongoStore(sessionStoreOptions)
  }));
  ```

  ---
  ### 포스팅을 마치며
  - __세션과 쿠키는 이미 JSP Servlet을 통해 한번 배운내용이지만 세부적으로 헤더에 어떻게 전송이되는지 또 session을 클라이언트와 검증할때 어떤방식으로 쿠키가 상용되는지 또는 검증되는과정들을 배울 수 있어서 좋은내용이었던것같습니다. 또한 Express 프레임워크에서는 이를 어떤방식으로 다루는 문법을 통한 로그인, 로그아웃이라던지 여러 인증기능을 가볍게 구현할정도의 수준까지 온것같습니다. 어서 강의를 마치고 개인프로젝트를 시작하고싶네요.__





  - __위 글은 T아카데미 Nodejs 서버개발 강의를 바탕으로 작성된 포스팅입니다.__
