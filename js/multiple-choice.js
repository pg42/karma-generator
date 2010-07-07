function MultipleChoice (karma, all_objects) {
    this.karma = karma;
    this.all_objects = all_objects;
    this.number_of_choices = 4;
    scoreboardInitialize({layout: 'horizontal',
                          winningScore: this.all_objects.length});
    return this;
}

MultipleChoice.prototype.start = function () {
    scoreboardReset();

    this.reset();

    this.remaining_objects = Karma.shuffle(this.all_objects);
    this.current_object = null;
    this.number_of_tries = 0;
    this.timer = null;

    this.gotoNext();
};

MultipleChoice.prototype.createChoiceClicked = function (choice) {
    var that = this;
    return function () {
        clearTimeout(that.timer);
        that.number_of_tries++;
        if (choice == that.current_object) {
            that.choices.unbind('click');
            if (that.number_of_tries == 1) {
                scoreboardHit();
            } else {
                scoreboardMiss();
            }
            that.giveFeedback('correct');
            setTimeout(function () { that.gotoNext(); }, 1000);
        } else {
            that.giveFeedback('incorrect');
            setTimeout(function () { that.tryAgain(); }, 1000);
        }
    };
};

MultipleChoice.prototype.gotoNext = function () {
    $('#checkedOption').empty();
    if (this.remaining_objects.length) {
        this.number_of_tries = 0;
        this.current_object = this.remaining_objects.pop();
        this.displayCurrent(this.current_object);
        var choices = randomElementsIncluding(this.all_objects,
                                              this.current_object,
                                              this.number_of_choices);
        var that = this;

        var createChoice = function (choice) {
            return that.displayChoice(choice)
                .click(function () {
                           clearTimeout(that.timer);
                           that.number_of_tries++;
                           if (choice == that.current_object) {
                               that.choices.map(function (x) { x.unbind('click'); });
                               if (that.number_of_tries == 1) {
                                   scoreboardHit();
                               } else {
                                   scoreboardMiss();
                               }
                               that.giveFeedback('correct');
                               setTimeout(function () { that.gotoNext(); }, 1000);
                           } else {
                               that.giveFeedback('incorrect');
                               setTimeout(function () { that.tryAgain(); }, 1000);
                           }
                       });
        };

        this.choices = choices.map(createChoice);
    } else {
        this.gameOver();
    }
};

MultipleChoice.prototype.reset = function () {
    // Typically empty divs current and choices
    alert('Override MultipleChoice.reset()');
};

MultipleChoice.prototype.displayCurrent = function(current) {
    alert('Override MultipleChoice.displayCurrent()');
};

MultipleChoice.prototype.displayChoice = function () {
    alert('Override MultipleChoice.displayChoice()');
};

MultipleChoice.prototype.giveFeedback = function (which) {
    $('#checkedOption')
        .empty()
        .append(this.karma.createImg(which));
    this.karma.audio[which].play();
};

MultipleChoice.prototype.tryAgain = function () {
    $('#checkedOption').empty();
};

MultipleChoice.prototype.gameOver = function () {
    this.karma.audio.byebye.play();
    $('#content')
        .empty()
        .append(createDiv('gameOver').html('GAME OVER !!!'));
};

function extend(object, properties) {
    for (prop in properties) {
        if (properties.hasOwnProperty(prop)) {
            object[prop] = properties[prop];
        }
    }
}

function setUpMultipleChoiceLesson(objects, overridden_methods) {
    var mc;
    var initialize = function (karma) {
        mc = new MultipleChoice(karma, objects);
        extend(mc, overridden_methods);
    };
    var startGame = function (karma) {
        mc.start();
    };
    setUpLesson(initialize, startGame);
}
