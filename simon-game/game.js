alert("Instruction : Follow and click the sequence of the blinking boxes.");

if($(window).width() <= 1000) {
	$("h1").text("Click Anywhere to Start");
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
var temp;
var audio;

function nextSequence() {
	gamePattern = [];
	temp = 0;
	for(var ctr=0;ctr<level;ctr++) {
		setTimeout(function(){
			randomNumber = Math.floor(Math.random() * 4);
			randomChosenColor = buttonColors[randomNumber];
			gamePattern.push(randomChosenColor);
			$("#"+randomChosenColor).fadeOut(150).fadeIn(150);
			playSound(randomChosenColor);
			temp++;
			if(temp === level) {
				setTimeout(function(){
					$("body").css("backgroundColor", "");
					level++;
					validation = false;
				}, 500);
			}
		}, 500*(ctr+1));
	}
}

function playSound(name) {
	audio = new Audio("sounds/"+name+".mp3");
	audio.play();
}

function stopSound() {
	if(audio) {
		audio.pause();
	}
}

function animatePress(currentColor) {
	$("#"+currentColor).addClass("pressed");
	setTimeout(function () {
		$("#"+currentColor).removeClass("pressed");
	}, 100);
}

function gameOver() {
	if($(window).width() > 1000) {
		$("h1").text("Game Over, Press Any Key to Restart");
	} else {
		$("h1").text("Game Over, Click Anywhere to Restart");
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

function youWin() {
	if($(window).width() > 1000) {
		$("h1").html("CONGRATULATIONS!!!<br>Press Any Key to Restart");
	} else {
		$("h1").html("CONGRATULATIONS!!!<br>Click Anywhere to Restart");
	}
	playSound("congratulations");
	$("body").css("backgroundColor", "ForestGreen");
	setTimeout(function () {
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
			if(level === 11) {
				youWin();
			} else {
				setTimeout(function(){
					$("h1").text("Level "+level);
					$("body").css("backgroundColor", "darkgray");
					validation = true;
					setTimeout(function() {
						userClickedPattern = [];
						nextSequence();
					}, 500);
				}, 500);
			}
		}
	}
});

$(document).on("keypress",function(){
	if($(window).width() > 1000 && gameStart === false) {
		$("h1").text("Level "+level);
		$("body").css("backgroundColor", "darkgray");
		stopSound();
		setTimeout(function() {
			gameStart = true;
			nextSequence();
		}, 500);
	}
});

$(document).on("click",function(){
	if($(window).width() <= 1000 && gameStart === false) {
		$("h1").text("Level "+level);
		$("body").css("backgroundColor", "darkgray");
		stopSound();
		setTimeout(function() {
			gameStart = true;
			nextSequence();
		}, 500);
	}
});
