css('global')
css('ui.scoreboard')
css('what-is-this.css')

footer_configuration(link_previous=False, link_next=False)

central_js_files = [
    'jquery',
    'ui.core',
    'ui.scoreboard',
    'karma',
    'jquery.watermarkinput',
    '../../js/common.js']

for f in central_js_files:
    java_script(f)

objects_js = java_script('objects.js', generated=True)
java_script('what-is-this.js')

div(id='content')
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
    audio(o, o + '.wav')
    image(o, o + '.png')

image('ladybird', 'ladybird.png')
image('ant', 'ant.png')

f = open(objects_js.dest_path(), 'w')
print >>f, 'objects = [%s];' % (', '.join(["'%s'" % o for o in objects]))
f.close()

audio('correct', 'correct.ogg')
audio('incorrect', 'incorrect.ogg')
