css('global')
css('lesson.css')

central_js_files = [
    'ui.core',
    'ui.draggable',
    'ui.droppable',
    'karma',
    '../../js/common.js',
    '../../js/jquery.clickable.js']

for f in central_js_files:
    java_script(f)

lesson_js = java_script('lesson.js', generated=True)
java_script('vocabulary.js')


def register_objects(objects):
    for o in objects:
        name = o['name']
        image(name + '.png', name)
        audio(name + '.ogg', name)
    prefix = 'var objects = ['
    print >>lesson_js, prefix + (',\n' + ' ' * len(prefix)).join(
        ["{name: '%s', position: {left: %s, top: %s, width: %s}}" % (o['name'],
                                                                     o['left'],
                                                                     o['top'],
                                                                     o['width'])
         for o in objects]) + '];'

for x in ['correct', 'incorrect', 'trigger']:
    audio(x + '.ogg', x)

