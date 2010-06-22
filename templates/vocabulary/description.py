css('global')
css('lesson.css')

central_js_files = [
    'jquery',
    'ui.core',
    'ui.draggable',
    'ui.droppable',
    'karma',
    'global']

for f in central_js_files:
    java_script(f)

lesson_js = java_script('lesson.js', generated=True)
java_script('vocabulary.js')

div(id='content')
div(id='help')

def register_objects(objects):
    positions = []
    dimensions = []
    names = []
    for o in objects:
        name = o['name']
        image(name, name + '.png')
        audio(name, name + '.wav')
        names.append(name)
        positions.append(o['left'])
        positions.append(o['top'])
        dimensions.append(o['width'])
    f = open(lesson_js.dest_path(), 'w')
    print >>f, 'var lesson_data = {'
    print >>f, '    objectPosition:', positions, ','
    print >>f, '    objectDimension:', dimensions, ','
    print >>f, '    imgNames:', names
    print >>f, '};'

for x in ['correct', 'incorrect', 'trigger']:
    audio(x, x + '.ogg')

