var dgram = require("dgram");
var socket = dgram.createSocket("udp4");
socket.bind(3000);

socket.on("listening" ,function(){
    console.log("listening Event");
});

socket.on("message" , function(msg , rinfo){
    console.log("메세지 도착" , rinfo.address, msg.toString());
});

socket.on("close" ,function(){
    console.log("close Event");
});
