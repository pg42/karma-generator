var clock;
var num1,num2,currectAnswer;
var playerCounter = 0,computerCounter = 0;
var lowerLimit1 =0,lowerLimit2 =0,upperLimit1 =0,upperLimit2 =0;

function initialize(karma){
	//scoreboardInitialize();
	//clock = createCountdownTimer(function () {}, 10);
}

function startLesson(karma){

    clock = createCountdownTimer(function () {}, 10);    
    clock.show();
	
	$('#content')
	
		.append(createDiv('gameOver'))
		.append(createDiv('imgLesson1')
			.append(karma.createImg('imgTop'))
			.css({
					'z-index':'101',
					position:'absolute',
					top:'-3em',
					left:'27em'
				}))
		.append(createDiv('imgMainBridge')
			.append(karma.createImg('main_bridge'))
			.css({
					'z-index':'100',
					position:'absolute',
					top:'0.75em',
					left:'0em'
				}))
			
		.append(createDiv('bridgeUp')
			.append(karma.createImg('bridgeUp'))
			.css({
					'z-index':'90',
					position:'absolute',
					top:'11em',
					left:'0em'
				}))
		.append(createDiv('bridge1')
			.css({
					'z-index':'0',
					position:'absolute',
					top:'6em',
					left:'0em'
				})
			.append(createDiv('redTruck')
				.css({
					'z-index':'5',
					position:'absolute'
				})
				.append(createDiv('redTruckText')
				.css({
					'z-index':'250',
					position:'absolute'
				}))
				.append(createDiv('redTruckImg')
						.append(karma.createImg('redTruck0'))
						.css({
								'z-index':'5',
								position:'absolute'
							}))				
						))	
		.append(createDiv('bridge2')
			.css({
					'z-index':'0',
					position:'absolute',
					top:'21.75em',
					left:'0em'
				})
			.append(createDiv('blueTruck')
				.css({
					'z-index':'5',
					position:'absolute'
				})
				.append(createDiv('blueTruckText')
				.css({
					'z-index':'250',
					position:'absolute'
				}))
				.append(createDiv('blueTruckImg')
						.append(karma.createImg('blueTruck0'))
						.css({
								'z-index':'5',
								position:'absolute'
							}))
				))		
		.append(createDiv('redTruckArea')
			.attr('class','turckArea')
			.css({
					'z-index':'300',
					position:'absolute',
					top:'0em',
					left:'0em'
				}))
		.append(createDiv('blueTruckArea')
			.attr('class','turckArea')
			.css({
					'z-index':'300',
					position:'absolute',
					top:'8em',
					left:'0em'
				}))
		.append(createDiv('questionSection')
			.css({
					'z-index':'110',
					position:'absolute',
					top:'31em',
					left:'25em'
				})
			.append(createDiv('ques')
				.attr('class','quesBoxes')
				)
			.append(createDiv('answerShow')))
		.append(createDiv('infoText')
			.css({
					'z-index':'180',
					position:'absolute',
					top:'34em',
					left:'76em'
				}))
		.append(createDiv('infotextArea')
			.css({
					'z-index':'120',
					position:'absolute',
					top:'8em',
					left:'17em'
				}))			
		.append(createDiv('levelControl')
			.css({
					'z-index':'120',
					position:'absolute',
					top:'15em',
					left:'0em'
				})
			.append(createDiv('level0')
				.addClass('level')
				.append(karma.createImg('level1'))
				.click(function(){	
					selectLevel(0);}))
			.append(createDiv('level1')
				.addClass('level')
				.append(karma.createImg('level2'))
				.click(function(){	
					selectLevel(1);}))
			.append(createDiv('level2')
				.addClass('level')
				.append(karma.createImg('level3'))
				.click(function(){	
					selectLevel(2);})));

							
			function resetTimer(){
				clock.reset();
				clock.setTime(5);
				clock.setCallback(checkAnswer);
				clock.start();
			}
			
			function selectLevel(currentLevel){				
				if(currentLevel === 0){
					lowerLimit1 = 2;
					upperLimit1 = 5;
					lowerLimit2 = 1;
					upperLimit2 = 4;				
				}else if(currentLevel === 1){
					lowerLimit1 = 4;
					upperLimit1 = 8;
					lowerLimit2 = 4;
					upperLimit2 = 7;
				}else{
					lowerLimit1 = 8;
					upperLimit1 = 10;
					lowerLimit2 = 7;
					upperLimit2 = 10;				
				}
				showQuestion();
			}
			
			function showQuestion(){
				resetTimer();		
				num1 = karma.rand(lowerLimit1,upperLimit1);
				num2 = karma.rand(lowerLimit2,upperLimit2);
				correctAnswer = num1 * num2;
				$('#ques')
					.empty()
					.append(num1 +' X '+ num2 +' =  ?')
					.append($(document.createElement('input'))
								.attr('class','inputBox')
								.attr('id','ans'))
					.append(createDiv('displayImg'));
				$('#ans')
					.empty()
					.focus()
					.keypress(function(event) {
							if(event.which === 13){
								checkAnswer();					
							}							
						});
				$('#answerShow').empty();
			}			

		function checkAnswer(){
			var currentAnswer = $('#ans').val();
			$('#answerShow').empty();
			clock.stop();
			$('#ans').unbind('keypress');
			if(currentAnswer == correctAnswer){					
				$('#displayImg').append(karma.createImg('correctFace'))
				karma.play('correct')
				playerCounter++;
				$('#bluebox' + playerCounter).show();
				$('#ans').select();
				if(playerCounter == 12)
				{
					imgAnimate('blueTruck',0,63.5,8000);
					return;
				}
			}else{
				$('#answerShow').html(num1 +' X '+ num2 +' =  '+correctAnswer)
				$('#displayImg').append(karma.createImg('incorrectFace'))
				karma.play('incorrect')			
				computerCounter++;
				$('#redbox'+computerCounter).show();
				$('#ans').select();
				if(computerCounter == 12)
				{
					imgAnimate('redTruck',0,63.5,8000);
					return;
				}
		}
		setTimeout(showQuestion,1500);
	}
	
	function imgAnimate(divName,topPos,leftPos,duration){
		$('#'+divName).animate(
				{top:topPos+'em',left:leftPos+'em'},duration,
				function(ev){
					 $('#questionSection').html('');
					 if(divName == 'redTruck'){
						 $('#gameOver').html('Computer Wins !!!');
					 }else{
						 $('#gameOver').html('You Win !!!');
					 }
				
				}
		);	
	}
	
	function loadBoxes(truckColor){
		var counter = 0;
		var initialLeft = 170;
		var top = 25;		
		for(var i=0; i<4; i++)
		{
			var left = initialLeft;
			var width =0;		
			for(var j=0; j<3; j++)
			{
				counter++;			
				$('#' + truckColor + 'TruckImg')
				.append(createDiv(truckColor + 'box' + counter)
					.attr('class','boxes')
					.css({
						left: (left - width) + 'px' ,
						top: top + 'px'
				}));						
				left = $('#' + truckColor + 'box' + counter).position().left;
				width = $('#' + truckColor + 'box' + counter).width();
			}
			top = $('#' + truckColor + 'box' + counter).position().top - $('#' + truckColor + 'box' + counter).height()				
		}
		$('.boxes').hide();
	}
	
	loadBoxes('red');
	loadBoxes('blue');		
	selectLevel(0);//start question here				
}

setUpLesson(initialize, startLesson);
