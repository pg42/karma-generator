# -*- coding: utf-8 -*-
lesson(grade=2, subject='Maths', title='Counting Sheep', week=2,
       lesson_title=u'क्रमिक जोड')

css('global')
css('lesson.css')

for f in ['ui.core',
          'ui.draggable',
          'ui.droppable',
          'karma',
          '../../js/common.js',
          'lesson.js']:
    java_script(f)

image('background.jpg')
image('rubbish.png', 'rubbish')
image('rubbish_open.png', 'rubbish_open')
image('shadow.png', 'shadow')
image('sheep1.png', 'sheep1')
image('sheep2.png', 'sheep2')
image('sheep3.png', 'sheep3')
image('title.png', 'title')

div(id='content')

