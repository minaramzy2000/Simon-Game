// alert("hello");
var butttonColours = ["red","blue","green","yellow"];

var gamePattern  = [];
var userClickPattern = [];
var level = 0;
var started = false;


$(document).on("keydown",function(){
    
    if(!started){
        $("#level-title").text("level " + level);
        nextSequence();
        started = true;
    }
    
});

$(".btn").on("click",function(){

    var userChosenColour = $(this).attr("id");
    
    userClickPattern.push(userChosenColour);
    
    playSound(userChosenColour);
    animatePress(userChosenColour);
    
    checkAnswer(userClickPattern.length -1);    
});    

function checkAnswer(currentLevel) {

    if(gamePattern[currentLevel] === userClickPattern[currentLevel]){
        if (userClickPattern.length === gamePattern.length){
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
    }else{
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");

        setTimeout(function(){
            $("body").removeClass("game-over")
        },200);

        startOver();
    }
}
function nextSequence(){

    userClickPattern = [];
    level ++;
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = butttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);

};

function animatePress(currentColour){
    
    $("#" + currentColour).addClass("pressed");
    setTimeout(function(){$("#" + currentColour).removeClass("pressed")},100);
    
};

function playSound(name){
    
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
    
};
    
    
function startOver(){

    level = 0;
    gamePattern = [];
    started = false;
}    
