lesson(grade=2, subject='English', title='Vocabulary Objects', week=5)

include('../../templates/vocabulary/description.py')

animals = [
    dict(name='bag', left=650, top=287, width=110),
    dict(name='bench', left=622, top=553, width=154),
    dict(name='book', left=906, top=287, width=110),
    dict(name='brush', left=110, top=287, width=145),
    dict(name='desk', left=385, top=553, width=110),
    dict(name='kite', left=130, top=553, width=105),
    dict(name='ladder', left=890, top=553, width=150),
    dict(name='soap', left=379, top=650, width=120)]

register_objects(animals)

image('vocabImg.jpg')
