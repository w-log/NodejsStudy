//클러스터
/*
javascript 는 싱글쓰레드 기반이기떄문에 멀티코어의 장점을 살릴 수 없다.
하지만 Nodejs 에서는 멀티코어의 장점을 살리기 위해서 - 클러스터 라는 개념이 이용된다.
Node.js 클러스터
 사용시 포트 공유 - 작성편리
 코어(프로세서)의 개수 만큼 사용


 클러스터링 : 마스터와 워커 프로세스
 마스터
  메인 프로세스
  워커 생성
워커
 보조 프로세스
 마스터가 생성

모듈 호출
 var cluster = require("cluster");

클러스터 생성( 마스터 )
  cluster.fork()
구분하기
  cluster.isMaster
  cluster.isWorker
*/

//대략적인 구조

// var cluster = require("cluster");
//
// if ( cluster.isMaster ) {
//     //마스터코드
//     cluster.fork();
// }else{
//     //워커 코드
// }

/*
클러스터의 이벤트
on("fork");
on("online");
on("listening");
on("disconnect");
on("exit");

워커의 이벤트
on("message")
on("disconnect


워커 접근
cluster.worker
워커 식별자
worker.id


워커 종료
worker.kill([signal="SIGTERM"])
*/
// 클러스터 생성과 동작
var cluster = require("cluster");
var worker;
if ( cluster.isMaster ) {
    //마스터코드
    cluster.fork();
    cluster.on("online", function(){
        console.log("Worker # %s is Online",worker);
    });
    cluster.on("exit", function(){
        console.log("Worker # %s is exit",worker);
    });
}else{
    //워커 코드
    worker = cluster.worker;
    //워커 종료
    worker.kill();
}

/*
마스터가 워커에게 데이터 전달
worker.send(data);

워커의 데이터 이벤트
worker.on("message", function(data){

});


마스터와 워커 파일분리
cluster.setupMaster([settings]);
exec:워커 파일
args:실행 파라미터

마스터 - fork
cluster.setupMaster({
  exec:"worker.js";
});

cluster.fork();
*/
