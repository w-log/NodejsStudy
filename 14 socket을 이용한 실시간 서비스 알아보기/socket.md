## Nodejs를 통한 Socket 프로그래밍 (실시간서비스)
- 실시간으로 공연 예약서비스를 만든다 가정.
    1. 사용자가 선택한 공연정보 전달
    2. 예약가능한 공연 날짜와 좌석 정보
    3. 실시간으로 예약가능한 시간과 좌석 정보 반영
    4. 다른 사용자가 예약 -> 예약 좌석 상황 반영
    5. 실시간으로 가능한 자리 선택 후 예약

위와 같은 구성을 HTTP 프로토콜로 할 시에는 ?

  1. 공연 정보와 좌석 정보 요청 - 응답
  2. 자리 선택 후 예약 요청
  3. 다른사용자의 선예약으로 인한 예약 불가 응답
  4. 다른 자리 선택 후 예약 요청
---
### HTTP로 실시간 서비스 구현은 매우 힘들다.
  - 이유는 ?
      __1. 요청과 응답기반__ (요청이 가면 반드시 응답을 해주어야 하는 프로토콜의 구조)
      __2. 재요청까지 실시간 변동사항이 반영이 안됨.__

  __위와 같은 이유때문에 HTTP로 실시간 서비스 작성은 매우어렵다. 그렇기에 HTTP와 호환이 가능한 다른 프로토콜을 사용한다. TCP / UDP__

---
### TCP 통신
  - __네트워크 레이어 : Tranport Layer__
  - __스트림을 이용한 실시간 통신__
  - __소켓을 이용한 네트워크 프로그래밍__

__실시간 서비스 구현__
  __1. 소켓(Socket)__
  __2. 통신 접점(entry point)__
  __3. 소켓 프로그래밍__
  - 데이터 그램 소켓 : UDP
  - 스트림 소켓 : TCP

|          |      TCP      |  UDP |
|----------|-------------|------|
| 연결 |  연결 필요 | 연결 불 필요 |
| 신뢰성 |    신뢰성, 손실된 데이터 재전송   | 신뢰성 없음 |
| 데이터 흐름 | 혼잡도 제어 | 없음 |
| 속도 | UDP에 비해 느림 | 빠르다 |
| 적용 분야 | 신뢰성 있는 실시간 통신 | 속도 중시형 실시간 통신 (스트리밍 비디오 / 오디오) |
| 적용 프로토콜 | FTP,HTTP,SMTP |  DNS,DHCP,SNMP  |

---

### TCP
  - 연결지향이므로 연결 과정 필요
  - 연결 과정 ↓
    1. 서버 소켓 생성, 준비, 대기
    2. 클라이언트 소켓 연결, 소켓간 연결
    3. 데이터 교환
    4. 접속 끊기

__TCP 데이터 주고 받기__
  - 스트림 기반
    a. 보내기 : 스트림에 write
    b. 받기 : 스트림에 read
---
### UDP
- __TCP와 다른점__
  1. __비연결 지향.__ 연결 과정이 없다.
  2. __신뢰성 없음.__ 데이터 손실 가능. 패킷 확인, 재전송 없음
  3. __간단한 패킷__(데이터 그램)__구조.__ 빠른 전송
  4. __잘못 전송된 내용을 복구할 필요가 없는 실시간 통신__(예 스트리밍 오디오/비디오 등)


  ---
### Nodejs의 Net 모듈
  - __소켓 통신을 위한 기본 모듈 : net__
  ```javascript
  var net = require("net");

  // class
  net.Server //: socket server
  net.Socket //: socket
  ```
  - __서버 생성 code__
  ```javascript
  var server net.createServer([options][, connectionListner]);
  ```
  - __서버 함수__
  ```javascript
  server.listen(port[,host][, backlog][,callback])//클라이언트 접속 대기

  server.close([callback])//추가 접속을 받지않는다.

  server.getConnections(callback)//연결 갯수

  server.address() // 서버 주소 반환
  ```

  - __서버의 생성과 연결이벤트__
    - __code__
    ```javascript
      //server open callback
      var server = net.createServer(function(socket){
          console.log("Connect Event" , socket.remoteAddress);
      });

      // listening Event
      server.on("listening" , function(){
          console.log("Server is listening @", server.address());
      });

      // close Event
      server.on("close" , function(){
          console.log("Server Close");
      })
    ```
---
### 소켓 클라이언트
  - __소켓 생성과 연결__
  ```javascript
  var socket = new net.Socket();// TCP 소켓은 연결과정이 필요.
  var option = {
      host = "localhost",
      port = 3000
  };

  socket.connect(optionObject, function(){// 연결 함수

  });
  //net.Socket 이벤트
  socket.on("connect", fn); // 원격 소켓 연결 이벤트
  socket.on("data", fn); // 읽을 수 있는 데이터 도착 이벤트
  socket.on("end", fn); // 원격 호스트 소켓 종료 이벤트(FIN)
  socket.on("timeout", fn); // 제한시간 초과 이벤트
  socket.on("error", fn); // Error 이벤트

  //net.Socket 함수, 프로퍼티
  socket.connect(options[, connectListener]) // 연결
  socket.write(data[, encoding][,callback]) // 데이터 쓰기
  socket.end([data][, encoding]) // 연결 종료 신호 (FIN) 보내기
  socket.setKeepAlive([enable][, initialDelay]) // 연결유지
  socket.remoteAddress, socket.remotePort // 원격호스트 주소 , 포트
  ```
  - __net.Socket__ 데이터 쓰기
  ```javascript
  //클라이언트의 요청
  socket.write("Hello Node~");


  //서버에서의 대응
  socket.on("data", function(data){
      console.log(data)//데이터 도착 "Hello Node~"
  });
  socket.on("end", function(){
     // 원격 호스트의 종료
  })
  ```
