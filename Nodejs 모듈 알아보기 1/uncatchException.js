//예외 처리 되지않은 오류를 잡을경우에 프로세스가 죽음
// 이에러 이벤트에 대한 핸들러정의

process.on("uncaughtException", function(code){
    console.log("uncaughtException 떳다 앞으로 절대뜨게하면안된다. \n",code);
});

sayHello();
//예외처리되지않은 에러가 있어서는 안된다.
