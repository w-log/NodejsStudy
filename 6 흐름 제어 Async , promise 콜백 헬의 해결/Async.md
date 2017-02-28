# Async 비동기의 흐름제어


### Promise 알아보기

- ES 6이후부터 Promise는 ES6 표준으로 채택되었음으로 Node.js 4.x버전이후는 모듈의 로딩이 따로 필요없다.


- promise 의 상태


  | 상태 | value |
  | :------------: | :------------: |
   | pending | 초기 상태 |
  | fulfilled | 비동기 동작 성공  |
  | rejected | 동작 실패 |


- 문법
```javascript
 new Promise(function(fulfilled, reject){
     //비동기 동작
     function(err , result){
       if ( err ){
         reject(err);
       }else {
         fulfilled(result);
       }
     }
 });
 ```
- Promise 를 사용하는 태스크 방법
```javascript
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
//실제로 많이 써볼것을 권장!
```

---

## Async Module
- Promise는 사용목적이 비동기 흐름제어를 하기위해서만은 아니지만 주로 흐름제어하는곳에 자주쓰인다.
- 이번에 볼 Async 모듈은 Nodejs에서 비동기 흐름제어만을 하기위한 모듈이다.

-  콜백의 흐름제어
- Async 모듈 알아보기


| 행위 순서 제어 |
| :------------: |
| series  |
| seriesEach   |  
| parallels |
| waterfall |

| 컬렉션(배열, 객체) |
| :------------: |
| each  |
| forEachof   |  
| map |
| filter |



- __series 알아보기__
  - 다음 콜백함수로 결과 값을 넘길 수 없으며,
  - 최종 결과를 수행하는 콜백에서 모든 콜백함수의 결과를 배열로 담아서 결과를 인자로보냄.

```javascript
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
```

- __waterfall 알아보기__
  - 다음 콜백함수로 결과 값을 넘길 수 있으며,
  - 최종 콜백에서 결과 값은 마지막 콜백함수에서 호출한 콜백의 파라메터로 보낸값이다.
```javascript
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
```
- __parallel 알아보기__
  - 첫번쨰인자로 배열안에 넣은 콜백들이 모두 동시에 실행되며,
  - 최종 콜백함수에 결과 값은 모든함수 콜백을 호출했을때 넘긴 결과값의 배열이거나, 에러가 났을시에는 Error객체를 배열로 받을 수 있다.


```javascript
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
```

- 간단한 예제보기
```javascript
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
        callback(null , "task2결과");
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
```

---

### 포스팅 마치며..

  - __간단하게 비동기의 흐름제어에 대해서 알아보았다.
  Promise의 자세한 내용은 API 문서를 참조해보면 더 도움이 될것같다. 여기서 다루는 수준은 간단한 비동기 흐름제어 이기때문이다.
  콜백의 중첩시 생기는 코드의 가독성문제는 생각보다 별거 아닌것같지만 협업을 하는데에 있어서는 생각보다 치명적이기떄문에 Async 혹은 promise 둘중에 하나는 반드시 쓰는법을 배워서 실습을 하면서 계속 써보는게 좋은방향인것같다.__



__위 소스코드는 T아카데미 Nodejs 서버개발 강의를 바탕으로 작성된 내용입니다.__
