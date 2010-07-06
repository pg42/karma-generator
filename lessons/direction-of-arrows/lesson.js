var arrows = range(1, 9).map(function (i) { return 'arrow' + i; });

function initialize() {
    scoreboardInitialize({layout: 'horizontal',
		          winningScore: arrows.length});
}

function startGame(karma) {
    scoreboardReset();
    $('#content')
        .removeClass('backOpaque')
        .empty()
        .append(createDiv('title').html('Identify the direction'))
        .append(createDiv('imageBox'))
        .append(createDiv('optionSection'))
        .append(createDiv('checkedOption'));
    var remainingArrows = Karma.shuffle(arrows);
    var currentArrow;
    var number_of_tries;
    var timer;

    var retry = function () {
        $('#checkedOption').empty();
    };

    var createOption = function (img_name) {
        return createDiv()
            .addClass('optImg')
            .append(karma.createImg(img_name))
            .click(function () {
                       clearTimeout(timer);
                       ++number_of_tries;
                       if (img_name == currentArrow) {
                           $('.optImg').unbind('click');
                           karma.audio.correct.play();
                           $('#checkedOption')
                               .empty()
                               .append(karma.createImg('correct'));
                           if (number_of_tries == 1) {
                               scoreboardHit();
                           } else {
                               scoreboardMiss();
                           }
                           setTimeout(next, 1000);
                       } else {
                           karma.audio.incorrect.play();
                           $('#checkedOption')
                               .empty()
                               .append(karma.createImg('incorrect'));
                           timer = setTimeout(retry, 1000);
                       }
                   });
    };

    var next = function () {
        if (remainingArrows.length) {
            number_of_tries = 0;
            currentArrow = remainingArrows.pop();
            $('#imageBox')
                .empty()
                .append(karma.createImg(currentArrow)
                        .addClass('imgQues'));
            $('#optionSection')
                .empty();
            $(randomElementsIncluding(arrows, currentArrow, 4)
              .map(createOption)).appendTo($('#optionSection'));
        } else {
            karma.audio.byebye.play();
            $('#content')
                .empty()
                .append(createDiv('gameOver').html('GAME OVER !!!'));
        }
    };

    next();
}

setUpLesson(initialize, startGame);
