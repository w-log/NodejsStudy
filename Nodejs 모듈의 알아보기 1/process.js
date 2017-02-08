/*process 전역객체 알아보기 */
console.log(process.env); // 애플리케이션 실행환경을 담고있는 객체
console.log(process.version); // Node.js 의 버전 반환
console.log(process.platform); //cpu와 플랫폼 정보
console.log(process.argv); // 실행명령 파라미터
//그외에도 process.nextTick() 등 다양한것들이 존재한다.
/*process Event */

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

//함수
process.nextTick(function(){
  //이벤트 루프내에 동작을 모두 실행 후 실행되는 함수
  //setTimeout(fn,0)과 동작 방식 비슷
  console.log("process nextTick 실행 !");
});
process.exit(); // 애플리케이션의 종료
