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
