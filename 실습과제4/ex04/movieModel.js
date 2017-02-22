var mongoose = require('mongoose');
var url = 'mongodb://localhost/Moviest';
mongoose.connect(url);
var conn = mongoose.connection;

conn.on('error', function(err) {
   console.error('Error : ', err);
});

conn.on('open', function() {
   console.log('Connect');
});

var MovieSchema = mongoose.Schema({
   title : String,
   director : String,
   year : Number,
   reviews : [String]
});

MovieSchema.methods.addReview = function(review) {
   this.reviews.push(review);
   return this.save();
}

var Movie = mongoose.model('Movie', MovieSchema);

module.exports = Movie;

// var movie1 = new Movie({title:'인터스텔라', director:'크리스노퍼 놀란', year:2014});
// movie1.save(function(err, result, rows) {
//    if ( err ) {
//       console.error('Error : ', err);      
//    }
//    else {
//       console.log('Success');
//    }
// });

// Movie.create({title:'아바타', director:'제임스 카메론', year:2010}).then(function fulfilled(result){
//    console.log('Success : ', result);
// }, function rejected(err) {
//    console.error('Error : ', err);
// });

// Movie.create({title:'스타워즈', director:'조지 루카스', year:1977}, function(err, result) {
//    if ( err ) {
//       console.error('Error : ', err);
//    }
//    else {
//       console.log('Success : ', result);
//    }
// });