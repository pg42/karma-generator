var things = ['cat', 'cow', 'deer', 'dog', 'elephant', 'horse', 'sheep'];

var scoreboard;

// TBD move this to common.js
function initialize() {
    var score_box = $(document.createElement('div'))
        .attr('id', 'score_box')
        .appendTo($('#footer'));

    scoreboard = score_box.scoreboard({layout: 'horizontal',
		                       winningScore: things.length});
    disableSelection($('body').get()[0]);
}

// TBD: move this to common.js
function createDiv(id) {
    var result = $(document.createElement('div'));
    if (typeof(id) != 'undefined') {
        result.attr('id', id);
    }
    return result;
}

function startGame(karma) {
    scoreboard.scoreboard('reset');
    var $content = $('#content')
        .removeClass('backOpaque') // TBD: needed?
        .empty();
    var div_ids = ['listenAgain',
                   'questionBox',
                   'imageBox',
                   'checkedOption',
                   'optionSection'];

    $(div_ids.map(createDiv)).appendTo($content);

    $('#questionBox').html('What is this ?'); // TBD: space before '?'

    var next_things = Karma.shuffle(things);
    var current_thing;

    var options = function() {
        var other_things = things.filter(function (x) {
                                             return x != current_thing;
                                         });
        var options = Karma.shuffle(other_things).slice(0, 3);
        options.push(current_thing);
        return Karma.shuffle(options);        
    };

    var sayCurrentThing = function () {
        karma.audio[current_thing].play();
    };

    $('#listenAgain')
        .hide()
        .click(sayCurrentThing);

    var try_count;
    var displayThing = function () {
        $('#listenAgain').hide();
        try_count = 0;

        current_thing = next_things.shift();
        sayCurrentThing();

        $('#imageBox')
            .empty()
            .append(karma.createImg(current_thing));

        $('#optionSection')
            .empty();

        $(options().map(createOption)).appendTo($('#optionSection'));
    };

    var timer;

    var tryAgain = function() {
        clearTimeout(timer);
        $('#checkedOption').empty();
    };

    var gotoNext = function() {
        clearTimeout(timer);
        $('#checkedOption').empty();
        if (next_things.length == 0) {
	    $('#content')
                .empty()
                .append(createDiv('gameOver').html('GAME OVER !!!'));
        } else {
	    displayThing();
        }
    };

    var createOption = function (name) {
        return createDiv()
            .addClass('optImg')
            .html(name)
            .click(function () {
                       ++try_count;
		       if (name == current_thing) {
                           $(this).unbind('click');
		           $('#listenAgain').hide();
		           karma.audio.correct.play();
		           if (try_count == 1) {
			       scoreboard.scoreboard('inc');
		           }
		           scoreboard.scoreboard('incTotal');
		           $('#checkedOption')
                               .empty()
                               .append(karma.createImg('correct'));
                           timer = setTimeout(gotoNext);
		       } else {
		           $('#listenAgain').show();
		           karma.audio.incorrect.play();
		           $('#checkedOption')
                               .empty()
                               .append(karma.createImg('incorrect'));
                           timer = setTimeout(tryAgain, 1000);
		       }
	           });
    };

    displayThing();
}

setUpLesson(initialize, startGame);