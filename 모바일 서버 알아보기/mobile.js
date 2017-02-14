// mobile json server 생성해보기 XML

var http = require("http");

var movie_list = [{title : "아바타"  , director : "제임스 카메론"}];

http.createServer(function(req , res){
    if ( req.method.toLowerCase() === "post" ){
          var buffer = "";
          req.on("data" , function(data){
                buffer += data;
          });

          req.on("end" , function(){
              console.log(buffer);
              var data = JSON.parse(buffer);
              movie_list.push(data);
              res.writeHead(200, {"Content-Type" : "application/json"});
              res.end(JSON.stringify({result : "success"}));
          });
    }
    else{
        var data = {
            count : movie_list.length,
            result : movie_list,
        };
        res.writeHead(200, {"Content-Type" : "application/json"});
        res.end(JSON.stringify(data));
    }
}).listen(8000);
/*
기존에 이미 알고있던 내용이기때문에 가볍에 되새기면서 넘어간다.
*/
