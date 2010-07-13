var arrows = range(1, 9).map(function (i) { return 'arrow' + i; });

setUpSimpleMCQuiz(
    { title: 'Identify the direction' },
    {
        presentOption: function (x) {
            return createDiv()
                .addClass('optImg')
                .append(this.createImg(x))
                .appendTo($('#optionSection'));
        }
    },
    arrows);
