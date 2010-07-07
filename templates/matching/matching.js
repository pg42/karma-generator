function padLeft(str, pad_character, length) {
    str = str.toString();
    pad_character = pad_character.toString();
    while (str.length < length) {
        str = pad_character + str;
    }
    return str;
}

function Clock() {
    $('#footer')
        .append(createDiv('timerBar')
                .append(createDiv('picClock'))
                .append(createDiv('timerBox1').addClass('timerBoxes'))
                .append(createDiv('timerBox2').addClass('timerBoxes'))
                .append(createDiv('timerBox3').addClass('timerBoxes'))
                .hide());
    this.seconds = 0;
    this.interval_id = null;
    this.display();
}

Clock.prototype.start = function () {
    var clock = this;
    this.interval_id = setInterval(function () { clock.tick(); },
                                   1000);
};

Clock.prototype.tick = function () {
    this.seconds++;
    this.display();
};

Clock.prototype.hours_minutes_seconds = function() {
    var s = this.seconds;
    var m = Math.floor(s / 60);
    s = s % 60;
    var h = Math.floor(m / 60);
    m = m % 60;
    return {hours: h, minutes: m, seconds: s};
};

Clock.prototype.display = function() {
    var hms = this.hours_minutes_seconds();
    $('#timerBox1').html(padLeft(hms.seconds, '0', 2));
    $('#timerBox2').html(padLeft(hms.minutes, '0', 2));
    $('#timerBox3').html(padLeft(hms.hours, '0', 2));
};

Clock.prototype.stop = function () {
    if (this.interval_id) {
        clearInterval(this.interval_id);
        this.interval_id = null;
    }
};

Clock.prototype.reset = function () {
    this.stop();
    this.seconds = 0;
    this.display();
};

var clock = null;

function initialize() {
    clock = new Clock();
    // TBD: move this to common.js
    $('#footer')
        .append(createDiv('clickDisplay')
                .append(createDiv('clickTitle').html('Clicks:'))
                .append(createDiv('clickBox'))
                .hide());
    $('#content').append(createDiv('section'));
}

function startGame(karma) {
    clock.reset();
    $('#timerBar').show();
    $('#clickDisplay').show();
    $('#section').empty();
    $('#clickBox').html('00');

    var click_count = 0;
    clock.start();

    var turned_pieces = [];

    var pieceClicked = function (piece) {
        if (piece.hasClass('matched') ||
            turned_pieces.length == 2 ||
            turned_pieces.indexOf(piece) != -1) {
            return;
        }
        ++click_count;
        $('#clickBox').html(padLeft(click_count, '0', 2));
        turned_pieces.push(piece);
        face(piece).show();
        if (turned_pieces.length == 2) {
            setTimeout(processPossibleMatch, 1000);
        }
    };


    var key = function (x) {
        var result = x.data('key');
        return result;
    };

    var piecesMatch = function (piece1, piece2) {
        return key(face(piece1)) == key(face(piece2));
    };

    var hidePiece = function (piece) {
        face(piece).hide();
    };

    var disablePiece = function (piece) {
        hidePiece(piece);
        piece.addClass('matched');
    };

    var processPossibleMatch = function () {
        if (piecesMatch(turned_pieces[0], turned_pieces[1])) {
            turned_pieces.map(disablePiece);
            if ($('.matched').length == $('.default').length) {
                gameOver();
            }
        } else {
            turned_pieces.map(hidePiece);
        }
        turned_pieces = [];
    };

    var gameOver = function () {
        clock.stop();
        var hms = clock.hours_minutes_seconds();
        var info = 'You have completed the game in <span class="specialText">' +
            click_count +
	    '</span> clicks within <span class="specialText">' +
            hms.hours +
            '</span> hours <span class="specialText">' +
            hms.minutes +
	    '</span> minutes and <span class="specialText">' +
            hms.seconds +
            '</span> seconds.';
        $('#section')
            .empty()
            .append(createDiv('gameOver')
                    .html('GAME OVER<br/>Congratulations!!!'))
            .append(createDiv('gameOverInfo').html(info));
    };

    var face = function (piece) {
        return $('.pieceFace', piece);
    };

    var createPiece = function (face) {
        return createDiv()
            .addClass('default')
            .click(function () { pieceClicked($(this)); })
            .append(face.hide());
    };

    var createPieces = function () {
        $(Karma.shuffle(createFaces(karma)).map(createPiece))
            .appendTo($('#section'));
    };

    createPieces();
}

function createImage(karma, word, key) {
    return createDiv()
        .data('key', key)
        .addClass('pieceFace')
        .append(karma.createImg(word));
}

function createText(word, key) {
    return createDiv()
        .data('key', key)
        .addClass('textColor')
        .addClass('pieceFace')
        .html(word);
}

function createImageAndTextFromNames(karma, names) {
    return Array.prototype.concat(
        names.map(function (x) { return createImage(karma, x, x); }),
        names.map(function (x) { return createText(x, x); }));
}

setUpLesson(initialize, startGame);
