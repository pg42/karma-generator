var questions = [
			[
				{
					qsn:'कतिओटा रेखाहरु छन् ?',
					options: [4,2,0,6],
					answer: 4
					
				},
				{
					qsn:'कतिओटा त्रिभुजहरु छन् ?',
					options: [0,4,2,6],
					answer: 0
				}
			],
			[	
				{
					qsn:'कतिओटा रेखाहरु छन् ?',
					options: [8,12,16,20],
					answer: 8
				},
				{
					qsn:'कतिओटा त्रिभुजहरु छन् ?',
					options: [4,2,6,8],
					answer: 4
				}
			],
			[	
				{
					qsn:'कतिओटा रेखाहरु छन् ?',
					options: [12,20,28,32],
					answer: 12
				},
				{
					qsn:'कतिओटा त्रिभुजहरु छन् ?',
					options: [8,4,12,16],
					answer: 8
				}
			],
			[	
				{
					qsn:'कतिओटा रेखाहरु छन् ?',
					options: [16,10,30,40],
					answer: 16
				},
				{
					qsn:'कतिओटा त्रिभुजहरु छन् ?',
					options: [12,10,8,4],
					answer: 12
				}
			]//*/
	]	;
	

	
var optImages=[ 'a','b','c','d'];
var answer;
var question_counter = 0;
var updateScoreFlag;

function initialize(karma){
		
	scoreboardInitialize();
}

