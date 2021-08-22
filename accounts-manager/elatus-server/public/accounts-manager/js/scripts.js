let jqxhr;

$("#loading-result").css("visibility", "hidden");

$("#show-password").on("click",function(){
	if($("#password").attr("type") === "password"){
		$("#password").attr("type","text");
	} else {
		$("#password").attr("type","password");
	}
});

$("#retrieve").on("click",function(){
	$("#loading-result").css("visibility", "visible");
	$("input").attr("disabled","disabled");
	$("button").attr("disabled","disabled");
	
	jqxhr = $.post( "/accounts-manager-retrieve", {keyword:$("#account").val()} );
	
	$("#account").val("");
	$("#username").val("");
	$("#password").val("");
	
	jqxhr.done(function(data){
		$("#loading-result").css("visibility", "hidden");
		$("input").removeAttr("disabled");
		$("button").removeAttr("disabled");
		
		if(data.status === "no data") {
			alert("No data found.");
		} else if(data.status === "many data") {
			alert("Please specify from the list of retrieved data :\n" + data.account);
		} else {
			$("#account").val(data.account);
			$("#username").val(data.username);
			$("#password").val(data.password);
		}
	});
	
	jqxhr.fail(function(){
		$("#loading-result").css("visibility", "hidden");
		$("input").removeAttr("disabled");
		$("button").removeAttr("disabled");
		
		alert("Cannot retrieve data from server as of the moment.");
	});
});

$("#save").on("click",function(){
	$("#loading-result").css("visibility", "visible");
	$("input").attr("disabled","disabled");
	$("button").attr("disabled","disabled");
	
	if($("#account").val() === "" || $("#username").val() === "" || $("#password").val() === "") {
		alert("Need to fill up all the fields.");
	} else {
		jqxhr = $.post( 
			"/accounts-manager-save", 
			{
				account : $("#account").val(),
				username : $("#username").val(),
				password : $("#password").val()
			}
		);
		
		$("#account").val("");
		$("#username").val("");
		$("#password").val("");
		
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
	$("#loading-result").css("visibility", "visible");
	$("input").attr("disabled","disabled");
	$("button").attr("disabled","disabled");
	
	if($("#account").val() === "" || ($("#username").val() === "" && $("#password").val() === "")) {
		alert("Need to fill up the Account field.\nNeed to fill up atleast one of Username and Password fields.");
	} else {
		jqxhr = $.post( 
			"/accounts-manager-update", 
			{
				account : $("#account").val(),
				username : $("#username").val(),
				password : $("#password").val()
			}
		);
		
		$("#account").val("");
		$("#username").val("");
		$("#password").val("");
		
		jqxhr.done(function(data){
			$("#loading-result").css("visibility", "hidden");
			$("input").removeAttr("disabled");
			$("button").removeAttr("disabled");
			
			if(data.status === "error") {
				alert("Data not updated.");
			} else if(data.status === "no data") {
				alert("Data does not exist.");
			} else {
				alert("Data updated.");
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
	$("#loading-result").css("visibility", "visible");
	$("input").attr("disabled","disabled");
	$("button").attr("disabled","disabled");
	
	if($("#account").val() === "") {
		alert("Need to fill up the Account field.");
	} else {
		jqxhr = $.post( "/accounts-manager-delete", {account:$("#account").val()} );
		
		$("#account").val("");
		$("#username").val("");
		$("#password").val("");
		
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
