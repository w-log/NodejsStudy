//정적 파일 요청에 대한 응답해보기
//정적인 컨텐츠 (image 파일 , html 파일 , 음악 등) 요청
/*
 - 미리 작성된 파일로 응답

요청 방법
- http://myserver.com/myimg.png
- http://myservice.com/music.mp3

정적 파일 요청 : 응답
- 정적 파일 찾기
- 파일을 로드한 후 응답
fs 모듈
fs.readFile(FilePath , callback);

응답 메세지에 파일 내용 쓰기
이떄 image 타입과 html 타입등의 컨텐츠 타입이 서로 다름
주요 컨텐츠 타입
text/plain , text/html
application/xml , application/json
image/png, image/jpg
audio/mp3, video/mp4

스트림 파이프
입력 스트림 : fs.createReadStream()
출력 스트림 : res
fs.createReadStream(path).pipe(res);

정작 파일 서비스2
요청 URL의 경로를 실제 파일 경로 매핑
myServier.com/resource/image.png -> ./resource/image.png
myServier.com/resource/audio.mp3 -> ./resource/audio.mp3



*/
