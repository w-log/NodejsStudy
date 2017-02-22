var Router = require("express").Router();



Router.get("/movies", function(req , res){
    var Model = req.app.get("DB").movieModel;
    var movielist = Model.find();

    var promise = movielist.exec();
    promise.then(function(resolved){
        console.log(resolved);
        res.send(resolved);
    },
    function(rejected){
        console.error(rejected);
        res.send(rejected);
    }
  );
});

Router.get("/movies/:movie_id", function(req , res){
    var Model = req.app.get("DB").movieModel;
    var movie_id = req.params.movie_id;
    var movielist = Model.find({_id : movie_id});

    var promise = movielist.exec();
    promise.then(function(resolved){
        console.log(resolved);
        res.send(resolved);
    },
    function(rejected){
        console.error(rejected);
        res.send(rejected);
    }
  );
});



Router.post("/movies", function(req , res){
    var Model = req.app.get("DB").movieModel;
    var newData = req.body;
    newData.review = [];
    var newDocument = new Model(newData);
    var promise = newDocument.save();

    promise.then(function(resolved){
        res.send({status_code : 200 , msg : "성공적인 저장.", insertData : resolved});
    },
    function(rejected){
        res.send({status_code : 500 , msg : "에러." , error : rejected});
    });
});

Router.post("/review/:movie_id", function(req , res){
  var Model = req.app.get("DB").movieModel;
  var movie_id = req.params.movie_id;
  var params = req.body;
  var promise = Model.update({_id : movie_id},{$push : {review : params.review}});

  promise.then(function(resolved){
    res.send({status_code : 200 , msg : "성공" , updateData : resolved });
  },function(rejected){
    res.send({status_code : 500 , msg : "Error", updateData : rejected });
  });
});


Router.put("/movies/:movie_id", function(req , res){
    var Model = req.app.get("DB").movieModel;
    var movie_id = req.params.movie_id;
    var params = req.body;
    var promise = Model.update({_id : movie_id},params);

    promise.then(function(resolved){
        res.send({status_code : 200 , msg : "성공" , updateData : resolved });
    },function(rejected){
        res.send({status_code : 500 , msg : "Error", updateData : rejected });
    });
});

Router.delete("/movies/:movie_id", function(req , res){
    var Model = req.app.get("DB").movieModel;
    var movie_id = req.params.movie_id;
    var promise = Model.remove({_id : movie_id}).exec();

    promise.then(function(resolved){
        res.send({status_code : 200 , msg : "성공" , deleteData : resolved });
    },function(rejected){
        res.send({status_code : 500 , msg : "Error", deleteData : rejected });
    });

});


module.exports = Router;
