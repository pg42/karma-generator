# -*- coding: utf-8 -*-
lesson(grade=6, subject='English', title='Hangman City Names', week=2,
    lesson_title=u'Names of Cities Of Nepal || नेपालको सहरहरुको नाम चिन',
    summary=u'नेपालका विभिन्न शहरका नामहरू सिक्ने क्रियाकलाप')

include('../../templates/hangman/description.py')

set_number_of_tries(7)

css('lesson.css')

image('footer_hangman.png')

