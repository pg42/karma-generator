var img_names = ['fishLeft', 'fishRight', 'instructionTxt', 'gameover'];
var pos = [ {top : 1, left : 1},
			{top : 150, left : 20},
			{top : 1, left : 270},
			{top : 10, left : 650},
			{top : 30, left : 920},
			{top : 220, left : 250},
			{top : 220, left : 550},
			{top : 220, left : 850}
		];
var optionValue = [];
var timer;
const TOTAL_OPTIONS = 4;
const TOTAL_QUES = 20;

function startLesson(karma) {
	var correctCounter = 0;
	
	var definePositions = function(){			
			pos.forEach(function(p, index){
					$('#fishArea')
						.append(createDiv('pos'+index)
							.addClass('fishPos')
							.css({'top':p.top,'left':p.left}));				
				});	
		};    
		
	var drag_drop = function(){
			$('.fish').draggable({
				containment:'#content',
				start: function(event, ui) {
					currentDragObject = event.target.id;				
				}
			});
			$("#dropFish").droppable({ 
				tolerance: 'intersect',
				drop: function(event, ui) {
					if(flag_busy === 0){
						var dragId = parseInt(currentDragObject.substring(7));
						var dragNum = optionValue[dragId];
						optionValue.sort();
						var greatest = optionValue[3];	
										
						if(greatest == dragNum){
							correctCounter++;
							$('#scoreBox').html(Karma.convertNumToLocale(correctCounter, 'ne'));
							karma.play('correct');
						}else{
							 karma.play('incorrect')
						}
						
						t=setTimeout(function(){nextQuestion();},1000);		               
					}
					flag_busy = 1;
				}
			});
		}
	
	var nextQuestion = function(){
			if(correctCounter === TOTAL_QUES){
				flag_busy = 1;
				karma.play('byebye');		        		    		
				$('#content')
					.empty()
					.append(createDiv('gameOver'));
			} else {
				flag_busy = 1;
				
				$('#fishArea').empty();
				definePositions();
				
				var position  = Karma.shuffle(range(0, pos.length)).slice(0, TOTAL_OPTIONS);
				optionValue = Karma.shuffle(range(0, 99)).slice(0, TOTAL_OPTIONS);
				
				position.forEach(function(value, index) {
					assignFishes(value, index, optionValue[index]);
				});
				drag_drop();
				flag_busy = 0;	
			}				
		};
	
	var assignFishes = function(position, fishId, optionValue){
			var nepalinum = Karma.convertNumToLocale(optionValue, 'ne');
			var randDirection = karma.rand(0,1);
			var fishDirection;
			if(randDirection === 0){
				fishDirection = 'Left';
			}else{
				fishDirection = 'Right';
			}
			$('#pos'+position).html(createDiv('fishNum'+fishId).addClass('fish fish'+fishDirection).html(nepalinum));				
		};
	
	karma.play('instruction');
    $('#content')
		.empty()
		.append(createDiv('fishArea'))					
		.append(createDiv('dropFish'))
		.append(createDiv('instructionTxt'))
		.append(createDiv('scoreBox')
				.html(Karma.convertNumToLocale(correctCounter, 'ne')))
	t=setTimeout(function(){nextQuestion();},4000);	
}

setUpLesson(function () {}, startLesson);
