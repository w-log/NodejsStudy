// var readline = require("Readline");

//모듈의 속성이 Interface 타입이라면 EventEmitter이 존재한다.
//addEventListener , on , once 가 존재함.
//emiiter.once("event Name" , fn ); 이벤트 최초 한번만 실행
// emitter.remove(event, listener);
// emitter.removeAllListeners([array Events]);

//최대 이벤트 핸들러 개수 ( 기본 10개 )
//emmitter.setMaxListeners(n 갯수 ) 최대 갯수 설정
//emitter.getMaxListeners(); 최대 갯수 반환

process.on("exit", function(arg){
    if (arg) console.log(arg);
    else  console.log("나 끈다 with on");
});

process.once("exit", function(arg){
    if (arg) console.log(arg);
    else  console.log("나 끈다 with once");
});


//이벤트 강제 발생 emitter.emit(event[,arg][,arg2][,"""]);
//event : Event Name;
//arg :  Listener 함수의 파라미터
//emit 함수 호출 결과 : true = 이벤트 처리 , fasle = 처리 실패;

//예
process.emit("exit");
process.emit("exit" , 0);
process.emit("exit" , 1);

//Custom Event 알아보기
var event = require("events")
var customEvent = new event.EventEmitter();
customEvent.on("tick", function(){
    console.log("occur custom event");
});


customEvent.emit("tick");


//이벤트 정의 참고사항

/*
emitter.on("event", function (error , result) {
    if( error ) {
    //에러처리
    throws new Error(error)
  }else{
    //정상처리
  }


})
*/
