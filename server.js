const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io').listen(server);
users=[];
connections = [];


app.get("/",function(req,res){
	res.sendFile(__dirname + "/index.html");
});

//listening to the server
server.listen(process.env.PORT || 3000,function(){
	console.log("The server is running");
});