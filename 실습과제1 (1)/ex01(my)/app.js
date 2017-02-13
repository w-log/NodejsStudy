var http = require("http");
var fs = require("fs");
var formidable = require("formidable");
var pathutil = require("path");


var movieData;
fs.readFile(__dirname + "/movie.json","utf8", function(error , data){
      if( error ) throw error;
      movieData = JSON.parse(data);
});

http.createServer(function(req , res){
    if(req.url ==="/favicon.ico"){
        return;
    }
    if(req.url === "/" && req.method.toLowerCase() === "get"){
      moivelist(req ,res);
    }
    else if(req.method.toLowerCase() === "get" && req.url.indexOf("/image") === 0 ){
        var path = __dirname + req.url;
        res.writeHead(200 , { "Content-Type" : "image/jpg"});
        fs.createReadStream(path).pipe(res);
    }else if(req.method.toLowerCase() === "post"){
        newMovieinsert(req, res);
    }
}).listen(8080);

function newMovieinsert(req ,res){
  var form = formidable.IncomingForm();
  form.uploadDir = __dirname + "/upload";

  form.parse(req, function(err , fields , files){
        // fields name : value
        // files name.path name.name
        var movie_obj = {};
        movie_obj.movie_name = fields.movie_name || "";
        movie_obj.movie_year = fields.movie_year || "";
        movie_obj.movie_director = fields.movie_director || "";
        var date = new Date();
        var newfilename = "image_"+ date.getHours() + date.getMinutes() + date.getSeconds();
        var ext = pathutil.parse(files.movie_poster_File.name).ext;
        movie_obj.movie_poster_URL = "/image/"+newfilename+ext;
        var newPath = __dirname + "/image/"+newfilename+ext;
        fs.renameSync(files.movie_poster_File.path , newPath);
        movieData.push(movie_obj);
        var filedata = JSON.stringify(movieData);
        console.log(filedata);
        fs.writeFile(__dirname + "/movie.json",filedata,"utf8",function(err){
            if ( err ) throw err;
            res.statusCode = 302;
            res.setHeader("Location", '.');
            res.end();
        });
  });
}

function moivelist(req , res) {

    res.write("<html><body>");
    res.write("<head><meta charset='UTF-8'></head>");
    res.write("<h1>영화 리스트</h1>");
    res.write("<ul>");
    for(var i = 0; i < movieData.length; i++){
      res.write("<li>");
      res.write("<img src='"+movieData[i].movie_poster_URL+"' />");
      res.write("<p>영화이름 : "+movieData[i].movie_name+"</p>");
      res.write("<p>출시년도 : "+movieData[i].movie_year+"</p>");
      res.write("<p>감독이름 : "+movieData[i].movie_director+"</p>");
      res.write("</li>");
    }
    res.write("</ul>");
    res.write("<form action='.' method='post' enctype='multipart/form-data'>");
    res.write("영화이름 : <input type='text' name='movie_name' ><br>");
    res.write("출시년도 : <input type='text' name='movie_year' ><br>");
    res.write("감독이름 : <input type='text' name='movie_director' ><br>");
    res.write("포스터 파일 : <input type='file' name='movie_poster_File' ><br>");
    res.write("<input type='submit' value='전송' ><br>");
    res.end("</body></html>");

}
