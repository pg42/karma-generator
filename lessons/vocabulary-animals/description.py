lesson(grade=6, subject='English', title='Vocabulary Animals', week=4,
       lesson_title='Vocabulary: Animals')

animals = ['cheetah',
           'crocodile',
           'dinosaur',
           'giraffe',
           'kangaroo',
           'octopus',
           'panda',
           'rhinoceros',
           'whale',
           'zebra']

css('global')
css('lesson.css')

for f in ['ui.core',
          'ui.draggable',
          'ui.droppable',
          'jquery.clickable']:
    java_script(f)

objects_js = java_script('objects.js', generated=True)

print >>objects_js, 'var objects = ['
print >>objects_js, '   ' + ',\n   '.join(["'%s'" % x for x in animals])
print >>objects_js, '];'

java_script('lesson.js')

for animal in animals:
    image(animal + '.png', animal)
    audio(animal + '.ogg', animal)

audio('correct.ogg', 'correct')
audio('incorrect.ogg', 'incorrect')

image('volImage.png')
