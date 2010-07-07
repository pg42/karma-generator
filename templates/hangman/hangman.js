var qwerty_keys = ['qwertyuiop', 'asdfghjkl', 'zxcvbnm'];

function showHangMan(karma, i) {
    $('#hangManSection')
        .empty()
        .append(karma.createImg('hang' + i).addClass('imgHang'));
}

function createKeyboard(capitalize) {
    var drawRow = function (row, i) {
        var $keys = createDiv('keys' + i);
        $(Array.prototype.map.apply(row,
                                    [function (letter) {
                                         var x = capitalize ?
                                             letter.toUpperCase() :
                                             letter;
                                         return createDiv()
                                             .html(x)
                                             .addClass(x)
                                             .addClass('alphaKeys');
                                    }]))
            .appendTo($keys);
        return $keys;
    };
    var $keyboard = createDiv('keyboard');
    $(qwerty_keys.map(drawRow)).appendTo($keyboard);
    return $keyboard;
}

function initialize(karma) {
    scoreboardInitialize({layout: 'horizontal',
                          winningScore: 10});
}

function createAnswerBoxes(string, $answerSection) {
    Array.prototype.forEach.apply(string,
                                  [function (letter) {
                                       $(document.createElement('span'))
                                           .addClass('answerBox')
                                           .addClass(letter)
                                           .html('#')
                                           .appendTo($answerSection);
                                   }]);
}

function startGame(karma) {
    createContentDivs(karma);

    $('#missedText').hide();
    $('#linkNextLesson').hide();

    var mistakeCount = 0;

    var remaining_tasks = Karma.shuffle(tasks);
    var current_answer = null;

    var keyClicked = function () {
        $(this).unbind('click');
        var letter = $(this).html();
        $(this).css('background-color', 'white');
        if (current_answer.indexOf(letter) != -1) {
            $('.' + letter, $('#answerSection'))
                .html(letter)
                .addClass('guessed');
            if ($('.guessed').length == current_answer.length) {
                scoreboardHit();
                setTimeout(nextQuestion, 1000);
            }
        } else {
            ++mistakeCount;
            showHangMan(karma, mistakeCount);
            if (mistakeCount == number_of_tries) {
                $('#keyboard').hide();
                $('#missedText').show();
                $('#linkNextLesson').show();
                showAnswer();
                scoreboardMiss();
            }
        }
    };

    var showAnswer = function () {
        $('.answerBox').map(function (i, x) {
                                $(x).html(current_answer[i]);
                            });
    };

    var generateAnswerBoxes = function () {
    };

    var nextQuestion = function () {
        $('.alphaKeys')
            .unbind('click')
            .click(keyClicked)
            .css('background-color', '');

        if (remaining_tasks.length) {
            $('#missedText').hide();
            $('#linkNextLesson').hide();
            $('#keyboard').show();
            mistakeCount = 0;
            showHangMan(karma, mistakeCount);
            current_answer = setUpAnswer(remaining_tasks.pop());
            generateAnswerBoxes();
        } else {
            $('#content')
                .empty()
                .append(karma.createImg('kitchen').addClass('oneOrMoreUtensils'));
            $('#linkNextLesson').hide();
        }
    };

    var gameOver = function () {
        $('#content')
            .empty()
            .append(karma.createImg('oneOrMoreUtensils'));
        $('#linkNextLesson').hide();
    };

    $('#linkNextLesson').click(nextQuestion);

    nextQuestion();
}

setUpLesson(initialize, startGame);
