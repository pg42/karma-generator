﻿lesson(grade=2, subject='English', title='BODY PARTS', week=14,
       summary=u'शरीरका केही अङ्गहरुका नाम सिक्ने क्रियाकलाप')

include('../../templates/vocabulary/description.py')

parts = [
    dict(name='ear', left=208, top=75, width=80),
    dict(name='hair', left=870, top=17, width=100),
    dict(name='nose', left=873, top=90, width=115),
    dict(name='arm', left=873, top=188, width=105),
    dict(name='hand', left=175, top=302, width=115),
    dict(name='finger', left=878, top=305, width=142),
    dict(name='knee', left=175, top=440, width=115),
    dict(name='foot', left=868, top=497, width=110)]

register_objects('Click on each word and listen', parts)

image('vocabImg.jpg')
