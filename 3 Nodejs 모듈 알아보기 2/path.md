# Node.js 기본모듈인 path 모듈 알아보기


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


---



  - __위 포스팅은 T아카데미 Nodejs 서버개발 강의를 바탕으로 작성된 내용입니다.__
