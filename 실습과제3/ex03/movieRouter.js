var express = require('express');
var router = express.Router();
var pool = require('./dbConnect');

router.get('/movies', showMovieList);
router.post('/movies', addMovie);
router.get('/movies/:movieId', showMovieDetail);
router.post('/movies/:movieId', addReview);
router.put('/movies/:movieId', editMovie);
router.delete('/movies/:movieId', deleteMovie);

function deleteMovie(req, res, next) {
   var movieId = req.params.movieId;
   pool.getConnection(function (err, conn) {
      conn.beginTransaction(function (err) {
         var sql1 = 'DELETE FROM reviews WHERE movie_id = ?';
         conn.query(sql1, movieId, function (err, result) {
            if (err) {
               err.code = 500;
               return next(err);
            }
            var sql2 = 'DELETE FROM movies WHERE movie_id = ?';
            conn.query(sql2, movieId, function (err, result) {
               if (err) {
                  conn.rollback();
                  conn.release();
                  err.code = 500;
                  return next(err);
               }

               res.send({ msg: 'success' });

               conn.commit();
               conn.release();
            });
         });
      });
   });
}

function editMovie(req, res, next) {
   var movieId = req.params.movieId;
   var title = req.body.title;
   var director = req.body.director;
   var year = parseInt(req.body.year);

   var info = {};
   if (title)
      info.title = title;
   if (director)
      info.director = director;
   if (year)
      info.year = year;

   pool.getConnection(function (err, conn) {
      var sql = 'UPDATE movies SET ? WHERE movie_id = ?';
      conn.query(sql, [info, movieId], function (err, results) {
         if (err) {
            err.code = 500;
            conn.release();
            return next(err);
         }

         res.send({ msg: 'success' });
         conn.release();
      });
   });
}

function addMovie(req, res, next) {
   var title = req.body.title;
   var director = req.body.director;
   var year = parseInt(req.body.year);

   var info = {
      title: title,
      director: director,
      year: year
   };

   pool.getConnection(function (err, conn) {
      if (err) {
         err.code = 500;
         return next(err);
      }

      var sql = 'INSERT INTO movies SET ?';
      conn.query(sql, info, function (err, result) {
         var movieId = result.insertId;
         res.send({ msg: 'success', movieId: movieId });
         conn.release();
      });
   });
}

function addReview(req, res, next) {
   var movieId = req.params.movieId;
   var review = req.body.review;

   pool.getConnection(function (err, conn) {
      if (err) {
         err.code = 500;
         return next(err);
      }

      var sql = 'INSERT INTO reviews SET ?';
      var info = {
         movie_id: movieId,
         review: review
      };
      conn.query(sql, info, function (err, result) {
         if (err) {
            err.code = 500;
            conn.release();
            return next(err);
         }
         res.send({ msg: 'success' });
         conn.release();
      });
   });
}

function showMovieList(req, res, next) {
   pool.getConnection(function (err, conn) {
      if (err) {
         err.code = 500;
         return next(err);
      }

      var sql = 'SELECT movie_id, title FROM movies';
      conn.query(sql, function (err, results) {
         if (err) {
            err.code = 500;
            conn.release();
            return next(err);
         }

         var movieList = {
            count: results.length,
            data: results
         };
         conn.release();
         res.send(movieList);
      });
   });
}

function showMovieDetail(req, res, next) {
   var movieId = req.params.movieId;

   pool.getConnection(function (err, conn) {
      var sql = 'SELECT * FROM movies WHERE movie_id = ?';
      conn.query(sql, movieId, function (err, results) {
         if (err) {
            err.code = 500;
            conn.release();
            return next(err);
         }

         if (results.length == 0) {
            res.status(404).send({ msg: 'Not Found' });
            conn.release();
            return;
         }

         var movieInfo = results[0];

         var sql2 = 'SELECT review FROM reviews WHERE movie_id = ?';
         conn.query(sql2, movieId, function (err, results) {
            if (err) {
               err.code = 500;
               conn.release();
               return next(err);
            }

            movieInfo.reviews = results;

            res.send(movieInfo);
            conn.release();
         });
      });
   });

}

module.exports = router;