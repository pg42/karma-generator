# -*- coding: utf-8 -*-
lesson(grade=6, subject='Maths', title='Sets', week=6,
    lesson_title=u'समूहको ज्ञान',
    summary=u'समूह छुट्याउन सिकाउने क्रियाकलाप')

for f in ['ui.core',
	  'ui.draggable',
	  'ui.droppable']:
	java_script(f)


for i in ['dragHere','dropHere','dropHere1',
          'fruit1','fruit2','fruit3','fruit4',
          'veg1','veg2','veg3','veg4',
          'other1','other2','other3','other4',]:
	image(i+".png",i)

css('lesson.css')
css('global')
footer_configuration(link_next=True, link_previous=True, scoreboard=True)
