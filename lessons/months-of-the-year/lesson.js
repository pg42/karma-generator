var month_names = [
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'October',
	'November',
	'December'
];

function startLesson(karma, contentDiv) {
	console.log("startLesson");
    var createMonthLessonBox = function (month_name) {
        return createDiv('monthLesson' + month_name).addClass('imgArea')
			.append(createDiv('title')
				.text(month_name)
				.addClass('monthsName')
				.click(function(){
					karma.audio[month_name].play();
				})
			)
			.append(karma.createImg(month_name).addClass('imgBox'));
    };
	
	contentDiv
		.append(createDiv('main')
			.append(createDiv('heading')
				.text('Learn the spelling of each month.')
				.addClass('topText')
			)
			.append(createDiv('monthLessonBoxes'))
		);
	
	for (i in month_names){
		$('#monthLessonBoxes').append( createMonthLessonBox(month_names[i]) );
	}
}

function startGame(karma, contentDiv) {
	console.log("startGame");
	var ordinal = function ( num ){
		num = num % 100;
		if ( num >= 11 && num <= 13){
			return 'th';
		}
		switch( num % 10 ){
			case 1:
				return 'st';
			case 2:
				return 'nd';
			case 3:
				return 'rd'; 
		}
		return 'th';
	}
	var createMonthGameBox = function (month_name, index) {
        return createDiv('monthGame' + month_name).addClass('dropMonthArea')
			.append(karma.createImg('small_' + month_name).addClass('imgSmall'))
			.append(createDiv()
				.text( index + ordinal(index) )
				.addClass('orderTxt')
			);
    };
	
	contentDiv
		.append(createDiv('main')
			.append(createDiv('heading')
				.text('Fill in the blanks and place month in right order.')
				.addClass('topText')
			)
			.append(createDiv('gameArea'))
			.append(createDiv('gameOver'))
		);
	
	for (i in month_names){
		var index = parseInt(i) + 1;
		console.log("i: " + i + " index: "+ index);
		$('#gameArea').append( createMonthGameBox(month_names[i], index) );
	}
}

setUpMultiScreenLesson([startLesson, startGame]);
