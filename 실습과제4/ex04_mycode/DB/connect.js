var mongoose = require("mongoose");



function connect(dbName){
  if( typeof dbName === "string"){
    var dbUrl = process.env.MDBPATH + dbName;
    mongoose.connect(dbUrl);
    var DB = mongoose.connection;

    DB.on("open", function(){
      var self = this || DB;

      var Schema = mongoose.Schema({
        title : String,
        director : String,
        year : Number,
        review : Array
      });

      self.movieModel = mongoose.model("movies" , Schema);

    });

    DB.on("disconnected" , connect);
    DB.on("error" , console.error.bind(console , "mongoose connection error"));

    return DB;


  }else{
    console.error(new Error("DB Name 은 String이어야함"));
    return null;
  }
}


module.exports = connect;
