var expect = require("expect");
var {generateMessage, generateLocationMessage} = require("./message");

describe("generateMessage", ()=>{
    it("should generate correct message object", ()=>{
        var from = "jen";
        var text = "Some message";
        var message = generateMessage(from, text);

        expect(message.createdAt).toBeA("number");
        expect(message).toInclude({from, text});
    });
});


describe("generateLocationMessage", ()=>{
    it("should generate correct Location message object", ()=>{
        var from = "jenny";
        var latitude = 19;
        var longitude = 18;
        var  url = `https://www.google.com/maps?q=${latitude},${longitude}`
        var message = generateLocationMessage(from, latitude, longitude);

        expect(message.createdAt).toBeA("number");
        expect(message).toInclude({from, url});
    });
});