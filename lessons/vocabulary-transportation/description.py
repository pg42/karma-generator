lesson(grade=2, subject='English', title='Vocabulary Transportation', week=9,
    summary=u'केही यातायातका साधनका नाम सिक्ने क्रियाकलाप')

include('../../templates/vocabulary/description.py')

animals = [
    dict(name='ship', left=125, top=100, width=105),
    dict(name='airplane', left=630, top=70, width=200),
    dict(name='boat', left=940, top=195, width=110),
    dict(name='bus', left=15, top=395, width=100),
    dict(name='tempo', left=400, top=375, width=150),
    dict(name='truck', left=680, top=375, width=140),
    dict(name='bicycle', left=195, top=590, width=175),
    dict(name='cart', left=1000, top=540, width=105)]

register_objects(animals)

image('vocabImg.jpg')
