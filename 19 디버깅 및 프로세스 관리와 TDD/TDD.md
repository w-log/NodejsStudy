## 테스트 코드 작성

- __테스트 코드 작성__
  - 코드로 테스트하기
  - 테스팅 자동화

- __테스트 코드 작성 모듈 ?__
  1. assert
  2. should
  3. mocha

---

## assert module

- 특징?
  - Nodejs 기본모듈 (설치 X)
```javascript
  var assert = require("assert")
```

- 테스트하기
```javascript
//Boolean Test 참 , 거짓
assert.ok(value[, message]);

//동등 테스트 equal , ===
assert.equal(actual, exprected[, message]);

//에러 발생
assert.throws(block[, error][, message]);
```




### Ok Test 예제
```javascript
//성공코드
var assert = require("assert"); // module loading

var boolVal = true;
assert(trueValue);
// or
assert.ok(boolVal, "에러시 내보낼 메시지다.");

//실패코드
// 에러발생시 프로세스가 죽고 에러와 등록된 메세지 출력
var boolVal2 = false;
assert(boolVal2, "에러났는데 ?");
```
- 출력되는 에러메세지 예
```javascript
throw new assert.AssertionError({
  ^
AssertionError : 에러났는데 ?
})
```



### Equality Assertion 예제

```javascript
var assert = require('assert');

// 같은 객체 비교
assert.equal(actual, expected[, message]);
// 내용 비교
assert.deepEqual(actual, expected[, message]);
// === 비교
assert.strictEqual(actual, expected[, message]);
```

- __테스트코드 작성 예제__

```javascript
var intVal = 9;

assert.equal(intVal, 9, '다르다');
assert.equal(intVal, '9', '다르다');
assert.deepEqual(intVal, '9', 'deepEqual 다르다');
assert.strictEqual(intVal,'9','strictEqual 다르다'); // AssertionFail
```


---


## should module

- github : https://github.com./tj/should.js/
- BDD 방식의 assert 작성
```
$ npm install should
```


### 테스트 코드

- __should__
```javascript
var intVal = 5;
intVal.should.ASSERTmethod();

//assert 함수
intVal.eql(비교변수) // == 두개
intVal.equal(비교변수) // === 세개
intVal.startWith(string), intVal.endWith(string)

//chain 방식으로도 사용가능
intVal.be.ok
intVal.be.type(비교변수)
intVal.have.properties(propName1, propName2, .....)
```

- __예제코드__
```javascript

var num = 5;
num.should.equal(5); //3단계비교
var str = "hello"
str.should.equal("hello");
```

- __값 비교 실패시__

```javascript
var str = 'taewoong'
str.should.equal("fail");


//실패 메세지
AssertionError : expected 5 to be 4
```

- __객체 동등비교__
  - .eql : 컨텐츠 비교 // ==
  - .equal : strict equal. === 비교

```javascript
var obj = {
  value : 10,
}

obj.should.eql({value:10}); // success
obj.should.equal({value:10}); //Assert 실패, ===
```

- 체인 방식의 Assertion 예제
```javascript
var str = "taewoong";
str.should.startWith("t").and.endWith("g");
// str 의 시작 문자가 t로 시작해야하고 g로 끝나야한다.
```
---

## Test Framework mocha 알아보기

- 홈페이지(https://mochajs.org)
- 설치
```
$ npm install -g mocha
```
- __테스트__
  - 테스트 자동화 리포팅
  - TDD, BDD
  - 다른 Assert 라이브러리와 결합 사용


<br>
---

## mocha를 BDD 기반 작성
```javascript
describe("Calculator" , function(){ //계산기는
  if("should add" ,function(){
      //add 라는 동작에
      //assertion 로직 기입
  });
  if("should minus" ,function(){
      //minus 라는 동작에
      //assertion 로직 기입
  });
});
```
- __개별테스트__
```javascript
// assert 코드
it("task spec1", function(){
    assert.equal(value, expected);
});


//should와 사용
it("task spec2" , function(){
    value.should.equal(exprected);
});

// 비동기 행위 테스트코드
it("async task spec3", function(done){
    asyncApi(value , function(){
        value.should.equal(expected);
        done();
    });
});
```
- __후크 (hook)__
```javascript
// 모든 테스트 시작전, 테스트 종료 후
before(function() {});
after(function() {});


//개별 테스트 시작 전, 개별 테스트 종료 후
beforeEach(function() {});
afterEach(function() {});
```
- __BDD 인터페이스__ (예제코드)
```javascript
describe("Calculator", function(){
    var calculator;

    before(function(){
        calculator = new Calculator();
    });

    after(function() {});
    beforeEach(function() {});
    afterEach(function() {});

    //tests
    it("should add two value", function(){
        //개별 테스트 코드
    });
});
```

- __테스트 동작__
```
테스트 코드 실행명령
$ mocha test.js
```
- __테스트 코드 관리시에는 test폴더를 생성해서 메인 로직과 test 코드를 분리할 필요가 있다.__
```javascript
$ mocha
//명령을 주면 모든 test폴더안에 있는 모든 test 코드를 실행 시킨다.
```
---

## mocha 를 TDD 기반으로 작성하기
```javascript
suite("SUITE NAME", function() {
    test("UNIT TEST", function(){
        assert.equal(....);
    });
});
```
- __hook__
  - suiteSetup(모든 테스트 시작전), setup(개별 테스트 시작전)
  - suiteTeardown(모든 테스트 시작후), teardown(개별 테스트 시작후)

- TDD 기반 테스트 동작
```javascript
$ mocha -u tdd TESTCODE.js
```

- __테스트 작성은 별도로 공부를 해야함(책하나사서 공부해야할것같네요)__


- __TDD 인터페이스__
```javascript
suite("Calaulator", function(){
  var calculator;

  suiteSetup(function(){ //테스트 시작전
      caculator = new Calculator();
  });
  suiteTeardown(function(){}); // 테스트 시작후
  setup(function() {}); //개별테스트 시작전
  teardown(function(){});//개별테스트 시작 후

  test("Add", function(){
      var value = calculator.add(1, 2);
      assert.equal(value,3,"1 + 2 =3");
  });

  test("Minus", function(){
      // minus 테스트 코드
  });
});
```


- 실행 명령 package.json에 등록
```javascript

{
...
  "scripts":{
    "test" : "mocha testAll"
  },
...  
}
```
- 터미널 실행
```javascript
$ npm test
// npm test라고 명령을 주면 package.json 파일을 읽어서 test라는 명령에 있는 값을 터미널에서 실행시킴
```
---
### 포스팅 마치며..

- __입문자의 입장으로서 단위테스트에 대한 부분이 아직 잘와닿지않는다. 아직부족한부분이 많다는걸 느끼게된다.__

- __위 포스팅 내용은 T아카데미 서버개발 강좌를 참고하여 작성하였습니다.__

#### TODO
- 테스트 케이스 작성해서 CSS관련 컴포넌트 만들어보기 
- 단위 테스트관련한 
