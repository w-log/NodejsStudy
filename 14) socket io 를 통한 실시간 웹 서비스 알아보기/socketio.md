# socket.io
- ### 웹에서의 실시간 서비스
HTTP 방식의 한계와 Socket이 데스크탑 애플리케이션 혹은 모바일에서만 지원되었기때문에 브라우저에서 실시간 웹서비스를 사용하기 위한 다양한 기술시도가 있었으나.
  - ajax
  - polling
  - long poling
  - WebSocket

  위와 같은 기술을 시도했음에도 불구하고 다양한 웹브라우저의 지원되는 차이가 존재하기했으며, 하나의 기술stack으로, HTML5의 표준인 Websocket을 자유롭게 사용하지못했기때문에 socket.io라는 라이브러리가 등장했습니다.

- ### socket.io의 서버와 클라이언트 

  - __Server__
    1. HTTP 서버
    2. socket.io 서버
  - __Client (웹 브라우저)__
    1. HTTP 클라이언트
    2. socket.io 클라이언트
  - __서비스 시작__
    1. HTTP 서버준비
    2. socket.io 서버준비
    3. socket.io 클라이언트 요청 - HTML로 응답
    4. socket.io 클라이언트 초기화 및 서버접속
---
- ### 실시간 서비스를 위한 서버 준비
  - __Socket.io 서버 생성__
  ```javascript
  var express = require("express"); // express module
  var http = require("http"); //http module

  var app = express(); //express 객체 생성


  var server = http.Server(app); //http 서버의 request 요청을 express에서 응답하도록 express 객체 전달
  var io = require("socket.io")(server);//socket io서버를 생성하고 http 서버를 전달
  app.listen(8000);

  //io.on("connection", callback);
  ```
  - __서버의 socket.io 클라이언트 html 응답__
  ```javascript
  app.get("/" , function(req , res){
    res.send(__dirname + "/client.html");
  })
  ```

  - __Socket.io 클라이언트 준비__
    1. HTTP 서버에게 socket.io 초기화 HTML 요청
    2. HTML 로딩 - css, js , html 로딩
    3. socket.io 클라이언트 초기화
    4. socket.io 서버 연결
  - __Script Module 로딩__
  ```javascript
    <script src="/socket.io/socket.io.js"></script> //서버에 요청
    <script src="https://cdn.socket.io/socket.io-1.3.7.js"></script> //CDN 요청
    //클라이언트 소켓 클래스
    io(url:String , opts : Object):Socket // 전역객체

    //소켓 생성, 연결
    var socket = io();
    //Event list
    io.on("connect" , fn);
    io.on("error" , fn);
    io.on("disconnect" , fn);

    //재접속 Event ( 서버와 연결이 끊어지면 자동으로 재접속 )
    io.on("reconnect" , fn);
    io.on("reconnectiong" , fn);
    io.on("reconnect_error" , fn);
  ```
---
- ### 서버와 클라이언트 연결해보기

  - __Server__
  ```javascript
  var io = require("socket.io")(server);
  io.on("connection" , function(socket){// 응답객체 socket
      console.log("클라이언트가 접속했습니다.");
  });
  ```

  - __Client__
  ```javascript
  <script src="/socket.io/socket.io.js"></script> // socket io js 파일요청
  var socket = io();
  socket.on("connect", function(arg){
      console.log("server connect");
      //연결성공
  });
  ```
---
- ### 데이터 교환
  - __data 주고 받기 : Event 기반__
    - data 이벤트 정의

  - __data 전송__
     - 이벤트 발생 : socket.emit();
     ```javascript
      socket.emit("Event", data);
    //Event 기반의 비동기처리 이므로 callback 패턴을 사용함
     ```

  - __data 수신__
    - Event Listener 등록 : socket.on();
    ```javascript
     socket.on("Event", function(data){});
     //Event 기반의 비동기처리 이므로 callback 패턴을 사용함
    ```

- ### 예제코드
  - __Server__
  ```javascript
  io.on("connection" , function(socket){
    //클라이언트 소켓의 요청에 따라 연결되었을때

    socket.emit("hello" , {message : "Welcome to Socket io ~"});
    //hello 라는 이벤트 data객체에는 message라는 프로퍼티를 담아서 전송
    socket.on("howAreYou", function(data){
        var msg = data["message"];
    });
    //howAreYou 라는 이벤트를 등록하고 data 객체를 받아서 변수에 담는다.
  });
  ```

  - __Client__
  ```javascript
  var io = IO();

  io.on("connect" , function(socket){
    //서버의 응답에 따라서 Socket 연결되었을때
    socket.on("hello", function(data){
      var msg = data["message"];
    //hello 라는 이벤트를 등록하고  data 객체에서 message 라는 프로퍼티값을 변수에 담는다.
    });

    socket.emit("howAreYou" , {message : "Welcome to Socket io ~"});
    //howAreYou 라는 이벤트 data객체에는 message라는 프로퍼티를 담아서 전송
  });
  ```
  - __정리__
    1. Event로 메세지 주고받기
       - 서버에 Event로 등록  - 클라이언트에서 Event로 발생
       - 클라이언트 Event로 등록 - 서버에서 Event로 발생   
    2. 서버에서의 이벤트 발생
      ```javascript
      //소켓 하나에 이벤트 발생
      socket.emit("Direct Event" , {data : data});

      //연결된 모든 소켓에 이벤트 발생
      socket.io.emit("Broadcast Event" , {data : data});
      // io.emit 으로도 가능
      // emit은 인자로 javascrip object를 넘김
      ```
