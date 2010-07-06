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
    image(name + '.png', name)

for name in ['optionBorder', 'optionBorderHover', 'listenAgain']:
    image(name + '.png')

audio('en_correct.ogg', 'correct')
audio('en_incorrect.ogg', 'incorrect')
audio('byebye.ogg', 'byebye')

def quote(x):
    return "'%s'" % x

lesson_js = java_script('lesson.js', generated=True)

def register_things(things):
    for thing in things:
        image(thing + '.png', thing)
        audio(thing + '.ogg', thing)
    print >>lesson_js, 'var things = [' + ', '.join([quote(x) for x in things]) + '];'

footer_configuration(link_next=False, link_previous=False, scoreboard=True)
