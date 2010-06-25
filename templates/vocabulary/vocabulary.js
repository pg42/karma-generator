var objTxtHeight = 50;

function createImage(object) {
    var img_area = $(document.createElement('div'))
        .addClass('imgArea');
    // TBD: is this div needed?
    var imgObject = $(document.createElement('div'))
        .addClass('imgObject')
        .appendTo(img_area);
    $(document.createElement('img'))
        .attr('src', k.image[object.name].src)
        .mousedown(function (event) { event.preventDefault(); }) // No dragging
        .appendTo(imgObject);
    $(document.createElement('div'))
        .addClass('dropObjects')
        .appendTo(img_area);
    return img_area;
}

function createWord(object) {
    return $(document.createElement('div'))
        .addClass('dragObjects')
        .html(object.name);
}

var gotoScreen = function (i) { alert('call setUpMultiScreen first!'); };

function setUpMultiScreen($container, screen_generators) {
    var current_screen = 0;
    gotoScreen = function(i) {
        current_screen = i;
        updateScreen();
    };
    var updateScreen = function () {
        $container.empty();
        screen_generators[current_screen]($container);
        if (current_screen == 0) {
            $('#linkPrevLesson').hide();
        } else {
            $('#linkPrevLesson').show();
        }
        if (current_screen == screen_generators.length - 1) {
            $('#linkNextLesson').hide();
        } else {
            $('#linkNextLesson').show();
        }
    };
    $('#linkNextLesson')
        .click(function () {
                   k.audio.trigger.play();
                   ++current_screen;
                   updateScreen();
               });
    $('#linkPrevLesson')
        .click(function () {
                   k.audio.trigger.play();
                   --current_screen;
                   updateScreen();
               });    
}

function generateScreen0($container) {
    var $vocab_img = $(document.createElement('div'))
        .attr('id', 'vocabImg')
        .appendTo($container);

    var object_css = function(object) {
        var result = object.position;
        result.position = 'absolute';
        result.height = objTxtHeight;
        return result;
    };

    $(objects.map(function (object) {
                      return $(document.createElement('div'))
                          .css(object_css(object))
                          .click(function () { k.audio[object.name].play(); });
                  })).appendTo($vocab_img);
}

function enable_drag_and_drop(word, target) {
    word.draggable({containment: '#content', revert: true});
    target.droppable(
        {tolerance: 'intersect',
         hoverClass: 'drophover',
         drop: function (event, ui) {
             var dropped_word = ui.draggable;
             if (dropped_word.get()[0] === word.get()[0]) {
                 dropped_word.remove();
                 $(this).text(dropped_word.text());
                 k.audio.correct.play();
             } else {
                 k.audio.incorrect.play();
             }
             if ($('.dragObjects').size() == 0) {
                 $(document.createElement('div'))
                     .addClass('gameOver')
                     .text('GAME OVER')
                     .appendTo($('#optionSection'));
             }
         }});
}

function generateScreen1($container) {
    correctCounter = 0;

    var images = objects.map(createImage);
    var words = objects.map(createWord);

    for (var i = 0; i < images.length; ++i) {
        enable_drag_and_drop(words[i], $('.dropObjects', images[i]));
    }

    var $ques_section = $(document.createElement('div'))
        .attr({id: 'quesSection'})
        .appendTo($container);
    $(Karma.shuffle(images)).appendTo($ques_section);

    var $option_section = $(document.createElement('div'))
        .attr({id: 'optionSection'})
        .appendTo($container);
    $(Karma.shuffle(words)).appendTo($option_section);
}

function game() {
    gotoScreen(0);
}

$(function () {
      $('#linkPrevLesson').hide();
      $('#linkNextLesson').hide();
});

function initialize(karma) {
    k = karma;
    setUpMultiScreen($('#content'), [generateScreen0, generateScreen1]);
}

setUpLesson(initialize, game);
