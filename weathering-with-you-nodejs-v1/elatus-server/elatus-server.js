const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const https = require("https");

const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

let globalVar1 = "";

app.get("/weathering-with-you-nodejs-v1",function(req,res){
	res.render("weathering-with-you-nodejs-v1/index");
});

app.post("/weathering-with-you-nodejs-v1",function(req,res){
	const apiKey = "ddd46926cf372917be61ce75831a6912";

	https.get("https://api.openweathermap.org/data/2.5/weather?q="+req.body.place+"&appid="+apiKey+"",function(response){
		response.on("data",function(data){
			if(JSON.parse(data).cod == 200) {
				res.send(JSON.parse(data));
			} else {
				res.send("error");
			}
		});
		response.on("error",function(data){
			res.send("error");
		});
	}).on("error",function(){
		res.send("error");
	});
});

app.listen(process.env.PORT,function(){
	console.log("Server is started on port " + process.env.PORT);
});