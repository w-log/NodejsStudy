## 디버그

### 디버깅

  - Log Message 출력
```javascript
console.log("일반 로그 출력");
console.info("정보성 로그 출력");
console.warn("경고용 로그 출력");
console.error("에러 로그 출력");
```


  - __로그 외 다른 디버깅 방법__
    - 코드 단계 별 동작 확인
    - 실행 멈춤 - 브레이크 포인트
    - 특정 시점에서의 스택 상황
    - 스코프 내 변수의 값 확인

  - 디버깅 모드로 동작시키기
  ```
  $ node--debug
  $ node--debug-brk
  ```
  - 디버깅 모드로 동작 중
  ```
  $ node--debug server.js
  msg : Debugger listening on port (portNumber)
  ```


### Node-Inspector
 - __Webkit 기반 브라우저에서 Node.js app 동작 디버깅__


 - Github :  https://github.com/node-inspector/node-inspector
  ```
  $ npm install -g node-inspector
  ```

  - 디버깅 시작
  ```
  Node-debug[-brk] app.js
  ```
  - Node-inspector 실행, url 복사
  - 웹브라우저로 url 열기

  - __실행정보__
    - CallStack
    - Variables
    - Breakpoints



  - __Atom 혹은 VScode 처럼 에디터 자체에서 디버그를 지원해주는 경우도 있습니다.__
  
