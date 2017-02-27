## HTTP post 요청

- get method 와의 차이 ?

  | HTTP메소드 | 특징 |
  | :------------ | :----------- |
  | get | - URL로 요청 <br> - URL 길이 제한이 존재함. <br> - 암호화가 힘듬 = 보안 취약 <br> - Message body 분석 불필요 |
  | post  | - Message body로 요청정보 전달 <br> - 바디 분석 필요 |


- 웹 브라우저의 주소창을 이용한 URL 요청 방식은 = get method 방식
- 웹 브라우저내에 HTML 의 form tag를 통한 요청 방식 = get, post 방식 둘다 사용가능

- 폼 구성 요소 알아보기
-method : get, post
-action : 요청 경로


- post 요청 중복방지 (__post__ 요청 이후에 __rediretion__ 을 통해서 __get__ 요청을 한번 더 보내서 새로고침이후 중복실행이 안되게함 (__PRG패턴__) )
```javascript
req.on("end", function () {
    res.statusCode = 302;
    res.setHeader("Location",URL);
    res.end();
});
```


- 서버 요청 처리 코드 예제
```javascript
var http = require("http");
var queryString = require("querystring");
var movieList = [{ title : "스타워즈4" , director : "조지루카스"}];

http.createServer(function(req , res){
    if(req.method.toLowerCase() === "post"){
        addnewMovie(req, res);
    }
    else {
        showList(req,res);
    }
}).listen(8000);
function showList(req, res){
    res.writeHeader(200 , { "Content-Type" : "text/html; charset=UTF-8"});
    res.write("<html>");
    res.write("<meta charset='UTF-8'>");
    res.write("body");
    res.write("<h3>Favorite Movie</h3>");
    res.write("<div><ul>");
    movieList.forEach(function(item){
        res.write("<li>" + item.title + "(" + item.director + ")</li>");
    });
    res.write("</ul></div>");
    res.write("<form action='./' method='POST'>");
    res.write("<input type='text' name='title' placeholder='영화 제목'>");
    res.write("<input type='text' name='director' placeholder='영화 감독'>");
    res.write("<input type='submit' value='제출'>");
    res.write("</form>");
    res.write("</html>");
    res.end("</html>");
}

function addnewMovie(req, res){
  var buffer = '';
  req.on('data', function(chunk){
    buffer += chunk;
  });
  req.on("end" , function(){
    //바디 파싱
    var data = queryString.parse(buffer);
    var title = data.title;
    var director = data.director;
    // if ( errorcheck ){
    // }
    //목록 저장
    movieList.push({ title : data.title , director : data.director });
    //redirection
    res.statusCode = 302;
    res.setHeader("Location", './');
    res.end();
  });
}
```

---

## Multipart/form-data 타입의 Post 요청 처리해보기


### Multipart/form-data ?
  - 이름그대로 여러개의 파일을 구분자로 나눠서 메세지바디에 파트별로 분산시키는 요청 타입

- 파트 구분 정보
  - content-type 헤더 항목의 boundary 로 정의
  - 예
    - content-type : multipart/form-data;boundary=ssssssss
    - 메세지 바디 내 파트 구성
    - 파트 구분자 --(ssssssss)
    - 파트 인코딩
    - 파트 내 정보
     --ssssssss
     파트1
     --ssssssss
     파트2


- multipart form data 분석 모듈 ?
  - __formidable__ module
  - 설치

```
$ npm install formidable --save
```
- class
  - __Formidable.IncomingForm()__ : 요청 분석 클래스
  - __Formidable.File__ : 업로드된 파일 정보


- __IncomingForm__

```javascript
//Formidable Event list
Formidable.on("field",fn);
Formidable.on("file",fn);
Formidable.on("aborted",fn);
Formidable.on("end",fn);


Formidable.uploaDir // 업로드시에 저장될 경로
Formidable.keepExtension // 확장자 보존
Formidable.multiples // 다중 파일 업로드

//멀티파트 메세지 분석
Formidable.parse(req,fn(err,fields,files){})
fields // name - value Data
files // upload file datas
```

- __File__
```javascript
files.size 업로드된 파일의 크기
files.path 파일의 경로
files.name 파일의 이름
files.type 파일 타입
files.lastModifiedDate 최종 변경일
files.hash 해쉬 값
```


- 예제 코드
```javascript

//업로드 될 파일 경로
var uploadDir = __dirname + "/upload";

//이미지 파일경로
var imageDir = __dirname + "/image";
var http = require("http");
var formidable = require("formidable");
var pathUtil = require("path");
var fs = require("fs");

//업로드 된 데이터 목록
var paintList = [];

var server = http.createServer(function(req, res){
    if(req.url == "/" && req.method.toLowerCase() === "get"){
        showList(res);
    }
    else if (req.method.toLowerCase() === "get" && req.url.indexOf("/image") === 0){
        var path = __dirname + req.url;
        res.writeHead(200 , { "Content-Type" : "image/jpeg"});
        fs.createReadStream(path).pipe(res);
    }
    else if (req.method.toLowerCase() === "post"){
        addNewPaint(req,res);
    }
});
function showList(res){
    res.writeHeader(200 , {"Content-Type" : "text/html"});

    var body = "<html>";
    body += "<head><meta charset='utf-8'></head>";
    body += "<body><h3>Favorite Paint</h3>";
    body += "<ul>";
    paintList.forEach(function(item , index){
        body += "<li>";
        if(item.image){
            body += "<img src='" + item.image + "' style='height:100pt' />";
        }
        body += item.title;
        body += "</li>";
    });
    body += "</ul>";

    body += "<form action='.' enctype='multipart/form-data' method='post'>";
    body += "<div><label>작품 이름 : </label><input type='text' name='title'></div>";
    body += "<div><label>작품 이름 : </label><input type='file' name='image'></div>";
    body += "<input type='submit' value='upload'></form></body></html>";

    res.end(body);
}

server.listen(8000);

function addNewPaint(req, res){
    var form = formidable.IncomingForm();
    form.uploadDir = uploadDir;

    form.parse(req , function(err , fields , files){
        var imgtitle = fields.title;
        var image = files.image;
        console.log(image);
        var date = new Date();
        var newImageName = "image_" + date.getHours() + date.getMinutes() + date.getSeconds();
        var ext = pathUtil.parse(image.name).ext;

        var newPath = __dirname + "/image/" +newImageName + ext;

        fs.renameSync(image.path, newPath);

        var url = "image/" + newImageName + ext;
        var info = {
            title : imgtitle,
            image : url
        };
        paintList.push(info);
        // var newImageName = "image_" + data.
        res.statusCode = 302;
        res.setHeader("Location", '.');
        res.end();
    });
}
```

---
### 포스팅 마치며...

  - __Post에 대한 요청처리와 multipart/form-data 타입의 post 요청처리하는 방법을 알아보았다.
  기존에 이미 알던내용이었지만 multipart/form-data의 여러개의 파라메터가 어떻게 분산저장되는지 몰랐었는데
  구분자를 통한 여러개의 파트의 메세지바디가 형성된걸 알게된거는 큰소득인것같다.__



  - __위 소스코드는 T아카데미 Nodejs 서버개발 강의를 바탕으로 작성된 소스코드입니다.__
