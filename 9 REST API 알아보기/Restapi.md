# Rest Api 알아보기 !

### Rest ?
- ### Representational State Transfer(REST)

- 로디필딩 . HTTP 프로토콜의 주요 저자
  - __2000년 논문
"Arcitectural Styles and the Design of Newwork-based Software Architectures"
사전 정의 : "분산 하이퍼 미디어 시스템을 위한 소프트웨어 아키텍처"
네트워크를 이용해서 자원에 접근하고 자원을 다룰 수 있는 아키텍쳐
90년대 웹도입과 성장 시대에 웹 기반 소프트웨어의 이상적인 아키텍처 제시__


- __REST 아키텍처의 제한 조건 (Constraint)__

| | 조건 |
| :------------ | :-----------: |
| 클라이언트/서버  | 클라이언트의 요청과 서버의 응답 기반 |
| 상태 없음   |  클라이언트의 상태와 관계없이 요청으로만 응답. |
| 캐시   | 클라이언트는 서버의 응답을 캐쉬. 네트워크 비용 절감  |
| 계층화 시스템 | 서버는 다양한 형태의 중간 계층을 이용해서 확장 할 수 있다.클라이언트는 서버의 계층에 무관하게 통신을 할 수 있다. |
| Code on Demand  | 리소스를 다룰 수 있는 코드 전송. 예 : 자바 스크립트  |
| 인터페이스 일관성  | 시스템 구조를 단순화 시키고 작은 단위로 분리해서 독립적으로 개선하고 확장 할 수 있다.  |

<br>

- Rest 인터페이스 원칙

| | 원칙 |
| :------------ | :-----------: |
| 자원 식별  | 개별 리소스를 식별 할 수 있어야 한다. 예 : URL 이나 URI |
| 메시지로 리소스 조작   |  메세지에 작성한 리소스를 다루는 정보를 이용해서 리소스를 얻어오거나 리소스를 조작한다. |
| 자기 서술적 메세지 | 요청과 응답 메세지에는 메세지를 처리할 수 있는 정보를 포함한다.  |
| 하이퍼 미디어 | 하이퍼링크를 이용해서 유기적으로 연결된 문서를 쉽고 간단하게 정보를 접할 수 있다. |


- REST 아키텍처를 기반으로 서비스 작성하기
  - __HTTP 프로토콜 사용__



- 인터페이스 설계
  - 리소스 접근하는 인터페이스(URL)
  - 리소스를 다루기 위한 HTTP 메소드



- 요청과 응답 메세지 설계
  - 요청 메세지 구조
  - 응답 메세지 구조



- 인터페이스 설계
  - 간단하고 직관적인 API
  - 리소스를 다루는 행위는 GET , POST , PUT , DELETE
  - API 버전
    - api.mystore.com/v1/items
    - 명사형 단어 사용권장
    - 목록 형태의 리소스를 다루는 API는 복수형 명사
    - 목록에서 특정 조건으로 필터링 : 쿼리문자열
        - 예) api.mystore.com/v1/items?year=2015&category=food

<br>

- 응답 메세지 (JSON) 설계 가이드
  - 프로퍼티의 이름
    - 의미를 충분히 반영
    - 카멜 케이스
    - 예약어를 사용하지 말것
  - 응답 메세지 구조
    - 데이터와 보조 데이터 활용
    - 에러 발생시 에러 정보 제공


- __예제보기( 영화 정보 제공 웹 서비스 )__

  | 프로퍼티 | 내용 |
  | :------------ | :-----------: |
  | 컨텐츠  | 영화 정보 |
  | 기본 URI   |  http://api.movie.com/movies |
  | 미디어 타입  |  JSON  |
  |  HTTP 메소드 | GET , PUT , POST , DELETE |

```javascript
var http = require("http");
var fs = require("fs");
var data = fs.readFileSync("./movieData.json","utf8");
var movieList = JSON.parse(data);

function sss(){

}

var server = http.createServer(function(req, res){
    var method = req.method.toLowerCase();
    switch( method ){
        case "get" :
        // GET 요청 처리 : 영화 목록 보기, 영화 상세 정보보기
        // 영화 상세 정보 보기 : /movie/1 /movie/2
        handleGetRequest(req, res);
        return;
        case "post":
        // post 요청 처리 : 영화 정보 추가
        handlePostRequest(req, res);
        return;
        case "put":
        //영화정보 수정
        handlePutRequest(req, res);
        return;
        case "delete":
        //영화정보 삭제
        handleDeleteRequest(req, res);
        return;
        default:
          res.statusCode = 404;
          res.end("잘못된 요청입니다.");
          return;
    }
}).listen(8000);


function handleGetRequest(req , res){
    var url = req.url;
    if ( url === "/movies" ){
        var list = [];
        for(var i = 0 ; i < movieList.length; i++){
            var movie = movieList[i];
            list.push({ id: movie.id , title: movie.title });
        }

        //항목 갯수와 영화 목록 정보
        var result = {
            count : list.length,
            data : list
        };

        res.writeHead(200 , {"Content-Type" : "application/json;charset=utf-8"});
        res.end(JSON.stringify(result));
    } else {
        var id = url.split("/")[2];
        var movie = null;
        for (var i = 0; i < movieList.length; i++){
            var item = movieList[i];
            if (parseInt(id) === item.id){
                console.log(id);
                movie = item;
                break;
            }
          }
            if(movie){
                res.writeHead(200, {"Content-Type" : "application/json;charset=utf-8"});
                res.end(JSON.stringify(movie));
            } else {
              res.writeHead(404, {"Content-Type" : "application/json;charset=utf-8"});
              res.end(JSON.stringify({
                  errorCode : 404,
                  errorMessage : "검색된 영화정보가 없습니다."
              }));
            }
        }

    }
```


---

### 포스팅 마치며..

  - __Rest Api에 대해서 배워보았다. Nodejs 내용이라기 보단 서버와 클라이언트 통신 프로토콜인 HTTP를 활용해서 효율적인 리소스자원과 http 메소드를 통한 행위에 대한 정의를 통하여 효율적으로 서버를 운용할 수 있는 아키텍처인것같다. 이론적으로는 생각보다 복잡하지만 코드를 통해 접해보니까 프로그래밍적으로 어려움은 없지만 이론은 확실하게 이해하기위해서 책한권사서 봐야될것같다.__



  - __위 소스코드는 T아카데미 Nodejs 서버개발 강의를 바탕으로 작성된 소스코드입니다.__
