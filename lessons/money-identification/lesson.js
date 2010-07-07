var amounts = [1, 2, 5, 10, 20, 25, 50, 100, 500, 1000];

setUpMultipleChoiceLesson(
    amounts,
    { reset: function () {
          var that = this;
          $('#content')
              .removeClass('backOpaque')
              .empty()
              .append(createDiv('title').html('Identify the money'))
              .append(createDiv('listenAgain')
                      .click(function () { that.sayAmount(); }))
              .append(createDiv('imageBox'))
              .append(createDiv('checkedOption'))
              .append(createDiv('optionSection'));
      },
      displayCurrent: function (current) {
          $('#optionSection').empty();
          $('#listenAgain').hide();
          $('#imageBox')
              .empty()
              .append(this.karma.createImg(current));
          this.sayAmount();
      },
      displayChoice: function (current) {
          return createDiv()
              .addClass('optImg')
              .html(current)
              .appendTo('#optionSection');
      },
      sayAmount: function () {
          this.karma.audio[this.current_object].play();
      },
      giveFeedback: function (which) {
          MultipleChoice.prototype.giveFeedback.apply(this, [which]);
          if (which == 'correct') {
              $('#listenAgain').hide();
          } else {
              $('#listenAgain').show();
          }
      }
    });
