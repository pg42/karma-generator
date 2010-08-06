lesson(grade=6, subject='English', title='Vocabulary Animals', week=4,
    lesson_title='Vocabulary: Animals',
    summary=u'केही जङ्गली जनावरहरूका नाम सिक्ने क्रियाकलाप')

include('../../templates/vocabulary-with-game/vocabulary-with-game.py')

animals = ['cheetah',
           'crocodile',
           'dinosaur',
           'giraffe',
           'kangaroo',
           'octopus',
           'panda',
           'rhinoceros',
           'whale',
           'zebra']

java_script('configuration.js')

register_objects(animals)

image('volImage.png')
