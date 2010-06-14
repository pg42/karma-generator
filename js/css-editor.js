$(function() {
    $('#tabs').tabs();
    var context_menu;
    var delete_context_menu = function() {
      context_menu.remove();
    };
    var canvas_x = function(event) {
      return event.pageX - canvas.offset().left - 2;
    };
    var canvas_y = function(event) {
      return event.pageY - canvas.offset().top - 2;
    };

    var build_context_menu = function(event, items) {
      context_menu = $(document.createElement('div'))
        .css({position: 'absolute',
              left: event.pageX,
              top: event.pageY,
              backgroundColor: 'white',
              border: '1px solid black',
              opacity: 0.9})
        .appendTo($('body'));
      $.each(items, function(i, item) {
          $(document.createElement('div'))
            .text(item[0])
            .click(function () {
                item[1]();
                delete_context_menu();
              })
            .appendTo(context_menu);
        });      
    };

    var last_id = -1;
    var generate_id = function() {
      last_id += 1;
      return 'id' + last_id;
    }

    var start_draw_div = function(event) {
      if (context_menu) {
        delete_context_menu();
        return;
      }
      if (event.originalEvent.mouseHandled) { return; }
      var x0 = canvas_x(event);
      var y0 = canvas_y(event);
      var id = generate_id();
      var outline = $(document.createElement('div'))
      .attr({id: id})
      .css({position: 'absolute',
            left: x0,
            top: y0,
            width: 0,
            height: 0,
            border: '1px solid grey',
            opacity: '0.9',
            backgroundColor: 'white'
        })
      .appendTo(canvas);

      var form = $(document.createElement('form'))
      .hide()
      .submit(function(event) {
          $(this).hide();
          var new_id = id_input.val();
          if (new_id != '') {
            id_label.text(new_id);
            outline.attr({id: new_id});
          }
          id_label.show();
          event.preventDefault();
        })
      .appendTo(outline);

      var id_input = $(document.createElement('input'))
      .attr({type: 'text', name: 'id'})
      .appendTo(form);

      var id_label = $(document.createElement('div'))
      .text(id)
      .show()
      .click(function() {
          $(this).hide();
          id_input.val($(this).text());
          form.show();
          id_input.select();
        })
      .appendTo(outline);

      var resize_outline = function(event) {
        var x1 = canvas_x(event);
        var y1 = canvas_y(event);
        outline
        .css({left: Math.min(x0, x1),
              top: Math.min(y0, y1),
              width: Math.abs(x1 - x0),
              height: Math.abs(y1 - y0)});
      };
      canvas.mousemove(resize_outline);
      canvas.mouseup(function(event) {
          canvas.unbind(event);
          canvas.unbind('mousemove', resize_outline);
          add_resize_handle_to(outline);
          outline.draggable();
        });
      outline.click(function(event) {
          if (event.which == 3 || event.metaKey) {
            build_context_menu(event,
                               [['delete', function() { outline.remove(); }]]);
          }
        });
      event.preventDefault();
    };

    // We add a dummy div so that the containing div takes into account
    // the space taken by the canvas
    var dummy = $(document.createElement('div'))
      .css({width: 1000, height: 300, border: '1px solid red'})
      .appendTo($('#layout'));

    var canvas = $(document.createElement('div'))
      .attr({id: 'canvas'})
      .css({//width: 1200,
            //height: 900,
        width: 1000,
            height: 300,
            position: 'absolute',
            left: 3,
            top: 68,
            border: '2px solid black'})
      .mousedown(start_draw_div)
      .appendTo(dummy);


    var toolbar = $(document.createElement('div'))
      .attr({id: 'toolbar'})
      .css({width: 1200,
            height: 20})
      .appendTo($('body'));

    $('#layout').css({padding: '1em 0em'});

    var state_to_save = function() {
      $canvas = $('#canvas');
      var result = $('#canvas > div').map(function (i, div) {
          var $div = $(div);
          return {tag: 'div',
              id: $div.attr('id'),
              left: $div.offset().left - $canvas.offset().left,
              top: $div.offset().top - $canvas.offset().top,
              width: $div.width(),
              height: $div.height()};
        });
      return result.get();
    };

    $(document.createElement('button'))
      .text('save')
      .click(function() {
          $.post('save',
                 JSON.stringify(state_to_save()),
                 function(data) {
                   // do nothing
                 });
        })
      .appendTo(toolbar);

    $(document.createElement('button'))
      .text('generate')
      .click(function() {
          $.post('generate',
                 JSON.stringify(state_to_save()),
                 function(data) {
                 });
        })
      .appendTo(toolbar);

    const resize_handle_size = 10;

    var draw_resize_handle_in = function(div) {
      var r = Raphael(div, 10, 10);
      var attrs = {width: 2, color: 'lightGrey'};
      r.path('M 1 9 L 10 0').attr(attrs);
      r.path('M 4 9 L 10 3').attr(attrs);
      r.path('M 7 9 L 10 6').attr(attrs);
    }

    var add_resize_handle_to = function (elt) {
      var resize = function() {
        var x0 = elt.offset().left;
        var y0 = elt.offset().top;
        var x1 = h.offset().left + resize_handle_size - 1;
        var y1 = h.offset().top + resize_handle_size + 1;
        elt.css({width: x1 - x0, height: y1 - y0});
      };
      var h = $(document.createElement('div'))
        .css({width: resize_handle_size,
              height: resize_handle_size,
              position: 'absolute',
              left: elt.width() - resize_handle_size,
              top: elt.height() - resize_handle_size - 2})
      .draggable({drag: resize, stop: resize})
      .appendTo(elt);

      draw_resize_handle_in(h.get()[0]);
    };


    

    $(document.createElement('div'))
      .attr({id: 'log'})
      .appendTo($('body'));

    var log = function(msg) {
      $('#log').html($('#log').html() + '<p>' + msg);
    }

    $(document).bind('contextmenu', function() { return false; });
  });
