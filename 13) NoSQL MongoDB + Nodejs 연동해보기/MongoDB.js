/*
MongoDB native 모듈 알아보기

데이터베이스 얻기와 연결
*/

var MongoClient = require("mongodb").MongoClient;

데이터베이스 연결과 얻기
MongoClient.connect(url , options , callback);
// callback : function (err , db)


/*
connection 예제
var MongoClient = require("mongodb").MongoClient
var url = "mongodb://localhost:27017/DATABASE";

var db;
//연결
MongoClient.connect(url, function(err , database){
    console.log("MongoDB 연결 성공");
    db = database;
});

MongoDB 에서 데이터 다루기 : Collection 기반
db.COLLECTION.insert
db.COLLECTION.find...

컬렉션 얻기
db.collection(name , options , callback) -> colltion

//1 db.colltion("movies").find();

//2 var movies = db.collection("movies");
movies.insert();

Collection 에 Document 추가
insert(docs , options , callback);
insertMany(docs , options , callback);
insertOne(doc, options , callback);

결과처리

-- callback 으로 결과얻기 인자로 callback 함수 정의
-- promise 기반의 객체얻기 인자로 callback 함수 정의 안함.


document 조회
find(query) -> Cursor
findOne(query , options , callback) // 한개의 결과 값만 반환

find()의 결과 : Cursor
each , forEach : 결과 도큐먼트를 순회
var cursor = collection.find();
cursor.forEach(function (doc) {
    //도큐먼트 다루기

},function(err){

});
혹은
find(query).toArray(); // 도큐먼트의 배열반환

Projection

출력 필드 필터링

1: 출력, 0: 출력 안함
db.inventory.find({type:"food"}, {item:1,qty :1, _id:0});

document 개수
db.collection.count(query , options , callback);

document ID
식별시 String 타입이 아닌
MongoDB.ObjectID타입을 사용한다.

수정(update)

update (selector , document,options ,callback);
updateMany(filter, update , options, callback);
updateOne(filter, update , options , callback);

options
-multiple : update함수의 경우 1개만 수정하게되있는데 다중변경옵션 : {multiple:true}
-upsert : insert or Update 동작

수정 결과

callback 사용
Promise로 사용. 반환값 promise. callback 사용 안함

삭제하기(delete)
deleteMany(filter , options, callback);
deleteOne(filter, options ,callback);

공통적으로 callback 함수를 인자로 정의하지않으면 promise 객체가 반환됨


*/
