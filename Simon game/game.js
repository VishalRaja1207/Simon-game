var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userChosenPattern = [];
var level = 0;
var start = false;

$(".btn").click(function() {
  var userChosenColor = $(this).attr("id");
  userChosenPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  setTimeout(function() {
    checkAnswer(userChosenPattern.length - 1);
  }, 1000);

});

$(document).keydown(function(event) {
  if (!start) {
    nextSequence();
    start = true;
  }
});

function nextSequence() {
  level++;
  $("h1").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userChosenPattern[currentLevel]) {
    console.log("success");
    if (gamePattern.length === userChosenPattern.length) {
      setTimeout(function() {
        userChosenPattern = [];
        nextSequence();
      }, 1000);
    }
  } else {
    console.log("Wrong");
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    },200);
    $("h1").text("Game Over, Press Any Key to Restart");
    start = false;
    level = 0;
    gamePattern = [];
    userChosenPattern = [];
  }
}
