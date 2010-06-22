$(function() {
    var k = lesson_karma();
    k.ready(function() {
        var i,j,flag;
        var TOTAL_QUES = 8;
        var currentSection;
        var currentDragObject,currentDropObject;
        var correctCounter;
        var randPositions = [];
        var randImages = [];
        var imgCounter;
        var objTxtHeight = 50;
        var objectPosition = lesson_data.objectPosition;
        var objectDimension = lesson_data.objectDimension;   //store the width only height is global for all
        var imgNames = lesson_data.imgNames;

        var assignQues = function(quesId){
          $('#quesSection').append('<div id="imageArea'+quesId+'" class="imgArea"></div>');
          quesID = randPositions[quesId];
          $('#imageArea'+quesId).append('<div id="img'+quesId+'" class="imgObject"></div>');
          var picName = imgNames[randPositions[quesId]];
          $('#img'+quesId).append('<img src="'+k.image[picName].src+'" />');
          $('#imageArea'+quesId).append('<div id="drop'+quesID+'" class="dropObjects"></div>');
          var dropObjCss = { 
            'width':'125px','height': '33px','margin': '0.5em 2em',
            'border':'2px solid black','text-align':'center',
            'font': '30px Verdana, Geneva, Arial, Helvetica, sans-serif',
            'line-height':'30px'
          };
          $('#drop'+quesID).css(dropObjCss);
			
        };
		
        var assignOptions = function(quesId){
          $('#optionSection').append('<div id="drag'+quesId+'" class="dragObjects"></div>');
          var dragObjCss = { 
            'float':'left','width':'135px','height': '33px',
            'text-align':'center','cursor':'move',
            'font': '30px Verdana, Geneva, Arial, Helvetica, sans-serif'
          };
          $('#drag'+quesId).css(dragObjCss).html(imgNames[randPositions[quesId]]);
        };
        var assignObjPos = function(objId){
          var topPos,leftPos;
          leftPos = objectPosition[imgCounter];
          topPos = objectPosition[imgCounter+1];
          $('#vocabImg').append('<div id="object'+objId+'"></div>');
          var objCss = {
            'position':'absolute',
            'top': topPos+'px',
            'left': leftPos+'px',
            'width': objectDimension[objId]+'px',
            'height': objTxtHeight+'px'
          };
          $('#object'+objId).css(objCss);
          $('#object'+objId).click(function(){
              k.audio[imgNames[objId]].play();
            });
          imgCounter+=2;			
        };
        var nextSection = function(){
          $('#content').html('');
          if(currentSection === 0){			
            $('#content').append('<div id="vocabImg"></div>');
            imgCounter = 0;
            for(i = 0;i< TOTAL_QUES;i++){
              assignObjPos(i);	
            }
				
          }else{
            shuffleNumbers(randPositions,1,10);
            correctCounter = 0
            $('#content').append('<div id="quesSection"></div>');
            shuffleNumbers(randPositions,0,TOTAL_QUES);
            for(i = 0; i< TOTAL_QUES; i++){
              assignQues(i);
            }
            randImages = randPositions;
            shuffleNumbers(randPositions,0,TOTAL_QUES);
            $('#content').append('<div id="optionSection"></div>');
            for(i = 0; i< TOTAL_QUES; i++){
              assignOptions(i);
            }
            drag_drop();
          }
        };
        function drag_drop(){
          $('.dragObjects').draggable({ containment: '#content',revert:true});	
          $('.dragObjects').bind('dragstart', function(event, ui) {
              currentDragObject = event.target.id;
            });
				
          /**** Drop Handling Functions ***/
          $(".dropObjects").droppable({ tolerence: 'intersect' ,hoverClass: 'drophover' });
          $('.dropObjects').bind('drop', function(event, ui) {
              currentDropObject = event.target.id;
              var dropText = $('#'+currentDragObject).text();
              var droppedShape = parseInt(currentDropObject.substring(4));
              if($('#'+currentDragObject).text() == imgNames[droppedShape]){
                $('#'+currentDragObject).hide();
                correctCounter++;
                $('#'+currentDropObject).text(imgNames[droppedShape]);
                k.audio.correct.play();
              }else{
                //$('#'+currentDragObject).css({top:'0px',left:'0px'});
                k.audio.incorrect.play();
              }
              if(correctCounter === TOTAL_QUES){   //game completed
                $('#optionSection').html('<div class="gameOver">GAME OVER</div>');
              }	
            });
        }  
		
        function game(){
          $('#linkNextLesson').show();
          $('#linkPrevLesson').hide();
          currentSection = 0;
          nextSection();			
        }
	
        $('#linkPrevLesson').hide();
        $('#linkNextLesson').hide();
		
        $('#linkNextLesson').click(function(){
            k.audio.trigger.play();
            currentSection = 1;		
            $('#linkNextLesson').hide();
            $('#linkPrevLesson').show();
            nextSection();
          });
		
        $('#linkPrevLesson').click(function(){
            k.audio.trigger.play();
            currentSection = 0;
            $('#linkNextLesson').show();
            $('#linkPrevLesson').hide();
            nextSection();
          });
		
        $('#linkBackLesson').click(function(){
            gotoMainStage();
          });
        controlButtonDisplay('linkPlayAgain','disabled');
        $('#linkStart').click(function(){
            controlButtonDisplay('linkStart','disabled');
            controlButtonDisplay('linkPlayAgain','enabled');
            if(flag_start === 0){
              game();
            }
            flag_start = 1;
			
          });

        $('#linkPlayAgain').click(function(){		
            if(flag_start === 1){
              game();
            }
          });


        $('#linkHelp').click(function(){
            $('#help').slideDown(2000);
          })
          .mouseout(function(){
              $('#help').slideUp(2000);
            });

      })});
