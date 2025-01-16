//alert("Welcome to the Game!");
var gamePattern = [];
var buttonColors = ["red","blue","green","yellow"];
var userClickedPattern = [];
var randomNumber;
var level = 0;

var started = false;

function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}

$("html").on("keydown",function(){
    if(!started){
        nextSequence();
        $("#level-title").text("Level " + level);
        started = true;
    }
})


$(".btn").on("click",function(event){
    var userChosenColor = event.target.id;
    userClickedPattern.push(userChosenColor);
    //console.log(userClickedPattern);
    playSound(userChosenColor);
    animatePress(userChosenColor);

    checkAnswer(userClickedPattern.length-1);
    
});

function checkAnswer(currentLevel){
    console.log(currentLevel);
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        console.log("success");

        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function(){
                nextSequence()
            },1000);
        }
    }

    else{
        console.log("Wrong");
        playSound("wrong");

        $("body").addClass("game-over");

        setTimeout(function(){
            $("body").removeClass("game-over")
        },200);

        $("#level-title").text("Game Over, Press any key to restart.");
        startOver();
    }
}

function nextSequence(){
    userClickedPattern = [];

    level++;
    $("#level-title").text("Level "+level);

    randomNumber = Math.random();
    randomNumber = Math.round(randomNumber*3);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    $("#"+randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColor);
}


function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour){
    $("#" + currentColour).addClass("pressed");

    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed");
    },100);
}





