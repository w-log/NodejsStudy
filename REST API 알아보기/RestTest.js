/*
예제보기
( 영화 정보 제공 웹 서비스 )
컨텐츠 : 영화 정보
기본 URI : http://api.movie.com/movies
미디어 타입 : JSON
HTTP 메소드 : GET , PUT , POST , DELETE
*/
var http = require("http");
var fs = require("fs");
var data = fs.readFileSync("./movieData.json","utf8");
var movieList = JSON.parse(data);



var server = http.createServer(function(req, res){
    var method = req.method.toLowerCase();
    switch( method ){
        case "get" :
        // GET 요청 처리 : 영화 목록 보기, 영화 상세 정보보기
        // 영화 상세 정보 보기 : /movie/1 /movie/2
        handleGetRequest(req, res);
        return;
        case "post":
        // post 요청 처리 : 영화 정보 추가
        handlePostRequest(req, res);
        return;
        case "put":
        //영화정보 수정
        handlePutRequest(req, res);
        return;
        case "delete":
        //영화정보 삭제
        handleDeleteRequest(req, res);
        return;
        default:
          res.statusCode = 404;
          res.end("잘못된 요청입니다.");
          return;
    }
}).listen(8000);


function handleGetRequest(req , res){
    var url = req.url;
    if ( url === "/movies" ){
        var list = [];
        for(var i = 0 ; i < movieList.length; i++){
            var movie = movieList[i];
            list.push({ id: movie.id , title: movie.title });
        }

        //항목 갯수와 영화 목록 정보
        var result = {
            count : list.length,
            data : list
        };

        res.writeHead(200 , {"Content-Type" : "application/json;charset=utf-8"});
        res.end(JSON.stringify(result));
    }
    else{
        var id = url.split("/")[2];
        var movie = null;
        for (var i = 0; i < movieList.length; i++){
            var item = movieList[i];
            if (parseInt(id) === item.id){
                console.log(id);
                movie = item;
                break;
            }
          }
            if(movie){
                res.writeHead(200, {"Content-Type" : "application/json;charset=utf-8"});
                res.end(JSON.stringify(movie));
            }
            else{
              res.writeHead(404, {"Content-Type" : "application/json;charset=utf-8"});
              res.end(JSON.stringify({
                  errorCode : 404,
                  errorMessage : "검색된 영화정보가 없습니다."
              }));
            }
        }

    }
