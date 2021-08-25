let jqxhr;
let jqxhr1;
let account;
let username;
let password;
let code;

$("#loading-result").css("visibility", "hidden");

$("#show-password").on("click",function(){
	if($("#password").attr("type") === "password"){
		$("#password").attr("type","text");
	} else {
		$("#password").attr("type","password");
	}
});

$("#retrieve").on("click",function(){
	if($("#code").val() === "") {
		alert("Need to fill up CODE field.");
	} else {
		$("#loading-result").css("visibility", "visible");
		$("input").attr("disabled","disabled");
		$("button").attr("disabled","disabled");
		
		jqxhr = $.post( "/accounts-manager-retrieve", {keyword:$("#account").val()} );
		
		$("#account").val("");
		$("#username").val("");
		$("#password").val("");
		code = $("#code").val();
		$("#code").val("");
		
		jqxhr.done(function(data){
			$("#loading-result").css("visibility", "hidden");
			$("input").removeAttr("disabled");
			$("button").removeAttr("disabled");
			
			if(data.status === "no data") {
				alert("No data found.");
			} else if(data.status === "many data") {
				alert("Please specify in ACCOUNT field any value from the list of retrieved data :\n" + data.account);
			} else {
				$("#account").val(data.account);
				$("#username").val(CryptoJS.AES.decrypt(data.username,code).toString(CryptoJS.enc.Utf8));
				$("#password").val(CryptoJS.AES.decrypt(data.password,code).toString(CryptoJS.enc.Utf8));
			}
		});
		
		jqxhr.fail(function(){
			$("#loading-result").css("visibility", "hidden");
			$("input").removeAttr("disabled");
			$("button").removeAttr("disabled");
			
			alert("Cannot retrieve data from server as of the moment.");
		});
	}
});

$("#save").on("click",function(){
	if($("#account").val() === "" || $("#username").val() === "" || $("#password").val() === "" || $("#code").val() === "") {
		alert("Need to fill up ALL the fields.");
	} else {
		$("#loading-result").css("visibility", "visible");
		$("input").attr("disabled","disabled");
		$("button").attr("disabled","disabled");
		
		jqxhr = $.post( 
			"/accounts-manager-save", 
			{
				account : $("#account").val(),
				username : CryptoJS.AES.encrypt($("#username").val(),$("#code").val()).toString(),
				password : CryptoJS.AES.encrypt($("#password").val(),$("#code").val()).toString()
			}
		);
		
		$("#account").val("");
		$("#username").val("");
		$("#password").val("");
		$("#code").val("");
		
		jqxhr.done(function(data){
			$("#loading-result").css("visibility", "hidden");
			$("input").removeAttr("disabled");
			$("button").removeAttr("disabled");
			
			if(data.status === "error") {
				alert("Data not saved.");
			} else if(data.status === "duplicate") {
				alert("Data already exists.");
			} else {
				alert("Data saved.");
			}
		});
		
		jqxhr.fail(function(){
			$("#loading-result").css("visibility", "hidden");
			$("input").removeAttr("disabled");
			$("button").removeAttr("disabled");
			
			alert("Cannot save data to server as of the moment.");
		});
	}
});

$("#update").on("click",function(){
	if($("#account").val() === "" || ($("#username").val() === "" && $("#password").val() === "") || $("#code").val() === "") {
		alert("Need to fill up ACCOUNT field.\nNeed to fill up atleast one of USERNAME and PASSWORD fields.\nNeed to fill up CODE field");
	} else {
		$("#loading-result").css("visibility", "visible");
		$("input").attr("disabled","disabled");
		$("button").attr("disabled","disabled");
		
		jqxhr = $.post( "/accounts-manager-retrieve", {keyword:$("#account").val()} );
		
		account = $("#account").val();
		$("#account").val("");
		username = $("#username").val();
		$("#username").val("");
		password = $("#password").val();
		$("#password").val("");
		code = $("#code").val();
		$("#code").val("");
		
		jqxhr.done(function(data){
			if((username === "" || password === "") && (CryptoJS.AES.decrypt(data.username,code).toString(CryptoJS.enc.Utf8) === "" || CryptoJS.AES.decrypt(data.password,code).toString(CryptoJS.enc.Utf8) === "")) {
				$("#loading-result").css("visibility", "hidden");
				$("input").removeAttr("disabled");
				$("button").removeAttr("disabled");
				
				$("#account").val(account);
				$("#username").val(username);
				$("#password").val(password);
				
				alert("Code for USERNAME and PASSWORD did not match.");
			} else {
				jqxhr1 = $.post( 
					"/accounts-manager-update", 
					{
						account : account,
						username : ((username != "") ? CryptoJS.AES.encrypt(username,code).toString() : ""),
						password : ((password != "") ? CryptoJS.AES.encrypt(password,code).toString() : ""),
					}
				);
				
				jqxhr1.done(function(data1){
					$("#loading-result").css("visibility", "hidden");
					$("input").removeAttr("disabled");
					$("button").removeAttr("disabled");
					
					if(data1.status === "error") {
						alert("Data not updated.");
					} else if(data1.status === "no data") {
						alert("Data does not exist.");
					} else {
						alert("Data updated.");
					}
				});

				jqxhr1.fail(function(){
					$("#loading-result").css("visibility", "hidden");
					$("input").removeAttr("disabled");
					$("button").removeAttr("disabled");
					
					alert("Cannot update data of server as of the moment.");
				});
			}
		});
		
		jqxhr.fail(function(){
			$("#loading-result").css("visibility", "hidden");
			$("input").removeAttr("disabled");
			$("button").removeAttr("disabled");
			
			alert("Cannot update data of server as of the moment.");
		});
	}
});

$("#delete").on("click",function(){
	if($("#account").val() === "" || $("#username").val() === "" || $("#password").val() === "" || $("#code").val() === "") {
		alert("Need to fill up ALL the fields.");
	} else if($("#account").val() != $("#username").val() || $("#account").val() != $("#password").val() || $("#account").val() != $("#code").val()) {
		alert("ALL the fields should have the same value.");
	} else {
		$("#loading-result").css("visibility", "visible");
		$("input").attr("disabled","disabled");
		$("button").attr("disabled","disabled");
		
		jqxhr = $.post( "/accounts-manager-delete", {account:$("#account").val()} );
		
		$("#account").val("");
		$("#username").val("");
		$("#password").val("");
		$("#code").val("");
		
		jqxhr.done(function(data){
			$("#loading-result").css("visibility", "hidden");
			$("input").removeAttr("disabled");
			$("button").removeAttr("disabled");
			
			if(data.status === "error") {
				alert("Data not deleted.");
			} else if(data.status === "no data") {
				alert("Data does not exist.");
			} else {
				alert("Data deleted.");
			}
		});
		
		jqxhr.fail(function(){
			$("#loading-result").css("visibility", "hidden");
			$("input").removeAttr("disabled");
			$("button").removeAttr("disabled");
			
			alert("Cannot delete data of server as of the moment.");
		});
	}
});
