var i,j;
var totalCounter;
var currentQuestion;
var randPositions;
var numFst, num2nd, answer;
var s;
var t,quesTimer;
var flag_busy;

var initialize = function() {
};

start_game = function() {
	$('#tvLayer').html('');
	$('#calcSection').html('');
	$('#tvLayer').toggleClass('tvOff tvOn').html('');
	
	randPositions=[];
	s=0;
	totalCounter = 0;
	correctCounter = 0;
	stopTimer();
	startTimer();  	
	$('#imgDisplay').html('');
	for(var i = 0; i< TOTAL_QUES; i++){
		$('#imgDisplay').append('<div id="img'+i+'></div>');
		$('#img'+i).addClass('default');
	}			
	$('#timerBar').show();
	genRandPosition();
	next_question();
}
	
setUpLesson(initialize, start_game)

var checkTime = function(timePara){
	if (timePara<10 ){
		timePara="0" + timePara;
	 }
	 return timePara;
};
    	
var stopTimer = function(){
	s = 0;
	clearTimeout(quesTimer);
};
	
var startTimer = function(){
	s = 0;
	s=checkTime(s);
	$('#timerBox1').html(s);
	increaseTime();
};

var increaseTime = function(){
	s++;
	s=checkTime(s);
	$('#timerBox1').html(s);
	quesTimer=setTimeout(function(){increaseTime();},1000);
};

var genRandPosition=function (){
	correctCounter = 0;
	for(i=0; i<TOTAL_QUES; i++){
		randPositions[i] = i;
	}
	randPositions=Karma.shuffle(randPositions);
};
	
var next_question = function (){
	flag_busy = 0;

	if(LESSON_TYPE=="div") {
		numFst = Karma.rand(12,99);
		num2nd = Karma.rand(2,12);	
		do{
			numFst = Karma.rand(20,99);
			answer=numFst/num2nd;
			if(isInteger(answer)){
				break;
			}
		}while(true);
	} else {
		numFst = Karma.rand(10,99);
		num2nd = Karma.rand(10,99);
		answer = numFst+num2nd;	
	}
	
	$('#calcSection').html('').append(numFst +SIGN+num2nd+' = ');
	$('#calcSection').append('<input type="text" class="textBox" maxlength="3" />');
	foucs_blur();				
	$('.textBox').focus();
};
		
var delay_nextQues = function(){			
	next_question();
};
		
var delay_gameOver = function(){
	$('#calcSection').html('');
	play = 0;
	for(var i = 0; i< TOTAL_QUES; i++){
		$('#imgDisplay').append('<div id="img'+i+'></div>');
		$('#img'+i).removeClass('correct').addClass('default');				
	}
	$('#tvLayer').toggleClass('tvOff tvOn').html('खेल खत्तम।');
};

var check_answer = function(){	
	textVal = $('.textBox').val();
	if(textVal==answer){
		totalCounter++;
		flag_busy = 1;
		Karma.audio.correct.play();
		$('#img'+randPositions[totalCounter]).removeClass('default').addClass('correct');
		if(totalCounter === TOTAL_QUES){
			t=setTimeout(function(){delay_gameOver();},1000);
		}
		else{
			t=setTimeout(function(){delay_nextQues();},1000);
		}
	}
	else{
		Karma.audio.incorrect.play();
	}
};
		
function foucs_blur(){
	$('input[type="text"]')
	.focus(function() {
		$(this).removeClass('incorrect').addClass("focus");
	})
	.blur(function() {
		$(this).removeClass("focus");
	})
	.keypress(function(event) {
		if(event.which === 13){
			if(flag_busy === 0){
				check_answer();
			}
		}
	});
}

var isInteger = function(s){
    var i;
    s = s.toString();
    for (i = 0; i < s.length; i++){
        var c = s.charAt(i);
        if (isNaN(c)) {
            return false;
        }
    }
    return true;
};
