var shapes1 = ["quad1","quad2","quad3","quad4","circle1","circle2","circle3","circle4"];
var shapes2 = ["quad21","quad22","quad23","quad24","circle21","circle22","circle23","circle24","triangle21","triangle22","triangle23","triangle24"];
var shapes3 = ["triangle31","triangle32","triangle33","triangle34","quad31","quad31","quad32","quad33","quad34","quad34","circle31","circle31",
               "circle32","circle32"];
var dragged_object;
var zIndex;

function createLesson (karma, content, shapes, lessonId) {
    zIndex = 1;
    content
        .append(createDiv('section' + lessonId)
                .append(createDiv('shapesSection' + lessonId))
                .append(createDiv('dropSection' + lessonId)
                        .append(createDiv('quad')
                                .addClass('dropObjects')
                                )
                        .append(createDiv('circle')
                                .addClass('dropObjects')
                                )
                        .append(createDiv()
                                .html('चतुर्भुज')
                                .addClass('dropText')
                                )
                        .append(createDiv()
                                .html('वृत')
                                .addClass('dropText')
                                )
                        )
                );
    if(lessonId == 2) {
        $('#dropSection' + lessonId)
            .empty()
            .append(createDiv('triangle')
                        .addClass('dropObjects')
                    )
                    .append(createDiv('quad')
                        .addClass('dropObjects')
                    )
                    .append(createDiv('circle')
                        .addClass('dropObjects')
                    )
                    .append(createDiv()
                        .html('त्रिभुज')
                        .addClass('dropText')
                    )
                    .append(createDiv()
                        .html('चतुर्भुज')
                        .addClass('dropText')
                    )
                    .append(createDiv()
                        .html('वृत')
                        .addClass('dropText')
                    );
    }
    var displayShape = function (img) {
        $('#shapesSection' + lessonId)
            .append(createDiv(img)
                .addClass('dragObjects')
                .append(Karma.createImg(img))
            );
    };
    
    Karma.shuffle(shapes).forEach(displayShape);
    $('.dragObjects')
        .draggable({
            revert: 'invalid',
            start: function (event, ui) {
                dragged_object = event.target.id;
        }
    });
    $('.dropObjects')
        .droppable({
            tolerence: 'intersect',
            hoverClass: 'drophover',
            drop : function (event, ui) {
                if(event.target.id == dragged_object.substring(0,dragged_object.length-lessonId)) {
                    karma.play('correct');
                    $('#' + dragged_object)
                        .draggable({disabled: true, revert: 'invalid'})
                        .css({'z-index':zIndex});
                        
                    zIndex++;
                }
                else {
                    karma.play('incorrect');
                    $('#' + dragged_object)
                        .draggable({revert: 'valid'})
                }
            }
    });
}

function lessonThree(karma, content) {
    zIndex = 1;
    var img_count = 0;
    content
        .append(createDiv('section3')
                    .append(createDiv('shapesSection3')
                            .append(createDiv('shapes3Img'))
                            )
                    .append(createDiv('dropSection3')
                            .append(createDiv('triangle')
                                    .addClass('dropObjects3')
                                    )
                            .append(createDiv('quad')
                                    .addClass('dropObjects3')
                                    )
                            .append(createDiv('circle')
                                    .addClass('dropObjects3')
                                    )
                            )
                            .append(createDiv()
                                .html('त्रिभुज')
                                .addClass('dropText')
                            )
                            .append(createDiv()
                                .html('चतुर्भुज')
                                .addClass('dropText')
                            )
                            .append(createDiv()
                                .html('वृत')
                                .addClass('dropText')
                            )
                );
        
    var gen_absolute_image = function (position) {
        var dragObj = {
                        'position':'absolute',                     
                        'background-image':'url("assets/image/' + shapes3[img_count] + '.png")',
                        'background-repeat': 'no-repeat'
                        };
        var identify = String(img_count).length<2?("0" + img_count):img_count;
        $("#shapesSection3")
            .append(createDiv(shapes3[img_count] + identify)
                .addClass('dragObjects')
        );
        $('#' + shapes3[img_count] + identify)
            .css(dragObj)
            .css(position);
        img_count++;
    };
    
    var a = 6 ,b = -5;
    gen_absolute_image({left: 132 + a, top: 70 + b, width: 56, height: 36});    // top triangle
    gen_absolute_image({left: 404 + a, top: 175 + b, width: 53, height: 31});   // side tran
    gen_absolute_image({left: 530 + a, top: 182 + b, width: 36, height: 34});   // glass left		
    gen_absolute_image({left: 652 + a, top: 182 + b, width: 49, height: 35});   // glass middle right
    gen_absolute_image({left: 252 + a, top: 130 + b, width: 56, height: 32});   // window1
    gen_absolute_image({left: 358 + a, top: 112 + b, width: 56, height: 32});   // window 2
    gen_absolute_image({left: 327 + a, top: 177 + b, width: 57, height: 33});   // door
    gen_absolute_image({left: 332 + a, top: 220 + b, width: 53, height: 31});   // mat
    gen_absolute_image({left: 566 + a, top: 185 + b, width: 40, height:30});   // glass middle 1
    gen_absolute_image({left: 610 + a, top: 185 + b, width: 40, height: 30});   // glass middle 1
    gen_absolute_image({left: 502 + a, top: 245 + b, width: 55, height: 35});   // tyre 1
    gen_absolute_image({left: 727 + a, top: 240 + b, width: 55, height: 35});   // tyre 2
    gen_absolute_image({left: 687 + a, top: 112 + b, width: 52, height: 42});   // fruit 1
    gen_absolute_image({left: 782 + a, top: 170 + b, width: 52, height: 42});   // fruit 2
    
    
    $('.dragObjects')
        .draggable({
            revert: 'invalid',
            start: function (event, ui) {
                dragged_object = event.target.id;
        }
    });
    
    $('.dropObjects3')
        .droppable({
            tolerence: 'intersect',
            hoverClass: 'drophover',
            drop : function (event, ui) {
                if(event.target.id == dragged_object.substring(0,dragged_object.length-4)) {
                    karma.play('correct');
                    $('#' + dragged_object)
                        .draggable({disabled: true, revert: 'invalid'})
                        .css({'z-index':zIndex});
                        
                    zIndex++;
                }
                else {
                    karma.play('incorrect');
                    $('#' + dragged_object)
                        .draggable({revert: 'valid'})
                }
            }
    });
}

setUpMultiScreenLesson(
    [
     function (karma, content) { createLesson(karma, content, shapes1, 1); },
     function (karma, content) { createLesson(karma, content, shapes2, 2); },
     lessonThree]);

