css('global')

central_js_files = [
    'ui.core',
    'karma',
    '../../js/common.js']

for f in central_js_files:
    java_script(f)

java_script('identification.js')
css('identification.css')

div(id='content')

for name in ['correct', 'incorrect']:
    image(name, name + '.png')

for name in ['optionBorder', 'optionBorderHover', 'listenAgain']:
    image(name, name + '.png', preload=False)

audio('correct', 'en_correct.ogg')
audio('incorrect', 'en_incorrect.ogg')

def quote(x):
    return "'%s'" % x

lesson_js = java_script('lesson.js', generated=True)

def register_things(things):
    for thing in things:
        image(thing, thing + '.png')
        audio(thing, thing + '.wav')
    f = open(lesson_js.dest_path(), 'w')
    print >>f, 'var things = [' + ', '.join([quote(x) for x in things]) + '];'
    f.close()

footer_configuration(link_next=False, link_previous=False, scoreboard=True)
