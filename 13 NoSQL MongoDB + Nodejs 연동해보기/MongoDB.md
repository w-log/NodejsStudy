# Mongo DB

- __NoSQL ? RDBMS(관계형 데이터베이스) 의 비교?__

|  | 관계형 데이터베이스 | NoSQL 데이터베이스        |
| :------------ | :-----------: | :-------------------: |
| 데이터 모델     | 관계형 모델은 데이터를 행과 열로 구성된 테이블이라고 하는 테이블 형식 구조로 정규화합니다. 스키마는 테이블, 열, 인덱스, 테이블 간 관계 및 기타 데이터베이스 요소를 정의합니다.        | 비관계형(NoSQL) 데이터베이스는 일반적으로 스키마를 강제 적용하지 않습니다. 파티션 키는 값, 열 세트, 반정형 JSON, XML 또는 관련 항목 속성을 포함하는 다른 문서에 일반적으로 사용됩니다. |
| ACID 속성 | 기존의 RDBMS(관계형 데이터베이스 관리 시스템)는 약어인 ACID(원자성, 일관성, 격리성, 내구성)로 정의된 일련의 속성 세트를 지원합니다. 원자성은 트랜잭션이 완전히 실행되거나 전혀 실행되지 않는 "모두 실행 또는 전혀 실행되지 않음"을 의미합니다. 일관성은 트랜잭션이 실행되면 데이터가 데이터베이스 스키마를 준수해야 함을 의미합니다. 격리성은 동시에 일어나는 트랜잭션이 다른 트랜잭션과 별도로 실행되어야 함을 의미합니다. 내구성은 예기치 못한 시스템 장애 또는 정전으로부터 마지막으로 알려진 상태로 복원하는 기능입니다.      | NoSQL 데이터베이스는 종종 수평으로 확장되는 더 유연한 데이터 모델용 기존 RDBMS(관계형 데이터베이스 관리 시스템)의 일부 ACID 속성을 교환합니다. 이러한 특성은 기존 RDBMS가 성능 병목 지점, 확장성, 운영상의 복잡성, 늘어나는 관리 업무 및 지원 비용 문제가 복합적으로 발생할 경우 이를 해결하기 위한 구조적 문제에 직면하면 NoSQL 데이터베이스가 탁월한 선택을 할 수 있도록 지원합니다.             |
| 성능  | 성능은 일반적으로 디스크 하위 시스템에 따라 다릅니다. 최고 성능을 달성하기 위해서는 쿼리, 인덱스 및 테이블 구조를 최적화해야 합니다.    | 성능은 일반적으로 기본 하드웨어 클러스터 크기, 네트워크 지연 시간 및 호출 애플리케이션의 기능입니다.      |
| 확장 가능  | 더 빠른 하드웨어로 "확장"이 간편해 집니다.  분산 시스템을 확장하기 위해서는 관계형 테이블에 대해 추가적인 투자가 필요합니다.  | 지연 시간을 늘리지 않고 처리량을 향상시키기 위해 저비용 하드웨어의 분산 클러스터를 사용하여 "확장"하도록 설계되었습니다. |
| API  | 구조화 질의어(SQL)를 준수하는 쿼리를 사용하여 데이터를 저장 및 검색하기 위한 요청이 전달됩니다. 이러한 쿼리는 RDBMS(관계형 데이터베이스 관리 시스템)에 의해 구문 분석 및 실행됩니다.  | 객체 기반 API를 통해 앱 개발자가 인 메모리 데이터 구조를 쉽게 저장 및 검색할 수 있습니다. 파티션 키를 사용하면 앱에서 키 값 페어, 열 세트 또는 일련의 앱 객체 및 속성을 포함하는 반정형 문서를 검색할 수 있습니다. |
| 도구  | SQL 데이터베이스는 일반적으로 데이터베이스로 구동되는 애플리케이션의 배포를 간소화하기 위해 다양한 도구 세트를 제공합니다.  | NoSQL 데이터베이스는 일반적으로 클러스터 관리 및 조정을 위한 도구를 제공합니다. 애플리케이션은 기본 데이터에 대한 주요 인터페이스입니다. |


