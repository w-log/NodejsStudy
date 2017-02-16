// Express를 이용해서 RESTful 서비스 작성
// 1. 영화 목록과 영화 상세보기 : JSON
// 2. 영화 리뷰 기능 추가 : JSON
// 3. 라우터 분리
// 4. 템플릿 적용

var express = require('express');
var bodyParser = require('body-parser');

var app = express();
app.set('view engine', 'ejs');
app.set('views', 'views');

// app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use(require('./movieRouter'));

app.get('/', function(req, res) {
	res.end('Welcome to Movies app');
});

app.use(handleError);

function handleError(err, req, res, next) {
   console.log('Error : ', err);
   res.status(err.code).send({msg:err.message});
}



app.listen(3000);
