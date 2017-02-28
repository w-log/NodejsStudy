## Express Routing 알아보기

- __Express Framework는 자체적인 라우팅과 Rest api의 메소드들을 제공한다.__

1. __Express 라우팅 메소드 보기__

| HTTP method | Express Method |
| :------------ | :-----------: |
| get  | app.get("path", calback aguments request , response) |
| post | app.post("path", calback aguments request , response)  |
| put | app.put("path", calback aguments request , response)|
| delete | app.delete("path", calback aguments request , response) |
| all method | app.all("path", calback aguments request , response) |


- 요청에 따른 동적 파라메터 얻기
```javascript
// request /user/sword
app.get("/user/:item", [Callback]);
// req.params.item : "sword"
```
- 파라미터 값 얻기
```javascript
req.params.item
```
- 다수의 동적 파라미터 사용가능 (참고사항 : 변수의 name은 중복되면 안됨)
- 동적 파라미터 사용시 주의
    - /user/:item
    - /user/sample
    - 순서에 의해서 항상item을 먼저인식함 이럴경우 sample url 요청검사를 항상 먼저받게해야함



라우팅에 정규식 사용하기

? : 문자 존재하거나 생략
+ : 한번 이상 반복
* : 임의의 문자

| 정규식 표현 | 뜻 |
| :------------ | :-----------: |
| ?  | 문자 존재하거나 생략 |
| + | 한번 이상 반복  |
| * | 임의의 문자 |


---


## Express route함수 이용하기

- __메소드의 체인방식으로 라우팅을 연결할 수 있음__
- 사용방법

```javascript
app.route("path")
  .get(function (req,res){

  })
  .post(function (req,res){

  })
  .put(function (req,res){

  })
  .delete(function (req,res){

  })
```

- express.Router() 메소드 이용하기 (__라우팅 로직 분리시 용이함__)
- 별도로 route 파일분리후

```javascript
var app = express()
var router = express.Router();

router.get("/hello", sayhello);
router.get("/howAreYou/:who", sayThankyou);
```
- 장점 ? 라우팅 하는 로직을 별도의 파일로 분리할 수 있음

- __라우팅 로직 별도 분리 (router.js)__

```javascript
var express = require("express")
var router = express.Router();

router.get("/hello", sayHello);
router.get("/howAreYou/:who", sayThankyou);

module.exports = router;
```
```javascript
app.use(require("./router")); //route설정객체를 미들웨어 함수 등록
```


- 상대 경로 처리 라우터 설정
- /greeting/hello 경로의 요청
```javascript
 app.use("/greeting" , require("./greetingRouter"));
```
- greetingRouter의 라우팅 코드
```javascript
router.get("/hello", sayHello);
```

- /eat/cooking 경로의 요청 담당 라우팅 모듈
```javascript
  app.use("/eat",require("./eatingRouter"));
```
- eatingRouter 의 라우팅 코드
```javascript
  router.get("/cooking" , cook);
```

- __예제 코드 보기__
```javascript
var express = require("express");
var app = express();

app.get("/:value", work);
app.use(errorHandler);
app.listen(3000);

function work(req ,res , next){
    var val = parseInt(req.params.value);

    // 입력 파라메터 체크
    if ( ! val ){
        var error = new Error("입력값이 숫자가 아닙니다.");
        next(error);
        return;
    }
    res.send("Result : " + val);
}

function errorHandler(err , req, res ,next){
    res.send("에러 발생");
}
```


---



  - __위 포스팅은 T아카데미 Nodejs 서버개발 강의를 바탕으로 작성된 내용입니다.__
