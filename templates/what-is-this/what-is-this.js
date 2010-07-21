var positions = [
    {left: -20, top: 105}, // TBD: this is partially off-screen
    {left: 185, top: 100},
    {left: 550, top: 150},
    {left: 800, top: 160},
    {left: 1025, top: 120}, // TBD: off-screen for e.g. kite
    {left: -20, top: 450}, // TBD: this is off-screen
    {left: 185, top: 460},
    {left: 550, top: 465},
    {left: 800, top: 340},
    {left: 1025, top: 440} // TBD: off-screen for e.g. kite
];

// TBD move this to common.js
function initialize() {
    scoreboardInitialize({layout: 'horizontal',
		          winningScore: 10});
}

function displayPictures(karma, objects) {
    return objects.map(
        function (object, i) {
            return createDiv()
                .data('word', object)
                .css({position: 'absolute',
                      top: positions[i].top,
                      left: positions[i].left})
                .append(karma.createImg(object))
                .appendTo($('#content'));
        });
}

function createPointer(karma) {
    return createDiv()
        .addClass('pointerBg')
        .css({position: 'absolute',
              left: Karma.random(10, 1000),
              top: Karma.random(5, 500),
              backgroundColor: '#F5F29E'})
        .append(karma.createImg(randomElement(['ladybird', 'ant'])))
        .appendTo($('#content'));
}

function aOrAn(word) {
    return ('aeiou'.indexOf(word[0]) != -1) ? 'an' : 'a';
}

function startGame(karma) {
    scoreboardReset();

    $('#gameOver').hide();
    $('#content')
        .empty()
        .removeClass('backOpaque');

    var random_objects = Karma.shuffle(objects).slice(0, 10);

    var current_picture = null;
    var remaining_pictures = Karma.shuffle(displayPictures(karma,
                                                           random_objects));

    var pointer = createPointer(karma);

    var gotoNextObject = function () {
        $('#questionSection').remove();
        $(current_picture).remove();
        current_picture = remaining_pictures.shift();
        pointer.animate({top: current_picture.position().top + 70,
                         left: current_picture.position().left + 70},
                        2000,
                        createQuestion);
    };

    var createQuestion = function () {
        var word = current_picture.data('word');
        var answer_info = setUpAnswer(word);
        var $questionSection = createDiv('questionSection')
            .appendTo($('#content'));

        createDiv('question')
            .html('What is this?')
            .appendTo($questionSection);

        var input = answer_info.input;
        answer_info.answers_div.appendTo($questionSection);

        var checkAnswer = function () {
            var textval = input.val();
            if (answer_info.expected == textval.toLowerCase()) {
                input.unbind('keypress');
	        input.addClass('correct');
	        if (!input.hasClass('incorrect')) {
	            input.blur();
                    scoreboardHit();
	        } else {
                    scoreboardMiss();
                }
	        karma.play(word);

                setTimeout(remaining_pictures.length == 0 ? gameOver: gotoNextObject,
                          1000);
            } else {
	        input.addClass('incorrect');
	        karma.play('incorrect');
            }
        };

        var gameOver = function() {
            $('#questionSection').remove();
            $('#content').addClass('backOpaque');
            $('#gameOver')
                .empty()
                .show()
                .append('Game Over !!!')
                .append(
                    '<div id="gameOverInfo">You got  <span class="specialText">'
                        + scoreboardScore()
                        + '</span> correct out of <span class="specialText">'
                        + scoreboardTotal()
                        + '</span>   questions.</div>');
        };

        input
        // TBD: do we need these focus/blur events?
            .focus(function () {
	               $(this)
                           .removeClass('correct')
                           .removeClass('incorrect')
                           .addClass('focus');
	           })
            .blur(function () { $(this).removeClass('focus'); })
            .keypress(function (event) {
		          if (event.which === 13) {
			      checkAnswer();
		          }
	              })
            .focus();
    };

    gotoNextObject();
}

setUpLesson(initialize, startGame);