---


- ### 네임스페이스와 룸
  - __socket.io 기본 연결은 ?__
    - 소켓과 1:1
    - 모든소켓과 통신
    위와 같은 제약이 존재함
  - __1:N 통신하는 방법__
    - 개별 소켓과 1:1 통신 N번 반복
    - 네임스페이스
    - 룸

- ### 네임스페이스로 socket.io의 연결을 구분해보기
  - __네임스페이스로 구분__
    1. 같은 네임스페이스에서만 메시지 주고받음
    2. 기본 네임스페이스 : "/"
    3. 커스텀 네임스페이스 /name-space
    - 코드보기
    ```javascript
    //server
    var io = require("socket.io")(server);
    //client
    var socket = io();


    //----------------커스텀 네임스페이스 --------------
    //server
    var nsp = io.of("/custom-namespace");
    //client
    var nsp = io("/custom-namespace");
    ```
    - __통신과정(server)__
    ```javascript
    //기본 네임스페이스
    var io = require("socket.io")(httpServer);

    //네임 스페이스
    var system = io.of("/system");
    system.on("connection" , function(socket){
        console.log("System namespace");
    })
    system.emit("message" , "Notice !");
    ```

    - __통신과정(client)__
    ```javascript
    //cdn 설정후
    //기본 네임스페이스
    var socket = io();

    //커스텀 네임 스페이스를 이용한 연결

    var sysNsp = io.("http:/localhost:port/system");
    sysNsp.on("connect" , function(){
      console.log("System NameSpace connect !");
    });
    system.on("message" , function(data){
        alert("system message : " + data);
    });
    ```
- ### 룸(Room) 알아보기
  - __네임스페이스 내 채널__
  - __같은 룸에서만 데이터 교환__
  - __룸에 입장(join) , 여러 룸에 입장 가능__
  - __룸에서 떠나기 (leave)__
  ---
  1. __룸 접속/나가기__
  ```javascript
  //특정 룸에 입장
  socket#join(name:string [,fn:function]):socket
  //룸에서 떠나기
  socket#join(name:string [,fn:function]):socket
  ```

  2. __룸 이벤트__
  ```javascript
  //특정 룸에만 이벤트 발생
  socket#to(room:String):Socket
  ```
  3. __룸 입장/떠나기__
      - 서버에서 동작

---
- ### Room 예제코드
  - __Server__
  ```javascript
  //socket connection 이후
  var room;
  //채팅방 입장
  socket.on("joinRoom" , function(data){
      //기존 방에서 나오기
      socket.leave(room);

      //새로운 채팅방 입장
      room = data.room;
      socket.join(room);
  });
  //채팅 메세지. 룸으로(to) 전송
  socket.on("chatInput" , function(data){
      in.to(room).emit("chatMessage" , "채팅하고싶어요.");
  });
  ```
  - __client__
  ```javascript
  //socket connection 이후

  socjet.emit("joinRoom" , {room : "roomName"});

  //채팅 메세지 수신
  socket.on("chatMessage" ,function(data){
      var msg = data["msg"];
      var nickName = data["nick"];
      var str = nickName +" : " + msg;
      //채팅 메세지 누적
      $("#messages").append($("<li>").text(str));
  });
  ```
---
### 포스팅 마치며.

- 소켓프로그래밍은 초보개발자 입장에서는 매우 어렵게느껴지나 Socket.io는
  이벤트 기반의 비동기 처리의 특성을 통해 javascript를 기존에 알고있던사람이라면은 쉽게 사용 할 수 있도록 만들어진것같다.
  기존에 잠깐 스처지나가는식으로 한번사용해봤었는데 이번에 배워가면서 소켓내에서 1:N간의 통신이 가능하게 해주는 Namespace와 Room의 개념을 새로배웠으며, 저번에 사용하던 방식보다는 좀 더 심층적으로 사용할 수 있게된것같다.


  - __위 소스코드는 T아카데미 Nodejs 서버개발 강의를 바탕으로 작성된 소스코드입니다.__
