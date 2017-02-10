//console 객체 알아보기
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



//console.time
//시작시점 console.time(TIMER_NAME);
//종료시점 console.timeend(startTIMER_NAME);
console.time("SUM");
var sum = 0;
var count = 0;
for (var i = 1; i <= 10000000; i++) {
    sum += i;
    count++;
}
console.log(count);
console.log(sum);
console.timeEnd("SUM");
//등차수열 (연산횟수 * (시작수 + 끝수))
console.time("SUM");
var x =1 , y= 10000000;
var yun = (x-1) + y;
var sum = (yun *(x + y)) / 2;
console.log(yun);
console.log(sum);
console.timeEnd("SUM");
