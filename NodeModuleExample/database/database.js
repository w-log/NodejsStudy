const mongodb = require("mongodb"),
mongoose = require("mongoose");


var database = {};

database.init = function(app, config){
  console.log("init 호출됨");

  connect(app, config);
};

function connect(app, config){
    console.log("connect() 호출됨");
    mongoose.connect(config.db_collections.db_shopping.db_path);
    let DB = mongoose.connection;
      // 데이터베이스 연결
    DB.on("error" , console.error.bind(console , "mongoose connection error"));
    DB.on("open" , function () {
       console.log("데이터 베이스에 연결되었습니다.");
       createSchema(app,config);
    });
    database.DB = DB;
    DB.on("disconnected" , connect);
}

//config에 정의한 스키마 및 모델객체 생성
function createSchema(app, config) {
  var schemaLen = config.db_collections.db_shopping.db_schemas.length;
  console.log("설정에 정의 된 스키마의 수 : %d" , schemaLen);

  for (var i = 0; i < schemaLen; i++) {
      var curItem = config.db_collections.db_shopping.db_schemas[i];


      //모듈 파일에서 모듈 불러온 후 createSchema() 함수 호출하기
      var curSchema = require(curItem.file).createSchema(mongoose);
      console.log("%s 모듈을 불러들인 후 스키마 정의함.", curItem.file);

      //User 모델 정의
      var curModel = mongoose.model(curItem.collection, curSchema);
      console.log("%s 컬렉션을 위해 모델 정의함.", curItem.collection);


      //database 객체에 속성으로 추가
      database[curItem.schemaName] = curSchema;
      database[curItem.modelName] = curModel;
      console.log("스키마 이름 [%s] , 모델 이름 [%s]이 database 객체의 속성으로 추가됨.",
                  curItem.schemaName,curItem.modelName);
      }
      app.set("database" , database);
}

//database 객체를 module.exports에 할당
module.exports = database;
