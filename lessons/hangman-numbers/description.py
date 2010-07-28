lesson(grade=2, subject='English', title='Hangman Numbers', week=9)

include('../../templates/hangman/description.py')

set_number_of_tries(3)

image('hang_man_image.png', 'mainImage')
image('one_or_more_kitchen_utensils.png', 'kitchen')

css('lesson.css')
