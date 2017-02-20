/*
Mongoose
ODM : Object Document Mapper
스키마 기반

설치 npm install mongoose
*/
//데이터 베이스 연결

var mongoose = require("mongoose");
var url = "mongodb://localhost:27017/moviest";
mongoose.connect(url);

//연결과 이벤트

var db =mongoose.connection;
db.on("error" , function(err){

});
db.once("open", function(){});

/*
스키마와 모델

스키마 : document의 타입과 형태를 정의
주로 비선형 데이터구조인 MongoDB는 Schema가 없지만
모듈을 사용하여 언어적 차원에서 데이터타입을 정의 할 수 있게해줌으로써
선형자료구조도 효율적으로 다룰수있게되며, 또한 비선형자료도 NOSQL특성상
잘다룰수있게함.


*/
//예제
var MovieSchema = mongoose.Schema({
  title: String,
  director : String,
  year : Number,
  synopsis : String
});

var Mive = mongoose.model("Movie" , MovieSchema);

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


//모델에서 도큐먼트 생성
var avata = new Movie({title : "인터스텔라", director : "크리스토퍼 놀란", year:"2014"});


//데이터 베이스에 반영
Model.save([options],[options.safe],[options.validateBeforeSave], [fn]);

//생성 결과 callback
avata.save(function(){});

//promise 방식
avata.save().then(resolved , rejected);
