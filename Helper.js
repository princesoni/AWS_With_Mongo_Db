var email = require('emailjs');

var helper = {};
module.exports = helper;

helper.APP_KEY_APPENDER= "?key=";

helper.sendEmail = function(data){
    var server  = email.server.connect({
        user:    "princesoniprince007@gmail.com",
        password:"manaksoni",
        host:    "smtp.gmail.com",
        ssl:     true

    });

    // send the message and get a callback with an error or details of the message that was sent
    server.send({
        text:    data,
        from:    "princesoniprince007@gmail.com",
        to:      "p.soni@globallogic.com",
        subject: "ACS USER CREATED SUCCESSFULLY"
    }, function(err, message) { console.log(err || message); });
};
