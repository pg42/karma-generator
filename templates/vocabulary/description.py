css('global')
css('lesson.css')

central_js_files = [
    'jquery',
    'ui.core',
    'ui.draggable',
    'ui.droppable',
    'karma',
    '../../js/common.js']

for f in central_js_files:
    java_script(f)

lesson_js = java_script('lesson.js', generated=True)
java_script('vocabulary.js')

div(id='content')

def register_objects(objects):
    for o in objects:
        name = o['name']
        image(name, name + '.png')
        audio(name, name + '.wav')
    f = open(lesson_js.dest_path(), 'w')
    prefix = 'var objects = ['
    print >>f, prefix + (',\n' + ' ' * len(prefix)).join(
        ["{name: '%s', position: {left: %s, top: %s, width: %s}}" % (o['name'],
                                                                     o['left'],
                                                                     o['top'],
                                                                     o['width'])
         for o in objects]) + '];'

for x in ['correct', 'incorrect', 'trigger']:
    audio(x, x + '.ogg')

