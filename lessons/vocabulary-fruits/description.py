lesson(grade=2, subject='English', title='Vocabulary Fruits', week=10,
    summary=u'केही फलफूलहरूका नाम सिक्ने क्रियाकलाप')

include('../../templates/vocabulary/description.py')

fruits = [
    dict(name='banana', left=100, top=290, width=157),
    dict(name='peach', left=373, top=285, width=129),
    dict(name='mango', left=624, top=287, width=150),
    dict(name='apple', left=906, top=287, width=115),
    dict(name='papaya', left=100, top=553, width=157),
    dict(name='pear', left=385, top=553, width=110),
    dict(name='orange', left=622, top=553, width=154),
    dict(name='grapes', left=890, top=553, width=150)]

register_objects(fruits)

image('vocabImg.jpg', 'vocabImg')
