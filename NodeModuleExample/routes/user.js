//사용자 인증함수 : 아이디로 먼저 찾고 비밀번호를 그다음에 비교
var authUser = function (DB, id, password , callback) {
  console.log("authuser 호출됨.");


  // users 컬렉션 참조
  UserModel.findById(id , function (err,results) {
      if(err){
        callback(err, null);
        return;
      }

      console.log("아이디 [%s] 로 사용자 검색 결과" , id);
      console.log(results);
      if(results.length > 0){
        console.log("아이디와 일치하는 사용자 찾음");
        //2. 비밀번호 확인

        var user = new UserModel();
        console.log(user);
        var authenticate = user.authenticate(password , results[0]._doc.salt,
           results[0]._doc.hashed_password);

        if(authenticate){
            console.log("비밀번호 일치함");
            callback(null ,results);
        }else{
          console.log("비밀번호 일치하지 않음");
          callback(null, null);
        }

      }else{
          console.log("아이디와 일치하는 사용자를 찾지 못함");
          callback(null,null);
      }
  });
};


var addUser = function (DB , id, password , name, callback) {
    console.log("addUser 호출됨");
    //user 컬렉션 참조
    var users = new UserModel({"id" : id, "password" : password , "name" : name});
    //id , password , username을 사용해 사용자 추가
    users.save(function (err) {
        if( err ) {
          callback(err, null);
          return;
        }
        console.log("사용자 데이터 추가함.");
        callback(null , users);
    });
};


var login = function (req , res) {

    console.log("process/login 호출됨.");
    var paramId = req.body.id;
    var parampwd = req.body.pwd;
    console.log(paramId , parampwd);
    if (DB) {
      authUser(DB, paramId, parampwd, function (err, docs) {
        if(err) throw err;
        if(docs){
          console.dir(docs);
          res.writeHead('200',{'Content-Type' : 'text/html;charset=utf-8'});
          res.write("<h1>로그인 성공</h1>");

          res.write("<div><p>사용자 아아디 : " + paramId + "  비밀번호 : " + parampwd + " </p></div>");
          res.write("<div><p>사용자 이름 : "+ docs[0].name +" </p></div>");
          res.write("<br><br><a href='/public/login.html'>다시 로그인하기</a>");
        }else{
          res.writeHead('200',{'Content-Type' : 'text/html;charset=utf-8'});
          res.write("<h1>로그인 실패</h1>");
          res.write("<div><p>아이디하고 비밀번호를 다시확인해주세요.</p></div>");
          res.write("<br><br><a href='/public/login.html'>다시 로그인하기</a>");
        }
        res.end();
      });
    }else{
      res.writeHead('200',{'Content-Type' : 'text/html;charset=utf-8'});
      res.write("<h1>DB 연결 실패</h1>");
      res.end();
    }
};


var adduser = function (req, res) {
    console.log("process/adduser 호출됨!");

    let paramId = req.body.id;
    let paramPwd = req.body.password;
    let paramName = req.body.name;

    if(DB){
        addUser(DB, paramId , paramPwd , paramName , function (err , result) {
            if(err) throw err;
            if (result) {
                console.log(result);

                res.writeHead("200" , {"Content-Type" : "text/html;charset=utf8"});
                res.write("<h2>사용자 추가 성공</h2>");
                res.end();
            } else {
                res.writeHead("200" , {"Content-Type" : "text/html;charset=utf8"});
                res.write("<h2>사용자 추가 실패</h2>");
                res.end();
            }
        });
    } else {
        res.writeHead("200" , {"Content-Type" : "text/html;charset=utf8"});
        res.write("<h2>DB 연결 실패</h2>");
        res.end();
    }

};

var listuser = function (req, res) {
    console.log("/process/listuser 호출됨");

    if(DB) {
        UserModel.findAll(function (err , results) {
            if (err) {
                callback(err, null);
                return;
            }
            if (results) {
                console.log(results);
                res.writeHead("200", {"Content-Type" : "text/html;charset=utf8"});
                res.write("<h2>사용자 리스트 </h2>");
                res.write("<div><ul>");

                //자료 갯수만큼 반복
                for (var i = 0; i < results.length; i++) {
                  var curId = results[i]._doc.id;
                  var curName = results[i]._doc.name;
                  res.write("<li>#" + i + " : " +  curId + ", " + curName + "</li>");
                }
                res.write("</ul></div>");
                res.end();
            }else{
                res.writeHead("200" , {"Content-Type" : "text/html;charset=utf8"});
                res.write("<h2>사용자 리스트 조회 실패</h2>");
                res.end();
            }
        });
    }
};


var DB,UserSchema,UserModel,
init = function(db,schema, model){
    console.log("init 호출됨");
    DB = db;
    UserSchema = schema;
    UserModel = model;
};


exports.init = init;
exports.login = login;
exports.adduser = adduser;
exports.listuser = listuser;
