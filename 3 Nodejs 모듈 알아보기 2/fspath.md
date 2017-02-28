# Node.js 기본모듈인 fs, path 모듈 알아보기


## fs 모듈
- 특징
  - Nodejs에서 파일을 쓰고 읽는 기능을 하는 모듈임.
  - fs 모듈은 모든플랫폼에 100% 호환되지않음.
  - 비동기와 동기 방식 함수 모두제공 ( fs 모듈에만 해당하는건 아님 )
  - 비동기 방식 : callback 형태 non-blocking 방식
  - 동기식
    - 네이밍 규칙 : 함수명 + Sync  예) fs.readFileSync
    - 블록(block)방식 - 성능상 주의
    - 반환값을 이용함 ( return file; )
- 간단한 사용예제
```javascript
var fs = require("fs");

//비동기 방식
var dataASync;
fs.readFile("./path.js","utf8", function(error, data){
    if(error) throw error;
    dataASync = data;
    console.log(data);
    console.log("비동기 콜백 실행완료");
});

// 동기방식
var dataSync = fs.readFileSync("./path.js","utf8");
console.log(dataSync);
console.log("동기적 실행완료");


//동기식 에러처리
try {
    var data = fs.readFileSync("./path.js" , "utf8");
}
catch ( exception ){
    console.error("Readfile Error : ",exception);
}


//비동기식 에러처리
fs.readFile("none_exist.txt", "utf8", function(error, data){
  if ( error ){
      //에러시 호출될영역
      console.log("비동기 처리 에러영역");
  }else{
    //정상처리 영역
    console.log("비동기 정상처리");
  }
});
```

### 파일 다루기


- 파일 디스크립터로 파일다루기
```javascript
fs.read(fd,buffer , offset,length , positon, callback);
fs.readSync(fd,buffer , offset, length, positon);
```
- 파일 경로로 다루기
```javascript
fs.readFile(filename,[,options], callback);
fs.readSync(filename,[,options]);
```

- 디스크립터 예제
```javascript
var fd = fs.openSync("path",flags[, mode]);
fs.open(path,flags[,mode],function(err,fd){
    //value
});
//flags  r = "읽기", w = "쓰기" , a = "추가"..
```

- 파일 읽기 메소드
```javascript
fs.read(fd , buffer , offset , length , positon , callback);
fs.readFile(filename,[, options], callback);
fs.readFileSync(filename[,options]);
```


- 파일 닫기 메소드
```javascript
fs.close(fd,callback);
fs.closeSync(fd);
```



- 파일 읽기 예제 파일디스크립터 (__sync__)
```javascript
var fd= fs.openSync(file,"r"); flag read
var buffer = new Buffer(10);

var byte = fs.readSync(fd,buffer,0 , buffer.length , 0);
console.log("File Contenst : ",buffer.toString('utf-8'));

//파일 디스크립터 닫기
fs.closeSync(fd);
```

- 파일 읽기 예제 파일디스크립터 (__async__)
```javascript
fs.open(file,"r", function(err,fd2){
    var buffer2 = new Buffer(20);
    fs.read(fd2,buffer2 , 0 , buffer2.length , 10 , function(err , byteRead,buffer){
        console.log("File Read",byteRead , "bytes");
        console.log("File Content : ", buffer.toString("utf-8"));

        fs.close(fd2 , function(err){console.log(err)});
  });
});
```


- 파일 상태 - 존재 확인 (비동기)
```javascript
fs.access(path[, mode],callback);
fs.accessSync(path[,mode]);
var file = "";
fs.access(file , fs.F_OK | fs.R_OK , function(err){
    if ( err ){//에러처리};
    fs.readFile(file,"utf-8" , function(err ,data){
        if(err){};
        console.log(data);
    });
});
```

- 파일 상태 - 존재 확인 (동기)
```javascript
try{
    fs.accessSync(file,fs.F_OK)
    console.log(파일 접근 가능);
    var data = fs.readFileSync(file,"utf8");
    console.log("파일 내용 : ", data);
}
catch ( exception ){
    //파일없음
    console.log("존재 하지않는 파일임", exception);
}
```

- 파일상태 확인 (__Sync__)
```javascript
try{
 var stats = fs.statSync(file);
 console.log("Create : ", stats.birthtime);
 console.log("size : ",stats.size);
 console.log("isFile",stats.isFile());
 console.log("isDirectory : ",stats.isDirectory());
}
catch( err ){
 console.error("파일 접근 Error : ", err);
}
```


