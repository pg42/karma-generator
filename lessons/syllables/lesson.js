function startLesson(karma) {
    var i,j,t;
    var totalCounter;
    var currentQuestion;
    var TOTAL_QUES = 10;
    var currentDragObject;
    var prevDragObject;
    var dropNum;
    var sectionNum;
    var randPositions = [];
    var compCounter;
    var playerCounter;
    var fstSyllableId;
    var fstSyllableId;
    var checked;
    var gamePlay;
    var s,m,h,play;
    var currentBlock;  //flag for which side increases the score   1-player 0-computer
    var completedWords = [];
    var syllableWord1=  new Array('be','en','ti','monk','stu','chil','eng','hap','sun','in','sen','com','pro','prac','talk','pic','num','tea','mar','comp');
    var syllableWord2 = new Array('lieve','gine','ger','ey','dent','ly','lish','py','day','sect','tence','plete','noun','tice','ing','nic','ber','cher','ket','uter');
    var flag_gameStatus;  //set if any section of the game completes
    var clock = new Clock();

    var genRandPosition=function (){
	randPositions[0] = karma.rand(0,19);
	for(i=1; i<20; i++){
	    do{
		flag = 0;
		randPositions[i] = karma.rand(0,19);
		for(j=0; j<i; j++){
		    if(randPositions[i] === randPositions[j]){
			flag++;
		    }
		}
	    }while(flag != 0 );  //end of do while loop	
	}
    };		
    var checkTime = function(timePara){
	if (timePara<10 )
	    {
		timePara="0" + timePara;
	    }
	return timePara;
    };

    var stopTimer = function(){
	clearTimeout(t);
	s = 10;
	s=checkTime(s);					
	$('#timerBox1').html(s);
    };
    var startTimer = function(){
	increaseTime();					
    };
		
		
		
    var increaseTime = function(){
	s--;				
	s=checkTime(s);					
	if(s == 00){  //computer score increase
	    karma.audio.incorrect.play();
	    checked = 0;
	    t=setTimeout(function(){delay_correct();},2000);
	    currentBlock = 0;					
	    assignBuildBlocks();
	    compCounter++;
	    dropNum = 0;
	    //resetTimer();
	}
	else{
	    $('#timerBox1').html(s);
	    t=setTimeout(function(){increaseTime();},1000);
	}
		   
    };
		
		
    var check_game_over = function(){
	var flag_game = 0;
	if(totalCounter === 40){  //game over 
	    $('#content').addClass('backOpaque');
	    $('#gameOver').show();
	    //resetTimer();
	    clock.reset();
	}			
	else if(compCounter === 10){  //computer wins
	    $('#leftText').html('Computer Wins');
	    $('#topText').html('Sorry U missed the chance !!! Click Play Again.');
	    flag_game = 1;
	}
	else if(playerCounter === 10){ //player wins
	    $('#rightText').html('Player Wins');
	    $('#topText').html('Great Job !!! Click Next Button to proceed to next level.');
	    flag_game = 1;
	}
	else if(totalCounter === 20){
	    if(playerCounter < 10 || compCounter <10){  //u were missed play again
		$('#topText').html('Sorry U missed the chance !!! Click Play Again.');				}
	    flag_game = 1;
	}
	if(flag_game === 1){
	    flag_gameStatus = 1;
	    playerCounter = 10;
	    compCounter = 10;
	    if(gamePlay  === 0){
		$('#linkNextLesson').show();
	    }
	    else{
		$('#linkPrevLesson').show();
	    }
	}
		
			
    };
    var assignBuildBlocks = function(){
	var compName,playerName;	
	if((currentBlock === 1 && playerCounter === 9) || (currentBlock === 0 && compCounter === 9)){
	    compName = 'computer_top';
	    playerName = 'player_top';
		
	}
	else if((currentBlock === 1 && playerCounter === 0) || (currentBlock === 0 && compCounter === 0)){
	    compName = 'computer_base';
	    playerName = 'player_base';
	}
	else{
	    compName = 'computer_body';
	    playerName = 'player_body';
	}
			
	if(currentBlock === 1){
	    $('#playerBuild'+(9-playerCounter)).append('<img src="assets/image/'+playerName+'.png" />');
	}
	else{
	    $('#compBuild'+(9-compCounter)).append('<img src="assets/image/'+compName+'.png" />');
	}
			
    };
		
    var delay_correct = function(){
	flag_busy = 0;
	if(checked ===1 ){
	    $('#drag'+completedWords[totalCounter-2]).hide();
	    $('#drag'+completedWords[totalCounter-1]).hide();
	}
	$('#drop0').html('----------');
	$('#drop1').html('----------');
	$('#drop2').html('------------');
    };
    var check_answers = function(){
	var flag_correct = 0;
	var secStart = sectionNum * 10;
	var secStop = (sectionNum+1) * 10;
	for( i = secStart ; i<secStop; i++){
	    var fstSyllable = $('#drag'+fstSyllableId).text();
	    var secondSyllable = $('#drag'+secondSyllableId).text();
	    if(fstSyllable === syllableWord1[i] && secondSyllable === syllableWord2[i]){
		karma.audio.correct.play();				
		$('#drop2').html(fstSyllable+secondSyllable);				
		totalCounter += 2;
		completedWords[totalCounter-2] = fstSyllableId;
		completedWords[totalCounter-1] = secondSyllableId;
		flag_correct = 1;
		correctCounter++;					
		//check with timer and populate the side bar
		//if done within 10 seconds
		currentBlock = 1;
		assignBuildBlocks();
		playerCounter++;
		checked = 1;
		t=setTimeout(function(){delay_correct();},1000);					
	    }
	}
	if(flag_correct === 0){  //rearrange them
	    checked = 0;
	    karma.audio.incorrect.play();		
	    $('#drop2').html('Not a Valid Word');
	    currentBlock = 0;
	    assignBuildBlocks();
	    compCounter++;
	    t=setTimeout(function(){delay_correct();},1000);	
	}
		
    }; 
		
    var assignSyllableWords = function(sId){
	if(sId<10){
	    sysId = sId+(10*sectionNum);
	    $('#container').append('<div id="drag'+sId+'" >'+syllableWord1[sysId]+'</div>');
	}
	else{
	    sysId = ((10*(sectionNum+2)) - 1)-sId;
	    $('#container').append('<div id="drag'+sId+'" >'+syllableWord2[sysId]+'</div>');
	}
		
	var dragObjCss = {
	    'float':'left','position':'relative','cursor': 'move','margin': '1em',
	    'width':'100px','height':'30px','border': '2px solid black',
	    'font':'20px/25px bold Arial,Verdana,Geneva,Helvetica',
	    'text-align':'center',
	    'cursor':'pointer'
	};
	$('#drag'+sId).css(dragObjCss);
	$('#drag'+sId).click(function(){
		if(flag_gameStatus == 0){
		    if(flag_busy === 0){
			currentSyllable = $(this).text();
			if(dropNum === 0){
			    fstSyllableId = $(this).attr('id');
			    fstSyllableId = parseInt(fstSyllableId.substring(4));
			    //startTimer();
			    clock.start();
			}
			else{				
			    secondSyllableId = $(this).attr('id');
			    secondSyllableId = parseInt(secondSyllableId.substring(4));
			}
			$('#drop'+dropNum).html(currentSyllable);
			dropNum++;
			if(dropNum === 2){
			    flag_busy = 1;
			    dropNum = 0; 
			    //stopTimer();
			    clock.stop();
			    check_answers();
			}
			check_game_over();
		    }
		}
	    });
			
    };
		
    var assignDropPlaces = function(drpId){
	$('#joinSyllable').append('<div id="drop'+drpId+'" class="dropObjects"></div>');
	var dropObjCss = { 
	    'float':'left','width':'100px','height': '45px','margin': '0.5em 0.5em',
	    'font':'20px/35px bold Arial,Verdana,Geneva,Helvetica',
	    'text-align':'center','color':'#FF00FF'
	};
			
	if(drpId === 2){
	    $('#drop'+drpId).css(dropObjCss).css({'width':'200px'}).html('------------');
	}
	else{
	    $('#drop'+drpId).css(dropObjCss).html('----------');
	}
    };
		
		
    var next_syllables = function(){
	
	flag_busy = 0;
	//stopTimer();
	clock.stop();
	$('#content').removeClass('backOpaque').html('');
	$('#content').append('<div id="left-side"></div>');
	$('#content').append('<div id="main-content"></div>');
	$('#content').append('<div id="right-side"></div>');
	$('#left-side').append('<div id="leftText"></div>');
	$('#leftText').html('Computer Building');
	$('#right-side').append('<div id="rightText"></div>');
	$('#rightText').html('Player Building');
			
			
	$('#main-content').append('<div id="topText">Join two syllables to make one word</div>');
	$('#main-content').append('<div id="container"></div>');
	$('#main-content').append('<div id="joinSyllable"></div>');		
	genRandPosition();
	playerCounter = 0;
	compCounter = 0;
	for(i = 0; i< 20; i++){
	    var randNum = randPositions[i];
	    assignSyllableWords(randNum);
	}
	$('#joinSyllable').html('');
	for(i = 0; i< 3;i++){
	    assignDropPlaces(i);
	    if(i === 0){
		$('#joinSyllable').append('<div class="sign">+</div>');
	    }
	    else if(i === 1){
		$('#joinSyllable').append('<div class="sign">=</div>');
	    }
	}
	for(var i = 0; i< TOTAL_QUES; i++){								
	    $('#left-side').append('<div id="compBuild'+i+'></div>');
	    $('#compBuild'+i).addClass('default');
	    $('#right-side').append('<div id="playerBuild'+i+'></div>');
	    $('#playerBuild'+i).addClass('default');
	}
	flag_gameStatus =  0;

    };
		
    function game(){
	$('#timerBar').show();
	$('#linkNextLesson').hide();
	$('#linkPrevLesson').hide();
	$('#gameOver').hide();
	gamePlay = 0;
	$('#linkNextLesson').hide();
	$('#linkPrevLesson').hide();
	$('#gameOver').hide();
	dropNum = 0;
	correctCounter = 0;
	totalCounter = 0;
	sectionNum = karma.rand(0,1);
	next_syllables();			
    }
    game();		
    $('#gameOver').hide();
    //$('#timerBar').hide();
}
			
setUpLesson(function () {}, startLesson);
