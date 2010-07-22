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
                    .clickable(function(){
                                   karma.play(month_name);
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

    $(month_names.map(createMonthLessonBox)).appendTo($('#monthLessonBoxes'));
    $("#linkCheck").hide();
}

function startGame(karma, contentDiv) {
    var ordinalSuffix = function (num){
        num = num % 100;
        if (num >= 11 && num <= 13){
            return 'th';
        }
        switch(num % 10){
        case 1:
            return 'st';
        case 2:
            return 'nd';
        case 3:
            return 'rd';
        }
        return 'th';
    };
    var createMonthDropBox = function (month_name, i) {
        var index = i + 1;
        return createDiv('monthDrop' + month_name).addClass('dropMonthArea')
            .append(karma.createImg('small_' + month_name).addClass('imgSmall'))
            .append(createDiv()
                    .text(index + ordinalSuffix(index))
                    .addClass('orderTxt')
                   )
            .append(createDiv('drop' + index)
                    .addClass('dropObjects')
                    .data('monthName', month_name)
                   )
            .append($(document.createElement('span')).addClass('check'));
    };
    var createMonthDragBox = function (month_name) {
        var missing_char = Karma.random(0, month_name.length - 1);

        var month_pref = '';
        if (missing_char > 0) month_pref = month_name.substring(0, missing_char);

        var month_suf = '';
        if (missing_char < month_name.length - 1) month_suf = month_name.substring(missing_char +1);
        return createDiv('monthDrag' + month_name)
            .addClass('dragObjects')
            .data('monthName', month_name)
            .append($(document.createElement('span')).text(month_pref))
            .append($(document.createElement('input'))
                    .attr({
                              type: 'text',
                              maxlength: 1
                          })
                    .data('correctLetter', month_name[missing_char])
                    .addClass('blankBox')
                    .Watermark('?')
                    .clickable(function(){
                                   this.select();
                               })
                   )
            .append($(document.createElement('span')).text(month_suf));
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

    $(month_names.map(createMonthDropBox)).appendTo($('#gameArea'));
    $(Karma.shuffle(month_names).map(createMonthDragBox))
        .appendTo('#dragMonthArea');

    $('.dragObjects').draggable(
        {
            containment: '#content',
            start: function(event, ui){
                for (var target in currentDroppedPositions){
                    if (currentDroppedPositions[target] == ui.helper){
                        currentDroppedPositions[target] = null;
                        $('#' + target).droppable('option' , 'hoverClass' , 'drophover');
                        return;
                    }
                }
            },
            stop: function(event, ui) {
                for (var target in currentDroppedPositions){
                    if (currentDroppedPositions[target] == ui.helper){
                        return;
                    }
                }
                // not on a valid target, so animate back home
                ui.helper.animate({left: 0, top: 0});
            }
        });
    $('.dropObjects').droppable(
        {
            tolerance: 'intersect',
            hoverClass: 'drophover',
            drop: function(event, ui) {
                if (currentDroppedPositions[ $(this).attr('id') ] == null){
                    currentDroppedPositions[ $(this).attr('id') ] = ui.draggable;
                    // snap draggable to this drop point
                    ui.draggable.position({ my: 'center', at: 'center', of: $(this) });
                    $(this).droppable('option' , 'hoverClass' , '');
                }
            }
        });

    $("#linkCheck").clickable(
        function(){
            $('.dropObjects').each(
                function (index, value) {
                    var correctLetter = function (input_field) {
                        return input_field.val().toLowerCase() == input_field.data('correctLetter').toLowerCase();
                    };
                    var dragChild = currentDroppedPositions[$(this).attr('id')];
                    var correct =
                        dragChild != null &&
                        $(this).data('monthName') == dragChild.data('monthName') &&
                        correctLetter(dragChild.children('input')) ;

                    if (correct){
                        $(this).siblings('.check').html(Karma.createImg('correct'));
                    } else {
                        $(this).siblings('.check').html(Karma.createImg('incorrect'));
                    }
                }
            );
        }).show();
}

setUpMultiScreenLesson([startLesson, startGame]);
