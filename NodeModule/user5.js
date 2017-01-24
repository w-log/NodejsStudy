//module.exports 가 사용되면 전역객체인 exports 가 무시됨

module.exports = {
    getUser : function () {
        return {id : "test01" , name : "소녀시대"};
    },
    Group : {id : "Group" , name : "친구"},
};

exports.group1 = {"id" : "Group02" , name : "가족"};
