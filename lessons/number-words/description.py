﻿lesson(grade=2, subject='English', title= 'Number Words', week=14,
    summary=u'सङ्ख्याहरू गन्ने र तीनका हिज्जे सिक्ने क्रियाकलाप')

css('global')
css('lesson.css')

for f in ['ui.core']:
    java_script(f)

audio('en_correct.ogg', 'correct')
audio('en_incorrect.ogg', 'incorrect')

image('football.png', 'football')
image('gameOver.png', 'gameOver')


