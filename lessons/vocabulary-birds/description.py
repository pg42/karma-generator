lesson(grade=2, subject='English', title='Vocabulary Birds', week=11)

include('../../templates/vocabulary/description.py')

animals = [
    dict(name='crow', left=465, top=69, width=130),
    dict(name='parrot', left=943, top=115, width=150),
    dict(name='eagle', left=72, top=249, width=140),
    dict(name='pigeon', left=820, top=330, width=165),
    dict(name='mynah', left=475, top=405, width=170),
    dict(name='owl', left=910, top=425, width=95),
    dict(name='egret', left=275, top=553, width=130),
    dict(name='sparrow', left=777, top=581, width=200)]

register_objects(animals)

image('vocabImg.jpg')
