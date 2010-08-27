lesson(grade=2, subject='English', title='WILD ANIMALS', week=6,
    summary=u'केही जङ्गली जनावरहरूका नाम सिक्ने क्रियाकलाप')

include('../../templates/vocabulary/description.py')

items = [
    dict(name='snake', left=245, top=32, width=145),
    dict(name='rhino', left=150, top=290, width=135),
    dict(name='elephant', left=525, top=310, width=210),
    dict(name='bear', left=320, top=390, width=115),
    dict(name='monkey', left=74, top=524, width=190),
    dict(name='turtle', left=425, top=564, width=145),
    dict(name='jackal', left=715, top=593, width=145),
    dict(name='tiger', left=940, top=470, width=126)
    ]

register_objects('Click on each word and listen', items)

image('vocabImg.jpg')
