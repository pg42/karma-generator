var amounts = [1, 2, 5, 10, 20, 25, 50, 100, 500, 1000];

function initialize(karma) {
    scoreboardInitialize({layout: 'horizontal', winningScore: amounts.length});
}

function startLesson(karma) {
    var remainingAmounts = Karma.shuffle(amounts);
    var currentAmount;
    var tries;

    var sayAmount = function () {
        karma.audio[currentAmount].play();
    };

    scoreboardReset();
    $('#content')
        .removeClass('backOpaque')
        .empty()
        .append(createDiv('title').html('Identify the money'))
        .append(createDiv('listenAgain').click(sayAmount))
        .append(createDiv('imageBox'))
        .append(createDiv('checkedOption'))
        .append(createDiv('optionSection'));

    var optionClicked = function () {
        ++tries;
        $('#checkedOption').empty();
        if ($(this).html() == currentAmount) {
            $('.optImg').unbind('click');
            $('#listenAgain').hide();
            karma.audio.correct.play();
            if (tries == 1) {
                scoreboardHit();
            } else {
                scoreboardMiss();
            }
            $('#checkedOption').append(karma.createImg('correct'));
            setTimeout(nextQuestion, 1000);
        } else {
            $('#listenAgain').show();
            karma.audio.incorrect.play();
            $('#checkedOption').append(karma.createImg('incorrect'));
            setTimeout(tryAgain, 1000);
        }
    };

    var tryAgain = function () {
        $('#checkedOption').empty();
    };

    var nextQuestion = function () {
        $('#checkedOption').empty();
        $('#imageBox').empty();
        $('#optionSection').empty();
        if (remainingAmounts.length) {
            $('#listenAgain').hide();
            tries = 0;
            currentAmount = remainingAmounts.pop();
            sayAmount();
            $('#imageBox').append(karma.createImg(currentAmount));
            $(randomElementsIncluding(amounts, currentAmount, 4)
              .map(function (x) {
                         return createDiv()
                             .addClass('optImg')
                             .html(x)
                             .click(optionClicked);
                   }))
                .appendTo($('#optionSection'));
        } else {
            karma.audio.byebye.play();
            $('#content')
                .empty()
                .append(createDiv('gameOver').html('GAME OVER !!!'));
        }
    };

    nextQuestion();
}

setUpLesson(initialize, startLesson);
