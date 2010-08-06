﻿lesson(grade=6, subject='English', title='Multiple Choice Action Verb', week=3,
    summary=u'Action verbs को प्रयोग सिकाउने क्रियाकलाप')

css('global')
css('lesson.css')

objects_js = java_script('objects.js', generated=True)

for f in ['ui.core',
          'multiple-choice']:
    java_script(f)


audio('en_correct.ogg', 'correct')
audio('en_incorrect.ogg', 'incorrect')

objects = ['boy',
           'monkey',
           'duck',
           'teacher',
           'man',
           'dog',
           'mother',
           'father',
           'baby',
           'driver']

def quote(x):
    return "'" + x + "'"

print >>objects_js, 'var objects = [%s];' % (', '.join(map(quote, objects)))

for o, i in zip(objects, range(0, len(objects))):
    image(str(i) + '.png', o)

for x in 'abcd':
    image(x + '.png', x)

image('correct.png', 'correct')
image('wrong.png', 'incorrect')


footer_configuration(link_previous=False, link_next=True, scoreboard=True)