- 파일상태 확인 (__Async__)
```javascript
fs.stat(file , function (err, stats) {
    if(err){console.error("file stats Error",err);
      return;
    }
    //상태 확인 후 읽기
    if ( stats.isFile() ){
      fs.readFile(path , "utf-8" , function (error , data) {
          console.log("파일 읽기 : " ,data);
      })
  }
})
```


- 파일 쓰기
  - fd , filename : 파일 디스크립터, 파일 경로
  - data : 문자열 혹은 buffer
  - enconding : 문자열 저장 시 인코딩

```javascript
fs.write(fd , data[, positon[,encoding]], callback);
fs.writeFile(filename , data[, options], callback); (Async)
fs.writeFileSync(filename,data[, options]);
// 같은파일 이름일 경우에는 덮어씀.
```

- 기존파일에 내용추가

```javascript
fs.appendFile(file,data[,options],callback);
fs.appendFileSync(file,data[,options]);
// 위에서 파일이 없는경우 새 파일 생성;
```

- 스트림 만들기

```javascript
//읽기 스트림
fs.createReadStream(path,[,options]);
//쓰기 스트림
fs.createWriteStream(path,[,options]);
```


### 실습예제

- Async
```javascript
var fs = require("fs");
fs.readFile("./helloWorld.txt", "utf-8", function(error,data){
    if( error ){
        console.error("에러났다",error);
        return;
    }
    console.log("ASync Read File : " , data);
});
```

- sync

```javascript
try{
  //Sync
  var data = fs.readFileSync("./helloWorld.txt", "utf-8");
  console.log("Sync readFile : ",data);
}
catch( exception ){
    console.error(exception);
}
```


### 버퍼

- 파일에서 얻기
```javascript
//파일에서 얻기
var fileBuffer = fs.readFileSync("./helloWorld.txt");
```


- 네트워크에서 얻기
```javascript
socket.on("data",function (data) {
  //data - buffer
});
```
- __buffer 객체 메소드__
```javascript
buffer.length //buffer 길이
buffer.fill(value[, offset][,end]); //buffer 채우기
buffer.slice(start, end); //buffer 자르기
bufffer.compare(otherBuffer)// buffer 비교하기
buffer.copy(targetBuffer[, targetStart][,sourceStart][,sourceEnd]) //buffer 복사하기
```


- 문자열 - 바이너리 데이터로 다루기
  - 문자열 인코딩 필요 - ascii, utf-8 등등
  - 잘못된 인코딩 ▶ 에러


```javascript
// 문자열에서 버퍼 생성
new Buffer(str[, enconding]);
//버퍼에 문자열 쓰기
buffer.write(String , [, offset][, length][, encoding]);
//문자열 변환
buffer.toString([encoding][,start][,end]);
```

- 버퍼 - 데이터 읽기/쓰기

```javascript
//타입별로 사용가능
buffer.readInt8(offset[,noAssert]);
buffer.writeInt8(value , offset[, noAssert]);
```

---


## path Module

- Nodejs 전역 변수(global)
  - __filename 현재 실행경로 + filename
  - __dirname  현재 실행경로를 가지고있는변수
  - Nodejs가 컴파일이 실행되고있는 파일 기준인걸 기억해야함


- 같은 폴더 내 이미지 경로
```javascript
var path = __dirname+"/image.png";
```


- path 모듈 호출
```javascript
var path = require("path");//path 모듈 호출 commonjs 문법
```

- 경로 구성요소얻기
```javascript
path.basename(); //파일이름 , 경로 중 마지막요소 반환
path.dirname() // 파일이 포함된 폴더 경로
path.extname() // 확장자 .css, .js, .html 등등
path.parse("/home/user/dir/file.txt"); //구성요소를 객체리터럴 시켜서 한번에 리턴함
return {
        root:"/",
        dir:"/home/user/dir",
        base:"file.txt",
        ext:".txt",
        name:"file",
      }
path.parse("/home/user/dir/file.txt").base // "file.txt"
path.parse("/home/user/dir/file.txt").name // "file"
//위와같이 반환됨
```


- 경로(path)만들기
```javascript
path.sep; // 슬래쉬
path.join(); // 슬래쉬 없이 경로명만 넣으면 자동으로 경로를 구성해줌
path.format();

console.log(path.sep);
var parsed = path.parse("/usr/tmp/local/image.png");
console.log(parsed);
console.log(parsed.base);
```
