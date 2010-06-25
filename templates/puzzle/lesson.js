function clipRectangle(left, top, width, height) {
    var right = left + width;
    var bottom = top + height;
    return 'rect(' + top + 'px ' + right + 'px ' + bottom + 'px ' + left + 'px)';
}

function makePiece(complete_image, id, column, row, width, height, label) {
    var left = column * width;
    var top = row * height;

    var result = $(document.createElement('div'))
        .attr({id: id})
        .addClass('piece')
        .addClass('dragme')
        .css({position: 'relative',
              'float': 'left',
              width: width,
              height: height,
              zIndex: 1});

    $(document.createElement('img'))
        .attr({src: complete_image.src})
        .css({position: 'absolute',
              clip: clipRectangle(left, top, width, height),
              left: -left,
              top: -top,
              zIndex: -1})
        .appendTo(result);

    var label_div = $(document.createElement('div'))
        .css({position: 'absolute',
              width: width})
        .appendTo(result);

    $(document.createElement('div'))
        .attr({className: 'pieceLabel'})
        .css({textAlign: 'center'})
        .html(label)
        .appendTo(label_div);

    result.appendTo($('body')); // Ensure that label_div has a computed height.
    label_div.css({top: height / 2 - label_div.height() / 2});

    enableDragAndDrop(complete_image, result);

    return result[0];
}

function swap(node1, node2) {
    var tmp = $(document.createElement('div'));
    tmp.insertBefore(node1);
    node1.insertBefore(node2);
    node2.insertBefore(tmp);
    tmp.remove();
}

function scrubPosition(piece) {
    piece.css({top: '', left: ''});
}

function enableDragAndDrop(image, piece) {
    /*
     revert doesn't work well with relative positioning. It adds top
     and left which cause the piece to drift after multiple reverts.
     Instead call scrubPosition() to remove the top and left
     properties.
     */
    piece
        .draggable(
            {stack: {group: '.piece', min: 10}, // Ensure dragged piece is at front.
             stop: function() { scrubPosition(piece); }
            }).
        droppable(
            {over: function() { piece.addClass('dropTarget'); },
             out: function() { piece.removeClass('dropTarget'); },
             drop: function(event, ui) {
                 piece.removeClass('dropTarget');
                 swap($(ui.draggable[0]), piece);
                 scrubPosition($(ui.draggable[0]));
                 scrubPosition(piece);
                 checkGameOver(image);
             }
            });
}

function makePieces(complete_image, row_count, column_count) {
    var row, column;
    var width = complete_image.media.width / column_count;
    var height = complete_image.media.height / row_count;
    var result = [];
    for (row = 0; row < row_count; ++row) {
        for (column = 0; column < column_count; ++column) {
            var i = result.length;
            result.push(makePiece(complete_image, 'piece' + i,
                                  column, row, width, height,
                                  labelGenerator(i)));
        }
    }
    return result;
}

function wrongCount(pieces) {
    var result = 0;
    for (var i = 0; i < pieces.length; ++i) {
        if ($(pieces[i]).attr('id') != 'piece' + i) {
            ++result;
        }
    }
    return result;
}

function shufflePieces(pieces) {
    var result = pieces;
    // Keep shuffling until the result looks 'sufficiently random' for a human,
    // i.e. no piece on its place.
    do {
        result = Karma.shuffle(result);
    } while (wrongCount(result) < result.length);
    return result;
}

function showReward(image) {
    var $imgMain = $('#imgMain');
    $imgMain.empty();
    $(document.createElement('img'))
        .attr({src: image.src})
        .hide()
        .appendTo($imgMain)
        .fadeIn(3000);
}

function checkGameOver(image) {
    if (wrongCount($('.piece')) == 0) {
        showReward(image);
    }
}

function main(k) {
    var puzzles = ['puzzle1','puzzle2','puzzle3'];

    var createThumbnail = function(puzzle) {
        var img = $(document.createElement('img'))
            .addClass('imageThumb')
            .attr({src: k.image[puzzle].src})
        // Disable dragging of img.
            .mousedown(function (event) { event.preventDefault(); });

        return $(document.createElement('div'))
            .click(function() { startGame(puzzle); })
            .append(img);
    };

    var initialized = false;

    var initialize = function() {
        if (!initialized) {
            $imageBar = $(document.createElement('div')).attr({id: 'imageBar'});
            $('#content')
                .append($imageBar)
                .append($(document.createElement('div')).attr({id: 'imgMain'}));
            $(puzzles.map(createThumbnail)).appendTo($imageBar);
        }
        initialized = true;
    };

    function startGame(puzzle) {
        initialize();
        $('#imgMain').empty();
        var pieces = makePieces(k.image[puzzle], 4, 4);
        $(shufflePieces(pieces)).appendTo($('#imgMain'));
    }

    setupLinkBackLesson();
    setupStartAndPlayAgainButtons(function() { startGame(puzzles[0]); });
    setupHelp();
}

$(function () {
      var k = lesson_karma();
      k.ready(function() { main(k); });
  });


// Move the stuff below to global.js

function controlButtonClickCallback($button, callback) {
    $button.click(function() {
                      if (!$button.data('disabled')) {
                          callback();
                      }
                  });
}

function enableControlButton($button) {
    $button.css({opacity: 1, cursor: 'pointer'});
    $button.data('disabled', false);
}

function disableControlButton($button) {
    $button.css({opacity: 0.3, cursor: 'default'});
    $button.data('disabled', true);
}

function setupLinkBackLesson() {
    $('#linkBackLesson').click(gotoMainStage);
}

function setupStartAndPlayAgainButtons(start_game) {
    // Why two buttons?
    // Why not:
    // * only a play button?
    // -or-
    // * a button that is initially play, later replay?
    disableControlButton($('#linkPlayAgain'));
    controlButtonClickCallback($('#linkStart'),
                               function() {
                                   disableControlButton($('#linkStart'));
                                   enableControlButton($('#linkPlayAgain'));
                                   start_game();
                                   });
    controlButtonClickCallback($('#linkPlayAgain'), start_game);
}

function setupHelp() {
    $help = $('#help');
    $('#linkHelp')
        .click(function () { $help.slideDown(2000); })
        .mouseout(function () { $help.slideUp(2000); });
}
