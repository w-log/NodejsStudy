// 콜백의 흐름제어
//Async 모듈 알아보기
/*
행위 순서 제어
series, seriesEach
parallels
waterfall

컬렉션(배열, 객체)
each
forEachof
map,filter

*/
var async = require("async");
//series는 다음콜백함수로 결과 값을 넘길수 없으며
//최종 콜백함수에 배열에 담아서 결과값이 넘어옴.
async.series([
    function(callback){
        console.log("task1");
        callback(null,1);
    },
    function(callback){
        console.log("task2");
        callback(null,1);
    }
    //callback1
    //callback2
    //callback3
],function(err, result){
      console.log("완료 콜백");
      console.log(result);
});

//waterfall은 다음콜백함수로 결과 값을 넘길수 있다.
//최종 콜백함수에 결과 값은 마지먹전 콜백함수에서 호출한 콜백의 파라메터값
async.waterfall([
    function(callback){
        console.log("task1");
        callback(null,1);
    },
    function(arg,callback){
        console.log("task2",arg);
        callback(null,1);
    }
    //callback1
    //callback2
    //callback3
],function(err, result){
      console.log("완료 콜백");
      console.log(result);
});


//parallel 배열로 선언한 함수들이 모두 동시에 실행하며,
//최종 콜백함수에 결과 값은 모든함수가끝난후 결과값 혹은 에러배열을 파라메터로 받을수있다.
async.parallel([
    function(callback){
        console.log("task1");
        callback(null,"task1");
    },
    function(callback){
        console.log("task2");
        callback(null,"task2");
    },
    function(callback){
          console.log("task3");
        callback(null,"task3");
    }
    //callback1
    //callback2
    //callback3
],function(err, result){
      console.log("완료 콜백");
      console.log(result);
});
