lesson(grade=6,subject='English', title='Syllables',week=17)
for f in ['ui.core',
          'karma',
          '../../js/clock.js',
          '../../js/common.js',
          'global',          
          'lesson.js']:
    java_script(f)

for i in ['computer_body.png',
          'computer_base.png',
          'computer_top.png',
          'player_top.png',
          'player_body.png',
          'player_base.png',
          'bgContainer.png']:
    image(i)
css('lesson.css')
css('global')

audio('correct.ogg','correct')
audio('incorrect.ogg','incorrect')
