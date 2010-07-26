lesson(grade=2, subject='English', title='What Someone is Doing', week=15,
       lesson_title='What is Someone Doing?')

css('global')
css('lesson.css')

for f in ['ui.core',
          'ui.draggable',
          'ui.droppable',
          'karma',
          '../../js/common.js',
          'lesson.js']:
    java_script(f)


for i in range(1, 16):
    audio('%s.ogg' % i, str(i))
    image('%s.png' % i, str(i))

for i in range(1, 10):
    image('exe%s.png' % i, 'exe%s' % i)

audio('correct.ogg', 'correct')
audio('incorrect.ogg', 'incorrect')
audio('what_is_preeti_doing.ogg', 'what_is_preeti_doing')

image('clickToListen.png', 'clickToListen')
image('volume.png')
