lesson(grade=2, subject='Maths', title='NUMERIC PUZZLE', week=1,
    lesson_title = u'सङ्ख्याको क्रम',
    summary=u'सङ्ख्याहरूको क्रम मिलाउन सिक्ने क्रियाकलाप')

include('../../templates/puzzle/description.py')

for i in range(1, 4):
    image('img%s.png' % i, 'puzzle%s' % i)

java_script('label-generator.js')
