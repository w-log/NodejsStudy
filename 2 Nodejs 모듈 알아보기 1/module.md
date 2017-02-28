# Node.js 기본 모듈, 전역 객체 알아보기

## 기본 모듈

- __프로세스 환경 기본 모듈__
  1. os
  2. process
  3. cluster
  - os와 process는 전역객체라서 모듈로드 안해도 사용가능함



- __파일과 경로 URL 관련 기본모듈__
  1. fs
  2. stream
  3. path
  4. URL
  5. queryStream



- __네트워크 관련 기본모듈__
  1. http,https
  2. net
  3. dgram
  4. dns



- 기본 모듈 ?
  - 별도의 설치과정 없이 사용 할 수 있는 모듈로 Node.js와 함께 설치된다.
- 전역객체 ?
  - global 모듈에 속하는 객체와 함수로 모듈로딩 과정없이 사용할 수 있다.
    1. console
    2. Timer
    3. __dirname,__filename
    4. process 등이 있음.



---



## console ?


- 콘솔화면에 내용출력 실행시간 체크등 여러가지를 할 수 있는 객체

- console 객체 알아보기

```javascript
var intValue = 3;
console.log("int Value" + 3);
console.log("int Value",intValue);

var Obj = {
    irum : "taewoong",
    nai : "24"
};
//아래의 차이점을 잘기억하자 + 는 문자열변환출력
//제대로된 로그는 ,를 사용하여 출력
console.log("obj : " + Obj);
console.log("obj : ", Obj);
```


- 로그 메시지 남기기
```javascript
//custom console
var fs = require("fs");
var Console = require("console").Console;
var output = fs.createWriteStream("stdout.log");
var errorOutput = fs.createWriteStream("error.log");
var log = new Console(output, errorOutput);
console.log(log);

log.info("info message");
log.log("log message");

log.warn("warning");
log.error("error message");
```


- console.time 시간을측정해주는 함수
```javascript
//시작시점 console.time(TIMER_NAME);
//종료시점 console.timeend(startTIMER_NAME);
console.time("SUM");
var sum = 0;
var count = 0;
for (var i = 1; i <= 1000; i++) {
    sum += i;
    count++;
}
console.log(count);
console.log(sum);
console.timeEnd("SUM");
```

- 등차수열 이용한 console.time 예제
```javascript
//등차수열 (연산횟수 * (시작수 + 끝수))
console.time("SUM");
var x =1 , y= 10000000;
var yun = (x-1) + y;
var sum = (yun *(x + y)) / 2;
console.log(yun);
console.log(sum);
console.timeEnd("SUM");
```


---

## Timer ?
  - 타이머 함수인 setTimeout() 이나 setInterval() 함수를 이용해서 일정 시간 뒤에
동작하거나 , 주기적으로 동작하는 기능을 작성할 수 있다.



- 간단한 예제보기 브라우저에서의 javascript와 같기떄문에 간단하게 보고넘김.
```javascript
//setTimeout 일정시간 이후에 함수 실행 (비동기)
function sayHello(asd, asd1){
    console.log("hello World",asd , asd1);
}
//바로 실행
sayHello("asd", "asdsdsadqwdqqd");
//3초뒤 실행
setTimeout(sayHello, 3000 , "setTimeout", "setTimeout");

//setInterval 일정시간마다 반복해서 실행(비동기)
setInterval(sayHello, 1000,"setInterval","setInterval");
//js의 대표적인 비동기처리 함수임
```

---

## Process ?


- process 전역객체 알아보기
```javascript
console.log(process.env); // 애플리케이션 실행환경을 담고있는 객체
console.log(process.version); // Node.js 의 버전 반환
console.log(process.platform); //cpu와 플랫폼 정보
console.log(process.argv); // 실행명령 파라미터
//그외에도 process.nextTick() 등 다양한것들이 존재한다.
```

- __process Event__

```javascript
process.on("exit",function(){
    //프로그램 exit이벤트
    console.log("exit 수행됨");
});
process.on("beforeExit",function(){
    //프로그램 exit 전 실행 이벤트
    console.log("exit 수행전이다.");
});
process.on("uncaughtException",function(){
    /*
    예외처리되지 않은 예외이벤트 왠만하면 사용을 권장하지않음 이게 실행되는건 프로세스 종료를 의미함.
    */
    console.log("uncaughtException 예외처리되지않은 에러 잡힘");
});
```


