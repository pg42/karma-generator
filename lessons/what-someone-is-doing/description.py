lesson(grade=2, subject='English', title='WHAT SOMEONE IS DOING', week=15,
    lesson_title='WHAT SOMEONE IS DOING',
    summary=u'प्रश्न र उत्तर सुन्दै र पढ्दै कसले के गर्दैछ बुझ्ने क्रियाकलाप')

css('global')
css('lesson.css')

for f in ['ui.core',
          'ui.draggable',
          'ui.droppable']:
    java_script(f)


for i in range(1, 16):
    audio('%s.ogg' % i, str(i))
    image('%s.png' % i, str(i))

for i in range(1, 10):
    image('exe%s.png' % i, 'exe%s' % i)

audio('what_is_preeti_doing.ogg', 'what_is_preeti_doing')

image('clickToListen.png', 'clickToListen')
image('volume.png')
