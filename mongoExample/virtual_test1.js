const mongodb = require("mongodb"),
mongoose = require("mongoose");


var database,UserSchema,UserModel;
connectDB();
function connectDB() {
  var databaseUrl = process.env.MDBPATH;

  mongoose.connect(databaseUrl+"shopping");
  database = mongoose.connection;


  database.on('error' , console.error.bind(console, 'mongooose connection error'));
  database.on('open' , function () {
      console.log("데이터 베이스에 연결되었습니다. : " + (databaseUrl+"shoping"));
      createUserSchema();

      doTest();

  });
  database.on("disconnected", connectDB);
}

//user 스키마 및 모델 객체 생성
function createUserSchema() {

  //스키마 정의
  // password hashed_password로 변경, default 속성 모두 추가 , salt속성 추가
  UserSchema = mongoose.Schema({
    id: {type : String , required : true , unique : true},
    name : {type : String , index : "hashed"},
    age : {type : Number , "default" : -1},
    created_at : {type : Date, index : {unique : false} , "default" : Date.now},
    update_at : {type : Date , index : {unique : false}, "default" : Date.now},
  });
  // info를 virtual 메소드로 정의
  UserSchema.
  virtual('info').
  set(function (info) {
      var splitted = info.split(" ");
      this.id = splitted[0];
      this.name = splitted[1];
      console.log("virtual info 설정함");
  });

  console.log("UserSchema 정의함.");
  //UserModel 정의
  UserModel = mongoose.model("users4", UserSchema);
  console.log("userModel 정의함");
}

function doTest() {
    //UserModel 인스턴스 생성
    //id , name 속성은 할당하지않고 info 속성만 할당함
    let user = new UserModel({"info" : "test01 소녀시대"});

    //save()로 저장
    user.save(function (err) {
        if(err) {throw err;}

        console.log("사용자 데이터 추가함");
        findAll();
    });

    console.log("info 속성에 값 할당함");
    console.log("id : %s , name : %s ", user.id, user.name);
}

function findAll() {
    UserModel.find({}, function (err, results) {
        if(err) {throw err;}

        if (results) {
            console.log("조회된 user 문서 객체 #0 -> id : %s , name : %s",
             results[0]._doc.id, results[0]._doc.name );
        }
    });
}
