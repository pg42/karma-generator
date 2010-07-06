# -*- coding: utf-8 -*-
lesson(grade=6, subject='English', title='Hangman City Names', week=2,
       nepalese_title=u'Names of Cities Of Nepal || नेपालको सहरहरुको नाम चिन')

include('../../templates/hangman/description.py')

set_number_of_tries(7)

java_script('lesson.js')
css('lesson.css')

image('footer_hangman.png')

