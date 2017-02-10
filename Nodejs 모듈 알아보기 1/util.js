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
my.sayHello();
bumo.sayHello();
//js보다 객체 간상속구현이 매우쉽게 되있는것같다. 자주쓰면좋을듯
