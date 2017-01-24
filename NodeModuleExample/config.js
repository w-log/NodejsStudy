const db_path = "mongodb://localhost:27017/";

module.exports = {
    server_port : 3000,
    db_collections : {
        db_shopping : db_path + "shopping",
    },
    db_schemas : [
        {}
    ]
}
