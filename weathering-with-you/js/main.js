const apiKey = "ddd46926cf372917be61ce75831a6912";
let place = "cebu";
let jqxhr;
let unix_timestamp;
let date;

getWeatherInformation();

$("button").on("click", function(){
	if($("#loading-result").css("visibility") == "hidden") {
		execute();
	}
});

$("#name").on("keypress",function(event){
	if(event.keyCode == 13 && $("#loading-result").css("visibility") == "hidden") {
		execute();
	}
});

function execute() {
	if($("#name").val()) {
		place = $("#name").val();
		getWeatherInformation();
	}
}

function getWeatherInformation() {
	$("#loading-result").css("visibility", "visible");
	$("#result-success").css("visibility","hidden");
	$("#result-failed").css("visibility","hidden");

	jqxhr = $.post( "https://api.openweathermap.org/data/2.5/weather?q="+place+"&appid="+apiKey+"");

	jqxhr.done(function(data){
		$("#result-success h1").text(data.name);
		$("#result-success img").attr("src", "https://openweathermap.org/img/wn/"+data.weather[0].icon+"@4x.png");
		$("#description").text(data.weather[0].main+" ("+data.weather[0].description+") ");
		$("#max-temp").text(Math.round(data.main.temp_max - 273.15));
		$("#min-temp").text(Math.round(data.main.temp_min - 273.15));

		unix_timestamp = data.sys.sunrise;
		date = new Date(unix_timestamp * 1000);
		$("#sunrise").text(date.getHours()+":"+date.getMinutes());

		unix_timestamp = data.sys.sunset;
		date = new Date(unix_timestamp * 1000);
		$("#sunset").text(date.getHours()-12+":"+date.getMinutes());

		setTimeout(function(){ 
			$("#loading-result").css("visibility", "hidden");
			$("#result-success").css("visibility","visible");
			$("#result-failed").css("visibility","hidden");
		}, 1500);
	});

	jqxhr.fail(function(){
		$("#loading-result").css("visibility", "hidden");
		$("#result-success").css("visibility","hidden");
		$("#result-failed").css("visibility","visible");
	});
	
	$("#name").val("");
}

