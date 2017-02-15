/*
Express 에러 처리 방법

미들웨어 내부에서 처리
각각 미들웨어에서 에러 처리

에러 처리 로직이 제각각

에러 처리 코드 중복

에러처리 미들웨어에게 위임

일관된 에러 처리 가능
에러를 담당하는 미들웨어 함수의 첫번째 인자는 대게 error 객체임



app.use(function(err, req  , res, next){
  res.status(500).send("에러 발생");
});

app.use(function (req, res ,next) {
    var error = new Error("에러 메세지");

    error.code = 100;
    return next(error);
})

에러 처리 미들웨어는 제일 후순위로 해준다.

에러 정보 출력
개발 중 에러처리
  에러 정보를 출력함

서비스중 에러 처리
사용자 친화적 메세지 : "잠시 후 다시 시도해주세요."

개발 환경 설정하기

//window 서비스 환경

set NODE_ENV = product
node myapp.js
// LINUX - 개발환경
NODE_ENV=product node myapp.js
NODE_ENV=development node myapp.js

환경 설정 읽기

app.get("env");


if (app.get("env") === "development"){
    app.use(function(err, req, res ,next){
      res.end(err.stack);
  });
}
else {
  app.use(function(err){
    res.status(err.code || 500);
    res.end("잠시 후 다시 시도해주세요.");
});
}
*/
