var require = function (path) {

  let module = {
      exports : null,
  };
  let exports;
  module.exports = {
    getUser : function () {
        return {id : "test01" , name : "소녀시대"};
    },
    group : {id : "group01" , name : "친구"},
  };

  exports = {
    getUser : function () {
        return {id : "test01" , name : "소녀시대"};
    },
    group : {id : "group2" , name : "가족"},
  };

  if(!module.exports){
      module.exports = exports;
  }
  return module.exports;
};
//require 함수는 위와같은 과정을 거치는것같다.

var user = require("...");
console.log(user);
