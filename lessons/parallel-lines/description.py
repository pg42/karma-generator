lesson(grade=6, subject='Maths', title='PARALLEL LINES', week=9,
    lesson_title=u'समानान्तर रेखाहरू',
    summary=u'समानान्तर रेखाहरू बुझाउने क्रियाकलाप')

css('global')
css('lesson.css')

for f in ['ui.core',
          'jquery.clickable']:
    java_script(f)

for i in range(0, 10):
    image('ques%s.png' % i, 'ques%s' % i)

for x in ['IntersectLines', 'ParallelLines']:
    image('def%s.png' % x, 'def%s' % x)
    image('img%s.png' % x, 'img%s' % x)
    image('info%s.png' % x, 'info%s' % x)

for x in ['Yes', 'No']:
    image('img%s.png' % x, 'img%s' % x)
    image('defParallel%s.png' % x, 'defParallel%s' % x)

for x in ['correct', 'incorrect']:
    image(x + '.png', x)

image('topText.png', 'topText')

footer_configuration(scoreboard=True)
