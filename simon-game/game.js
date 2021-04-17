if($(window).width() <= 750) {
	$("h1").text("Click Any Key to Start");
}

var randomNumber;
var buttonColors = ["red", "blue", "green", "yellow"];
var randomChosenColor;
var gamePattern = [];
var userClickedPattern = [];
var level = 1;
var result = true;
var gameStart = false;
var validation = false;

function nextSequence() {
	$("h1").text("Level "+level);
	randomNumber = Math.floor(Math.random() * 4);
	randomChosenColor = buttonColors[randomNumber];
	gamePattern.push(randomChosenColor);
	$("#"+randomChosenColor).fadeOut(150).fadeIn(150);
	playSound(randomChosenColor);
	level++;
}

function playSound(name) {
	var audio = new Audio("sounds/"+name+".mp3");
	audio.play();
}

function animatePress(currentColor) {
	$("#"+currentColor).addClass("pressed");
	setTimeout(function () {
		$("#"+currentColor).removeClass("pressed");
	}, 100);
}

function gameOver() {
	if($(window).width() > 750) {
		$("h1").text("Game Over, Press Any Key to Restart");
	} else {
		$("h1").text("Game Over, Click Any Key to Restart");
	}
	playSound("wrong");
	$("body").addClass("game-over");
	setTimeout(function () {
		$("body").removeClass("game-over");
		gamePattern = [];
		userClickedPattern = [];
		level = 1;
		result = true;
		gameStart = false;
	}, 100);
}

$(".btn").on("click",function(){
	if(gameStart == true && validation == false) {
		var userChosenColor = this.id;
		userClickedPattern.push(userChosenColor);	
		animatePress(userChosenColor);
		playSound(userChosenColor);
		for(var ctr=0;ctr<userClickedPattern.length;ctr++) {
			if(userClickedPattern[ctr] != gamePattern[ctr]) {
				result = false;
			}
		}
		if(result === false) {
			gameOver();
		}
		if(result === true && gamePattern.length > 0 && userClickedPattern.length === gamePattern.length) {
			validation = true;
			setTimeout(function() {
				userClickedPattern = [];
				nextSequence();
				validation = false;
			}, 500);
		}
	}
});

$(document).on("keypress",function(){
	if($(window).width() > 750 && gameStart === false) {
		gameStart = true;
		nextSequence();
	}
});

$(document).on("click",function(){
	if($(window).width() <= 750 && gameStart === false) {
		gameStart = true;
		nextSequence();
	}
});
