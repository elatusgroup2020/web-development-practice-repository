let place;

$("#loading-result").css("visibility", "hidden");
$("#result-success").css("visibility","visible");
$("#result-failed").css("visibility","visible");
$("#name").val("");

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
	$("form").submit();
}
