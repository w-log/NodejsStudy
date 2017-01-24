var config = require("../config");


exports.init = function(app){
    console.log(config);
    let route_arr = config.route_info
    let user = require("./user");
    for(var i = 0; i < route_arr.length; i++){
        let path = route_arr[i].path;
        let method = route_arr[i].method;
        let type = route_arr[i].type;
        route_arr[i].func = user[method];
    }
    app.set("routes" , route_arr);
};