-[출처 : Amazon Web Service](https://aws.amazon.com/ko/nosql/)




- 특징
  - __Document 기반의 데이터__
  - 홈페이지 : (http://Mongodb.org)

- Nodje jS module
    - MongoDB  (__MongoDB native module__)
    - Mongoose (__MongoDB ODM module__)

---

## 모듈 알아보기

### native 모듈 MongoDB

- 설치
```javascript
$ npm install mongodb
```

- 특징
  - native 모듈의 특성으로 MongoDB 내에 조회나 insert, update등의 쿼리 함수를 그대로 가져다 쓸 수 있다.


- __MongoDB native 모듈 사용해보기__

### database Connection

```javascript
  var MongoClient = require("mongodb").MongoClient;

  //데이터베이스 연결과 얻기
  MongoClient.connect(url , options , callback);
  // callback : function (err , db)
```


- Connection 예제코드
```javascript
  var MongoClient = require("mongodb").MongoClient
  var url = "mongodb://localhost:27017/DATABASE";

  var db;
  //연결
  MongoClient.connect(url, function(err , database){
      console.log("MongoDB 연결 성공");
      db = database;
  });
```

- 함수를 통한 데이터 다루기 (Collection 기반)

```javascript
  db.COLLECTION.insert
  db.COLLECTION.find...

  컬렉션 얻기
  db.collection(name , options , callback) -> collection

  //1 db.colltion("movies").find();

  //2 var movies = db.collection("movies");
  movies.insert();

  Collection 에 Document 추가
  insert(docs , options , callback);
  insertMany(docs , options , callback);
  insertOne(doc, options , callback);

  //결과처리
  // callback 으로 결과얻기 인자로 callback 함수 정의
  // promise 기반의 객체얻기 인자로 callback 함수 정의 안함.


  //document 조회
  find(query) -> Cursor
  findOne(query , options , callback) // 한개의 결과 값만 반환

  // find()의 결과 : Cursor
  // each , forEach : 결과 도큐먼트를 순회
  var cursor = collection.find();
  cursor.forEach(function (doc) {
      //doc도큐먼트 다루기

  },function(err){

  });
  혹은
  find(query).toArray(); // 도큐먼트의 배열반환

  Projection

  //출력 필드 필터링

  //1: 출력, 0: 출력 안함
  db.inventory.find({type:"food"}, {item:1,qty :1, _id:0});
  //item : 출력, qty : 출력 , _id : 출력안함


  //document 개수 조회 함수
  db.collection.count(query , options , callback);

// document ID
// 식별시 String 타입이 아닌
// MongoDB.ObjectID타입을 사용한다.

수정(update)

update (selector , document,options ,callback);
updateMany(filter, update , options, callback);
updateOne(filter, update , options , callback);

// options
// -multiple : update함수의 경우 1개만 수정하게되있는데 다중변경옵션 : {multiple:true}
// -upsert : insert or Update 동작

//수정 결과
// callback 사용
// Promise로 사용. 반환값 promise. callback 사용 안함

// 삭제하기(delete)
  deleteMany(filter , options, callback);
  deleteOne(filter, options ,callback);

//공통적으로 callback 함수를 인자로 정의하지않으면 promise 객체가 반환됨
```

---

## Mongoose module


- __MongoDB 기반의 ODM module__
- ODM : __Object Document Mapper__

- 특징 ?
  - schema 기반
  - Nosql database는 schema(타입의 대한 제약이 없는게 특징이지만 MongoDB ODM인 Mongoose는 프로그래밍을 통해서 입력된 데이터에 타입을 제약할 수 있는 특징이 있음.)
- 설치
```
$ npm install mongoose
```

- __database Connection__

```javascript
//데이터 베이스 연결
var mongoose = require("mongoose");
var url = "mongodb://localhost:27017/db";
mongoose.connect(url);

//연결과 이벤트

var db =mongoose.connection;
//Event list
db.on("error" , function(err){

});
db.on("disconnect" , function(err){

});
db.once("open", function(){});
```

- __Schema 와 Model__
  - 스키마와 모델
    - __Schema__ : document의 타입과 형태를 정의
  주로 비선형 데이터구조인 MongoDB는 Schema가 없지만
  모듈을 사용하여 언어적 차원에서 데이터타입을 정의 할 수 있게해줌으로써 선형자료구조도 효율적으로 다룰수있게되며, 또한 비선형자료도 NOSQL특성상 잘다룰수있게함.

    - __Model__ : schema 에서 정한 type을 통한 data Model 생성
  생성 후에 들어오는 데이터의 제약을 줄 수 있고 조회 및 삭제, 수정, 입력이 가능함.



- 예제
```javascript
var MovieSchema = mongoose.Schema({
  title: String,
  director : String,
  year : Number,
  synopsis : String
});

var Movie = mongoose.model("Movie" , MovieSchema);
```

- mongoose 모듈의 Schema Option
  - 스키마 옵션 지정시 {key(option Name), : value(Option value), }
  객체 선언 후 옵션을 여러개 줄 수 있음
  옵션이 자료형이라면 위와 같이 id : (data Type) 이런 형식으로 준다.
  - __type : 자료형을 지정함__
  - __required : 값이 True면 반드시 들어가야 하는 속성이 됨.__
  - __unique : 값이 True면 이 속성에 고유한 값이 들어가야 합니다.(RDBMS primary key 와 동일함.)__

- mongoose 모듈의 Data Type


  | Type | Data |
  | :------------ | :----------- |
  | String | 문자열 타입 |
  | Number | 숫자 타입 |
  | Boolean | 이진 타입 |
  | Array | 배열 타입 |
  | Buffer  | 버퍼타입 (바이너리 데이터를 저장 할 수 있음.) |
  | Date | 날짜 타입 |
  | ObjectId | 각 문서(Document)마다 만들어지는 ObjectId 를 저장 할 수 있음. |
  | Mixed | 혼합타입(구분이 없다.) |

- mongoose 모듈의 함수(CRUD 기준)
  mongoose 함수 (CRUD 기준)


  | 함수명 | 기능 |
  | :------------ | :----------- |
  | find("query", callback) | 조회 |
  | save(option , callback) | 저장 |
  | update("query" , doc , option , callback) | 수정 |
  | remove("query", callback) | 삭제 |
  | where("query") | 조건문 |

- __(remove는 document 단위로 삭제하기떄문에 document 가 아닌
  document 안에 내용중 일부를 삭제하고 싶을때는 update를 사용한다.)__

- 스키마 객체에 메소드 추가


  | 함수명 | 기능 |
  | :------------ | :----------- |
  | static(name , fn) | 모델객체가 사용할수있는 함수추가 |
  | method(name, fn) | 모델 인스턴스 객체에서 사용할수 있는 함수 추가 |


- 모델에서 document 생성 예제

```javascript
//모델에서 도큐먼트 생성
var avata = new Movie({title : "인터스텔라", director : "크리스토퍼 놀란", year:"2014"});


//데이터 베이스에 반영
Model.save([options],[options.safe],[options.validateBeforeSave], [fn]);

//생성 결과 callback
avata.save(function(){});

//promise 방식
avata.save().then(resolved , rejected);
```

---

### 포스팅 마치며...

- __실질적으로 MongoDB + Nodejs 로 간단한 웹 앱만드는게 대세이기때문에 nodejs에서 DB를 사용한다고하면 MongoDB 를 뺴놓고 이야기할 순 없을것같습니다. 그만큼 MongoDB 모듈에 기능에서 보았듯이 상당히 쓰기 편하고 또한 스키마까지 도입할 수 있는 ODM인  Mongoose 가 있는 만큼
node와 mongo의 조합은 강력한것같습니다.__


  - __위 소스코드는 T아카데미 Nodejs 서버개발 강의를 바탕으로 작성된 내용입니다.__
