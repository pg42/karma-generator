﻿lesson(grade=6, subject='English', title='HOW MANY', week=5,
       lesson_title='HOW MANY',
       browser_title='HOW MANY',
       summary=u'How many प्रयोग भएका प्रश्नका उत्तर दिन सिकाउने क्रियाकलाप')

css('global')
css('lesson.css')

for f in ['ui.position',
          'ui.draggable',
          'ui.droppable',
          'jquery.clickable']:
    java_script(f)

for x in ['correct', 'incorrect']:
    image(x + '.png', x)

image('comma.png')
image('dot.png')
image('backImage.png')

for x in ['wild', 'transportation', 'objects']:
    image(x + '.png', x)

for x in ['tiger',
          'elephant',
          'jackal',
          'bear',
          'rhino',
          'monkey',
          'turtle',
          'snake',
          'aeroplane',
          'ship',
          'cart',
          'bus',
          'cycle',
          'boat',
          'tempo',
          'truck',
          'desk',
          'bench',
          'brush',
          'soap',
          'kite',
          'bag',
          'book',
          'ladder']:
    image(x + '.png', x)

footer_configuration(scoreboard=True, link_check_answer=True)
