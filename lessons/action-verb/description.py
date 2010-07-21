lesson(grade=6, subject='English', title='Action Verb', week=3)

data = [
    dict(subject='he',
         actions=[
            dict(key='drinking',
                 sentence='He is drinking water.'),
            dict(key='playing',
                 sentence='He is playing soccer.'),
            dict(key='running',
                 sentence='He is running.'),
            dict(key='walking',
                 sentence='He is walking.')]),
    dict(subject='she',
         actions=[dict(key='reading',
                       sentence='She is reading.'),
                  dict(key='washing',
                       sentence='She is washing clothes.'),
                  dict(key='jumping',
                       sentence='She is jumping.'),
                  dict(key='sitting',
                       sentence='She is sitting.')]),
    dict(subject='it',
         actions=[dict(key='climbing',
                       sentence='It is climbing a tree.'),
                  dict(key='eating',
                       sentence='It is eating a banana.'),
                  dict(key='carrying',
                       sentence='It is carrying a rock.'),
                  dict(key='laughing',
                       sentence='It is laughing.')])
    ]

def generate_actions_js():
    def quote(x):
        return '\'{0}\''.format(x)

    def list_of_strings(strings):
        return '[{0}]'.format(', '.join(map(quote, strings)))

    actions_js = java_script('actions.js', generated=True)

    subjects = [x['subject'] for x in data]
    print >>actions_js, 'var subjects = {0};'.format(subjects)

    def action_item(subject_action):
        actions = [x['key'] for x in subject_action['actions']]
        return '    {0}: {1}'.format(subject_action['subject'],
                                     list_of_strings(actions))

    actions = ',\n'.join(map(action_item, data))
    print >>actions_js, 'var actions = {{\n{0}\n}};\n'.format(actions)

    def words(string):
        return string[:-1].split()

    def action_words(dict):
        return '    {0}: {1}'.format(dict['key'],
                                     list_of_strings(words(dict['sentence'])))

    words = ',\n'.join(map(action_words,
                           sum([x['actions'] for x in data], [])))
    print >>actions_js, 'var words = {{\n{0}\n}};\n'.format(words)

generate_actions_js()

css('global')
css('lesson.css')

audio('en_correct.ogg', 'correct')
audio('en_incorrect.ogg', 'incorrect')

for item in data:
    subject = item['subject']
    image(subject + '.png', subject)
    for action in item['actions']:
        image('%s_%s.png' % (subject, action['key']),
              action['key'])

for x in ['exclamation_point', 'question_mark', 'question_mark2']:
    image(x + '.png', x)

for f in ['ui.core',
          'karma',
          'ui.draggable',
          'ui.droppable',
          '../../js/common.js',
          'lesson.js']:
    java_script(f)

