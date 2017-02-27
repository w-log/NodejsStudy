
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
