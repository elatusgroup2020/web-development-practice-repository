const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const https = require("https");
const mongoose = require("mongoose");

const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

let globalVar1 = "";

app.get("/accounts-manager",function(req,res){
	res.render("accounts-manager/index");
});

app.post("/accounts-manager-retrieve",function(req,res){
	mongoose.connect("mongodb://localhost:27017/accounts-manager-db", {useNewUrlParser:true,useUnifiedTopology:true});
	
	const accountSchema = new mongoose.Schema({
		account : String,
		username : String,
		password : String
	});

	const Account = mongoose.model("Account", accountSchema);
	
	Account.find({"account":{"$regex":req.body.keyword,"$options":"i"}},function(err,accounts){
		const dataToClient = {
			account : "",
			username : "",
			password : "",
			status : ""
		};
		
		if(err){
			dataToClient.status = "no data";
		} else if(accounts.length < 1) {
			dataToClient.status = "no data";
		} else if(accounts.length > 1) {
			accounts.forEach(function(account){
				dataToClient.account = dataToClient.account + "-> " + account.account + "\n";
			});
			dataToClient.status = "many data";
		} else {
			dataToClient.account = accounts[0].account;
			dataToClient.username = accounts[0].username;
			dataToClient.password = accounts[0].password;			
		}
		
		delete mongoose.connection.models['Account'];
		mongoose.connection.close()
		
		res.send(dataToClient);
	});	
});

app.post("/accounts-manager-save",function(req,res){
	mongoose.connect("mongodb://localhost:27017/accounts-manager-db", {useNewUrlParser:true,useUnifiedTopology:true});
	
	const accountSchema = new mongoose.Schema({
		account : String,
		username : String,
		password : String
	});

	const Account = mongoose.model("Account", accountSchema);
	
	Account.find({account:req.body.account},function(err,accounts){
		const dataToClient = {
			status : ""
		};
		
		if(err){
			dataToClient.status = "error";
			
			delete mongoose.connection.models['Account'];
			mongoose.connection.close()
			
			res.send(dataToClient);
		} else if(accounts.length > 0) {
			dataToClient.status = "duplicate";
			
			delete mongoose.connection.models['Account'];
			mongoose.connection.close()
		
			res.send(dataToClient);
		} else {
			const account = new Account({
				account : req.body.account,
				username : req.body.username,
				password : req.body.password
			});
			
			account.save(function(err){
				if(err){
					dataToClient.status = "error";
				} else {
					dataToClient.status = "success";
				}
				
				delete mongoose.connection.models['Account'];
				mongoose.connection.close()
				
				res.send(dataToClient);
			});
		}
	});
});

app.post("/accounts-manager-update",function(req,res){
	mongoose.connect("mongodb://localhost:27017/accounts-manager-db", {useNewUrlParser:true,useUnifiedTopology:true});
	
	const accountSchema = new mongoose.Schema({
		account : String,
		username : String,
		password : String
	});

	const Account = mongoose.model("Account", accountSchema);
	
	Account.find({account:req.body.account},function(err,accounts){
		const dataToClient = {
			status : ""
		};
		
		if(err){
			dataToClient.status = "no data";
			
			delete mongoose.connection.models['Account'];
			mongoose.connection.close()
			
			res.send(dataToClient);
		} else if(accounts.length > 0) {	
			if(req.body.username != "") {
				accounts[0].username = req.body.username;
			}
			
			if(req.body.password != "") {
				accounts[0].password = req.body.password;
			}
			
			accounts[0].save(function(err){
				if(err){
					dataToClient.status = "error";
				} else {
					dataToClient.status = "success";
				}
				
				delete mongoose.connection.models['Account'];
				mongoose.connection.close()
				
				res.send(dataToClient);
			});
		} else {
			dataToClient.status = "no data";
			
			delete mongoose.connection.models['Account'];
			mongoose.connection.close()
		
			res.send(dataToClient);
		}
	});
});

app.post("/accounts-manager-delete",function(req,res){
	mongoose.connect("mongodb://localhost:27017/accounts-manager-db", {useNewUrlParser:true,useUnifiedTopology:true});
	
	const accountSchema = new mongoose.Schema({
		account : String,
		username : String,
		password : String
	});

	const Account = mongoose.model("Account", accountSchema);
	
	Account.find({account:req.body.account},function(err,accounts){
		const dataToClient = {
			status : ""
		};
		
		if(err){
			dataToClient.status = "no data";
			
			delete mongoose.connection.models['Account'];
			mongoose.connection.close()
			
			res.send(dataToClient);
		} else if(accounts.length > 0) {	
			Account.deleteOne({account:req.body.account},function(err){
				if(err){
					dataToClient.status = "error";
				} else {
					dataToClient.status = "success";
				}
				
				delete mongoose.connection.models['Account'];
				mongoose.connection.close()
				
				res.send(dataToClient);
			});
		} else {
			dataToClient.status = "no data";
			
			delete mongoose.connection.models['Account'];
			mongoose.connection.close()
		
			res.send(dataToClient);
		}
	});
});

app.listen(3000,function(){
	console.log("Server is started on port " + 3000);
});