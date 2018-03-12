const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io').listen(server);
users=[];
connections = [];


app.get("/",function(req,res){
	res.sendFile(__dirname + "/index.html");
});

io.sockets.on('connection',function(socket){
	connections.push(socket);
	console.log(`Users connected: ${connections.length}`);
	socket.on('disconnect',function(){
		//eliminate users
		console.log(socket.username);
		users.splice(users.indexOf(socket.username),1);
		updateUserNames();
		//eliminating connections
		connections.splice(connections.indexOf(socket),1);
		console.log(`Users connected: ${connections.length}`);
	});
	socket.on('send message',function(data){
		io.sockets.emit('new message',{ msg: data , user: socket.username});
	});
	socket.on('new user',function(data,callback){
		callback(true);
		socket.username = data;
		users.push(socket.username);
		updateUserNames();
		
	})
	function updateUserNames(){
		io.sockets.emit('get users',{ users });
	}
});
//listening to the server
server.listen(process.env.PORT || 3000,function(){
	console.log("The server is running");
});