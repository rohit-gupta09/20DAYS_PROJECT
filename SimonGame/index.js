var buttoncolore=["red","blue","green","yellow"];
var gamepattern=[];
var userClickedPattern=[];

var started=false;
var level=0;
$(document).keypress(function(){
    if(!started){
        $("#level-title").text("Level "+" "+level);
        nextSequence();
        started=true;
    }
});

$(".btn").click(function(){
    var userChosenColor=$(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
})
function checkAnswer(currentLevel){
    if(gamepattern[currentLevel]===userClickedPattern[currentLevel]){
        if(userClickedPattern.length===gamepattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }else{
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, press Any Key to Restart");

        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        startOver();
    }
}
function nextSequence(){
    userClickedPattern=[];
    level++
    $("#level-title").text("Level "+level)
    var randomNumber=Math.floor(Math.random()*4);
    var randomChosenColor=buttoncolore[randomNumber]
    gamepattern.push(randomChosenColor)
    $("#"+randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
}
function playSound(name){
    var audio=new Audio("sounds/"+name+".mp3");
    audio.play()
}
function startOver(){
    level=0;
    gamepattern=[];
    started=false;
}
function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed");
    },100)
}