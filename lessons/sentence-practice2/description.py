lesson(grade=6, subject='English', title='Sentence Practice2', week=12,
    browser_title='Class 6 English Sentence Practice 2',
    lesson_title='Sentence Practice || Part 2',
    summary=u'सही शब्दहरू प्रयोग गरेर वाक्य बनाउन सिक्ने क्रियाकलाप')

css('global')
css('lesson.css')

for f in ['ui.draggable',
          'ui.droppable',
          'ui.position',
          'jquery.clickable']:
    java_script(f)

image('main.png', 'main')
