$(function() {
    var context_menu;
    var delete_context_menu = function() {
      context_menu.remove();
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

    var start_draw_div = function(event) {
      if (context_menu) {
        delete_context_menu();
        return;
      }
      if (event.originalEvent.mouseHandled) { return; }
      var x0 = event.pageX;
      var y0 = event.pageY;
      var outline = $(document.createElement('div'))
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
      var resize_outline = function(event) {
        outline
        .css({left: Math.min(x0, event.pageX),
              top: Math.min(y0, event.pageY),
              width: Math.abs(event.pageX - x0),
              height: Math.abs(event.pageY - y0)});
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

    var canvas = $(document.createElement('div'))
      .attr({id: 'canvas'})
      .css({width: 1200,
            //height: 900,
            height: 300,
            border: '2px solid black'})
      .mousedown(start_draw_div)
      .appendTo($('body'));

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
              backgroundColor: 'white',
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
