//DB 커넥션 모듈
//mongoose 객체와 DatabaseUrl을 인자로 받아서 DB에 connection
function dbconnect(mongoose,DatabaseUrl) {

   // 데이터 베이스 연결 정보
   mongoose.connect(DatabaseUrl);
   let DB = mongoose.connection;
     // 데이터베이스 연결
   DB.on("error" , console.error.bind(console , "mongoose connection error"));
   DB.on("open" , function () {
      console.log("데이터 베이스에 연결되었습니다.");
   });
   DB.on("disconnected" , dbconnect);

   return DB;
}
exports.connection = dbconnect;
