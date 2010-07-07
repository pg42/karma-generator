var arrows = range(1, 9).map(function (i) { return 'arrow' + i; });

setUpMultipleChoiceLesson(
    arrows,
    { reset: function () {
          $('#content')
              .removeClass('backOpaque')
              .empty()
              .append(createDiv('title').html('Identify the direction'))
              .append(createDiv('imageBox'))
              .append(createDiv('optionSection'))
              .append(createDiv('checkedOption'));
      },
      displayCurrent: function (current) {
          $('#imageBox')
              .empty()
              .append(this.karma.createImg(current)
                      .addClass('imgQues'));
          $('#optionSection')
              .empty();
      },
      displayChoice: function (choice) {
          return createDiv()
              .addClass('optImg')
              .append(this.karma.createImg(choice))
              .appendTo('#optionSection');
      }
    });
