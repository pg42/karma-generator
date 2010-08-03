lesson(grade=6, subject='English', title='Sentence Practice2', week=12,
       browser_title='Class 6 English Sentence Practice 2',
       lesson_title='Sentence Practice || Part 2')

css('global')
css('lesson.css')

for f in ['ui.draggable',
          'ui.droppable',
          'ui.position',
          'jquery.clickable']:
    java_script(f)

audio('en_correct.ogg', 'correct')
audio('en_incorrect.ogg', 'incorrect')

image('main.png', 'main')
