/*
post 와 get 차이
get
- URL로 요청
- 길이 제한이 있음 , 암호화 불리

post
-Message body로 요청 정보 전달
-바디 분석 필요

웹 브라우저의 주소요청은 항상 GET 요청
웹 브라우저의 form 입력 : get / post 요청

폼 구성 요소
-method : post, get
-action : 요청 경로

post 요청 중복방지
req.on("end", function () {
    res.statusCode = 302;
    res.setHeader("Location",URL);
    res.end();
    post요청 이후에 redirection 으로 get 요청을 한번 더 보내주어서
    새로고침 후 중복 실행이 안되게 해야한다.
})

서버 요청 처리 코드 예제

*/
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
