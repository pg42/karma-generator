lesson(grade=6, subject='English', title='Vocabulary Birds', week=4,
       lesson_title='Vocabulary: Birds')

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
