var things = ['cat', 'cow', 'deer', 'dog', 'elephant', 'horse', 'sheep'];

function initialize() {
    scoreboardInitialize({layout: 'horizontal',
		          winningScore: things.length});
    disableSelection($('body').get()[0]);
}

function startGame(karma) {
    scoreboardReset();
    var $content = $('#content')
        .removeClass('backOpaque') // TBD: needed?
        .empty();
    if (configuration.title) {
        $content.append(createDiv('title').html(configuration.title));
    }
    var div_ids = ['listenAgain',
                   'questionBox',
                   'imageBox',
                   'checkedOption',
                   'optionSection'];

    $(div_ids.map(createDiv)).appendTo($content);

    $('#questionBox').html(configuration.question);

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
                           $('.optImg').unbind('click');
		           $('#listenAgain').hide();
		           karma.audio.correct.play();
		           if (try_count == 1) {
			       scoreboardHit();
		           } else {
                               scoreboardMiss();
                           }
		           $('#checkedOption')
                               .empty()
                               .append(karma.createImg('correct'));
                           timer = setTimeout(gotoNext, 1000);
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
