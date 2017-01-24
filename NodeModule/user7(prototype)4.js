//프로토타입 패턴 사용해보기
function User(id , name) {
    this.id = id;
    this.name = name;
}

User.prototype.getUser = function () {
    return {id:this.id, name : this.name};
};

User.prototype.group = {id : "group1" , name : "친구"};

User.prototype.printUser = function () {
    console.log("user 이름 : %s , group 이름 : %s", this.name , this.group.name);
};

exports.User = User;
