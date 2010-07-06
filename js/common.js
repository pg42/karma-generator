// This file can replace global.js in karma.

function controlButtonClickCallback($button, callback) {
    $button.click(function () {
                      if (!$button.data('disabled')) {
                          callback();
                      }
                  });
}

function enableControlButton($button) {
    $button
        .css({opacity: 1, cursor: 'pointer'})
        .data('disabled', false);
}

function disableControlButton($button) {
    $button
        .css({opacity: 0.3, cursor: 'default'})
        .data('disabled', true);
}

function setUpLinkBackLesson() {
    $('#linkBackLesson')
        .click(function () {
                   window.location = '../../../MenuStage.html';
               });
}

function setUpStartAndPlayAgainButtons(karma, initialize, start_game) {
    // Why two buttons?
    // Why not:
    // * only a play button?
    // -or-
    // * a button that is initially play, later replay?
    disableControlButton($('#linkPlayAgain'));
    controlButtonClickCallback($('#linkStart'),
                               function () {
                                   initialize(karma);
                                   disableControlButton($('#linkStart'));
                                   enableControlButton($('#linkPlayAgain'));
                                   start_game(karma);
                               });
    controlButtonClickCallback($('#linkPlayAgain'),
                               function () { start_game(karma); });
}

function setUpHelp() {
    $help = $('#help');
    $('#linkHelp')
        .click(function () { $help.slideDown(2000); })
        .mouseout(function () { $help.slideUp(2000); });
}

/*
 * initialize is called once before the game is started. It is passed
 * the karma object as an argument.
 * Each time a game is started or restarted, starte_game is called
 * with the karma object as an argument.
 */
function setUpLesson(initialize, start_game) {
    $(function () {
          $('#linkPrevLesson').hide();
          $('#linkNextLesson').hide();
          var karma = lesson_karma();
          karma.ready(
              function () {
                  setUpLinkBackLesson();
                  setUpStartAndPlayAgainButtons(karma, initialize, start_game);
                  setUpHelp();
              });
      });
}

function setUpMultiScreenLesson(draw_screen_fns) {
    $(function () {
          $('#linkPrevLesson').hide();
          $('#linkNextLesson').hide();

          var karma = lesson_karma();
          var $content = $('#content'); // TBD: error if absent
          var current_screen = 0;

          var gotoScreen = function(i) {
              current_screen = i;
              updateScreen();
          };

          var updateScreen = function () {
              $content.empty();
              draw_screen_fns[current_screen](karma, $content);
              if (current_screen == 0) {
                  $('#linkPrevLesson').hide();
              } else {
                  $('#linkPrevLesson').show();
              }
              if (current_screen == draw_screen_fns.length - 1) {
                  $('#linkNextLesson').hide();
              } else {
                  $('#linkNextLesson').show();
              }
          };

          $('#linkNextLesson')
              .click(function () {
                         karma.audio.trigger.play();
                         ++current_screen;
                         updateScreen();
                     });
          $('#linkPrevLesson')
              .click(function () {
                         karma.audio.trigger.play();
                         --current_screen;
                         updateScreen();
                     });

          karma.ready(
              function () {
                  setUpLinkBackLesson();
                  setUpStartAndPlayAgainButtons(karma,
                                                function () {},
                                                function (karma) {
                                                    gotoScreen(0);
                                                });
                  setUpHelp();
              });
      });
}

function disableSelection(target) {
    if (typeof target.onselectstart != 'undefined') { //IE
        target.onselectstart = function () { return false; };
    } else if (typeof target.style.MozUserSelect != 'undefined') { //Firefox
        target.style.MozUserSelect = 'none';
    } else if (typeof target.style.KhtmlUserSelect != 'undefined') { //Webkit
        target.style.KhtmlUserSelect = 'none';
    } else { //Opera
        target.onmousedown = function () { return false; };
        target.style.cursor = 'default';
    }
}

function disableImageDragging(img) {
    $(img).mousedown(function (event) { event.preventDefault(); });
}

// TBD: move to Karma
function randomElement(collection) {
    return collection[Karma.random(0, collection.length - 1)];
}

// TBD: move to Karma
function range(lower, upper) {
    var result = [];
    for (var i = lower; i < upper; ++i) {
        result.push(i);
    }
    return result;
}

Karma.createImg = function (name, disable_dragging) {
    disable_dragging = typeof(disable_dragging) != 'undefined' ? disable_dragging : true;
    var result = $(document.createElement('img'))
        .attr('src', this.image[name].src);
    if (disable_dragging) {
        disableImageDragging(result);
    }
    return result;
};

Karma.random = Karma.rand;

function createDiv(id) {
    var result = $(document.createElement('div'));
    if (typeof(id) != 'undefined') {
        result.attr('id', id);
    }
    return result;
}

// Return 'n' elements from 'all', amongst which 'x'.
function randomElementsIncluding(all, x, n) {
    var others = all.filter(function (y) { return x != y; });
    var result = Karma.shuffle(others).slice(0, n - 1);
    result.push(x);
    return Karma.shuffle(result);
}
