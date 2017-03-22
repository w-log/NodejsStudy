## 인증
  - __인증 작성하기__
    - 서비스내 직접 인증 기능 작성(__Local Auth__)
    - 3자 인증 기능 사용(__OAuth__)
    - __OpenID__

---
### 로컬 인증(Local Auth)
  - __로컬 인증__
    - 서비스 자체에서 사용자 가입
    - 사용자 로그인 기능
    - 사용자 정보 관리

  - __로컬 인증시 필요한 점__
    - ID/PW가 서버와 클라이언트 메세지에 담겨서 이동
    - 서버에 ID/PW 저장
    - 사용자 정보 암호화
    - 보안 통신 필요 : HTTPS

---
### 3자 인증
 - __3자 인증(OAuth)__
    - 다른 서비스에 등록된 사용자의 인증 정보 사용
    - 직접 가입/로그인 절차가 없음
    - ID/PW 노출 위험 적다.
    - 다른 서비스에서 토큰 발급

__절차__

  - __새로운 서비스 사용하기__
    - 새로운 사용자라면, 인증하라고 요청
    - 서비스 키 제공(__Client_id, secret__)

  - __가입된 서비스에 3자 인증 요청__
    - 가입된 서비스에 인증
    - 인증 정보를 새로운 서비스에 전달

  - __가입된 서비스에 인증 상황 문의__
    - 인증된 사용자인지 문의
    - 서비스 사용 가능

