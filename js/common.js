// This file can replace global.js in karma.

function controlButtonClickCallback($button, callback) {
    $button.click(function () {
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
function setUpLesson(draw_screen_fns, start_game) {
    $(function () {
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
