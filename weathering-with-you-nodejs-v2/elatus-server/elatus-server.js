const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const https = require("https");

const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

let globalVar1 = "";

app.get("/weathering-with-you-nodejs-v2",function(req,res){
	const apiKey = "ddd46926cf372917be61ce75831a6912";
	let place = "";
	let unix_timestamp;
	let date;
	let computeSunrise;
	let computeSunset;

	if(globalVar1) {
		place = globalVar1;
		globalVar1 = "";
	} else {
		place = "cebu";
	}

	https.get("https://api.openweathermap.org/data/2.5/weather?q="+place+"&appid="+apiKey+"",function(response){
		response.on("data",function(data){
			if(JSON.parse(data).cod == 200) {
				unix_timestamp = JSON.parse(data).sys.sunrise;
				date = new Date(unix_timestamp * 1000);
				computeSunrise = date.getHours()+":"+date.getMinutes();

				unix_timestamp = JSON.parse(data).sys.sunset;
				date = new Date(unix_timestamp * 1000);
				computeSunset = date.getHours()-12+":"+date.getMinutes()

				res.render("weathering-with-you-nodejs-v2/index-success",{place:JSON.parse(data).name,img:"https://openweathermap.org/img/wn/"+JSON.parse(data).weather[0].icon+"@4x.png",description:JSON.parse(data).weather[0].main+" ("+JSON.parse(data).weather[0].description+") ",maxTemp:Math.round(JSON.parse(data).main.temp_max - 273.15),minTemp:Math.round(JSON.parse(data).main.temp_min - 273.15),sunrise:computeSunrise,sunset:computeSunset});
			} else {
				res.render("weathering-with-you-nodejs-v2/index-fail");
			}
		});
		response.on("error",function(data){
			res.render("weathering-with-you-nodejs-v2/index-fail");
		});
	}).on("error",function(){
		res.render("weathering-with-you-nodejs-v2/index-fail");
	});
});

app.post("/weathering-with-you-nodejs-v2",function(req,res){
	globalVar1 = req.body.place;
	res.redirect("/weathering-with-you-nodejs-v2");
});

app.listen(process.env.PORT,function(){
	console.log("Server is started on port " + process.env.PORT);
});