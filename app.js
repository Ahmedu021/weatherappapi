const express = require("express");
// to get api weather information we needt to incorporate https.get method
const https = require("https");
// body parser incorporate
const bodyParser= require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req,res){
  res.sendFile(__dirname+"/index.html");
});



// https get api data fron other server(weathermap)


app.post("/", function (req,res){

  const query =req.body.cityName;
  const apiKey= "92b1bbcc040add65a7e0675a7140368f";
  const unit="metric";
  const url =  "https://api.openweathermap.org/data/2.5/weather?q="+query+"&units="+unit+"&appid="+apiKey;

  https.get(url, function(response){
     console.log(response.statusCode);





        response.on("data", function(data){

          const weatherData = JSON.parse(data);
          const temp = weatherData.main.temp
          const description = weatherData.weather[0].description
          const weatherIcon = weatherData.weather[0].icon
          const imgUrl = "http://openweathermap.org/img/wn/"+weatherIcon+"@2x.png"

          res.write("<h1> the weather is currently "+description+ "</h1>" );
            res.write("<img src="+imgUrl+">");
          res.write("<h1> the temprature in "+query+" is " +temp+ " celcius </h1>");
          res.send();
           });
        });

      });
  // end of api weather








app.listen(3000, function(){
  console.log("server is running on port 3000.");
});
