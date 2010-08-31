lesson(grade=2, subject='English', title='CLOTHES', week=15,
       summary=u'केही लुगाहरूका नाम सिक्ने क्रियाकलाप')

include('../../templates/vocabulary/description.py')

items = [
    dict(name='cap', left=138, top=290, width=85),
    dict(name='shirt', left=387, top=285, width=110),
    dict(name='coat', left=650, top=287, width=100),
    dict(name='dress', left=906, top=287, width=120),
    dict(name='skirt', left=120, top=553, width=120),
    dict(name='gloves', left=372, top=553, width=134),
    dict(name='socks', left=639, top=553, width=120),
    dict(name='shoes', left=900, top=553, width=124)]

register_objects('Click on the name of each clothing item and listen', items)

image('vocabImg.jpg')
