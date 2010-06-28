function generateScreen0(karma, $container) {
    var $vocab_img = $(document.createElement('div'))
        .attr('id', 'vocabImg')
        .appendTo($container);

    var objectCss = function(object) {
        var result = object.position;
        result.position = 'absolute';
        result.height = 50;
        return result;
    };

    $(objects.map(function (object) {
                      return $(document.createElement('div'))
                          .css(objectCss(object))
                          .click(function () {
                                     karma.audio[object.name].play();
                                 });
                  })).appendTo($vocab_img);
}

function generateScreen1(karma, $container) {
    var createImage = function (object) {
        var img_area = $(document.createElement('div'))
            .addClass('imgArea');
        // TBD: is this div needed?
        var imgObject = $(document.createElement('div'))
            .addClass('imgObject')
            .append(karma.createImg(object.name))
            .appendTo(img_area);
        $(document.createElement('div'))
            .addClass('dropObjects')
            .appendTo(img_area);
        return img_area;
    };

    var createWord = function (object) {
        return $(document.createElement('div'))
            .addClass('dragObjects')
            .html(object.name);
    };

    var images = objects.map(createImage);
    var words = objects.map(createWord);

    var enableDragAndDrop = function (word, target) {
        word.draggable({containment: '#content', revert: true});
        target.droppable(
            {tolerance: 'intersect',
             hoverClass: 'drophover',
             drop: function (event, ui) {
                 var dropped_word = ui.draggable;
                 if (dropped_word.get()[0] === word.get()[0]) {
                     dropped_word.remove();
                     $(this).text(dropped_word.text());
                     karma.audio.correct.play();
                 } else {
                     karma.audio.incorrect.play();
                 }
                 if ($('.dragObjects').size() == 0) {
                     $(document.createElement('div'))
                         .addClass('gameOver')
                         .text('GAME OVER')
                         .appendTo($('#optionSection'));
                 }
             }});
    };

    for (var i = 0; i < images.length; ++i) {
        enableDragAndDrop(words[i], $('.dropObjects', images[i]));
    }

    var $ques_section = $(document.createElement('div'))
        .attr({id: 'quesSection'})
        .appendTo($container);
    $(Karma.shuffle(images)).appendTo($ques_section);

    disableSelection($ques_section.get()[0]);

    var $option_section = $(document.createElement('div'))
        .attr({id: 'optionSection'})
        .appendTo($container);
    $(Karma.shuffle(words)).appendTo($option_section);
}

setUpMultiScreenLesson([generateScreen0, generateScreen1]);
