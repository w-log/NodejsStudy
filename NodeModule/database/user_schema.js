var crypto = require("crypto");


//user 스키마 및 모델 객체 생성
var Schema = {};

Schema.createSchema = function functionName(mongoose) {
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
  });

  UserSchema.path("id").validate(function (id) {
      return id.length;
  }, "id 값이 존재하지않습니다.");

  UserSchema.path("name").validate(function (name) {
      return name.length;
  }, "name 값이 존재하지않습니다.");


  console.log("UserSchema 정의함");
    UserSchema.static("findById" , function (id,callback) {
        return this.find({id:id}, callback);
    });

    UserSchema.static("findAll" , function (callback) {
        return this.find({}, callback);
    });

  return UserSchema;
};

//module.exprots에 UserSchema 객체 직접 할당
module.exports = Schema;
