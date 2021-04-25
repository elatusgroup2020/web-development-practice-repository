const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const https = require("https");

const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

const apiKey = "ddd46926cf372917be61ce75831a6912";
let place = "cebu";
let unix_timestamp;
let date;
let computeSunrise;
let computeSunset;

app.get("/",function(req,res){
	https.get("https://api.openweathermap.org/data/2.5/weather?q="+place+"&appid="+apiKey+"",function(response){
		response.on("data",function(data){
			if(JSON.parse(data).cod == 200) {
				unix_timestamp = JSON.parse(data).sys.sunrise;
				date = new Date(unix_timestamp * 1000);
				computeSunrise = date.getHours()+":"+date.getMinutes();

				unix_timestamp = JSON.parse(data).sys.sunset;
				date = new Date(unix_timestamp * 1000);
				computeSunset = date.getHours()-12+":"+date.getMinutes()

				res.render("index-success",{place:JSON.parse(data).name,img:"https://openweathermap.org/img/wn/"+JSON.parse(data).weather[0].icon+"@4x.png",description:JSON.parse(data).weather[0].main+" ("+JSON.parse(data).weather[0].description+") ",maxTemp:Math.round(JSON.parse(data).main.temp_max - 273.15),minTemp:Math.round(JSON.parse(data).main.temp_min - 273.15),sunrise:computeSunrise,sunset:computeSunset});
			} else {
				res.render("index-fail");
			}
		});
		response.on("error",function(data){
			res.render("index-fail");
		});
	}).on("error",function(){
		res.render("index-fail");
	});
});

app.post("/",function(req,res){
	place = req.body.place;
	res.redirect("/");
});

app.listen(3000,function(){
	console.log("Server is started on port 3000");
});