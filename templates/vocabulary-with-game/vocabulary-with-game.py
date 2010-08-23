css('global')
css('vocabulary-with-game.css')

for f in ['ui.core',
          'ui.draggable',
          'ui.droppable',
          'jquery.clickable',
          'vocabulary-with-game.js']:
    java_script(f)

def register_objects(objects):
    objects_js = java_script('objects.js', generated=True)
    print >>objects_js, 'var objects = ['
    print >>objects_js, '   ' + ',\n   '.join(["'%s'" % x for x in objects])
    print >>objects_js, '];'
    print >>objects_js, 'setUp(objects);'

    for x in objects:
        image(x + '.jpg', x)
        audio(x + '.ogg', x)
