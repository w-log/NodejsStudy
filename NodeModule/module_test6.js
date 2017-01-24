//require 메소드는 결국 exports가 아닌 module.exports로 설정된 속성을 반환함

const user = require("./user5.js");
console.log(user);

function showUser() {
    return user.getUser().name + ", " + user.Group.name;
}

console.log("사용자 정보 : %s",showUser());
