# -*- coding: utf-8 -*-
lesson(grade=2, subject='Maths', title='Adding Numbers', week=4,
    lesson_title=u'वस्तुहरूको जोड',
    summary=u'दससम्मको जोड गर्न सिकाउने क्रियाकलाप')


css('global')
css('lesson.css')

for f in ['ui.core',
          'jquery.clickable']:
    java_script(f)


audio('byebye.ogg', 'byebye')

image('background.jpg')

footer_configuration(link_next=False, link_previous=False, scoreboard=True)
