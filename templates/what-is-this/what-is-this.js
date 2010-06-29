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

var scoreboard;

// TBD move this to common.js
function initialize() {
    var score_box = $(document.createElement('div'))
        .attr('id', 'score_box')
        .hide()
        .appendTo($('#footer'));

    scoreboard = score_box.scoreboard({layout: 'horizontal',
		                       winningScore: 10});
}

function displayPictures(karma, objects) {
    return objects.map(
        function (object, i) {
            return $(document.createElement('div'))
                .data('word', object)
                .css({position: 'absolute',
                      top: positions[i].top,
                      left: positions[i].left})
                .append(karma.createImg(object))
                .appendTo($('#content'));
        });
}

function createPointer(karma) {
    return $(document.createElement('div'))
        .addClass('pointerBg')
        .css({position: 'absolute',
              left: Karma.rand(10, 1000),
              top: Karma.rand(5, 500),
              backgroundColor: '#F5F29E'})
        .append(karma.createImg(randomElement(['ladybird', 'ant'])))
        .appendTo($('#content'));
}

function aOrAn(word) {
    return ('aeiou'.indexOf(word[0]) != -1) ? 'an' : 'a';
}

function startGame(karma) {
    $('#score_box').show();
    $(scoreboard).scoreboard('reset');

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
        var $questionSection = $(document.createElement('div'))
            .attr('id', 'questionSection')
            .appendTo($('#content'));

        $(document.createElement('div'))
            .attr('id', 'question')
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
	            scoreboard.scoreboard('inc');
	        }
	        karma.audio[word].play();
	        scoreboard.scoreboard('incTotal');

                setTimeout(remaining_pictures.length == 0 ? gameOver: gotoNextObject,
                          1000);
            } else {
	        input.addClass('incorrect');
	        karma.audio.incorrect.play();
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
                        + scoreboard.scoreboard('getScore')
                        + '</span> correct out of <span class="specialText">'
                        + scoreboard.scoreboard('getTotal')
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
