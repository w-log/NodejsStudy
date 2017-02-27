/*
멀티파트를 사용하는 Post 요청 처리해보기
메세지 바디 기록 방식
multipart/form-data

파트 구분 정보
content-type 헤더 항목의 boundary 로 정의
multipart/form-data;boundary=ssssssss
메세지 바디 내 파트 구성
파트 구분자 --(ssssssss)
파트 인코딩
파트 내 정보
--ssssssss
파트1
--ssssssss
파트2
이런식

multipart form data 분석 모듈
formidable
npm install formidable --save

class
Formidable.IncomingForm : 요청 분석 클래스
Formidable.File : 업로드된 파일 정보


IncomingForm
  Event
  Formidable.on("field",fn);
  Formidable.on("file",fn);
  Formidable.on("aborted",fn);
  Formidable.on("end",fn);

  form.uploaDir 업로드시에 저장될 경로
  form.keepExtension 확장자 보존
  form.multiples 다중 파일 업로드

  멀티파트 메세지 분석
  form.parse(req,fn(err,fields,files){})
  fields : name - value Data
  files : upload file datas

File
file.size 업로드된 파일의 크기
file.path 파일의 경로
file.name 파일의 이름
file.type 파일 타입
file.lastModifiedDate 최종 변경일
file.hash 해쉬 값


*/
//예제 코드

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
