const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const https = require("https");

const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

const apiKey = "ddd46926cf372917be61ce75831a6912";

app.get("/",function(req,res){
	res.render("index");
});

app.post("/",function(req,res){
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

app.listen(3000,function(){
	console.log("Server is started on port 3000");
});