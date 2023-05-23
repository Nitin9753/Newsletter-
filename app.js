const express = require("express");
const request = require("request");
const bodyParser = require("body-parser");
const https = require("https");
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

const api_key = "794b4fbdfcecf0bb712960bf0be528e5-us14";
const list_id = "243a521cf5";
app.get("/", function(req, res) {
    res.sendFile(__dirname + "/signup.html");
})

app.post("/", function(req, res) {
    var first_name = req.body.first_name;
    var last_name = req.body.last_name;
    var mail_id = req.body.mail_id;
    var data = {
        members: [{
            email_address: mail_id,
            status: "subscribed",
            merge_fields: {
                FNAME: first_name,
                LNAME: last_name,
            }
        }]
    }
    const jsonData = JSON.stringify(data);
    const url = "https://us14.api.mailchimp.com/3.0/lists/243a521cf5";
    const options = {
        method: "POST",
        auth: "Bunndi:" + api_key
    }
    const request = https.request(url, options, function(response) {
        response.on("data", function(data) {
            console.log(JSON.parse(data));
        })
    });
    request.write(jsonData);
    request.end();
})

app.listen(3000, function() {
    console.log("Server started at port 3000.");
})