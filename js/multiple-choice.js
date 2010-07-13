var MCQuiz = Object.create(
    {},
    {
        initialize: function (karma, tasks) {
            this.karma = karma;
            this.tasks = tasks;
            return this;
        },
        start: function () {
            scoreboardInitialize({winningScore: this.tasks.length});
            scoreboardReset();
            this.i = 0;
            this.tasks = Karma.shuffle(this.tasks);
            this.presentTask();
        },
        currentTask: function () {
            return this.tasks[this.i];
        },
        presentTask: function () {
            var task = this.currentTask();
            var correct_option = task.correct_option;
            var options = Karma.shuffle(task.options);
            this.tries = 0;
            this.presentQuestion(task.question);
            var that = this;
            $('#optionSection').empty();
            options.forEach(
                function (option, i) {
                    var result = option == correct_option ?
                        'correct' :
                        'incorrect';
                    that.presentOption(option, i, result)
                        .click(function () { that.playAudio(result); })
                        .click(function () { that.tries++; })
                        .click(function () { that.clicked(result); });
                }
            );
        },
        clicked: toBeOverridden('clicked'),
        progress: function () {
            if (this.atEnd()) {
                this.gameOver();
            } else {
                this.gotoNext();
            }
        },
        gameOver: function () {
            $('#content')
                .empty()
                .append(createDiv('gameOver')
                        .append(createDiv('gameOver').html('Game Over !!!'))
                        .append(createDiv('gameOverInfo'))
                        .show());
            scoreboardAppendGameOverMessage($('#gameOverInfo'));
        },
        gotoNext: function () {
            ++this.i;
            this.presentTask();
        },
        atEnd: function () {
            return this.i == this.tasks.length - 1;
        },
        presentQuestion: toBeOverridden('presentQuestion'),
        presentOption: toBeOverridden('presentOption'),
        createImg: function (name) {
            return this.karma.createImg(name);
        },
        playAudio: function (name) {
            this.karma.audio[name].play();
        }
    }
);


var SimpleMCQuiz = Object.create(
    MCQuiz,
    {
        initialize: function (karma, configuration, tasks) {
            // configuration options:
            // - title: string
            // - has_audio: boolean
            // - question: string
            MCQuiz.initialize.apply(this, [karma, tasks]);
            this.configuration = configuration || {};
            return this;
        },
        start: function () {
                var that = this;
            $('#content')
                .empty()
                .removeClass('backOpaque');
            if (this.configuration.title) {
                $('#content')
                    .append(createDiv('title')
                            .html(this.configuration.title));
            }
            if (this.configuration.question) {
                $('#content')
                    .append(createDiv('questionBox')
                            .html(this.configuration.question));
            }
            if (this.configuration.has_audio) {
                $('#content')
                    .append(createDiv('listenAgain')
                            .click(function () { that.sayCurrent(); }));
            }
            $('#content')
                .append(createDiv('imageBox'))
                .append(createDiv('checkedOption'))
                .append(createDiv('optionSection'));
            MCQuiz.start.apply(this, []);
        },
        sayCurrent: function () {
             this.playAudio(this.currentTask().question);
        },
        presentQuestion: function (what) {
            $('#imageBox')
                .empty()
                .append(this.createImg(what).addClass('imgQues'));
            $('#checkedOption')
                .empty();
            if (this.configuration.has_audio) {
                $('#listenAgain')
                    .hide();
                this.sayCurrent();
            }
        },
        clicked: function (result) {
            var that = this;
            clearTimeout(self.timer);
            $('#checkedOption')
                .empty()
                .append(this.createImg(result));
            if (result == 'correct') {
                if (this.configuration.has_audio) {
                    $('#listenAgain')
                        .hide();
                }
                $('.optImg').unbind('click');
                if (this.tries == 1) {
                    scoreboardHit();
                } else {
                    scoreboardMiss();
                }
                setTimeout(function () { that.progress(); }, 1000);
            } else {
                this.incorrect();
            }
        },
        incorrect: function () {
            $('#listenAgain')
                .show();
            self.timer = setTimeout(function () {
                                        $('#checkedOption').empty();
                                    },
                                    1000);
        },
        gameOver: function () {
            $('#content')
                .empty()
                .append(createDiv('gameOver').html('Game Over !!!')
                        .show());
        }
    }
);

function setUpSimpleMCQuiz(configuration, extensions, objects) {
    var tasks = objects.map(
        function (o) {
            return {
                question: o,
                options: randomElementsIncluding(objects, o, 4),
                correct_option: o
            };
        }
    );
    var startLesson = function (karma) {
        Object
            .create(SimpleMCQuiz, extensions)
            .initialize(karma, configuration, tasks)
            .start();
    };

    setUpLesson(function () {}, startLesson);
}


var OneShotMCQuiz = Object.create(
    MCQuiz,
    {
        initialize: function (karma) {
            MCQuiz.initialize.apply(this, [karma]);
            return this;
        },
        presentQuestion: function (what) {
            $('#question')
                .empty()
                .append('3. What is the ' + what + ' doing ?');
            $('#imgStory')
                .empty()
                .append(this.createImg(what));
            $('#answer')
                .empty();
            $('#check')
                .empty();
        },
        presentOption: function (x, i, result) {
            var parent = $('#optionSection');
            var check = createDiv()
                .addClass('check')
                .appendTo(parent);
            var icon = createDiv()
                .addClass('options')
                .click(function () { check.append(this.createImg(result)); })
                .append(this.createImg('abcd'[i]))
                .appendTo(parent);
            createDiv()
                .addClass('optionText')
                .html(x)
                .appendTo(parent);
            return icon;
        },
        clicked: function (result) {
            $('.options').unbind('click');
            if (result == 'correct') {
                this.scoreboardHit();
            } else {
                this.scoreboardMiss();
            }
            this.displayMessage();
            this.progress();
        },
        gotoNext: function () {
            var that = this;
            $('#linkNextLesson')
                .unbind()
                .click(function () {
                           $('#linkNextLesson').hide();
                           MCQuiz.gotoNext.apply(that, []);
                       })
                .show();
        },
        currentMessage: function () {
            var task = this.currentTask();
            var correct = task.correct_option;
            if (task.question == 'man') {
                return correct + '.';
            } else {
                return 'The ' + task.question + ' is ' + correct + '.';
            }
        },
        displayMessage: function () {
            $('#answer')
                .append(this.currentMessage());
        },
        gameOver: function () {
            var that = this;
            setTimeout(function () { MCQuiz.gameOver.apply(this, []); },
                       1000);
        }
    }
);
