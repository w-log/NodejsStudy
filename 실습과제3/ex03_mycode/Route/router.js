var express = require("express");
var async = require("async");
var router = express.Router();

router.get("/movies", function(req , res ){
    var pool = req.app.get("DB");
    async.waterfall([

      function(callback){
          pool.getConnection(function(err, conn){
              if(err) {
                callback(err,null);
                return;
              }
              callback(null,conn);
          });
      },

      function(conn,callback){
          conn.query("select * from movies", function(err , results){
            if(err) {
              conn.release();
              callback(err,null);
              return;
            }
            conn.release();
            callback(null, results);
          });
      },
  ],

  function(err, result){
    if(err) {
      console.error(error);
      return;
    }
    if(result){
      res.setHeader("content-type","application/json");
      res.send(result);
    }else{
      res.setHeader("content-type","text/html");
      res.send("<h1>404 Not Found</h1>");
    }
  });
});


router.get("/movies/:movie_id", function(req , res ){
    var pool = req.app.get("DB");
    var movie_id = req.params.movie_id;
    async.waterfall([

      function(callback){
          pool.getConnection(function(err, conn){
              if(err) {
                callback(err,null);
                return;
              }
              callback(null,conn);
          });
      },

      function(conn,callback){
          var sql = "select * from movies where movie_id = ?";
          conn.query(sql, [movie_id], function(err , results){
            if(err) {
              conn.release();
              callback(err,null);
              return;
            }
            var param = {
              "conn" : conn,
              "result" :results[0]
            };
            callback(null, param);
          });
      },
      function(param, callback){
        var conn = param.conn;
        var sql = "select * from reviews where movie_id=?";
        conn.query(sql,[movie_id],function(err, result){
            if(err){
                conn.release();
                callback(err,null);
                return;
            }
            conn.release();
            if(param.result && result){
              param.result.review = result;
            }
            callback(null,param.result);
        });
      }
  ],

  function(err, result){
    if(err) {
      console.error(err);
      return;
    }
    if(result){
      res.setHeader("content-type","application/json");
      res.send(result);
    }else{
      res.setHeader("content-type","text/html");
      res.send("<h1>404 Not Found</h1>");
    }
  });
});





router.post("/movies", function(req , res){

    var pool = req.app.get("DB");
    var insertParams = req.body;
    async.waterfall([

      function (callback) {
          pool.getConnection(function(err , conn){
              if(err){
                  callback(err,null);
                  return;
              }
              callback(null, conn);
          });
      },
      function(conn , callback){
          var sql = "insert INTO movies SET ?";
          conn.query(sql , insertParams,function(err , result){
              if(err){
                  conn.release();
                  callback(err, null);
                  return;
              }
              conn.release();
              callback(null,result);
          });
      }

    ],function(err , result){
        if(err){
            err.errorcode = 500;
            res.send({status_code : 500, message : "failed", errormessage : "에러남."});
        }
        res.send({status_code : 200, message : "success"});
    });
});


router.post("/movies/:movie_id/review", function(req , res){

    var pool = req.app.get("DB");
    var insertParams = {
      movie_id : req.params.movie_id,
      review : req.body.review
    }
    async.waterfall([

      function (callback) {
          pool.getConnection(function(err , conn){
              if(err){
                  callback(err,null);
                  return;
              }
              callback(null, conn);
          });
      },
      function(conn , callback){
          var sql = "select * from movies where movie_id = ?";
          conn.query(sql ,[insertParams.movie_id],function(err , results){
              if(err){
                  conn.release();
                  callback(err, null);
                  return;
              }
              if(results.length > 0){
                callback(null,conn);
              }else{
                callback(new Error("존재하지않는 게시물입니다."), null);
              }
          });
      },
      function(conn , callback){
          var sql = "insert INTO reviews SET ?";
          conn.query(sql , insertParams,function(err , result){
              if(err){
                  conn.release();
                  callback(err, null);
                  return;
              }
              conn.release();
              callback(null,result);
          });
      }
    ],function(err , result){
        if(err){
            console.log(error);
            err.errorcode = 500;
            res.send({status_code : 500, message : "failed", errormessage : "에러남."});
        }
        res.send({status_code : 200, message : "success"});
    });
});




router.put("/movies/:movie_id", function(req , res){
    var pool = req.app.get("DB");
    var movie_id = req.params.movie_id;
    var updateParams = req.body;
    async.waterfall([

      function (callback) {
          pool.getConnection(function(err , conn){
              if(err){
                  callback(err,null);
                  return;
              }
              callback(null, conn);
          });
      },

      function(conn , callback){
          var sql = "select * from movies where movie_id = ?";
          conn.query(sql , movie_id,function(err , results){
              if(err){
                  conn.release();
                  callback(err, null);
                  return;
              }
              if(results.length > 0){
                callback(null,conn);
              }else{
                callback(new Error("수정할 컬림이 존재하지않습니다.") ,null);
              }
          });
      },

      function(conn , callback){
          var sql = "update movies set title=?, director=?, year=? where movie_id=?";
          conn.query(sql , [updateParams.title , updateParams.director , updateParams.year,movie_id], function(err , result){
            if(err){
                conn.release();
                callback(err, null);
                return;
            }
            callback(null,result);
          });
      }
    ],function(err , result){
        if(err){
            console.error(err);
            err.errorcode = 500;
            res.send({status_code : 500, message : "failed", errormessage : "에러남."});
        }else{
          res.send({status_code : 200, message : "success"});
        }
    });


});

router.delete("/movies/:movie_id", function(req , res ){
  var pool = req.app.get("DB");
  var movie_id = req.params.movie_id;
  async.waterfall([

    function (callback) {
        pool.getConnection(function(err , conn){
            if(err){
                callback(err,null);
                return;
            }
            callback(null, conn);
        });
    },

    function(conn , callback){
        var sql = "select * from movies where movie_id = ?";
        conn.query(sql , movie_id,function(err , results){
            if(err){
                conn.release();
                callback(err, null);
                return;
            }
            if(results.length > 0){
              callback(null,conn);
            }else{
              callback(new Error("삭제할 컬림이 존재하지않습니다.") ,null);
            }
        });
    },
    function(conn , callback){
        var sql = "delete from reviews where movie_id = ?;";
        conn.query(sql ,[movie_id], function(err , result){
          if(err){
              conn.release();
              callback(err, null);
              return;
          }
          callback(null,conn);
        });
    },
    function(conn , callback){
        var sql = "delete from movies where movie_id = ?;";
        conn.query(sql ,[movie_id], function(err , result){
          if(err){
              conn.release();
              callback(err, null);
              return;
          }
          conn.release();
          callback(null,result);
        });
    }
  ],function(err , result){
      if(err){
          console.error(err);
          err.errorcode = 500;
          res.send({status_code : 500, message : "failed", errormessage : "에러남."});
      }else{
        res.send({status_code : 200, message : "success"});
      }
  });
});

module.exports = router;
