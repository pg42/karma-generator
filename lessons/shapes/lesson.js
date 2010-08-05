var shapes1 = ['quad1','quad2','quad3','quad4','circle1','circle2','circle3','circle4'];
var shapes2 = ['quad21','quad22','quad23','quad24','circle21','circle22','circle23','circle24','triangle21','triangle22','triangle23','triangle24'];
var shapes3 = [
    {
        name: 'triangle31',
        shape: 'triangle',
        position: { left: 138, top: 65, width: 56, height: 36 }
    },
    {
        name: 'triangle32',
        shape: 'triangle',
        position: { left: 410, top: 170, width: 53, height: 31 }
    },
    {
        name: 'triangle33',
        shape: 'triangle',
        position: { left: 536, top: 177, width: 36, height: 34 }
    },
    {
        name: 'triangle34',
        shape: 'triangle',
        position: { left: 658, top: 177, width: 49, height: 35 }
    },
    {
        name: 'quad31',
        shape: 'quad',
        position: { left: 258, top: 125, width: 56, height: 32 }
    },
    {
        name: 'quad31',
        shape: 'quad',
        position: { left: 364, top: 107, width: 56, height: 32 }
    },
    {
        name: 'quad32',
        shape: 'quad',
        position: { left: 333, top: 172, width: 57, height: 33 }
    },
    {
        name: 'quad33',
        shape: 'quad',
        position: { left: 338, top: 215, width: 53, height: 31 }
    },
    {
        name: 'quad34',
        shape: 'quad',
        position: { left: 572, top: 180, width: 40, height: 30 }
    },
    {
        name: 'quad34',
        shape: 'quad',
        position: { left: 616, top: 180, width: 40, height: 30 }
    },
    {
        name: 'circle31',
        shape: 'circle',
        position: { left: 508, top: 240, width: 55, height: 35 }
    },
    {
        name: 'circle31',
        shape: 'circle',
        position: { left: 733, top: 235, width: 55, height: 35 }
    },
    {
        name: 'circle32',
        shape: 'circle',
        position: { left: 693, top: 107, width: 52, height: 42 }
    },
    {
        name: 'circle32',
        shape: 'circle',
        position: { left: 788, top: 165, width: 52, height: 42 }
    }
];

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
    var zIndex = 1;
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
                         .append(createDiv(img)
                                 .addClass('dragObjects')
                                 .append(Karma.createImg(img))
                                 .data('shape', img.substring(0, img.length-lessonId))
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
    var zIndex = 1;
    var img_count = 0;
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

