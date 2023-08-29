var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;

var started = false;

$(document).keypress(function(){
    if(!started){
        level = 1;
        $("#level-title").html("Level " + level);
        nextSequence();
        started = true;
        
    }
})

$(".btn").click(function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    var audio = new Audio("./sounds/"+userChosenColour+".mp3");
    audio.play();
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
})

function nextSequence(){
    $("#level-title").html("Level " + level);

    userClickedPattern = [];

    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    //3. Use Google/Stackoverflow to figure out how you can use Javascript to play the sound for the button colour selected in step 1.
    var audio = new Audio("sounds/" + randomChosenColour + ".mp3");
    audio.play();

}

function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function () {
        $("#"+currentColour).removeClass("pressed");
        },100);
}

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        if (userClickedPattern.length === gamePattern.length)
        setTimeout(function () {
            level++;
            nextSequence();
          }, 1000);
    }
    else{
        $("#level-title").html("Oppps, press any key to start again");
        level = 0; 
        var audio = new Audio("sounds/wrong.mp3");
        audio.play();
        started = false;
        gamePattern = [];
        userClickedPattern = [];
    }
}


