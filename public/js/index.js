        var socket = io();


		socket.on("connect", function(){
            console.log("connected to server");
        
        //  socket.emit("createEmail", {
        //      from: "andrew",
        //      text: "bjfbsds"

        //  });
       
	
        });

        socket.on("disconnect", function(){
			console.log("disconnected from server");
        });
        
        
        socket.on("newMessage", function(message){
            console.log("Email from the server", message);
            var li = jQuery("<li></li>");
            li.text(`${message.from}: ${message.text}`);
            jQuery("#messages").append(li);
        });
        

        socket.on("newLocationMessage", function(message){
            var li = jQuery("<li></li>");
            var a = jQuery('<a target="_blank">My current location</a>');

            li.text(`${message.from}: `);
            a.attr('href', message.url);
            li.append(a);
            jQuery("#messages").append(li);

        })
		
	
     jQuery("#message-form").on("submit", function(e){
         e.preventDefault();

         var messageTextbox = jQuery("[name=message");

         socket.emit("createMessage", {
             from: "User",
             text: messageTextbox.val()

         },
         function(){
            messageTextbox.val("")
            // console.log("got it", data);
         }
         );
 
     });

     var locationButton = jQuery("#sendLocation");
         locationButton.on("click", function(){
            if(!navigator.geolocation){
                return alert("Geolocation not supported by your browser");       
            }

        locationButton.attr("disabled", "disabled").text("Sending Location...");

            navigator.geolocation.getCurrentPosition(function(positions){
                locationButton.removeAttr("disabled").text("Send Location");
                // console.log(positions);
                socket.emit("createLocationMessage", {
                   latitude: positions.coords.latitude,
                   longitude: positions.coords.longitude

                });
            }, function(){
                locationButton.removeAttr("disabled").text("Send Location");
                alert("Unable to fetch location");
            });
         });