lesson(grade=6, subject='English', title='Sentence Practice1', week=12,
       browser_title='Sentence Practice 1',
       lesson_title='Sentence Practice || Part 1')

css('global')
css('lesson.css')

for f in ['ui.core',
          'karma',
          '../../js/common.js',
          '../../js/multiple-choice.js',
          'lesson.js']:
    java_script(f)

audio('en_correct.ogg', 'correct')
audio('en_incorrect.ogg', 'incorrect')

for x in 'abcd':
    image(x + '.png', x)

image('main.png', 'main')

image('correct.png', 'correct')
image('wrong.png', 'incorrect')


footer_configuration(link_next=True, link_previous=False, scoreboard=True)
