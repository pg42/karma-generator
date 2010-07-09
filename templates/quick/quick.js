var i,j;
var totalCounter;
var currentQuestion;
var randPositions = [];
var numFst;
var num2nd;
var s = 0;var t,quesTimer;
var flag_busy;

var initializefunction = function() {
	game_start();
};

start_game = function() {
	game_start();
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

var genRandPosition=function (){correctCounter = 0;
	randPositions[0] = Karma.rand(0,TOTAL_QUES-1);
	for(i=1; i<TOTAL_QUES; i++){
		do{
			flag = 0;
			randPositions[i] = Karma.rand(0,TOTAL_QUES-1);
			for(j=0; j<i; j++){
				if(randPositions[i] === randPositions[j]){
					flag++;
				}
			}
		}while(flag != 0 );  //end of do while loop	
	}
};
	
var next_question = function (){	
	flag_busy = 0;
	numFst = Karma.rand(10,99);
	num2nd = Karma.rand(10,99);

	$('#calcSection').html('').append(numFst +' + '+num2nd+' = ');
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
	$('#tvLayer').addClass('tvOn').html('खेल खत्तम।');
};

var check_answer = function(){	
	textVal = $('.textBox').val();
	if((numFst+num2nd) == textVal){
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
		k.audio.incorrect.play();
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

function game_start(){
	$('#tvLayer').html('');
	$('#calcSection').html('');
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
