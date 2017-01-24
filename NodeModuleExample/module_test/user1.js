//모듈화 하기
/*Nodejs 는 Common js 의 표준을 채택하고 있음.*/
exports.getUser = function () {
    return { id : "test01" , name : "소녀시대"};
};
exports.group = { id : "group01" , name : "친구"};
