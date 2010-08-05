var shapes1 = [
    {
        name: 'quad1',
        shape: 'quad'
    },
    {
        name: 'quad2',
        shape: 'quad'
    },
    {
        name: 'quad3',
        shape: 'quad'
    },
    {
        name: 'quad4',
        shape: 'quad'
    },
    {
        name: 'circle1',
        shape: 'circle'
    },
    {
        name: 'circle2',
        shape: 'circle'
    },
    {
        name: 'circle3',
        shape: 'circle'
    },
    {
        name: 'circle4',
        shape: 'circle'
    }
];
var shapes2 = [
    {
        name: 'quad21',
        shape: 'quad'
    },
    {
        name: 'quad22',
        shape: 'quad'
    },
    {
        name: 'quad23',
        shape: 'quad'
    },
    {
        name: 'quad24',
        shape: 'quad'
    },
    {
        name: 'circle21',
        shape: 'circle'
    }
    ,
    {
        name: 'circle22',
        shape: 'circle'
    }
    ,
    {
        name: 'circle23',
        shape: 'circle'
    }
    ,
    {
        name: 'circle24',
        shape: 'circle'
    },
    {
        name: 'triangle21',
        shape: 'triangle'
    }
    ,
    {
        name: 'triangle22',
        shape: 'triangle'
    }
    ,
    {
        name: 'triangle23',
        shape: 'triangle'
    }
    ,
    {
        name: 'triangle24',
        shape: 'triangle'
    }
];
var shapes3 = [
    {
        name: 'triangle31',
        shape: 'triangle',
        position: { left: 136, top: 63, width: 56, height: 36 }
    },
    {
        name: 'triangle32',
        shape: 'triangle',
        position: { left: 408, top: 168, width: 53, height: 31 }
    },
    {
        name: 'triangle33',
        shape: 'triangle',
        position: { left: 534, top: 175, width: 36, height: 34 }
    },
    {
        name: 'triangle34',
        shape: 'triangle',
        position: { left: 656, top: 175, width: 49, height: 35 }
    },
    {
        name: 'quad31',
        shape: 'quad',
        position: { left: 256, top: 123, width: 56, height: 32 }
    },
    {
        name: 'quad31',
        shape: 'quad',
        position: { left: 362, top: 105, width: 56, height: 32 }
    },
    {
        name: 'quad32',
        shape: 'quad',
        position: { left: 331, top: 170, width: 57, height: 33 }
    },
    {
        name: 'quad33',
        shape: 'quad',
        position: { left: 336, top: 213, width: 53, height: 31 }
    },
    {
        name: 'quad34',
        shape: 'quad',
        position: { left: 570, top: 178, width: 40, height: 30 }
    },
    {
        name: 'quad34',
        shape: 'quad',
        position: { left: 614, top: 178, width: 40, height: 30 }
    },
    {
        name: 'circle31',
        shape: 'circle',
        position: { left: 506, top: 238, width: 55, height: 35 }
    },
    {
        name: 'circle31',
        shape: 'circle',
        position: { left: 731, top: 233, width: 55, height: 35 }
    },
    {
        name: 'circle32',
        shape: 'circle',
        position: { left: 691, top: 105, width: 52, height: 42 }
    },
    {
        name: 'circle32',
        shape: 'circle',
        position: { left: 786, top: 163, width: 52, height: 42 }
    }
];

var zIndex = 1;

function handleDrop(karma, event, ui) {
    var draggable = ui.draggable;
    if (event.target.id == draggable.data('shape')) {
        karma.play('correct');
        draggable
            .draggable({ disabled: true })
            .css({ 'z-index': zIndex++ });
    } else {
        karma.play('incorrect');
        draggable.animate(draggable.data('original_position'), 1000);
    }
}

function createLesson (karma, content, shapes, lessonId) {
    zIndex = 1;
    content
        .append(createDiv('section' + lessonId)
                .append(createDiv('shapesSection' + lessonId))
                .append(createDiv('dropSection' + lessonId)));

    if (lessonId == 1) {
        $('#dropSection' + lessonId)
            .append(createDiv('quad')
                    .addClass('dropObjects'))
            .append(createDiv('circle')
                    .addClass('dropObjects'))
            .append(createDiv()
                    .html('चतुर्भुज')
                    .addClass('dropText'))
            .append(createDiv()
                    .html('वृत')
                    .addClass('dropText'));
    } else {
        $('#dropSection' + lessonId)
            .append(createDiv('triangle')
                    .addClass('dropObjects'))
            .append(createDiv('quad')
                    .addClass('dropObjects'))
            .append(createDiv('circle')
                    .addClass('dropObjects'))
            .append(createDiv()
                    .html('त्रिभुज')
                    .addClass('dropText'))
            .append(createDiv()
                    .html('चतुर्भुज')
                    .addClass('dropText'))
            .append(createDiv()
                    .html('वृत')
                    .addClass('dropText'));
    }
    Karma.shuffle(shapes)
        .forEach(function (img) {
                     $('#shapesSection' + lessonId)
                         .append(createDiv()
                                 .addClass('dragObjects')
                                 .append(Karma.createImg(img.name))
                                 .data('shape', img.shape)
                                 .data('original_position', { top: 0, left: 0 })
                                );
                 });
    $('.dragObjects')
        .draggable({ revert: 'invalid' });
    $('.dropObjects')
        .droppable({
                       hoverClass: 'drophover',
                       drop: function (event, ui) {
                           handleDrop(karma, event, ui);
                       }
                   });
}

function lessonThree(karma, content) {
    zIndex = 1;
    content
        .append(createDiv('section3')
                .append(createDiv('shapesSection3')
                        .append(createDiv('shapes3Img')))
                .append(createDiv('dropSection3')
                        .append(createDiv('triangle')
                                .addClass('dropObjects3'))
                        .append(createDiv('quad')
                                .addClass('dropObjects3'))
                        .append(createDiv('circle')
                                .addClass('dropObjects3')))
                .append(createDiv()
                        .html('त्रिभुज')
                        .addClass('dropText'))
                .append(createDiv()
                        .html('चतुर्भुज')
                        .addClass('dropText'))
                .append(createDiv()
                        .html('वृत')
                        .addClass('dropText')));

    shapes3.forEach(function (shape) {
                        $('#shapesSection3')
                            .append(createDiv()
                                    .addClass('dragObjects')
                                    .data('shape', shape.shape)
                                    .data('original_position', shape.position)
                                    .css({ position: 'absolute' })
                                    .css(shape.position)
                                    .append(karma.createImg(shape.name)));
                    });

    $('.dragObjects')
        .draggable({ revert: 'invalid' });

    $('.dropObjects3')
        .droppable({
                       hoverClass: 'drophover',
                       drop: function (event, ui) {
                           handleDrop(karma, event, ui);
                       }
                   });
}

setUpMultiScreenLesson(
    [
        function (karma, content) { createLesson(karma, content, shapes1, 1); },
        function (karma, content) { createLesson(karma, content, shapes2, 2); },
        lessonThree
    ]
);

