# -*- coding: utf-8 -*-
lesson(grade=2, subject='Maths', title='ADDING UP TO TEN', week=4,
     browser_title='Adding up to 10',
    lesson_title=u'दससम्मको जोड',
    summary=u'दससम्मको जोड गर्न सिकाउने क्रियाकलाप')
    


css('global')
css('lesson.css')

for f in ['ui.core',
          'jquery.clickable']:
    java_script(f)


audio('byebye.ogg', 'byebye')

image('background.jpg')

footer_configuration(link_next=False, link_previous=False, scoreboard=True)
