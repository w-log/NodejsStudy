//Stream 알아보기

/*
읽기 스트림
모드 : flowing , paused
flowing mode
데이터를 자동으로 읽는 모드
전달되는 데이터를 다루지 않으면 데이터 유실

paused mode
데이터가 도착하면 대기
read() 함수로 데이터 읽기

Event list
readable : 읽기 가능한상태
data : 읽을 수 있는 데이터 도착
end : 더 이상 읽을 데이터가 없는 상태
close : 스트림이 닫힌 상태
error : 에러

쓰기스트림
Writable Stream (데이터 출력)
예
http 클라이언트의 요청
http 서버의 응답
파일 쓰기 스트림
tcp 소켓

//메소드
//인코딩 설정 , 데이터 쓰기
Writable.setDefaultEncoding(encoding);
writable.write(chunk[,encoding][, callback]);

//닫기
writable.end([chunk][,encoding][,callback]);

//버퍼
writable.cork();
writable.uncork();

Event list
drain : 출력 스트림에 남은 데이터를 모두 보낸 이벤트
error : 에러
finish : 모든데이터를 쓴 이벤트
pipe : 읽기 스트림과 연결(pipe)된 이벤트
unpipe : 연결(pipe) 해제 이벤트

표준 입출력 스트림
process.stdin : 콘솔 입력
process.stdout : 콘솔 출력
*/

//예제보기

var fs = require("fs");

var os = fs.createWriteStream("./output2.txt");

os.on("finish", function(){
      console.log("끝!");
});


var is = process.stdin;
is.pipe(os);
