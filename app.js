// Api Source : https://openweathermap.org/api/one-call-api
// Author : Yogesh Pandey
// This is a example of API Calls with the help of @node_modules 

// ----------Required Modules----------------
const express = require("express");
const query = require("express/lib/middleware/query");
const bodyparser = require("body-parser");
const { json } = require("express/lib/response");
const https = require("https");
const app = express();

app.use(bodyparser.urlencoded({extended:"true"}));

app.get("/",function (req,res) {
    // res.send("server is running now.")
    res.sendFile(__dirname + "/index.html");

});

app.post("/",function (req,res) {
    // console.log(req.body.cityName);
    // console.log("...");

    const query = req.body.cityName; 
const appid = "f2d4b9a90dd8027c0e1fd5823f458d9d";
const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+appid+"&units=metric";

// -------------Calling API with the help of https method which is available in node modules 
    https.get(url, function (response) {
        // console.log("response.statusCode");
        response.on("data", function(data) {
        const wetherdata  = JSON.parse(data)
        console.log(wetherdata)
        const cityname = wetherdata.name;
        const temp = wetherdata.main.temp;
        const desc = wetherdata.weather[0].description;
        //  console.log(temp)
        res.write("<h1><u>Live Weather Update</u></h1>");
        res.write("<h2>City : " + cityname +"</h2>");
        res.write("<h2>Today's temp is " + temp +"</h2>");
        res.write("<h1 style = 'color:red;'>Weather type: " + desc  +"</h1>");
        res.send()

         })
    })
})






// ----------Running the server on port 3000.--------------
app.listen(3000, function () {
    console.log("server is running on port 3000")
})