function startLesson(karma){

	scoreboardReset();
	var question_set_index = -1;
	var current_question_index = 0;
		
		
	answer;  //holds the answer number after loading each qusstion
	question_counter=1; //to count the questions.
	topQsnImgFlag=1; //to toggle the top question , sicne it has only two question, it is displayed on flag changes 1 or 2
	updateScoreFlag=true; //boolen flag act as memory for the same question, either it has been clicked once or not. true for every question loads

	var x1Pos=0;
	var y1Pos=0;		//the position for ploting dots
	var x2Pos=360;
	var y2Pos=360;
	
	$('#content')
			.empty()
			.append(createDiv('lesssonHint')
										.html('बिन्दु बिन्दु जोडेर रेखा र त्रिभुज गन।')
										.attr('class', 'lessonHint'))
										
			.append(createDiv('lineNextBtn')
								.attr('class','linkNext')
								.css({
										position:'absolute',
										left:'500px',
										top:'600px'
									})	
								.clickable(function(){ nextAction(); }))
													
			.append(createDiv('outlineBackground')
					.append(createDiv('canvasBorder'))
					.append($(document.createElement('canvas'))
								.attr({
										id: 'canvasDrawBox',
										height: '360',
										width: '360'
								})
							)			
					)
			.append(createDiv('questionSection')
						.css('display','block')
						.append(createDiv('question'))
						.append(createDiv('optionSection'))
						.append(createDiv('linkNextLesson')
									.attr('class','linkNext')
									.clickable(function(){ selectQuestion();}))
						.hide()
			);
	
	
	
	
	plotDotNumber(1,x1Pos-20,y1Pos-20);plotDotNumber(2,x2Pos+20,y1Pos-20);
	plotDotNumber(3,x2Pos+20,y2Pos+20);plotDotNumber(4,x1Pos-20,y2Pos+20);
																			
	plotDot(1,x1Pos-7,y1Pos-3.5);	plotDot(2,x2Pos-7,y1Pos-3.5);
	plotDot(3,x2Pos-7,y2Pos-3.5);	plotDot(4,x1Pos-7,y2Pos-3.5);
	
	function plotDotNumber(dotNumId,xPos,yPos){
		$('#canvasBorder')
						.append(createDiv('num'+dotNumId)
									.addClass('number')
									.css({
											left:xPos,
											top:yPos
										})
									.html(dotNumId)
						);
	}//End of function plotDotNumber
	
	function plotDot(dotDivId,xPos,yPos){
		$('#canvasBorder')
				.append(createDiv('dot'+dotDivId)
								.addClass('dot')
								.css({
										left:xPos,
										top:yPos
									})
								.append(karma.createImg('dot')
												.css({
														position:'absolute',
													})
										)
				);
	
	
	}//End of function plotDot
	var actions=[   function (){drawline(x1Pos,y1Pos,x2Pos,y1Pos);},
					function (){drawline(x2Pos,y1Pos,x2Pos,y2Pos);},
					function (){drawline(x2Pos,y2Pos,x1Pos,y2Pos);},
					function (){
						drawline(x1Pos,y2Pos,x1Pos,y1Pos);
						nextQuestionSet();
					},
					function(){			plotDotNumber(5,x2Pos/2,y1Pos-20);	
										plotDotNumber(6,x2Pos+20,y2Pos/2);	
										plotDotNumber(8,x1Pos-20,y2Pos/2);	
										plotDotNumber(7,x2Pos/2,y2Pos+20);		
										
										plotDot(5,x2Pos/2-7,y1Pos-3.5);		
										plotDot(6,x2Pos-7,y2Pos/2-3.5);
										plotDot(7,x2Pos/2-7,y2Pos-3.5);	
										plotDot(8,x1Pos-7,y2Pos/2-3.5);
									},
					function (){drawline(x2Pos/2,y1Pos,x2Pos,y2Pos/2);},
					function (){drawline(x2Pos,y2Pos/2,x2Pos/2,y2Pos);},
					function (){drawline(x2Pos/2,y2Pos,x1Pos,y2Pos/2);},
					function (){	drawline(x1Pos,y2Pos/2,x2Pos/2,y1Pos);
									nextQuestionSet();
									},
					
					function(){			plotDotNumber(9,x2Pos/4-20,y2Pos/4-20);
										plotDotNumber(10,x2Pos*3/4+20,y2Pos/4-20);
										plotDotNumber(12,x2Pos/4-20,y2Pos*3/4+20);
										plotDotNumber(11,x2Pos*3/4,y2Pos*3/4+20);
								
										plotDot(9,x2Pos/4-7,y2Pos/4-3.5);
										plotDot(10,x2Pos*3/4-7,y2Pos/4-3.5);
										plotDot(11,x2Pos*3/4-7,y2Pos*3/4-3.5);
										plotDot(12,x2Pos/4-7,y2Pos*3/4-3.5);
							
									},
					function (){drawline(x2Pos/4,y2Pos/4,x2Pos*3/4,y2Pos/4);},
					function (){drawline(x2Pos*3/4,y2Pos/4,x2Pos*3/4,y2Pos*3/4);},
					function (){drawline(x2Pos*3/4,y2Pos*3/4,x2Pos/4,y2Pos*3/4);},
					function (){drawline(x2Pos/4,y2Pos*3/4,x2Pos/4,y2Pos/4);
								nextQuestionSet();
								},
					function(){			plotDotNumber(13,x2Pos/2,y2Pos/4-20);
										plotDotNumber(14,x2Pos*3/4+10,y2Pos/2);	
										plotDotNumber(15,x2Pos/2,y2Pos*3/4+10);
										plotDotNumber(16,x2Pos/4-20,y2Pos/2);
										
										plotDot(13,x2Pos/2-7,y2Pos/4-3.5);
										plotDot(14,x2Pos*3/4-7,y2Pos/2-3.5);
										plotDot(15,x2Pos/2-7,y2Pos*3/4-3.5);
										plotDot(16,x2Pos/4-7,y2Pos/2-3.5);
								},				
					function (){drawline(x2Pos/2,y2Pos/4,x2Pos*3/4,y2Pos/2);},
					function (){drawline(x2Pos*3/4,y2Pos/2,x2Pos/2,y2Pos*3/4);},
					function (){drawline(x2Pos/2,y2Pos*3/4,x2Pos/4,y2Pos/2);},
					function (){	
								drawline(x2Pos/4,y2Pos/2,x2Pos/2,y2Pos/4);
								nextQuestionSet();
								}
				
				]; //End of var actions
	
					
	function nextAction (){
		if ( question_set_index >= questions.length-1 ){
			
			// finished all the question sets, so show the table
			loadTable(1);
			
		}else{
		
			var action=actions.shift();
			action();
		}
	}//End of function nextAction
	
	var drawline = function(x1,y1,x2,y2){
		var drawBox = $('#canvasDrawBox').get()[0];
		var context = drawBox.getContext('2d');
				context.beginPath();
				context.moveTo(x1,y1);
				context.lineTo(x2,y2);
				context.closePath();
				context.stroke();
	}//End of function drawline	
	
	
	function nextQuestionSet(){
		current_question_index = 0;
			
		 	question_set_index ++;
		// shift the next question array from our questions
			current_question_set = questions[question_set_index];
		// show the first question in this set
			selectQuestion();
			
		
	}
	
	function selectQuestion(){
		$('#lineNextBtn').hide();
		$('#questionSection').show();
		updateScoreFlag=true;
		
		// show the next question from our current "question array"
		if ( current_question_index < current_question_set.length ){
			var current_question = current_question_set[current_question_index];
			
			loadQuestionElement(question_counter, current_question.qsn, current_question.options, current_question.answer);
			question_counter++;
			
		} else {
			// finished asking this question set
			$('#questionSection').hide();
			$('#lineNextBtn').show();
			nextAction();
		}
		current_question_index ++;
	}//End of function selectQuestion

	

	function loadQuestionElement(questionNo, questionText, optionsSet, answerIndex){
			optionsSet=Karma.shuffle(optionsSet);
			
			$('#question').empty();
			$('#optionSection').empty();
			$('#linkNextLesson').hide();
			$('#question')
				.html(questionNo+ " . "+ questionText);
						
			for(var i=0;i<4;i++){
					var opt=optionsSet.shift();
					if(opt==answerIndex){
						answer=i;
					}
					$('#optionSection')
						.append(createDiv('checkans'+i)
									.attr('class','check'))
						.append(createDiv('option'+i)
									.attr('class','options')
									.clickable(function(){
											checkAnswer($(this).attr('id'));
										})
									.append(karma.createImg(optImages[i])))
						.append(createDiv()
									.attr('class','optionText')
									.html(opt));
			}
			

	}//end of <loadquestionelement></loadquestionelement>

	function loadTable(table_index){	
			
			$('#lineNextBtn').hide();
			$('#questionSection').show();
			updateScoreFlag=true;
			
			table_def = [
					['Line Segments','Triangles'],
					['4', '0'],
					['8', '4'],
					['12', '8'],
					['16', '12']
			]

				if(table_index==1){
					console.log('inside loadtable 1');			
					table_def=table_def.concat([
					['20', $(document.createElement('input'))
											.attr({
												 'class':'inputBox',
												 'type':'text',
												 'id':'inputBox'
												 })]
									]);
					}
				else if(table_index==2){
						
						table_def=table_def.concat([
						['20','16'],
						['24', $(document.createElement('input'))
								.attr({
									 'class':'inputBox',
									 'type':'text',
									 'id':'inputBox'
									 })]
					]);
					
					
			}
			$('#questionSection')
						.empty()	
						.append(make_table(table_def))
						.append(createDiv('linkCheck')
												.click(function(){checkAnsTextBox(table_index); }));
		
			updateScoreFlag=true;
		}
	

	function checkAnswer(clickedId){
		var clickedPos=parseInt(clickedId.charAt(6));
			$('.check').empty();
		if(answer==clickedPos){
			$("#checkans"+clickedPos)
				.append(karma.createImg('correct'));
			$('.options').unclickable();
			$('#linkNextLesson').show();
			karma.audio.correct.play();
				if(updateScoreFlag){
					scoreboardHit();
				}
		}
		else{

			$("#checkans"+clickedPos)
					.append(karma.createImg('wrong'));
			karma.audio.incorrect.play();
				
				if(updateScoreFlag){
						scoreboardMiss();
						updateScoreFlag=false;
				}
		
		
		
		
		}

	}//End of function checkAnswer(clickedId)

	
	

	
	
	function checkAnsTextBox(table_index){
		if( (parseInt($('#inputBox').val())==16) && table_index==1){
			correct();
			loadTable(2);
			
		}else if((parseInt($('#inputBox').val())==20) && table_index==2){
					correct();
					showMessage()					
		
				
		}else{
				incorrect();
		}

	}//End of function checkAnsTextBox

	function showMessage(){
		

				$('#questionSection')
						.empty()
						.append(createDiv('gameOver'));
				
				if(scoreboardScore()==scoreboardTotal()){
							$('#gameOver').append(karma.createImg('gameOverSuccess'));
				
				}
				else{
						
						$('#gameOver').append(karma.createImg('gameOverTry'));
				}
	}//End of function showMessage()

function incorrect(){
			karma.audio.incorrect.play();
			if(updateScoreFlag){
							scoreboardMiss();
							updateScoreFlag=false;
							
						}

}
function correct(){
	karma.audio.correct.play();
			if(updateScoreFlag){
							scoreboardHit();
													
						}
}
}//End of function startLesson(karma)



function make_table(from_def){
			var table = $(document.createElement('table'));
					table.attr('id','finalTable');
					table.attr('cellpadding','10');
			var tbody=$(document.createElement('tbody'));
			table.append(tbody);

			for ( var i=0; i<from_def.length; i++){
				var tr = $(document.createElement('tr'))
				for ( var j=0; j<from_def[i].length; j++){
					var td = $(document.createElement('td'));
					td.html(from_def[i][j])
					tr.append(td);
				}
				tbody.append( tr );
			}
			return table;
	}//End of function make_table(from_def)
	
	
setUpLesson(initialize, startLesson);