$(function() {
    var start_draw_div = function(event) {
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

    var add_resize_handle_to = function (elt) {
      var size = 10;
      var resize = function() {
        var x0 = elt.offset().left;
        var y0 = elt.offset().top;
        var x1 = h.offset().left + size - 1;
        var y1 = h.offset().top + size + 1;
        elt.css({width: x1 - x0, height: y1 - y0});
      };
      var h = $(document.createElement('div'))
        .css({width: size,
              height: size,
              backgroundColor: 'white',
              position: 'absolute'})
      .draggable({drag: resize, stop: resize})
      .appendTo(canvas);

      var position_resize_handle = function() {
        h.css({left: elt.offset().left + elt.width() - size + 1,
              top: elt.offset().top + elt.height() - size - 1});
      }

      position_resize_handle();
      
      elt
      .bind('drag', position_resize_handle)
      .bind('dragstop', position_resize_handle);

      r = Raphael(h.get()[0], 10, 10);
      var attrs = {width: 2, color: 'lightGrey'};
      r.path('M 1 9 L 10 0').attr(attrs);
      r.path('M 4 9 L 10 3').attr(attrs);
      r.path('M 7 9 L 10 6').attr(attrs);
    };

    $(document.createElement('div'))
      .attr({id: 'log'})
      .appendTo($('body'));

    var log = function(msg) {
      $('#log').html($('#log').html() + '<p>' + msg);
    }
  });
