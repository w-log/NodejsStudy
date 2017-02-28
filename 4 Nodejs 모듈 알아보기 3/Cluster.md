

## 클러스터(Cluster) 모듈 알아보기

- 개요
  - javascript 는 싱글쓰레드 기반이기떄문에 멀티코어의 장점을 살릴 수 없다.
  - 하지만 Nodejs 에서는 멀티코어의 장점을 살리기 위해서 - __클러스터(Cluster)__ 라는 개념이 이용된다.


- __Node.js 클러스터__
  - 사용시 포트 공유 - 작성편리
  - 코어(프로세서)의 개수 만큼 사용


 - 클러스터링 : 마스터와 워커 프로세스
   - 마스터
     - 메인 프로세스
     - 워커 생성
   - 워커
     - 보조 프로세스
     - 마스터가 생성

- 모듈 호출
```javascript
 var cluster = require("cluster");
```
- 클러스터 생성( 마스터 )
```javascript
  cluster.fork();
```

- 구분하기
```javascript
  cluster.isMaster
  cluster.isWorker
```

- 대략적인 구조
```javascript
var cluster = require("cluster");

if ( cluster.isMaster ) {
    //마스터코드
    cluster.fork();
}else{
    //워커 코드
}
```

- 클러스터의 이벤트
```javascript
cluster.on("fork");
cluster.on("online");
cluster.on("listening");
cluster.on("disconnect");
cluster.on("exit");
```
- 워커의 이벤트
```javascript
Worker.on("message")
Worker.on("disconnect")
```

- 워커 접근
```javascript
cluster.worker
```
- 워커 식별자
```javascript
worker.id
```

- 워커 종료
```javascript
worker.kill([signal="SIGTERM"])
```
- 클러스터 생성과 동작
```javascript
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
```



- 마스터가 워커에게 데이터 전달
```javascript
master.send(data);
```

- 워커의 데이터 이벤트
```javascript
worker.on("message", function(data){
  //...
});
```


- 마스터와 워커 파일분리
```javascript
cluster.setupMaster([settings]);
//settings.exec:워커 파일
//settings.args:실행 파라미터
```
- 마스터 - fork
```javascript
cluster.setupMaster({
  exec:"worker.js";
});
cluster.fork();
```

---


### 포스팅 마치며..

  - __클러스터에 대해서 알아보았다. 실질적으로 가벼운 웹서비스에서는 사용하지않을것같으나
  차후에 필요하게되면 좀 더 심층적인 공부가 필요한 모듈인것같다.__




  - __위 포스팅은 T아카데미 Nodejs 서버개발 강의를 바탕으로 작성된 내용입니다.__
