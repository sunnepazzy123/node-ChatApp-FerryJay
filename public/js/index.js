        var socket = io();


		socket.on("connect", function(){
            console.log("connected to server");
        
            
        socket.emit("createEmail", {
            from: "hssgy@gmail.com",
            text: "this is from client to server",
            createdAt: 1233
        });
	
		});
		
		socket.on("disconnect", function(){
			console.log("disconnected from server");
        });
        
        socket.on("newEmail", function(email){
			console.log("new Email from server", email);
        });