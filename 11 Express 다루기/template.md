# Express template
- 개요
  - __HTML 출력 응답에 헤더가 html일때는 html 응답메세지를 작성해주어야한다. 하지만 응답메세지에 html 작업하는것은 시간도 많이 걸릴뿐더러 협업을 할시에 작성이 불리하기때문에 템플릿을 사용해서 미리 만들어놓은 템플릿 html 파일을 요청메세지에 따라 뿌려주기만 하면됨.__

### Express 의 template 엔진
- __ejs__
- __jade__

- 템플릿 엔진 설정
```javascript
app.set("views",[템플릿 폴더]);
app.set("view engine" , [템플릿 엔진]);
```
- 템플릿에 적용 : 렌더링
```javascript
res.render(view [, locals] [, callback]);
//locals : 템플릿의 지역 변수로 설정될 데이터
//callback : 렌더링 콜백
//응답 종료
```

```javascript
//index 템플릿 파일을 렌더링 한 결과로 응답
res.render("index");


//index 템플릿 파일에 name 이름으로 데이터를 제공
res.render("index", {name : 'iu'});

//user 템플릿에 name 이름으로 데이터를 제공한다. 렌더링 한 결과를 다루는 콜백 함수 정의
res.render("user",{name : "iutt"} , function (err, html) {
  //...
});


```
### ejs

- ejs 엔진 특징
  - html 태그 그대로 사용
    - 코드 실행 <% %> 스크립트 립
    - 결과 출력 <%= %>
  - jsp 와 문법이 매우 비슷하다. = javascript기반의 jsp 파일이라고 봐도됨

- 실행 코드 작성
```javascript
<% var value ="hello" %>
```
- 여러 줄 작성
```javascript
<%
var i = 0;
var j = i + 1;
%>
```

- HTML 과 혼합
```javascript
<% if (value) { %>
<div>hi</div>
<% } %>
```


- 값으로 출력
```javascript
<div> <%= value %> </div>
```
- 태그 내 어트리뷰트
```javascript
<img src="<%=data.image %>">
```
HTML과 혼합
```javascript
<% var tag = "h1" %>
<<%= tag %>> TAG 만들기 </<%=tag%>>
```

- 템플릿 페이지가 없을 경우
```javascript
Error : Failed to lookup view "notexist" in views directory "/.../"
//템플릿 엔진 설정 없이 render 사용한 경우
Error : No default engine was specified and no extension was provided
// 템플릿 내 객체 정의 에러
<%=undefinedVar%>
```



- 예제보기(__ejs 기준__)
```javascript
var express = require("express");
var app = express();

app.set("views",__dirname+"/views");
app.set("view engine","ejs");

var data = [
  {title : "cat1", image : "cat1.png"},
  {title : "cat2", image : "cat2.png"},
  {title : "cat3", image : "cat3.png"},
];
app.use(express.static("./"));
app.get("/", function(req , res){
    res.render("cat" ,{title : "Cats", cats:data});
});

app.listen(3000);
```

---

## jade 알아보기

- __특징 ?__
  - 간결한 문서 구조 표현
  - 브라켓 없이 태그만 사용
  - 들여쓰기로 문서구조 표현

- 시작태그 - 종료 태그 구조 사용 안함 (HTML과 구조 비교)
```javascript
jade                        html
div                         <div>
  ul                          <ul>
    li item1                    <li> item1 </li>
    li item2                    <li> item2 </li>
  p paraasd                    </ul>
                            <p>pararsd</p>
                             </div>
```


- attribute (속성 정의)
```javascript
img(src="image.png" height="50px")
a(href="google.com")
```
- 코드 작성
 - -기호를 앞에 실행문
 - =기호를 변수로 출력 출력문

예제
```javascript
-var title = "jade Example"
h1= title

ul
-for(var i = 0; i < 10; i++){
  li = i
-}
```


- HTML 출력
  - = 기호와 문자열 출력. Esacped
  - != 기호와 문자열 출력 . Unescaped


- HTML 출력 : Interpolation
- Escaped .#{val}
- Unesaped : !{val}
```javascript
//hello <strong>world</strong>
div = "hello <strong>World</strong>"
//Unecsaped String
div != "Unecsaped <strong>String</strong>"
```




- if 조건문
  - 기호 없이 사용
  - 들여쓰기로 구문종료


- 주의사항
  - 템플릿 페이지 ,엔진설정
  - 템플릿 내 지역 변수
  - 인덴테이션으로 문서구조
  - 탭 문자나 스페이중 하나로 통일


---

  - __위 소스코드는 T아카데미 Nodejs 서버개발 강의를 바탕으로 작성된 소스코드입니다.__
