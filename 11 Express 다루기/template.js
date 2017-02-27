/*
HTML 출력
응답에 헤더가 html일때는 html 응답메세지를 작성해주어야한다.
하지만 응답메세지에 html 작업하는것은
시간도 많이 걸릴뿐더러 협업을 할시에 작성이 불리하기때문에
템플릿을 사용해서 미리 만들어놓은 템플릿 html 파일을
요청메세지에 따라 뿌려주기만하면됨.

express 의 template 엔진
-ejs -jade

템플릿 설정
app.set("views",[템플릿 폴더]);
app.set("view engine" , [템플릿 엔진]);

템플릿에 적용 : 렌더링
res.rneder(view [, locals] [, callback]);
locals : 템플릿의 지역 변수로 설정될 데이터
callback : 렌더링 콜백
응답 종료

//index 템플릿 파일을 렌더링 한 결과로 응답

res.render("index");

//index 템플릿 파일에 name 이름으로 데이터를 제공
res.render("index", {name : 'iu'});

//user 템플릿에 name 이름으로 데이터를 제공한다. 렌더링 한 결과를 다루는 콜백 함수 정의
res.render("user",{name : "iutt"} , function (err html) {
 //...
});
*/
//예제보기

var express = require("express");
var app = express();

app.set("views",__dirname+"/views");
app.set("view engine","ejs");

var data = [
  {title : "cat1", image : "cat1.png"},
  {title : "cat2", image : "cat2.png"},
  {title : "cat3", image : "cat3.png"},
];
app.use(express.static("./"));
app.get("/", function(req , res){
    res.render("cat" ,{title : "Cats", cats:data});
});

app.listen(3000);
