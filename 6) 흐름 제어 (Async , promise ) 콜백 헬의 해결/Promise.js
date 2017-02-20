//Promise 알아보기
//ES 6이후부터 Promise는 ES6 표준으로 채택되었음으로 node4버전이후는 모듈의 로딩이 따로 필요없다.
//문법
/*
promise 의 상태
pending : 동작완료 전
fulfilled : 비동기 동작 성공
rejected : 동작 실패
*/
// new Promise(function(fulfilled, reject){
//     //비동기 동작
//     if ( err ){
//       reject(err);
//     }else {
//       fulfilled(result);
//     }
// });
/*Promise 를 사용하는 태스크 방법*/

function task(){
    return new Promise(function(fullfill,reject){
        if( 1 ) fullfill("Success");
        else reject("Error");
    });
}

task().then(function(result){
    console.log(result);
},function(error){
    console.error(error);
});


function task1(fullfill , reject) {
    console.log("task 1 start");
    setTimeout(function(){
        reject("task1결과");
    },300);
}

new Promise(task1).then(function(result){
    console.log("task1끝");
    console.log(result);
},function(error){
  console.error(error);
});
//실질적으로 Nodejs 코딩시에 많이 써볼것을 권장함.