- process 함수
```javascript
process.nextTick(function(){
  //이벤트 루프내에 동작을 모두 실행 후 실행되는 함수
  //setTimeout(fn,0)과 동작 방식 비슷
  console.log("process nextTick 실행 !");
});
process.exit(); // 애플리케이션의 종료
```

---

## 유틸리티(__util__)
  - 형식 문자열을 작성 할 수 있었다
  - 클래스 간에 상속 관계를 만들 수 있다. (간단한 상속 구현가능)

- 간단한 예제보기


```javascript
var util = require("util");

//util 포맷 알아보기 c언어 printf와 비슷
var str1 = util.format("%d + %d = %d", 1,2, (1+2));
console.log(str1);

var str2 = util.format("%s %s", "hello","world");
console.log(str2);


//상속
//inherits
//util.inherits(constructor,superConstructor);
//사용방법
function Child(){
    this.name = "나는 자식 생성자";
}
function Parent(){
    this.name = "나는 부모 생성자";
}
Parent.prototype.sayHello = function(){
    console.log("hello. from Parent Class 안에 프로토타입 함수");
    console.log("hello. from %s Class",this.name);
};
util.inherits(Child , Parent);
var my = new Child();
var bumo = new Parent();
my.sayHello(); //hello. from 나는 자식생성자 Class
bumo.sayHello();  //hello. from 나는 부모생성자 Class
//js보다 객체 간 상속구현이 매우쉽게 되있는것같다. 자주쓰면좋을듯
```


---


## 이벤트(__Event__)
  - 이벤트를 다루는 EventEmitter의 특징과 이벤트를 다루는 방법을 알아봤다.
그리고 유틸리티 모듈의 상속을 이용해서 커스텀으로 작성한 타입에서도 이벤트를
다룰 수 있다.


- 호출방법
```javascript
var event = require("events").EventEmitter;
```

- 모듈의 속성이 Interface 타입이라면 EventEmitter이 존재한다.
```javascript
// addEventListener , on , once 가 존재함.
emiiter.once("event Name" , fn ); //이벤트 최초 한번만 실행
emitter.remove(event, listener); //이벤트삭제
emitter.removeAllListeners([array Events]); //인자로 넘긴이벤트 전부삭제
```


- 최대 이벤트 핸들러 개수 ( 기본 10개 )
```javascript
emmitter.setMaxListeners( number )// 최대 갯수 설정
emitter.getMaxListeners(); //최대 갯수 반환
```

```javascript
process.on("exit", function(arg){
    if (arg) console.log(arg);
    else  console.log("나 끈다 with on");
});

process.once("exit", function(arg){
    if (arg) console.log(arg);
    else  console.log("나 끈다 with once");
});
emitter.emit("eventName"[,arg][,arg2][,""]); // 이벤트 강제 발생
//arg :  Listener 함수의 파라미터
//emit 함수 호출 결과 : true = 이벤트 처리 , fasle = 처리 실패;
```

- 예제코드
```javascript
process.emit("exit");
process.emit("exit" , 0);
process.emit("exit" , 1);
```


- Custom Event 알아보기

```javascript
var event = require("events")
var customEvent = new event.EventEmitter();
customEvent.on("tick", function(){
    console.log("occur custom event");
});

customEvent.emit("tick");


//이벤트 콜백 처리방법
emitter.on("event", function (error , result) {
  if( error ) {
      //에러처리
      throws new Error(error)
  }else{
    //정상처리
  }
});
```

- __클래스에 이벤트 상속 예제__

```javascript
//클래스에 이벤트 상속알아보기
var Person = function(){console.log("Person 생성자다.")};
//상속
var util = require("util");
var EventEmitter = require("events").EventEmitter;
util.inherits(Person , EventEmitter);

//객체
var p = new Person();
p.on("howAreYou", function(myName){
    if ( myName ) console.log("나는 누구인가 : %s", myName);
    else console.log("나는 누구인지 모르겠다.");
});

//이벤트 발생시키기
p.emit("howAreYou","김태웅");
p.emit("howAreYou");

```

---



### 포스팅 마치며..

  - __기본 모듈에 대해서 알아보았다. 기록해두고 필요에 따라서 호출해서 쓰면될것같다.
  여기서 안나오는내용은 별도의 내용이 많아서 따로 분류해서 포스팅하겠습니다.__




  - __위 포스팅은 T아카데미 Nodejs 서버개발 강의를 바탕으로 작성된 내용입니다.__