---
### TCP 기반의 채팅 서비스
  - __채팅 서비스 준비와 연결__
    1. 서버 소켓 준비
    2. 클라이언트 소켓 연결
    3. 소켓을 이용한 데이터 교환

  - __채팅 서비스 만들기__
    - 1:N 데이터 전달
    - 채팅 관련 명령어 : 닉네임 변경, 1:1 대화, 채팅방 나가기 등등
    - 소켓을 이용한 서비스 : 데이터 전달 + 제어 명령어 전달

  - __클라이언트 접속 이벤트 - 소켓 배열 저장__
  ```javascript
  var clientList = [];
  var server = net.createServer(function(socket){
    // 소켓을 인자로 받음
    // 클라이언트와 접속한 소켓을 채팅 클라이언트 목록에 추가

    var nickname = "Guest" + Math.floor(math.round() * 100);
    //닉네임을 Guest +  1~ 101 까지 랜덤한 값을 지정함
    clientList.push({nickname : nickname , socket:socket});
    //client 라는 배열에 push함
  });


    //데이터 도착 이벤트 , 모든 소켓에 쓰기
    socket.on("data" , function(data){
    var message = data.toString("UTF-8");
      // 요청에 따라서 받은 데이터를 message 라는 변수에 담음
      clientList.forEach(function(client){
        //클라이언트리스트안이 들어있는 클라이언트 갯수의 배열만큼 반복문을 돌림.
        var socket = client.socket;
          //반복문의 index번쨰의 소켓을 변수에 담아서
          //위에서 받은 message 변수를 다른 클라이언트 모두에게 전달함
        socket.write(message);
          //이럴경우 모두에게 전달되지만 자신의 메세지와 다른사람의 메세지는 구분이 안되니 고려해야함.
      });
});
```
  - __소켓으로 전송되는 데이터__
    - 제어코드
    - 컨텐츠

  - __소켓으로 전송되는 제어코드__
    ```javascript
      if( message === "\\close"){
          //클라이언트 접속종료
          socket.end();
      }else if( message.indexOf("\\rename") != -1){
          //닉네임 변경요청
      }

    ```
---
### UDP프로토콜을 활용한 실시간 서비스

  - __UDP 모듈 : Datagram(dgram)__;
    1. 기본 모듈
    2. require("dgram");

  - __class__
    - dgram.Socket

  - __소켓 생성__
    - type : udp4 , udp6
    - dgram.createSocket(type[, callback]);

  - __함수 (Function)__
    ```javascript
    //특정 포트와 바인딩
    socket.bind([port] , [,address][,callback]);
    //데이터 전송
    socket.send(buf, offset, length, port, address[, callback]);
    //닫기
    socket.close([callback]);
    //멀티캐스트 그룹 가입
    socket.addMembership(multicastAddress[,multicastInterface]);
    //멀티 캐스트 그룹 탈퇴
    socket.dropMembership(multicastAddress[, multicastInterface]);
    ```

    - __TCP와 다른점__
      1. 서버 클라이언트 구분이 없다.
      2. 연결 과정이 없다.
      3. 스트림 방식이 아니다.

    - __소켓 생성__
    ```javascript
      var socket = dgram.createSocket("udp4");
    ```
    - __메세지 받기__
    ```javascript
      var socket = dgram.createSocket("udp4");
      socket.bind(3000);
    ```
    - __메세지 전송__
    ```javascript
    var message = new Buffer("hello");
    socket.send(message, O, message.length, PORT, ADDRESS, CALLBACK(err));
    ```

### 멀티캐스트 (multicast)
  - 그룹에 포함된 여러 호스트에게 메세지 보내기
  - 그룹에 가입 → socket.addMembership
  - 그룹에 탈퇴 → socket.dropMembership

__멀티캐스트용 IP 대역__
  - D 클래스 대역 : __224.0.0.0 ~ 239.255.255.255__

---
### 포스팅 마치며.

  - 소켓 프로그래밍 2가지 방식의 대해 알아보았다.
  하나는 TCP ,또 하나는 UDP방식이었고
  TCP와 UDP의 차이점을 잘 기억해두자
  예를 들면
  TCP는 소켓생성 후 연결이 필요하며,(UDP는 필요없음)
  데이터가 신뢰성이 있고(손실된 데이터는 재전송)
  속도는 UDP에 비해 느리다.
  반면에 UDP는 소켓생성이후 연결이 필요없으며,
  데이터는 신뢰성이 없다(이전데이터가 손실되더라도 다음데이터를 전달하게됨.)
  속도 중시형 실시간통신이며 스트리밍(음악/영상)에 많이 사용된다.
  __실제로 웹을 하면서 많이 만날일은 없겠지만 각 프로토콜간의 차이와 용도 사용법을 기억해두면 나중에 유용한 정보가 될것이며 필요하게되면 좀 더 심층적으로 공부를 해야 될 내용인것을 느낀다.__



  - __위 소스코드는 T아카데미 Nodejs 서버개발 강의를 바탕으로 작성된 내용입니다.__
