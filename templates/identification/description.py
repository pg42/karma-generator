css('global')

central_js_files = [
    'ui.core',
    'multiple-choice']

for f in central_js_files:
    java_script(f)

css('identification.css')


for name in ['correct', 'incorrect']:
    image(name + '.png', name)

for name in ['optionBorder', 'optionBorderHover', 'listenAgain']:
    image(name + '.png')

audio('correct')
audio('incorrect')
audio('byebye')

def quote(x):
    return "'%s'" % x

lesson_js = java_script('lesson.js', generated=True)

def register_things(things):
    for thing in things:
        image(thing + '.png', thing)
        audio(thing + '.ogg', thing)
    print >>lesson_js, 'var things = [' + ', '.join([quote(x) for x in things]) + '];'

java_script('identification.js')

footer_configuration(link_next=False, link_previous=False, scoreboard=True)
