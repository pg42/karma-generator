var clock;

function initialize() {
    clock = new Clock();
    $('#imgDisplay').empty();
    range(0, TOTAL_QUES).forEach(
        function (i) {
	    $('#imgDisplay').append(createDiv('img' + i)
                                    .addClass('default'));
        }
    );
}

function startGame() {
    clock.reset();
    $('#timerBar').show();

    var images = range(0, TOTAL_QUES).map(function (i) { return 'img' + i; });
    images = Karma.shuffle(images);

    clock.start();

    $('#tvLayer').empty();
    $('#calcSection').empty();
    $('#tvLayer').toggleClass('tvOff tvOn').empty();

    var nextQuestion = function () {
        var task = generateTask();

        $('#calcSection')
            .empty()
            .append(task.question);
        $(document.createElement('input'))
            .addClass('textBox')
            .attr({id: 'answerBox',
                   type: 'text',
                   maxlength: 3})
	    .focus(function() {
		       $(this)
                           .removeClass('incorrect')
                           .addClass('focus');
	           })
	    .blur(function() {
		      $(this).removeClass('focus');
	          })
	    .keypress(
                function(event) {
                    if (event.which === 13) {
                        if ($('#answerBox').val() == task.answer) {
                            $('#answerBox').unbind('keypress');
	                    Karma.audio.correct.play();
                            $('#' + images.pop())
                                .toggleClass('default correct');
                            setTimeout(images.length ? nextQuestion : gameOver,
                                       1000);
                        } else {
	                    Karma.audio.incorrect.play();
                        }
                    }
	        })
            .appendTo($('#calcSection'));
        $('.textBox').focus();
    };

    var gameOver = function(){
        clock.stop();
        $('#calcSection').empty();
        $('.correct').toggleClass('correct default');
        $('#tvLayer').toggleClass('tvOff tvOn').html('खेल खत्तम।');
    };

    nextQuestion();
}

setUpLesson(initialize, startGame);
