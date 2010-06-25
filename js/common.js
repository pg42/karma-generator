// This file can replace global.js in karma.

/*
 * initialize is called once before the game is started. It is passed
 * the karma object as an argument.
 * Each time a game is started or restarted, starte_game is called
 * with the karma object as an argument.
 */
function setUpLesson(initialize, start_game) {

    var controlButtonClickCallback = function ($button, callback) {
        $button.click(function () {
                          if (!$button.data('disabled')) {
                              callback();
                          }
                      });
    };

    var enableControlButton = function ($button) {
        $button.css({opacity: 1, cursor: 'pointer'});
        $button.data('disabled', false);
    };

    var disableControlButton = function ($button) {
        $button.css({opacity: 0.3, cursor: 'default'});
        $button.data('disabled', true);
    };

    var setUpLinkBackLesson = function () {
        $('#linkBackLesson')
            .click(function () {
                       window.location = '../../../MenuStage.html';
                   });
    };

    var setUpStartAndPlayAgainButtons = function (karma, initialize, start_game) {
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
    };

    var setUpHelp = function () {
        $help = $('#help');
        $('#linkHelp')
            .click(function () { $help.slideDown(2000); })
            .mouseout(function () { $help.slideUp(2000); });
    };

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
