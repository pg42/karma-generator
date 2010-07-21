# -*- coding: utf-8 -*-
lesson(grade=2, subject='Maths', title='Bar Graph', week=16,
       lesson_title=u'ग्राफ')

css('global')
css('lesson.css')

for f in ['ui.core',
          'karma',
          'ui.draggable',
          'ui.droppable',
          '../../js/common.js',
          'lesson.js']:
    java_script(f)


objects = ['ball', 'banana', 'cup', 'flower', 'glass']

objects_js = java_script('objects.js', generated=True)

def quote(x): return '\'{0}\''.format(x)

print >>objects_js, 'var objects = [{0}];'.format(', '.join(map(quote, objects)))

for object in objects:
    image(object + '.png', object)

audio('ne_correct.wav', 'correct')
audio('ne_incorrect.wav', 'incorrect')

div(id='content')
