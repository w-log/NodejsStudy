/*
express 라우팅 메소드 보기

// get 메소드
app.get("path", calback aguments request , response)

//post 메소드
app.post("path", calback aguments request , response)

//put 메소드
app.put("path", calback aguments request , response)

//delete 메소드
app.delete("path", calback aguments request , response)

//모든 http 메소드
app.all("path", calback aguments request , response)


동적 파라메터 얻기

app.get("/user/:item", [Callback]);

요청 경로 : /user/1234
요청 경로 : /user/abcd

파라미터 값 얻기
req.params.item
다수의 동적 파라미터 사용가능


동적 파라미터 사용시 주의
/user/:item
/user/sample
순서에 의해서 항상item을 먼저인식함
이럴경우 sample url 요청검사를 항상 먼저받게해야함

라우팅에 정규식 사용하기
? : 문자 존재하거나 생략
+ : 한번 이상 반복
* : 임의의 문자

express route함수 이용하기

메소드의 체인방식으로 라우팅을 연결할 수 있음
사용방법
app.route("path")
  .get(function (req,res){

  })
  .post(function (req,res){

  })
  .put(function (req,res){

  })
  .delete(function (req,res){

  })

express.Router() 라우터 이용하기 ( 라우터 수준의 미들웨어 )
별도로 route 파일분리후
var app = express()
var router = express.Router();

router.get("/hello", sayhello);
router.get("/howAreYou/:who", sayThankyou);

장점 : 라우팅 하는 로직을 별도의 파일로 분리할 수 있음

라우팅 로직 별도 분리 (router.js)
var express = require("express")
var router = express.Router();

router.get("/hello", sayHello);
router.get("/howAreYou/:who", sayThankyou);

module.exports=router;

호출시 app.use(require("./router"))


상대 경로 처리 라우터 설정
 /greeting/hello 경로의 요청
 app.use("/greeting" , require("./greetingRouter"));

 greetingRouter의 라우팅 코드
 router.get("/hello", sayHello);

//   /eat/cooking 경로의 요청 담당 라우팅 모듈

  app.use("/eat",require("./eatingRouter"));


  eatingRouter 의 라우팅 코드
  router.get("/cooking" , cook);


예제 코드 보기
*/

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
