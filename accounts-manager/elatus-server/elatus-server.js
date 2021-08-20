const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

mongoose.connect("mongodb://localhost:27017/accounts-manager-db", {useNewUrlParser:true});

const accountSchema = new mongoose.Schema({
	account : String,
	username : String,
	password : String
});

const Account = mongoose.model("account", accountSchema);

let globalVar1 = "";

app.get("/accounts-manager",function(req,res){
	res.render("accounts-manager/index");
});

app.post("/accounts-manager",function(req,res){
	let dataFromServer = {
		account : "a",
		username : "b",
		password : "c"
	};
	
	Account.find(function(err,accounts){
		if(err){
			console.log(err);
		} else {
			dataFromServer.account = accounts[0].account;
			dataFromServer.username = accounts[0].username;
			dataFromServer.password = accounts[0].password;			
		}
		
		res.send(dataFromServer);
	});	

});

app.listen(3000,function(){
	console.log("Server is started on port " + 3000);
});