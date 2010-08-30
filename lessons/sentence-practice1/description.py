lesson(grade=6, subject='English', title='SENTENCE PRACTICE I', week=12,
    browser_title='Sentence Practice I',
    lesson_title='Sentence Practice I',
    summary=u'सही शब्दहरू प्रयोग गरेर वाक्य बनाउन सिक्ने क्रियाकलाप')

css('global')
css('lesson.css')

for f in ['ui.core',
          'multiple-choice']:
    java_script(f)

for x in 'abcd':
    image(x + '.png', x)

image('main.png', 'main')

image('correct.png', 'correct')
image('wrong.png', 'incorrect')


footer_configuration(link_next=True, link_previous=False, scoreboard=True)
