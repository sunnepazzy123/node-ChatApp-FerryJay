const path       = require("path");
const express    = require("express");
const http       = require("http");
const webSocket  = require('socket.io');
const publicPath = path.join(__dirname, "../public");
const port       = process.env.PORT || 3000;
var   app        = express();
var  server      = http.createServer(app);
var  io          = webSocket(server);
const {generateMessage, generateLocationMessage}  = require('./utils/message.js');
const moment       = require("moment");

app.use(express.static(publicPath));

io.on("connection", (socket)=>{	
	console.log("new user connected");

	socket.emit("newMessage", generateMessage("Admin", "Welcome to my chat app") );
	
	socket.broadcast.emit("newMessage", generateMessage("Admin", "New user joined") );

	socket.on("createMessage", (message, callback)=>{
		console.log("create email from client", message);

	io.emit("newMessage", generateMessage(message.from, message.text));
	callback("");
	
	socket.on("createLocationMessage", (coord)=>{
		io.emit("newLocationMessage", generateLocationMessage("Admin", coord.latitude, coord.longitude));
	});

		
	});



	
	

	// socket.broadcast.emit("newMessage", {
	// 	from: "admin",
	// 	text: "new user join",
	// 	created: new Date().getTime()
	// });






socket.on("disconnect", (socket)=>{
	console.log("user disconnected");
});




});




server.listen(port, ()=>{
	console.log("Server is up running " + port);
});
