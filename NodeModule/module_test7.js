/*모듈 분리시 사용하는 패턴

1. 함수를 할당하는경우
  모듈안에 함수를 만들어 할당
  모듈을 불러온 후 함수명()을 붙여 실행

2. 인스턴스 객체를 할당하는경우
  모듈을 불러온 후 해당 객체의 메소드를 호출하거나 속성을 바로 사용 할 수 있음.

3. 프로토타입의 객체를 할당하는 경우 모듈 안에서 프로토타입 객체를 만들어 할당함.
  모듈을 불러온 후 new 연산자로 인스턴스 객체를 만들어 사용할 수 있음.

  */
  //함수 패턴 사용해보기
  var printUser = require("./user7(function)").printUser;
  printUser("서현");
  //위와 같이 소괄호를 붙여줘야한다.


 //프로토 타입 패턴1
  const User = require("./user7(prototype)");
  console.log(User);
  User.printUser();
  //프로토 타입 패턴2
  const User2 = require("./user7(prototype)2").User;
  console.log(User2);
  User2.printUser();

  //프로토 타입 패턴3
  const User3 = require("./user7(prototype)3");
  console.log(User3);
  var user3 = new User3("test01", "소녀시대");
  user3.printUser();


  //프로토 타입 패턴3
  const User4 = require("./user7(prototype)4").User;
  console.log(User4);
  var user4 = new User4("test01", "소녀시대");
  user4.printUser();
