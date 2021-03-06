﻿lesson(grade=2, subject='English', title='FOOD', week=16,
    summary=u'केही खानेकुराका नामहरू सिक्ने क्रियाकलाप')

include('../../templates/vocabulary/description.py')

foods = [
    dict(name='rice', left=130, top=260, width=95),
    dict(name='daal', left=387, top=260, width=105),
    dict(name='sweet', left=630, top=260, width=130),
    dict(name='jelly', left=906, top=260, width=110),
    dict(name='bread', left=115, top=530, width=115),
    dict(name='bun', left=392, top=530, width=134),
    dict(name='cake', left=643, top=530, width=115),
    dict(name='ice-cream', left=857, top=530, width=210)]

register_objects('Click on each food item and listen', foods)

image('vocabImg.jpg')
css('lesson.css')
