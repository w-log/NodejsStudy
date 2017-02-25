## 보안과 인증

  - __인증__
    1. 등록된 사용자 식별
    2. 사용자 별 권한

  - __보안__
    1. 정보 노출 방지 : 암호화 통신 방법__(HTTPS)__
    2. 정보 해독 방지 : 데이터 암호화 저장

---
# Cookie
  - __클라이언트의 활동 추적하기__
    - 로그인 하지 않은 사용자가 쇼핑몰을 사용한다.
    - 쇼핑몰에서 상품을 장바구니에 넣으면?
    - 다음에 쇼핑몰에 방문했을 때, 장바구니는?
    - 장바구니 내용을 브라우저에 기록.

---
### Cookie 다루기
  - __서버가 웹브라우저에 기록__
    1. 상품을 장바구니에 담기
    2. 쿠키에 장바구니 내용 저장


  - __웹브라우저는 쿠키 내용 전송__
    1. 서버는 요청에서 쿠키 읽기
    2. 기존에 기록한 내용 확인

---


### HTTP Message 와 Cookie
- __Client__(request)
  - 클라이언트 ▶ 서버
  - 클라이언트의 쿠키를 서버로 전송
  - 요청메세지 Header : Cookie


- __예제__
  ```
  GET /spec.html HTTP/1.1
  Host : www.example.org
  Cookie : name=value;
  ```

- __Server__(response)
    - 서버 ▶ 클라이언트
    - 응답 메세지에 쿠키 기록을 위한 메세지 작성
    - 메세지 Header : Set-Cookie 필드


- __예제__
    ```
      HTTP/1.0 200 OK
      Content-Type : text/html
      Set-Cookie : name=value;
    ```
- __쿠키 쓰기__
  ```javascript
   response.setHeader("Set-Cookie","name=value");
  ```

- __쿠키 읽기__
  - 쿠키 값 파싱 코드가 필요
  ```javascript
  request.headers.cookie // 'name=value'
  ```

---
## Express 에서 Cookie 다루기
  - 쿠키 쓰기 : __Express 기본__
  - 쿠키 읽기 : __Cookie-parser Module__
  - __npm & Github__
    - https://github.com/expressjs/cookie-parser
    - npm install cookie-parser
  - 쿠키 읽기
    ```javascript
    request.cookies
    // request 객체의 요청 header안에 Cookie
    ```

  ### 쿠키 다루기
  - __쿠키 쓰기/ 삭제 : Express 기본__
    ```javascript
    //쓰기 name , value [,option]
    response.cookie(name, value[,options]);
    //삭제 name [,options]
    response.clearCookie(name[, options]);
    /*
    options list
    domain : 쿠키가 적용되는 서버
    path : 쿠키가 적용되는 경로
    expire : 쿠키 유효 날짜와 시간
    maxAge : 쿠키 유효기간(ms)
    httpOnly : HTTP 프로토콜에서만 사용
    secure : HTTPS 에서만 사용 여부. type : Boolean
    signed : 서명 여부. type : Boolean
    */
    ```
  - __Cookie parser 사용 예제__
    ```javascript
    var express = require("express")
    var cookieParser = require("cookie-parser");
    //모듈로딩
    var app = express();
    app.use(cookieParser());
    //미들웨어 함수 등록![cookieheader](/assets/cookieheader.png)
    ```
 - __Cookie 기록하기(Write)__
    ```javascript
    //쓰기
    response.cookie("last", "2015.8.5");
    response.cookie("viset" , "2");
    ```

 - __Cookie 읽기(Read)__
     ```javascript
     //읽기
    var last = request.cookies.last;
    console.log(last) // 2015.8.5
    var visit = request.cookies.visit;
    console.log(visit) // 2
     ```
![cookieheader](http://i.imgur.com/21ct2j1.png)
- __HTTP 요청과 응답Header안에  Cookie 위와 같이 설정된다.__
---

### 쿠키 서명(쿠키 변조 방지)

  - __서명된 쿠키 사용하기__

    1. Cookieparser 설정
      ```javascript
      app.use(cookieParser("SECRET_KEY"));
      ```
    2. 쿠키 쓰기
      ```javascript
      response.cookie("singed" , "OrignalValue" , {signed : true})
      ```

    3. 쿠키 읽기
      ```javascript
      request.signedCookies.signed
      // OrignalValue
      ```
---

### 쿠키의 문제점
  - __메세지의 크기가 커진다 = 느려진다.__

  - __다른 웹브라우저로 접속하면 ?(유지할수없음)__

  - __보안에 취약 요청과 응답에 따라서 정보가 오고가면서 노출될 위험이 존재함__
