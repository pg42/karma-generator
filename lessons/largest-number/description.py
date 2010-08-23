# -*- coding: utf-8 -*-
lesson(grade=2, subject='Maths', title='Largest Number', week=6,
       lesson_title=u'ठूलासाना सङ्ख्याहरू',
       summary=u'ठूलासाना सङ्ख्याहरू चिन्ने क्रियाकलाप')

css('global')
css('lesson.css')

for f in ['ui.core',
          'ui.draggable',
          'ui.droppable']:
    java_script(f)

audio('byebye.ogg', 'byebye')
audio('chhyaa.ogg', 'complain')
audio('GohiEat.ogg', 'eat')
audio('GohilaiMachaInstruction.ogg', 'instruction')

image('background.jpg')
image('fishLeft.png', 'fishLeft')
image('fishRight.png', 'fishRight')
image('gameover.png', 'gameover')
