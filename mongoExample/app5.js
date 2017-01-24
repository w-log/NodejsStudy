const http = require('http'),
express = require('express'),
path = require('path'),
bodyParser = require('body-parser'),
cookieParser = require('cookie-parser'),
session = require('express-session'),
errorhandler = require("express-error-handler"),
mongoose = require('mongoose'),
crypto = require("crypto");

var DB,UserSchema,UserModel;
var app = express();

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

      UserModel = mongoose.model("users2" , UserSchema);
      console.log("모델의 정의");
   });
   DB.on("disconnected" , dbconnect);
}

//user 스키마 및 모델 객체 생성
function createUserSchema() {

  //스키마 정의
  // password hashed_password로 변경, default 속성 모두 추가 , salt속성 추가
  UserSchema = mongoose.Schema({
    id: {type : String , required : true , unique : true, default : ' '},
    hashed_password : {type : String , required : true , default : ' '},
    salt : {type : String ,  required : true,},
    name : {type : String , index : "hashed", default : ' '},
    age : {type : Number , "default" : -1},
    created_at : {type : Date, index : {unique : false} , "default" : Date.now},
    update_at : {type : Date , index : {unique : false}, "default" : Date.now},
  });

  // info를 virtual 메소드로 정의
  UserSchema.
  virtual('password').
  set(function (password) {
      this._password = password;
      this.salt = this.makeSalt();
      this.hashed_password = this.encryptPassword(password);
      console.log("virtual password 호출됨 : " + this.hashed_password);
  }).get( () => this._password );

  //스키마에 모델 인스턴스에서 사용 할 수있는 메소드 추가
  UserSchema.method("encryptPassword",function (plaintext , inSalt) {
      if(inSalt){
          return crypto.createHmac('sha1' , inSalt).update(plaintext).digest('hex');
      } else {
          return crypto.createHmac('sha1' , this.salt).update(plaintext).digest('hex');
      }
  });

  // Salt 값 만들기 메소드
  UserSchema.method("makeSalt" , function () {
      return Math.round((new Date().valueOf() * Math.random())) + '';
  });

  //인증 메소드 - 입력 된 비밀번호와 비교 (true/false 리턴)

  UserSchema.method("authenticate" , function (plaintext , inSalt , hashed_password) {
    if (inSalt) {
        console.log("authenticate 호출됨 : %s -> %s : %s" , plaintext,
                    this.encryptPassword(plaintext,inSalt) , hashed_password);
        return this.encryptPassword(plaintext,inSalt) === hashed_password;
    } else {
        console.log("authenticate 호출됨 : %s -> %s : %s" , plaintext,
                    this.encryptPassword(plaintext) , this.hashed_password);
        return this.encryptPassword(plaintext) === this.hashed_password;
    }
  })

  UserSchema.path("id").validate(function (id) {
      return id.length;
  }, "id 값이 존재하지않습니다.");

  UserSchema.path("name").validate(function (name) {
      return name.length;
  }, "name 값이 존재하지않습니다.");

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


//사용자 인증함수 : 아이디로 먼저 찾고 비밀번호를 그다음에 비교
var authUser = function (DB, id, password , callback) {
  console.log("authuser 호출됨.");


  // users 컬렉션 참조
  UserModel.findById(id , function (err,results) {
      if(err){
        callback(err, null);
        return;
      }

      console.log("아이디 [%s] 로 사용자 검색 결과" , id);
      console.log(result);
      if(results.length > 0){
        console.log("아이디와 일치하는 사용자 찾음");
        //2. 비밀번호 확인

        var user = new UserModel({id : id});
        var authenticate = user.authenticate(password , results[0]._doc.salt,
           results[0]._doc.hashed_password);

        if(authenticate){
            console.log("비밀번호 일치함");
            callback(null ,results);
        }else{
          console.log("비밀번호 일치하지 않음");
          callback(null, null);
        }

      }else{
          console.log("아이디와 일치하는 사용자를 찾지 못함");
          callback(null,null);
      }
  });
};

app.all("/process/listuser" ,function (req, res) {
    console.log("/process/listuser 호출됨");

    if(DB) {
        UserModel.findAll(function (err , results) {
            if (err) {
                callback(err, null);
                return;
            }

            if (results) {
                console.log(results);
                res.writeHead("200", {"Content-Type" : "text/html;charset=utf8"});
                res.write("<h2>사용자 리스트 </h2>");
                res.write("<div><ul>");

                //자료 갯수만큼 반복
                for (var i = 0; i < results.length; i++) {
                  var curId = results[i]._doc.id;
                  var curName = results[i]._doc.name;
                  res.write("<li>#" + i + " : " +  curId + ", " + curName + "</li>");
                }

                res.write("</ul></div>");
                res.end();
            }else{
                res.writeHead("200" , {"Content-Type" : "text/html;charset=utf8"});
                res.write("<h2>사용자 리스트 조회 실패</h2>");
                res.end();
            }
        });

    }
});


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
