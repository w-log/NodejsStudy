/*
jade 알아보기
간결한 문서 구조 표현

브라켓 없이 태그만 사용
들여쓰기로 문서구조 표현

시작태그 - 종료 태그 구조 사용 안함

jade                        html
div                         <div>
  ul                          <ul>
    li item1                    <li> item1 </li>
    li item2                    <li> item2 </li>
                              </ul>
  p paraasd                    <p>pararsd</p>
                             </div>
attribute
img(src="image.png" height="50px")
a(href="google.com")

코드 작성
-기호를 앞에 실행문
=기호를 변수로 출력 출력문

예)
-var title = "jade Example"
h1= title

ul
-for(var i = 0; i < 10; i++){
  li = i
-}
HTML 출력
= 기호와 문자열 출력. Esacped
!= 기호와 문자열 출력 . Unescaped

예)

//HEllo<strong>world</strong>
div= "hello <strong>World</strong>"
//Unecsaped String
div!="Unecsaped <strong>String</strong>"

HTML 출력 : Interpolation

Escaped .#{val}
Unesaped : !{val}

if 조건문
- 기호 없이 사용
들여쓰기로 구문종료

*/
