setUpMultipleChoiceLesson(
    things,
    { reset: function () {
          var $content = $('#content')
              .removeClass('backOpaque') // TBD: needed?
              .empty();
          if (configuration.title) {
              $content.append(createDiv('title').html(configuration.title));
          }
          var div_ids = ['listenAgain',
                         'questionBox',
                         'imageBox',
                         'checkedOption',
                         'optionSection'];
          $(div_ids.map(createDiv)).appendTo($content);
          var that = this;
          $('#listenAgain').click(function () { that.sayCurrentThing(); });
          $('#questionBox').html(configuration.question);
      },
      displayCurrent: function (current) {
          $('#imageBox')
              .empty()
              .append(this.karma.createImg(current));
          $('#optionSection')
              .empty();
          this.sayCurrentThing();
      },
      displayChoice: function (choice) {
          return createDiv()
              .addClass('optImg')
              .html(choice)
              .appendTo('#optionSection');
      },
      sayCurrentThing: function () {
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
