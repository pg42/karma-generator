lesson(grade=2, subject='English', title='Hangman Numbers', week=9,
    summary=u'सङ्ख्या सम्बन्धी प्रश्‍नको उत्तर दिन सिक्ने क्रियाकलाप')

include('../../templates/hangman/description.py')

set_number_of_tries(3)

image('hang_man_image.png', 'mainImage')
image('one_or_more_kitchen_utensils.png', 'kitchen')

css('lesson.css')
