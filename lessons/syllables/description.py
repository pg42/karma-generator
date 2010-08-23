lesson(grade=6, subject='English', title='Syllables', week=17,
    summary=u'दुईओटा Syllables मिलेर बनेका शब्दहरू उच्चारण गर्न सिक्ने क्रियाकलाप')

for f in ['ui.core',
          'clock']:
    java_script(f)

for x in ['computer_body',
          'computer_base',
          'computer_top',
          'player_top',
          'player_body',
          'player_base',
          'bgContainer']:
    image(x + '.png', x)

css('lesson.css')
css('global')