---
### Passport
  - __인증 모듈__
      1. passport
      2. everyauth

  - __passport__(http://passportjs.org)

  - __설치__
```javascript
$ npm install passport
```

<center>__절차__</center>


<center>![passport 절차](./assets/passport절차.png)</center>


- __Module 로딩과 초기화___

    ```javascript
    var passport = require("passport");
    app.use(passport.initialize());
    ```

- __Strategy 설정___
```javascript
    var Strategy = require("passport-strategy").Strategy;
    passport.use(
      new Strategy(function(username,password , done){})
    )
```
- 다양한 인증 제공
    1. LocalAuth
    2. facebook, twitter, google
    3. kakao talk 등등



- __인증 요청__
```javascript
  app.post("/login", passport.authenticate("local"));
```
- __인증 성공시__
  - 성공 메세지와 코드
  - 성공 페이지 이동(웹)
- __인증 실패시__
  - 실패 메세지와 코드
  - 로그인 페이지(웹)
- __session 기록과 읽기__
```javascript
  //쓰기 (기록)
  passport.serializeUser(function(user,done){});
  //읽기
  passport.deserializeUser(function(id,done){});
```
- __요청 마다 세션 기록과 읽기__
    - passport.authenticate 이후 세션 기록(serializeUser)
    - 일반 요청마다 세션에서 읽기(descrializeUser)

    - __세션에서 읽어온 데이터__
```javascript
  request.user
  //passport를 사용했을때만 프로퍼티가 생성됨
```
---
### Local Auth
- __로컬 인증용 Strategy__
```javascript
 passport-local
```
- __설치__
```javascript  
 $ npm install passport-local
```    
- __module 로딩과 Strategy 로딩__
```javascript
  var LocalStrategy = require("passport-local").Strategy
```
- __인증 Strategy__
```javascript
  var strategy = new LocalStrategy(Option , function(username , password , done){});]

  options{
  //passReqToCallback: 요청객체 (req) 를 파라미터로 전달
  //usernameField, passwordField : 사용자 ID, Password에 해당하는 필드 이름 등록
  // form 양식내에서 보낸 req.body 안에 파라메터를 함수의 인자로 전달해준다.
  }
```

  - __Strategy의 인증 기능 구현__
  ```javascript
  var strategy = new LocalStrategy(OPTION, function(username , password, done){})
  ```
  - __인증 함수 구현__
      - 인증 성공
      ```javascript
       done(null, USER-INFO)
      ```
      - 인증 실패
      ```javascript
       done(null , false , FAILURE-INFO)
      ```


  - __예제코드__
  ```javascript
  var LocalStrategy = require("passport-local").Strategy;

  var strategy = new LocalStrategy(function(username, password , done){

      //인증 과정함수작성
      if( username && password ) {

        //인증성공시
        var userinfo = {name : "taewoong" , email : "taewoong@gmail.com"};
        return done(null, userinfo);
      }

      //인증 실패시
      done(null, false, {message : "incorrect ID/PW"});
  }
);

  // 패스포트에 적용하기
  passport.use(strategy);
  ```
  - __인증 요청과 인증 함수 동작__
    - 인증 요청 (method : post , url : /login)
    - Local Strategy의 인증 함수 동작
    ```javascript
    passport.authenticate(Strategy, Option, Callback);
    /*
    options
    session : 세션 사용여부 default = true
    successRedirect, failureRedirect : 인증 성공/실패시 Redirect 할 주소
    */
    ```
    - __인증 함수동작 방식__
    ```javascript
    passport.authenticate(LocalStrategy , function(err, user, info){
        if( err ) return; //Error

        if ( user ){
            //성공
            console.log("로그인 성공~",user,info);
        } else {
            //실패
            console.log("로그인 실패",user,info);
        }
    });
    ```
    - __인증 요청처리 방식(웹 브라우저)__
    ```javascript
    app.post("/login", {successRedirect : "/myhome", failureRedirect : "/login"});
    ```

    - __인증 요청처리 방식(모바일 앱)__
    ```javascript
    app.post("/login", passport.authenticate("local"), function(req, res){
      res.end("로그인 성공");
    });
    //미들웨어 함수 콜백을 스택형태로 쌓아서 로그인성공시 다음 미들웨어로 넘어갈수 있도록하고 로그인 실패시 자동으로 status code 401(권한 없음), Unauthorized 이 반환된다.
    ```
    - __인증 정보 유지 - 세션__
      - 인증 성공 ▶ 세션 기록
      > passport.serializeUser();

      - 클라이언트 요청 -> 세션에서 인증 정보 읽기
      > passport.deserializeUser();

      - 세션에 기록된 사용자 정보 접근 방법
      > request.user

    - __예제코드__
    ```javascript
    //사용자 정보저장
    passport.serializeUser(function(user, done){
        done(null , user);
    });
    //세션에서 사용자 정보읽기
    passport.deserializeUser(function(user, done){
        done(null , user); // 이 시점이후 req.user 사용가능
    });
    ```
    - __세션 저장 정보 형태__
    ```javascript
    //사용자 정보저장
    passport.serializeUser(function(user, done){
        done(null , user.id); //사용자 id만 저장
    });
    //id에서 사용자 정보찾기
    passport.deserializeUser(function(id, done){
        var user = findUser(id);//id로 정보 찾는 함수
        done(null , user); // user에 등록
    });
    ```
---
### 세션 사용 설정 코드
```javascript
/*
모듈 로딩생략
*/
var app = express();
//세션 모듈 설정

var session = require("express-session");
app.use(session({
    secret : "Secret Key",
    resave : fasle,
    saveUninitialized : true
}));

//패스포트 설정
var passport = require("passport");

app.use(passport.initialize());
app.use(passport.session());
```
---
## Facebook OAuth
  - __Strategy : passport-facebook__
    > $ npm install passport-facebook

  - __페이스북에 서비스(앱) 등록__


  - __페이지 이동 발생__
    - 인증 요청 : 서비스 → 페이스북 페이지로
    - 사용자 승인/거부 → 페이스북 페이지 → 서비스로
    - redirect 주소 필요

### 등록
  - __앱 식별 정보와 비밀키 : APP ID, APP Secret__
      - [페이스북 개발자 페이지](https://developers.facebook.com/)

  - __FaceBook 인증 함수__
    ```javascript
    var FacebookStrategy = require("passport-facebook").Strategy;
    var fbStrategy = new FacebookStrategy({
        clientID : FACEBOOK_APP_ID,
        clientSecret : FACEBOOK_APP_SECRET,
        callbackURL : CALLBACK_URL
    },
    function(accessToken, refreshToken, profile, done){
    });
    passport.use(fbStrategy);
    ```

  - __간단한 요청 처리__
    - 로그인 요청
    ```javascript
    //HTML
    <a href="/auth/facebook"> 로그인 버튼</a>

    //Server Nodejs
    app.get("/auth/facebook", passport.authenticate("facebook", {scope : "email"}));
    ```

    - 인증 요청시 scope
      - 읽기 권한 : email, public_profile, friend
      - 쓰기 권한 : create_content,...

  - __과정__
    1. 첫로그인 요청
    2. Facebook 인증 권한 요청 페이지로 전환
    3. 권한 인증 승락/ 거절후 페이지 이동 : callbackURL(위에서 설정해준 CALLBACK_URL)


  - __사용자 승인 후 사용자 정보 : token, profile__
  ```javascript
  var FacebookStrategy = require("passport-facebook").Strategy;
  var fbStrategy = new FacebookStrategy({
      clientID : FACEBOOK_APP_ID,
      clientSecret : FACEBOOK_APP_SECRET,
      callbackURL : CALLBACK_URL
  },
  function(accessToken, refreshToken, profile, done){
    // 사용자의 profile 객체 profile
    var id = profile.id;
    var name = profile.displayName;
    var email = profile.emails[0].value;
    //사용자의 정보를 일부 DB에 담거나 가지고있을수있음
  });
  passport.use(fbStrategy);
  ```

  - __모바일 앱__
    - SNS 인증 - FaceBook 앱에서 담당
    - 콜백 불필요
    - 앱간의 이동이기때문에 페이지를 이동할필요가 없음 (콜백 URL이 불필요)
    - 모듈이 다름
  - __모듈__
     >passport-facebook-token Strategy


---
### 포스팅 마치며
  - __상당히 많은 정보를 보고 쓰느라 머릿속이 매우 복잡해졌네요.
  passport모듈공부하면서 최근 issue인 HTTPS 프로토콜 방식의 구형보안 버전인 SHA-1이 보안에 취약점이 발견되면서 많은 기업들이 HTTPS 암호화 통신방식의 프로토콜내에서도 SHA-1지원을 끊게 되고있는데요. 아직국내에서 공공기관 페이지는 HTTP 프로토콜을 사용한다거나 HTTPS를 사용하더라도 SHA-1구형 보안방식을 쓰는페이지가 많다고하네요.
  아직 개발초보여서 HTTP프로토콜 조금아는수준이 되었지만 보안과 프로토콜의 대해서 웹개발자는 떌래야 땔수없는 관계같습니다. 기회가 되면 조금더 깊게 배워보는 시간을 가져보고싶네요.__





  - __위 글은 T아카데미 Nodejs 서버개발 강의를 바탕으로 작성된 포스팅입니다.__
