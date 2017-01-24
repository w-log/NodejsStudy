module.exports = function () {
    return {id : "test01" , name : "소녀시대"};
};
/*
module.exports = exports
Nodejs 는 모듈을 읽어올떄 이런과정을 거친다.
exports는 그냥 빈객체지만
exports.aa = 1;

이런 exports 객체내에 프로퍼티속성을 정의를 하게되고 컴파일시에
module.exports = exports;
위와 같은 과정을 거친다.
또한 이 파일을 모듈로 호출할때
var module = require("./module");
console.log(module.aa);
이런식으로 접근이 가능하다.
단
module.exports = exports 이과정을 거치지만
그 전에
exports = {
 aa : 1,
}
이렇게 exports 객체를 초기화시키면
module.exports = exports 이 과정은 성립되지않는다.
이유는 위 구문에서
exports = {
 aa : 1,
}
이렇게 문법을 정의하면 exports 라는 새로운 네임의 변수를 정의한것과 똑같은효과임
자바스크립트 특성상 변수앞에 선언되는 var (혹은 let , const)를 붙이지 않고 선언되는 변수도
전역변수로 선언할 수 있기떄문에다.
exports 라는 전역객체가 단순 변수로 초기화되기때문에 모듈을 선언 할 떄 항상주의해야한다.

모듈 객체의 프로퍼티의 대한 정의가아닌
exports.aa = 1;
이런식이 아닌
exports = function (){
    이런식의 객체나 함수를 그대로 할당하는것이 필요하다면
};
module.exports = function (){

}
or
module.exports = {
  aa : 1;
}
이런식으로 해야한다.
*/
