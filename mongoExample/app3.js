const http = require('http'),
express = require('express'),
path = require('path'),
bodyParser = require('body-parser'),
cookieParser = require('cookie-parser'),
session = require('express-session'),
errorhandler = require("express-error-handler"),
mongoose = require('mongoose');

var DB,UserSchema,UserModel;
var app = express();

function dbconnect() {
   let databaseUrl = process.env.MDBPATH + "shopping";

   // 데이터 베이스 연결 정보
   mongoose.connect(databaseUrl);
   DB = mongoose.connection;

     // 데이터베이스 연결
   DB.on("error" , console.error.bind(console , "mongoose connection error"));
   DB.on("open" , function () {
      console.log("데이터 베이스에 연결되었습니다.");
      UserSchema =  mongoose.Schema({
        id: String,
        name : String,
        password : String,
      });
      console.log("스키마 정의 ");
      //user 모델 정의
      UserModel = mongoose.model("user" , UserSchema);
      console.log("모델의 정의");
   });
   DB.on("disconnected" , dbconnect);
}
/*
mongoose 모듈의 Schema Option
스키마 옵션 지정시 {key(option Name), : value(Option value), }
객체 선언 후 옵션을 여러개 줄 수 있음
옵션이 자료형이라면 위와 같이 id : (data Type) 이렇게 주면됨
-type : 자료형을 지정함
-required : 값이 True면 반드시 들어가야 하는 속성이 됨.
-unique : 값이 True면 이 속성에 고유한 값이 들어가야 합니다.(RDBMS primary key 와 동일함.)

mongoose 모듈의 Data Type
-String : 문자열 타입
-Number : 숫자 타입
-Boolean : 이진 타입
-Array : 배열 타입
-Buffer : 버퍼타입 (바이너리 데이터를 저장 할 수 있음.)
-Date : 날짜 타입
-ObjectId : 각 문서(Document)마다 만들어지는 ObjectId 를 저장 할 수 있음.
-Mixed : 혼합타입(구분이 없다.)

mongoose 함수 (CRUD 기준)
select : find("query", callback);
insert : save(option , callback);
update : update("query" , doc , option , callback)
delete : remove("query", callback) (remove는 document 단위로 삭제하기떄문에 document 가 아닌
document 안에 내용중 일부를 삭제하고 싶을때는 update를 사용한다.)
그 외 ...
where("query")
*/

//서버 포트 설정 및 static 정적파일 폴더로 public 폴더 설정
app.set('port', process.env.PORT || 4000);
app.use("/public" , express.static(path.join(__dirname , 'public')));



//======body-parser , cookie-parser , express-session 사용 설정=========
app.use(bodyParser.urlencoded({extended : true}));
app.use(cookieParser());
app.use(session({
  secret:"my key",
  resave:true,
  saveUninitialized:true
}));

var addUser = function (DB , id, password , name, callback) {
    console.log("addUser 호출됨");
    //user 컬렉션 참조
    var users = new UserModel({"id" : id, "password" : password , "name" : name});
    //id , password , username을 사용해 사용자 추가
    users.save(function (err) {
        if( err ) {
          callback(err, null);
          return;
        }
        console.log("사용자 데이터 추가함.");
        callback(null , users);
    });
};

app.post("/process/adduser" , function (req, res) {
    console.log("process/adduser 호출됨!");

    let paramId = req.body.id;
    let paramPwd = req.body.password;
    let paramName = req.body.name;

    if(DB){
        addUser(DB, paramId , paramPwd , paramName , function (err , result) {
            if(err) throw err;
            if (result) {
                console.log(result);

                res.writeHead("200" , {"Content-Type" : "text/html;charset=utf8"});
                res.write("<h2>사용자 추가 성공</h2>");
                res.end();
            } else {
                res.writeHead("200" , {"Content-Type" : "text/html;charset=utf8"});
                res.write("<h2>사용자 추가 실패</h2>");
                res.end();
            }
        });
    } else {
        res.writeHead("200" , {"Content-Type" : "text/html;charset=utf8"});
        res.write("<h2>DB 연결 실패</h2>");
        res.end();
    }

});



var authUser = function (DB, id, password , callback) {
  console.log("authuser 호출됨.");
  // user 컬렉션 참조
  var users = DB.collection("users");
  users.find({"id" : id , "password" : password}).toArray(function (err, docs) {
    if (err) {
      callback(err , null);
      return;
    }
    ( docs.length > 0 ? callback(null, docs) : callback(null,null) );
  });
};


app.post("/process/login" , function (req , res) {
  console.log("process/login 호출됨.");
  var paramId = req.body.id;
  var parampwd = req.body.pwd;
  console.log(paramId , parampwd);
  if (DB) {
    authUser(DB, paramId, parampwd, function (err, docs) {
      if(err) throw err;
      if(docs){
        console.dir(docs);
        res.writeHead('200',{'Content-Type' : 'text/html;charset=utf-8'});
        res.write("<h1>로그인 성공</h1>");

        res.write("<div><p>사용자 아아디 : " + paramId + "  비밀번호 : " + parampwd + " </p></div>");
        res.write("<div><p>사용자 이름 : "+ docs[0].name +" </p></div>");
        res.write("<br><br><a href='/public/login.html'>다시 로그인하기</a>");
      }else{
        res.writeHead('200',{'Content-Type' : 'text/html;charset=utf-8'});
        res.write("<h1>로그인 실패</h1>");
        res.write("<div><p>아이디하고 비밀번호를 다시확인해주세요.</p></div>");
        res.write("<br><br><a href='/public/login.html'>다시 로그인하기</a>");
      }
      res.end();
    });
  }else{
    res.writeHead('200',{'Content-Type' : 'text/html;charset=utf-8'});
    res.write("<h1>DB 연결 실패</h1>");
    res.end();
  }
});

app.use(errorhandler.httpError(404));
app.use(errorhandler({
 static : {
   "404" : "./public/404.html"
 }
}));
http.createServer(app).listen(app.get('port'), function () {
  console.log("서버가 시작되었습니다. 포트 : " + app.get('port'));
  dbconnect();
});
