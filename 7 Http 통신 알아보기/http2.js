// var http = require("http");
// var server = http.createServer().listen(8000);
// server.on("request" ,function(req , res){
//
//     console.log(req.method);
//     console.log(req.url);
//     console.log(req.headers);
//     res.end("hello nodejs");
// });
/*
request 요청 분석
req.IncomingMessage
message.url : 요청 url
message.method : 요청 method
message.headers: 요청 메세지의 헤더
message(streamable) : 요청 메세지 바디
*/

/*
response 요청 분석
res.IncomingMessage


상태코드와 메세지
res.statusCode
res.status.Message

메세지 헤더
res.writeHead(statusCode[,statusMessage],[,headers]);
res.removeHeader(name)
res.getHeader(name);
res.setHeader(name,value);

메세지 바디
res.end([data][,encoding][, callback]);
res.write(chunk[, encoding][, callback]);


상태코드 && 메세지 예제
//200 OK
res.statusCode = 200;
res.statusMessage="OK";

//404 Error
res.statusCode = 404;
res.statusMessage="Not found";
*/

var http = require("http");
var server = http.createServer(function(req , res){
    res.statusCode = 200;
    res.statusMessage="OK";
    res.setHeader("content-type", "text/plain")

    res.end("<h1>hello world</h1>");
}).listen(8000);
