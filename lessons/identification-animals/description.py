lesson(grade=2, subject='English', title='Animal Identification', week=8,
    summary=u'चित्र हेरेर जनावर चिन्ने क्रियाकलाप')

java_script('configuration.js')

include('../../templates/identification/description.py')

register_things(['cat', 'cow', 'deer', 'dog', 'elephant', 'horse', 'sheep'])
image('background.jpg')
