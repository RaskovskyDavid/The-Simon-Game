let buttonColours = ["red", "blue", "green", "yellow" ];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;
console.log('load');
$(document).ready(function(){
    $(document).keypress(function() {
        if (!started) {
            $("#level-title").text("Level " + level);
            nextSequence();
            started = true;
        }
    })
    console.log('ready');
    $('.btn').click(function() {
        console.log("$('btn').click(function() ");
        var userChosenColour = $(this).attr("id");
        userClickedPattern.push(userChosenColour);
        playSound(userChosenColour);
        animatePress(userChosenColour);
        checkAnswer(userClickedPattern.length -1 );
    })
    function nextSequence(){
        userClickedPattern = [];
        level++;
        $("#level-title").text("Level " + level);
        console.log("function nextSequence(){");
        var randomNumber = Math.floor(Math.random() * 4);
        var randomChosenColour = buttonColours[randomNumber];
        gamePattern.push(randomChosenColour);
        $('#'+randomChosenColour).fadeToggle(100).fadeToggle(100);
        playSound(randomChosenColour);
        animatePress(randomChosenColour);
    }
    function playSound(name){
        console.log("function playSound(name){");
        var sound = new Audio('sounds/'+ name+'.mp3');
        sound.play();
    }
    function animatePress(currentColour){
        console.log("function animatePress(currentColour){");
        $('#'+ currentColour).addClass('pressed');
        setTimeout(function () {
            $("#" + currentColour).removeClass("pressed");
          }, 100);
    }
    function checkAnswer(currentLevel){
        if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
            console.log("success");
            if (userClickedPattern.length === gamePattern.length){
                setTimeout(function () {
                    nextSequence();
                  }, 1000);
            }
        }
        else {
            console.log("wrong");
            playSound("wrong");    
            $("body").addClass("game-over");
            setTimeout(function () {
              $("body").removeClass("game-over");
            }, 200);
            $("#level-title").text("Game Over, Press Any Key to Restart");
            startOver();

          }
    }
    function startOver(){
        level = 0;
        gamePattern = [];
        started = false;
    }
});