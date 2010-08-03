


function initialize(karma){
console.log("inside init");
	scoreboardInitialize();


//<<<<<<<<<<<The HTML div creation part starts here<<<<<<<<<<<//////////////
	$('#content')
		.append(karma.createImg('lesssonHint')
									.attr('class', 'lessonHint'))
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
	
	
	
		
		
		
	

    
   
	
	

	
	
	
///////>>>>>>>>>>>>>The HTML div creation part ends here>>>>>>>>>>>>>>//////// 
}



function startLesson(karma){
console.log("inside startlesson");
	var canvasX1=0;
	var canvasY1=0;
	var canvasX2=360;
	var canvasY2=360;
	var plotX1,plotY1,plotX2,plotX2;
	
	
	
	
	plotX1=canvasX1;
	plotX2=canvasX2;
	plotY1=canvasY1;
	plotY2=canvasY2;

	plotDotNumber(1,canvasX1-20,canvasY1-20);
	plotDotNumber(2,canvasX2+20,canvasY1-20);
	plotDotNumber(3,canvasX2+20,canvasY2+20);
	plotDotNumber(4,canvasX1-20,canvasY2+20);
	plotDot(1,canvasX1-3.5,canvasY1-3.5);
	plotDot(2,canvasX2-3.5,canvasY1-3.5);
	plotDot(3,canvasX2-3.5,canvasY2-3.5);
	plotDot(4,canvasX1-3.5,canvasY2-3.5);
	
	
	
	
	
	
	
	
	
	
	
	
	$('#content')
				.append(createDiv('lineNextBtn')
								.attr('class','linkNext')
								.css({
										position:'absolute',
										left:'500px',
										top:'600px'
									})
				);
									
	$('#lineNextBtn').click(function(){
	
		plotLine();
	
	
	
	
	});
	
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
						
	
	
	}

		
	function plotDot(dotDivId,xPos,yPos){
	$('#canvasBorder')
			.append(createDiv('dot'+dotDivId)
							.addClass('dot')
							.css({
								
								left:xPos,
								top:yPos
								//'z-index':'3'
							})
							.append(karma.createImg('dot')
											.css({
													position:'absolute',
											})
									)
			);
	
	
	}
	var actions=[   function (){drawline(canvasX1,canvasY1,canvasX2,canvasY1);},
					function (){drawline(canvasX2,canvasY1,canvasX2,canvasY2);},
					function (){drawline(canvasX2,canvasY2,canvasX1,canvasY2);},
					function (){	drawline(canvasX1,canvasY2,canvasX1,canvasY1);
									setQuestionContainer();
//									showQuestion(1);
									$('#lineNextBtn').hide();
									loadQuestionElement(1,'ques0',2,4,6,0);
								},
									
					
					function (){drawline(canvasX2/2,canvasY1,canvasX2,canvasY2/2);},
					function (){drawline(canvasX2,canvasY2/2,canvasX2/2,canvasY2);},
					function (){drawline(canvasX2/2,canvasY2,canvasX1,canvasY2/2);},
					function (){drawline(canvasX1,canvasY2/2,canvasX2/2,canvasY1);},
					
					function (){drawline(canvasX2/4,canvasY2/4,canvasX2*3/4,canvasY2/4);},
					function (){drawline(canvasX2*3/4,canvasY2/4,canvasX2*3/4,canvasY2*3/4);},
					function (){drawline(canvasX2*3/4,canvasY2*3/4,canvasX2/4,canvasY2*3/4);},
					function (){drawline(canvasX2/4,canvasY2*3/4,canvasX2/4,canvasY2/4);},
					
					function (){drawline(canvasX2/2,canvasY2/4,canvasX2*3/4,canvasY2/2);},
					function (){drawline(canvasX2*3/4,canvasY2/2,canvasX2/2,canvasY2*3/4);},
					function (){drawline(canvasX2/2,canvasY2*3/4,canvasX2/4,canvasY2/2);},
					function (){drawline(canvasX2/4,canvasY2/2,canvasX2/2,canvasY2/4);}
					
					
					
					
					
					
				
				];
				
	function plotLine (){
		var action=actions.shift();
		action();
	
	
	}
		

	
	

	var drawline = function(x1,y1,x2,y2){
		var drawBox = $('#canvasDrawBox').get()[0];
		var context = drawBox.getContext('2d');
		
		context.beginPath();
		context.moveTo(x1,y1);
		context.lineTo(x2,y2);
		context.closePath();
		context.stroke();
	}


 
var options = [
				4,2,0,6,
				0,4,2,6,
				8,12,16,20,
				4,2,6,8,
				12,20,28,32,
				8,4,12,16,
				16,10,30,40,
				12,10,8,4
		];

function setQuestionContainer(){
$('#content')
		.append(createDiv('questionSection')
			.append(createDiv('question'))
			.append(createDiv('optionSection'))
			);
		

}

	

function loadQuestionElement(questionNo,questionImage,opt1,opt2,opt3,opt4){

		$('#question')
			.html(questionNo+ " .")
			.append(karma.createImg(questionImage)
		);
		
		
		for(var i=0;i<4;i++){
				$('#optionSection')
					.append(createDiv())
					.append(createDiv('checkans0')
								.attr('class','check'))
					.append(createDiv('option'+i)
								.attr('class','options')
								.append(karma.createImg('a')))
					.append(createDiv()
								.attr('class','optionText')
								.html(window['opt'+i]));
		}
				
				

}//end of loadQuestionElement

function showQuestion(questionSet){
	switch (questionSet){
		case 1:
				var answers=[4,2,0,6,
							 0,4,2,6
							 ];
								
			break;
		case 2:
			
			break;
		case 3:
			
			break;
		case 4:
			
			break;
	}


} 

} //...........end of startLesson(karma)........



setUpLesson(initialize, startLesson);
