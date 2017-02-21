
var config ={
  host : "localhost",
  user : "root",
  password : "123",
  database : "nodedb",
  pool : setPool,
};

function setPool(poolcount){
  this.connectionLimit = poolcount;
  return this;
}




module.exports = config;
