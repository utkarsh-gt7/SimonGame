var gamePattern = [];
var userClickedPattern = [];

var level = 0;
var started = false;

var buttonColours = ["red", "blue", "green", "yellow"];


function nextSequence(){
    userClickedPattern = [];
    level += 1;
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
} 
// nextSequence();

$(".btn").click(function(){
    var userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
});

function playSound(name){
    var audioTile = new Audio('sounds/' + name + '.mp3');
    audioTile.play();
}

function animatePress(currentColour){
    $("#" + currentColour).addClass("pressed");

    setTimeout(function(){
        $("#"+ currentColour).removeClass("pressed");
    }, 100);
}

$(document).on("keydown", function() {
    if(started == false){
        $("h1").text("Level 0");
        nextSequence();
        started = true;
    }
});

function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        //alert("Success");
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(nextSequence(), 1000);
        }
    }
    else{
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

function startOver(){
    level = 0;
    gamePattern = 0;
    started = false;
}