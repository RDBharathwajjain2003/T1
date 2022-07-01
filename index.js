var buttonColours = ["one", "two", "three", "four","five","six","seven","eight","nine","ten","eleven","twelve","thirteen","fourteen","fifteen","sixteen"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

document.addEventListener("keypress",function() {
  if (!started) {
    document.querySelector("#level-title").style.addtext("Level " + level);
    nextSequence();
    started = true;
  }
});

document.querySelector(".btn").addEventListener("click", function() {

  var userChosenColour = document.querySelector(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length-1);
});


function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

      console.log("success");

      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }

    } else {

      console.log("wrong");

      playSound("wrong");

      document.querySelector("body").classList.add("game-over");
      setTimeout(function () {
        document.querySelector("body").classList.remove("game-over");
      }, 200);

      document.querySelector("#level-title").style.addtext("Game Over, Press Any Key to Restart");

      //2. Call startOver() if the user gets the sequence wrong.
      startOver();
    }

}

function nextSequence() {

  userClickedPattern = [];
  level++;
  document.querySelector("#level-title").style.addtext("Level " + level);

  var randomNumber = Math.floor(Math.random() * 16);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  document.querySelector("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

function playSound(name) {
  var audio = new Audio("sound/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  document.querySelector("#" + currentColor).classList.add("pressed");
  setTimeout(function () {
    document.querySelector("#" + currentColor).classList.remove("pressed");
  }, 100);
}

//1. Create a new function called startOver().
function startOver() {

  //3. Inside this function, you'll need to reset the values of level, gamePattern and started variables.
  level = 0;
  gamePattern = [];
  started = false;
}
