var answers = { boy: ['sleeping', 'running', 'crying', 'laughing'],
                monkey: ['climbing', 'eating', 'running', 'walking'],
                duck: ['swimming', 'flying', 'jumping', 'walking'],
                teacher: ['teaching', 'singing', 'dancing', 'playing'],
                man: ['He is riding a bicycle',
                      'He is talking',
                      'He is singing',
                      'He is barking'],
                dog: ['barking', 'growling', 'laughing', 'jumping'],
                mother: ['cooking', 'eating', 'sleeping', 'drinking'],
                father: ['digging', 'running', 'cooking', 'sleeping'],
                baby: ['crying', 'clapping', 'running', 'jumping'],
                driver: ['driving', 'riding', 'carrying', 'reading']
              };

var letters = 'abcd';

function initialize(karma) {
    scoreboardInitialize({layout: 'horizontal',
                          winningScore: objects.length});
}

function startLesson(karma) {
    scoreboardReset();
    $('#content')
        .empty()
        .append(createDiv('section')
                .append(createDiv('topText')
                       .html('Click on the answer you think is correct.'))
                .append(createDiv('question'))
                .append(createDiv('optionSection'))
                .append(createDiv('answer'))
                .append(createDiv('imgStory')))
        .append(createDiv('gameOver'));

    var remaining_objects = Karma.shuffle(objects);
    var current_object;
    var current_answer;

    var currentAnswerPhrase = function () {
        if (current_object == 'man') {
            return current_answer + '.';
        } else {
            return 'The ' + current_object + ' is ' + current_answer + '.';
        }
    };

    var optionClicked = function () {
        var checked;
        if ($(this).data('key') == current_answer) {
            scoreboardHit();
            checked = 'correct';
        } else {
            scoreboardMiss();
            checked = 'incorrect';
        }
        karma.audio[checked].play();
        $('.check', $(this).parent()).append(karma.createImg(checked));
        $('#answer')
            .append(currentAnswerPhrase());
        if (remaining_objects.length) {
            $('#linkNextLesson').show();
        } else {
            setTimeout(gameOver, 1000);
        }
    };

    var gameOver = function () {
        $('#section').hide();
        $('#linkNextLesson').hide();
        $('#gameOver')
            .empty()
            .append(createDiv('gameOver').html('Game Over !!!'))
            .append(createDiv('gameOverInfo'))
            .show();
        scoreboardAppendGameOverMessage($('#gameOverInfo'));
    };

    var next = function () {
        $('#linkNextLesson').hide();
        current_object = remaining_objects.pop();
        $('#question')
            .empty()
            .append(scoreboardTotal() + 1)
            .append('. What is the ' + current_object + ' doing ?');
        $('#imgStory')
            .empty()
            .append(karma.createImg(current_object));
        var $optionSection = $('#optionSection').empty();
        var options = answers[current_object];
        current_answer = options[0];
        options = Karma.shuffle(options);
        options.forEach(
            function (option, i) {
                $optionSection
                    .append(createDiv()
                            .append(createDiv().addClass('check'))
                            .append(createDiv()
                                    .addClass('options')
                                    .append(karma.createImg(letters[i]))
                                    .data('key', option)
                                    .click(optionClicked))
                            .append(createDiv()
                                    .addClass('optionText')
                                    .html(option)));
            }
        );
        $('#answer').empty();
    };

    $('#linkNextLesson').click(next);

    next();
}

setUpLesson(initialize, startLesson);
