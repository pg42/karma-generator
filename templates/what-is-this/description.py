css('global')
css('what-is-this.css')

footer_configuration(link_previous=False, link_next=False, scoreboard=True)

central_js_files = [
    'ui.core',
    'jquery.watermarkinput']

for f in central_js_files:
    java_script(f)

objects_js = java_script('objects.js', generated=True)
java_script('what-is-this.js')

div(id='gameOver')

objects = [
    'apple',
    'banana',
    'boat',
    'book',
    'bus',
    'cake',
    'car',
    'cow',
    'flower',
    'hat',
    'kite',
    'lamp',
    'pig',
    'pigeon',
    'rat',
    'tomato',
    'tree']

for o in objects:
    audio(o + '.ogg', o)
    image(o + '.png', o)

image('ladybird.png', 'ladybird')
image('ant.png', 'ant')

print >>objects_js, 'objects = [%s];' % (', '.join(["'%s'" % o for o in objects]))

audio('correct')
audio('incorrect')
