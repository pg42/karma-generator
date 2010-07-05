var qwerty_keys = ['qwertyuiop', 'asdfghjkl', 'zxcvbnm'];

var questions_and_answers = [
    ['table spoons', 'eight'],
    ['cups', 'seventeen'],
    ['frying pans', 'three'],
    ['serving spoons', 'six'],
    ['kettles', 'three'],
    ['stoves', 'one'],
    ['knives', 'five'],
    ['plates', 'ten'],
    ['glasses', 'thirteen'],
    ['buckets', 'two']];

function showHangMan(karma, i) {
    $('#hangManSection')
        .empty()
        .append(karma.createImg('hang' + i).addClass('imgHang'));
}

function drawKeyboard() {
    var drawRow = function (row, i) {
        var $keys = createDiv('keys' + i);
        $(Array.prototype.map.apply(row,
                                    [function (letter) {
                                         return createDiv()
                                             .html(letter)
                                             .addClass(letter)
                                             .addClass('alphaKeys');
                                    }]))
            .appendTo($keys);
        return $keys;
    };
    var $keyboard = createDiv('keyboard')
        .appendTo('#content');
    $(qwerty_keys.map(drawRow)).appendTo($keyboard);
}

function initialize(karma) {
    scoreboardInitialize({layout: 'horizontal',
                          winningScore: 10});
    disableSelection($('body').get()[0]);
}

function startGame(karma) {
    $('#content')
        .empty()
        .append(createDiv('gameTitle').html('Number in words'))
        .append(createDiv('def')
                .html('Count and click on the letters to spell the number'))
        .append(karma.createImg('mainImage').addClass('imgHangMan'))
        .append(createDiv('questionSection'))
        .append(createDiv('answerSection'))
        .append(createDiv('infoSection')
                .html('Click on the letters that fit in the answer. ' +
                      'You are given 3 chances to complete the answer.'));
    drawKeyboard();
    $('#content')
        .append(createDiv('missedText')
                .html('Sorry You Missed It.')
                .hide())
        .append(createDiv('hangManSection'));
    showHangMan(karma, 0);
    $('#questionSection')
        .append('How many ')
        .append($(document.createElement('span')).addClass('objectName'))
        .append(' are there?');


    $('#missedText').hide();
    $('#linkNextLesson').hide();

    var mistakeCount = 0;

    var q_and_a_s = Karma.shuffle(questions_and_answers);
    var current_question = null;
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
            if (mistakeCount == 3) {
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
        var $answerSection = $('#answerSection').empty();
        $answerSection.append('There are ');
        Array.prototype.forEach.apply(current_answer,
                                      [function (letter, i) {
                                           $(document.createElement('span'))
                                               .addClass('answerBox')
                                               .addClass(letter)
                                               .html('#')
                                               .appendTo($answerSection);
                                       }]);
        $answerSection
            .append('&nbsp;&nbsp;')
            .append($(document.createElement('span')).addClass('objectName'))
            .append('.');
        $('.objectName')
            .empty()
            .append(current_question);
    };

    var nextQuestion = function () {
        $('.alphaKeys')
            .unbind('click')
            .click(keyClicked)
            .css('background-color', '');

        if (q_and_a_s.length) {
            $('#missedText').hide();
            $('#linkNextLesson').hide();
            $('#keyboard').show();
            mistakeCount = 0;
            showHangMan(karma, mistakeCount);
            var q_and_a = q_and_a_s.pop();
            current_question = q_and_a[0];
            current_answer = q_and_a[1];
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
