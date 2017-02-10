//비동기의 효율적인 처리 보기
function task1(callback) {
    console.log("task 1 start");
    setTimeout(function(){
        console.log("task1끝");
        callback(null, "task1결과");
    },300);
}

function task2(callback) {
    console.log("task 2 start");
    setTimeout(function(){
        console.log("task2끝");
        callback(new Error("asd") , "task2결과");
    },200);
}
var async = require("async");

async.series([task1,task2],function(err, result){
    if ( err ){
        console.log(err);
        return;
    }
    console.log("비동기 순차 종료",result);
});
