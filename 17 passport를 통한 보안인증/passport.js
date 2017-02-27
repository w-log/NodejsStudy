var express = require("express");
var bodyParser = require("body-parser");
var app = express();


var session = require("express-session");

app.use(bodyParser.urlencoded({extended : false}));
app.use(session({
  resave : false,
  saveUninitialized : false,
  secret : "Secret key"
}));

var passport = require("passport");

app.use(passport.initialize());
app.use(passport.session());

var LocalStrategy = require("passport-local").Strategy;
var strategy = new LocalStrategy(function(username , password, done){
    if( username === "user" && password === "1234" ) {
        var userinfo = {name : "김태웅", email : "user@gmail.com"};
        done(null, userinfo);
    } else {
        done(null, false, "로그인 실패");
    }
});
passport.use(strategy);

passport.serializeUser(function(user , done){
    console.log("세션에 기록하기");
    done(null, user);
});

passport.deserializeUser(function(user, done){
    console.log("세션에서 사용자 정보 읽기");
    done(null , user);
});

app.post("/login", passport.authenticate("local"), function(req, res){ res.send("success"); });
app.get("/personal", showPersonal);
app.listen(3000);

function showPersonal(req, res){
  var user = req.user;
  if ( user ){
      res.send("personal page" + user.name);
  } else {
      res.sendStatus(401);
  }
}
