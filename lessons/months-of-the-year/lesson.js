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

var currentDroppedPositions = {};

function startLesson(karma, contentDiv) {
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
	var ordinalSuffix = function ( num ){
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
	var createMonthDropBox = function (month_name, index) {
		return createDiv('monthDrop' + month_name).addClass('dropMonthArea')
			.append(karma.createImg('small_' + month_name).addClass('imgSmall'))
			.append(createDiv()
				.text( index + ordinalSuffix(index) )
				.addClass('orderTxt')
			)
			.append(createDiv('drop' + index).addClass('dropObjects'))
			.append($(document.createElement('span')).addClass('check'));
	};
	var createMonthDragBox = function (month_name) {
		var missing_char = Karma.random(0, month_name.length - 1);
		
		var month_pref = '';
		if ( missing_char > 0 ) month_pref = month_name.substring(0, missing_char);
		
		var month_suf = '';
		if ( missing_char < month_name.length - 1 ) month_suf = month_name.substring(missing_char +1);
		
		return createDiv('monthDrag' + month_name).addClass('dragObjects')
			.append($(document.createElement('span')).text( month_pref ))
			.append($(document.createElement('input'))
				.attr({
					type: 'text',
					maxlength: 1
				})
				.addClass('blankBox')
				.Watermark('?')
				.click(function(){
					this.select();
				})
			)
			.append($(document.createElement('span')).text( month_suf ));
	};
	
	contentDiv
		.append(createDiv('main')
			.append(createDiv('heading')
				.text('Fill in the blanks and place month in right order.')
				.addClass('topText')
			)
			.append(
				createDiv('gameArea')
				.append(createDiv('dragMonthArea'))
			)
			.append(createDiv('gameOver'))
		);
	
	for (i in month_names){
		var index = parseInt(i) + 1;
		$('#gameArea').append( createMonthDropBox(month_names[i], index) );
	}
	
	var shuffled_month_names = Karma.shuffle(month_names);
	for (i in shuffled_month_names){
		$('#dragMonthArea').append( createMonthDragBox(shuffled_month_names[i]) );
	}
	
	$('.dragObjects').draggable({ containment: '#content',
		start: function(event, ui){
			for (var target in currentDroppedPositions ){
				if ( currentDroppedPositions[target] == ui.helper ){
					currentDroppedPositions[target] = null;
					$('#' + target).droppable( 'option' , 'hoverClass' , 'drophover' );
					return true;
				}
			}
		},
		stop: function(event, ui) {
			for (var target in currentDroppedPositions ){
				if ( currentDroppedPositions[target] == ui.helper ){
					return true;
				}
			}
			// not on a valid target, so animate back home
			ui.helper.animate({left: 0, top: 0});
		}
	});
	$('.dropObjects').droppable({ tolerence: 'intersect', hoverClass: 'drophover',
		drop: function(event, ui) {
			if ( currentDroppedPositions[ $(this).attr('id') ] == null ){
				currentDroppedPositions[ $(this).attr('id') ] = ui.draggable;
				// snap draggable to this drop point
				ui.draggable.position({ my: 'center', at: 'center', of: $(this) });
				$(this).droppable( 'option' , 'hoverClass' , '' );
			}
		}
	});
}

setUpMultiScreenLesson([startLesson, startGame]);
