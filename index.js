var userClickedPattern = [];

var gamePattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var level = 0;
var continueClick = true;
var started = false;
var iterator = 0;

function nextSequence() {
  var randomNumber = Math.floor(4 * Math.random());
  level++;
  $("h1").text("Level " + level);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  return randomChosenColor;
}


$(document).keypress(function() {
  if (!started) {
    var call = nextSequence();
    $("#" + call).fadeOut(100).fadeIn(100);
    playSound(call);
    started = true;
    continueClick = false;
  }
});


$(".btn").click(function() {
  if (!continueClick) {
    var userChosenColor = this.id;
    playSound(userChosenColor);
    animatePress(userChosenColor);
    userClickedPattern.push(userChosenColor);
    if (gamePattern[iterator] == userClickedPattern[0]) {
      if ((iterator + 1) == gamePattern.length) {
        userClickedPattern.shift();
        var call2 = nextSequence();
        setTimeout(function() {
          $("#" + call2).fadeOut(100).fadeIn(100);
          playSound(call2);
        }, 1000);
        iterator = 0;
      } else {
        userClickedPattern.shift();
        iterator++;
      }
    } else {
      userClickedPattern.shift();

      while(gamePattern.length > 0){
        gamePattern.shift();
      }
       playSound("wrong");
      $("body").addClass("game-over");
      setTimeout(function() {
        $("body").removeClass("game-over");
      }, 100);

      $("h1").text("Game over!! Press A key to restart..");
      continueClick = true;
      started = false;
      level=0;
    }
  }
});







function playSound(name) {
  switch (name) {
    case "red":
      var audio = new Audio("sounds/" + "red" + ".mp3");
      audio.play();
      break;

    case "blue":
      var audio = new Audio("sounds/" + "blue" + ".mp3");
      audio.play();
      break;

    case "green":
      var audio = new Audio("sounds/" + "green" + ".mp3");
      audio.play();
      break;

    case "yellow":
      var audio = new Audio("sounds/" + "yellow" + ".mp3");
      audio.play();
      break;

    case "wrong":
      var audio = new Audio("sounds/" + "wrong" + ".mp3");
      audio.play();
      break;
  }
}

function animatePress(currentColor) {
  $("." + currentColor).addClass("pressed");
  setTimeout(function() {
    $("." + currentColor).removeClass("pressed");
  }, 100);
}
