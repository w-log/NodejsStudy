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
var user = require('./routes/user');

/*console.log("스키마 정의 ");
UserSchema.static("findById" , function (id,callback) {
    return this.find({id:id}, callback);
});

UserSchema.static("findAll" , function (callback) {
    return this.find({}, callback);
});

//user 모델 정의
UserModel = mongoose.model("users2" , UserSchema);
console.log("모델의 정의");*/

function dbconnect() {
   let databaseUrl = process.env.MDBPATH + "shopping";

   // 데이터 베이스 연결 정보
   mongoose.connect(databaseUrl);
   DB = mongoose.connection;

     // 데이터베이스 연결
   DB.on("error" , console.error.bind(console , "mongoose connection error"));
   DB.on("open" , function () {
      console.log("데이터 베이스에 연결되었습니다.");
      createUserSchema();


   });
   DB.on("disconnected" , dbconnect);
}

//user 스키마 및 모델 객체 생성
function createUserSchema() {

  //user_schema.js 모듈 호출
  UserSchema = require("./database/user_schema").createSchema(mongoose);

  //UserModel 정의
  UserModel = mongoose.model("users3", UserSchema);
  console.log("UserModel 모델의 정의");


  user.init(DB, UserSchema, UserModel);
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

인덱싱
스키마 객체에 메소드 추가
static(name , fn) 모델객체와 사용할수있는 함수추가
method(name, fn)모델 인스턴스 객체에서 사용할수 있는 함수 추가
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

app.post("/process/adduser" , user.adduser);
app.post("/process/listuser", user.listuser);
app.post("/process/login" , user.login);

http.createServer(app).listen(app.get('port'), function () {
  console.log("서버가 시작되었습니다. 포트 : " + app.get('port'));
  dbconnect();
});
