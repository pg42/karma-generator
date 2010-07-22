function generateScreen0(karma, $container) {
    var $vocab_img = createDiv('vocabImg')
        .appendTo($container);

    var objectCss = function(object) {
        var result = object.position;
        result.position = 'absolute';
        result.height = 50;
        return result;
    };

    $(objects.map(function (object) {
                      return createDiv()
                          .css(objectCss(object))
                          .click(function () {
                                     karma.play(object.name);
                                 });
                  })).appendTo($vocab_img);
}

function generateScreen1(karma, $container) {
    var createImage = function (object) {
        var img_area = createDiv()
            .addClass('imgArea');
        // TBD: is this div needed?
        var imgObject = createDiv()
            .addClass('imgObject')
            .append(karma.createImg(object.name))
            .appendTo(img_area);
        createDiv()
            .addClass('dropObjects')
            .appendTo(img_area);
        return img_area;
    };

    var createWord = function (object) {
        return createDiv()
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
                     karma.play('correct');
                 } else {
                     karma.play('incorrect');
                 }
                 if ($('.dragObjects').size() == 0) {
                     createDiv()
                         .addClass('gameOver')
                         .text('GAME OVER')
                         .appendTo($('#optionSection'));
                 }
             }});
    };

    for (var i = 0; i < images.length; ++i) {
        enableDragAndDrop(words[i], $('.dropObjects', images[i]));
    }

    var $ques_section = createDiv('quesSection')
        .appendTo($container);
    $(Karma.shuffle(images)).appendTo($ques_section);

    var $option_section = createDiv('optionSection')
        .appendTo($container);
    $(Karma.shuffle(words)).appendTo($option_section);
}

setUpMultiScreenLesson([generateScreen0, generateScreen1]);
