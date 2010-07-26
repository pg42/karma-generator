var questionSet1=new Array(10,2,150,50,500,1500,12,120,250,40)
var questionSet2=new Array(3,16,62,59,127,355,400,757,935,1205)
var TOTAL_QUES=10
var s,m,h;
var gameTimer,t;
var level=1;
var flag_correct;

function initialize(karma)
{
    $("#content").append(createDiv('section').append(createDiv('gameArea')))
                         .append(createDiv('confirmBtn'))
                         .append(createDiv('imgStory'))
                         .append(createDiv('gameOver'));
       
    //timer
    $("#footer").append(createDiv('timerBar')
                        .append(createDiv('timerTitle').html('Timer:'))
                        .append(createDiv('timerBox1').addClass('timerBoxes'))
                        .append(createDiv('timerBox2').addClass('timerBoxes'))
                        .append(createDiv('timerBox3').addClass('timerBoxes'))
                                );
}

function startLesson(karma)
{
    /** timer **/
    var stopTimer = function(){
        s = 0; m = 0; h = 0;
        clearTimeout(gameTimer);
    };
    var startTimer = function(){
        s=checkTime(s);
        m=checkTime(m);
        h=checkTime(h);
        $('#timerBox1').html(s);
        $('#timerBox2').html(m);
        $('#timerBox3').html(h);
        increaseTime();
    };
    
    var increaseTime = function(){
        s++;
        if(s>60){
            m++;
            m=checkTime(m);
            $('#timerBox2').html(m);
            s = 0;
        }
        if(m>60){
            h++;
            h=checkTime(h);
            $('#timerBox3').html(h);
            m=0;
    
        }
        s=checkTime(s);
        $('#timerBox1').html(s);
        gameTimer = setTimeout(function(){increaseTime();},1000);
    };
    
    var checkTime = function(timePara){
        if (timePara<10 ){
        timePara="0" + timePara;
        }
        return timePara;
    };
    
    /** end of timer code **/
    
    //array shuffle
    /*shuffle = function(o){
	for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
	return o;
    };*/

    
    var display_game_over = function(){
        stopTimer();
        $('#section').show();
        $('#section').addClass('gameOverShow');
        $('#gameOver').show();
        $('#gameOver').html('<img src="assets/image/gameOver.png');
        $('#gameOver').append('<div class="specialText">Click Play Again to play the game again or next/back to different game.</div>');
        if(level === 1){
            $('#linkNextLesson').show();
            $('#linkPrevLesson').hide();
            $('#linkNextLesson').click(function(){
                level=2;
                game_start();
            });
        }
        else{
            $('#linkNextLesson').hide();
            $('#linkPrevLesson').show();
            $('#linkPrevLesson').click(function(){
                level=1;
                game_start();
            });
        }
    };
    
    var focus_blur = function(){
        $('input[type="text"]').focus(function() {
            $(this).addClass("focus");
        });
        $('input[type="text"]').blur(function() {
            $(this).removeClass("focus");
        });
    }
    
    /** for answer checking **/
    
    var hide_textboxAnswers = function(){
        for(var i=0; i< TOTAL_QUES;i++){
            $('#checkFirst'+i).html('');
            $('#checkSecond'+i).html('');
            $('#ansBoxCorrect'+i).hide();
        }
    };

    var delay = function(){
            hide_textboxAnswers();
    }
    
    // Convert from Roman Numerals
    var deromanize = function( r ) {
        var roman = r.toUpperCase(),
        lookup = {I:1,V:5,X:10,L:50,C:100,D:500,M:1000},
        arabic = 0,
        i = roman.length;
        while (i--) {
            if ( lookup[roman[i]] < lookup[roman[i+1]] )
                arabic -= lookup[roman[i]];
            else
                arabic += lookup[roman[i]];
        }
        return arabic;
    }

    //Convert to roman numerals
    var romanize = function(num) {
        var lookup = {M:1000,CM:900,D:500,CD:400,C:100,XC:90,L:50,XL:40,X:10,IX:9,V:5,IV:4,I:1},
            roman = '',
            i;
        for ( i in lookup ) {
            while ( num >= lookup[i] ) {
                roman += i;
                num -= lookup[i];
            }
        }
        return roman;
    }
    
    var check_answers = function(){
        var counter = 0;
        var ques;
        var flag_correct = 0;
        for(var i = 0; i< TOTAL_QUES;i++){
            if(level === 1){
                    ques = questionSet1[i];
            }
            else{
                    ques = questionSet2[i];
            }
            var x = $('#ansBox'+i).val();
            $('#checkFirst'+i).html('');
            $('#checkSecond'+i).html('');
            $('#ansBoxCorrect'+i).hide();
            if(ques === deromanize(x) && x!= ""){
                    $('#checkFirst'+i).append('<img src = "assets/image/correct.png">');
                    counter++;
                    flag_correct = 1;
            }
            else{
                    flag_correct = 0;
                    $('#checkFirst'+i).append('<img src = "assets/image/incorrect.png">');
            }
            if(flag_correct === 0){
                    $('#ansBoxCorrect'+i).show();
                    $('#checkSecond'+i).html('<img src = "assets/image/correct.png">');
                    $('input#ansBoxCorrect'+i).val(romanize(ques));
            }
        }
        if(counter != TOTAL_QUES){
            t=setTimeout(function(){delay();},3000);  //give chance to see for 3 sec if incorrect
        }
        else{
            //play = 0;
            display_game_over();
            //alert("game over")
        }
    
    };
    /** end answer checking**/
    
    var createQuestion = function (square){
        var ques;

        if(level === 1){
                ques = questionSet1[square];
        }
        else{
                ques = questionSet2[square];
        }

        $('#gameArea').append('<div id="imageArea'+square+'" class="imgArea"></div>');
        $('#imageArea'+square).append('<div id="ques'+square+'" class="quesBox"></div>');
        $('#ques'+square).html(ques);
        $('#imageArea'+square).append('<input id="ansBox'+square+'" type="text" class="textBox" maxlength="10" size="10">');
        $('#imageArea'+square).append('<div id="checkFirst'+square+'" class="check"></div>');
        $('#imageArea'+square).append('<input id="ansBoxCorrect'+square+'" type="text" style="display:none" class="textBox" maxlength="10" size="10">');
        $('#imageArea'+square).append('<div id="checkSecond'+square+'" class="check"></div>');
    };
        
    var game_start = function()
    {
        stopTimer();
        startTimer();
        if(level==1)
        {
            questionSet1 = Karma.shuffle(questionSet1);
        }
        else
        {
            questionSet2 = Karma.shuffle(questionSet2);
        }
        $('#linkNextLesson').hide();
	$('#linkPrevLesson').hide();
        if($("#section").hasClass("gameOverShow")) $("#section").removeClass("gameOverShow");
        $("#gameOver").hide();
        $('#gameArea').html('').append(createDiv('topText'));
        
        for(var i = 0; i < TOTAL_QUES; i++){
	    createQuestion(i);
	}
        focus_blur();
    }
    game_start();
    
    $('#confirmBtn').click(function(){
	check_answers();
    });
    
    /*$('#linkPrevLesson').click(function(){
        if(level === 1){
            game_start();
        }
        else if(level === 2){
            level = 1;
            game_start();
        }
    });
    $('#linkNextLesson').click(function(){
        level = 2;
        game_start();
    });*/
}
setUpLesson(initialize, startLesson);