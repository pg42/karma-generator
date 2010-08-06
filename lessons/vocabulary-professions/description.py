lesson(grade=2, subject='English', title='Vocabulary Professions', week=6,
    summary=u'विभिन्न पेशाहरूका नाम सिक्ने क्रियाकलाप')

include('../../templates/vocabulary/description.py')

items = [
    dict(name='doctor', left=105, top=290, width=145),
    dict(name='farmer', left=622, top=553, width=155),
    dict(name='pilot', left=120, top=553, width=125),
    dict(name='player', left=890, top=553, width=145),
    dict(name='policeman', left=325, top=285, width=225),
    dict(name='soldier', left=625, top=287, width=145),
    dict(name='tailor', left=372, top=553, width=134),
    dict(name='teacher', left=880, top=287, width=160)]

register_objects(items)

image('vocabImg.jpg')
css('lesson.css')