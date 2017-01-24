const db_path = "mongodb://localhost:27017/";

module.exports = {
    server_port : 3000,
    db_collections : {
        db_shopping : {
            db_path : db_path + "shopping",
            db_schemas : [
                          {
                            file : "./user_schema" ,
                            collection : "users3" ,
                            schemaName : "UserSchema",
                            modelName : "userModel"
                          },
            ]
        },
    },
    route_info : [
      {file:"./user", path:"process/login", method:"login", type:"post"},
      {file:"./user", path:"process/adduser", method:"adduser", type:"post"},
      {file:"./user", path:"process/listuser", method:"listuser", type:"post"},
    ]


          }
