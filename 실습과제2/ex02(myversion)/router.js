var express = require("express");
var fs = require("fs");
var Router = express.Router();

var DB = fs.readFileSync("./exampleDB.json");

var movieList = JSON.parse(DB);
Router.get("/", function(req , res){
  res.render("index",{movieList : movieList});
});
Router.get("/movies/:mIndex", function(req , res){
    var index=parseInt(req.params.mIndex);
      if(movieList[index]){
        res.render("detail",{movieData : movieList[index]});
      }else{
        res.redirect("./");
      }
});

Router.post("/movies/:mIndex", function(req , res){
    var index = parseInt(req.params.mIndex);
    movieList[index].review.push({testScore : req.body.testScore,testReview : req.body.testReview});
    fs.writeFile("./exampleDB.json",JSON.stringify(movieList));
    res.redirect("/movies/"+index);
});



module.exports = Router;
