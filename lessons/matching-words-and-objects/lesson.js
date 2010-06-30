function createFaces(karma) {
    var createImage = function (word) {
        return createDiv()
            .data('key', word)
            .addClass('pieceFace')
            .append(karma.createImg(word));
    };

    var createText = function (word) {
        return createDiv()
            .data('key', word)
            .addClass('textColor')
            .addClass('pieceFace')
            .html(word);
    };

    return Array.prototype.concat(objects.map(createImage),
                                  objects.map(createText));
}
