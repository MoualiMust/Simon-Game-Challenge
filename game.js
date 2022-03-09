var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;
var buttonColours = ["red", "blue", "green", "yellow"];

$(".btn").click(function(e) {
  var userChosenColour = e.target.id;
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});


$("body").keypress(function(e) {
  if (started == false) {
    started = true;
    $("#level-title").text("Level " + level);
    nextSequence();
  };
});


function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}


function playSound(name) {
  const audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}


function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}


function wrong() {
  $("body").addClass("game-over");
  setTimeout(function() {
    $("body").removeClass("game-over");
  }, 200);
}


function startOver() {
    started = false;
    gamePattern=[];
    level=0;
}


function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (gamePattern.length === userClickedPattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");
    wrong();
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}
