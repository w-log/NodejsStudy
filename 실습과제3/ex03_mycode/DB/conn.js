
var config = require("./config");
var mysql = require("mysql");


module.exports = function(conntype, poolcount){
    if(conntype ==="pool" && typeof poolcount === "number"){
        return mysql.createPool(config.pool(poolcount));
    }else{
        return mysql.createConnection(config);
    }
};
