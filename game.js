var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var level = 0;
var userClickedPattern = [];

var started = false;

function nextSequence() {
    userClickedPattern = [];
    //random
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    
    //text
    level++;
    $("#level-title").text("Level " + level);

    //animation and sound
    makeSound(randomChosenColour);
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

    console.log(gamePattern)
    return randomChosenColour;
}

function makeSound(color) {
    var audio = new Audio('sounds/' + color +'.mp3');
    audio.play()
}

function animatePress(color) {
    $('#' + color).addClass("pressed");
    setTimeout(function() {
        $('#' + color).removeClass("pressed");
    }, 100)
}

function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        // console.log("Success")
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function() {
                nextSequence()
            }, 1000)

        }
    } else {
        // console.log("Fail")
        makeSound("wrong")
        $('body').addClass("game-over");
        setTimeout(function() {
            $('body').removeClass("game-over");
        }, 200)
        $("#level-title").text("GAME OVER!, Press any key to restart.");
        restart()
    }
}

function restart() {
    gamePattern = [];
    level = 0;
    userClickedPattern = [];
    started = false;
}

$(document).keypress(function() {
    if(!started) {
        $("#level-title").text("Level " + level);
        nextSequence()
        started = true;
    }
})

$('.btn').on("click", function() {
    var pressedButton = this.id
    userClickedPattern.push(pressedButton);
    animatePress(pressedButton);
    makeSound(pressedButton);

    checkAnswer(userClickedPattern.length - 1)
})