const http = require('http'),
express = require('express'),
path = require('path'),
bodyParser = require('body-parser'),
cookieParser = require('cookie-parser'),
session = require('express-session'),
errorhandler = require("express-error-handler"),
mongodb = require('mongodb');

var DB;
var app = express();

function dbconnect() {
   let databaseUrl = process.env.MDBPATH + "shopping";
   mongodb.connect(databaseUrl, function (err , db) {
      if (err) throw err;
      DB = db;
      console.log("데이터 베이스에 연결되었습니다." + databaseUrl);
  });
}

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
