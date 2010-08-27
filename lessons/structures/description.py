# -*- coding: utf-8 -*-
lesson(grade=2, subject='English', title='STRUCTURES', week=11,
       summary=u'निर्माण संरचनाका नामहरू सिक्ने क्रियाकलाप')

include('../../templates/vocabulary/description.py')

items = [dict(name='house', left=110, top=290, width=135),
         dict(name='roof', left=387, top=285, width=110),
         dict(name='floor', left=640, top=287, width=125),
         dict(name='window', left=875, top=287, width=175),
         dict(name='door', left=120, top=553, width=120),
         dict(name='road', left=372, top=553, width=134),
         dict(name='garden', left=625, top=553, width=150),
         dict(name='wall', left=910, top=553, width=115)]

register_objects('Click on the name of each structure and listen', items)

image('vocabImg.jpg')
