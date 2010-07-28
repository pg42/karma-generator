var question_set1 = [10, 2, 150, 50, 500, 1500, 12, 120, 250, 40];
var question_set2 = [3, 16, 62, 59, 127, 355, 400, 757, 935, 1205];
var count_correct;
var clock = null;

function toRoman(x) {
    var mapping = [
        { roman: 'M', arabic: 1000 },
        { roman: 'CM', arabic: 900 },
        { roman: 'D', arabic: 500 },
        { roman: 'CD', arabic: 400 },
        { roman: 'C', arabic: 100 },
        { roman: 'XC', arabic: 90 },
        { roman: 'L', arabic: 50 },
        { roman: 'XL', arabic: 40 },
        { roman: 'X', arabic: 10 },
        { roman: 'IX', arabic: 9 },
        { roman: 'V', arabic: 5 },
        { roman: 'IV', arabic: 4 },
        { roman: 'I', arabic: 1 }
    ];
    var i = 0;
    var result = [];
    while (x > 0) {
        var arabic = mapping[i].arabic;
        if (arabic <= x) {
            result.push(mapping[i].roman);
            x -= arabic;
        } else {
            ++i;
        }
    }
    return String.prototype.concat.apply('', result);
}

function showQuestions(karma, content, questions) {
    if(clock == null){
        clock = new Clock();        
    }
    clock.reset();
    clock.show();
    clock.start();
    content
        .append(createDiv('section')
                .append(createDiv('gameArea')
                        .append(createDiv('topText'))))
        .append(createDiv('confirmBtn')
                .click(function () { checkAnswers(); }))
        .append(createDiv('imgStory'));

    var createTextBox = function () {
        return $(document.createElement('input'))
            .attr({
                      type: 'text',
                      maxlength: 10,
                      size: 10
                  })
            .addClass('textBox');
    };

    var createCheckBox = function (img_name) {
        return createDiv()
            .addClass('check')
            .append(karma.createImg(img_name));
    };

    var checkAnswer = function (answer_box) {
        if ($(answer_box).data('checked')) {
            return;
        }
        var correct_answer = $(answer_box).data('correctAnswer');
        var feedback;
        if (correct_answer == $(answer_box).val().toUpperCase()) {
            feedback = createCheckBox('correct');
            count_correct++;
        } else {
            feedback = $()
                .add(createCheckBox('incorrect'))
                .add(createTextBox().val(correct_answer))
                .add(createCheckBox('correct'));
        }
        feedback.appendTo($(answer_box).parent());
        $(answer_box).data('checked', true);
        setTimeout(function () {
                       feedback.remove();
                       $(answer_box).data('checked', false);
                   },
                   3000);
    };

    var checkAnswers = function () {
        count_correct = 0;
        $('.ansBox').map(function (i, answer_box)  { checkAnswer(answer_box); });
        if(count_correct == $('.ansBox').length) {
            gameOver();
        }
    };
    
    var gameOver = function () {
        clock.stop();
        var hms = clock.hours_minutes_seconds();
        content
            .append(createDiv('gameOver')
                    .append(karma.createImg('gameOver'))
                    .append(createDiv()
                            .addClass('specialText')
                            .html('Total time taken '
                                  + hms.hours + ' hours '
                                  + hms.minutes + ' minutes '
                                  + hms.seconds + ' seconds.')
                            )
                    .append(createDiv()
                            .html('Click next/back button to play another set.')
                            )
                    .show());
        $("#confirmBtn").hide();
    };

    var createQuestion = function (x) {
        $('#gameArea')
            .append(createDiv()
                    .addClass('imgArea')
                    .append(createDiv()
                            .addClass('quesBox')
                            .html(x))
                    .append(createTextBox()
                            .addClass('ansBox')
                            .data('correctAnswer', toRoman(x))
                            .focus(function() {
                                       $(this).addClass("focus");
                                   })
                            .blur(function() {
                                      $(this).removeClass("focus");
                                  })));
    };

    Karma.shuffle(questions).forEach(createQuestion);
}

function initialScreen(karma, content) {
    if(clock != null) {
        clock.hide();
    }
    content
        .empty()
        .append(createDiv('frontDisplay')
                .append(karma.createImg('imgFront'))
                );
}

setUpMultiScreenLesson([
                       function (karma, content) { initialScreen(karma, content); },
                       function (karma, content) { showQuestions(karma, content, question_set1); },
                       function (karma, content) { showQuestions(karma, content, question_set2); }]);

