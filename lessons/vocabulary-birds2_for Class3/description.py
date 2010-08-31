lesson(grade=3, subject='English', title='AVOCABULARY BIRDS', week=4,
    lesson_title='Vocabulary: Birds',
    summary=u'केही चराहरूका नाम सिक्ने क्रियाकलाप')

include('../../templates/vocabulary-with-game/vocabulary-with-game.py')

birds = ['bulbul',
         'crane',
         'egret',
         'kingfisher',
         'ostrich',
         'penguin',
         'swan',
         'swift',
         'vulture',
         'woodpecker'];

java_script('configuration.js')

register_objects(birds)

image('volImage.png')
