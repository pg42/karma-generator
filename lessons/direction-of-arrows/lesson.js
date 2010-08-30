var arrows = range(1, 9).map(function (i) { return 'arrow' + i; });

setUpSimpleMCQuiz(
    { title: 'बायाँतिर भएको तीरसगँ मिल्ने तीरमा क्लिक गर :' },
    {
        presentOption: function (x) {
            return createDiv()
                .addClass('optImg')
                .append(this.createImg(x))
                .appendTo($('#optionSection'));
        }
    },
    arrows);
