let jqxhr;// = $.post( "", {} );
let dummyDataFromServer = {
		account : "",
		username : "",
		password : ""
	};

$("#show-password").on("click",function(){
	if($("#password").attr("type") === "password"){
		$("#password").attr("type","text");
	} else {
		$("#password").attr("type","password");
	}
});

$("#retrieve").on("click",function(){
	if($("#code").val() === "") {
		alert("CODE field is required");
	} else {
		//send ajax request to server
		jqxhr = $.post( "/accounts-manager", {} );
		
		//receive data from server
		jqxhr.done(function(data){
			dummyDataFromServer.account = data.account;
			dummyDataFromServer.username = data.username;
			dummyDataFromServer.password = data.password;
			
			//verify data from server

			//update the ui fields
			$("#account").attr("value",dummyDataFromServer.account);
			$("#username").attr("value",dummyDataFromServer.username);
			$("#password").attr("value",dummyDataFromServer.password);
		});
		jqxhr.fail(function(){
			alert("I HAVE FAILED!");
		});
	}
});
