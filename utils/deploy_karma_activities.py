#!/usr/bin/env python

import os
import re
import subprocess
import tempfile

def deploy_karma_activities():
    url = 'git://git.olenepal.org/karma-generator/karma-generator.git'
    work_dir = tempfile.mkdtemp(prefix='karma-generator-release-')

    os.system('git clone %s %s' % (url, work_dir))
    os.chdir(work_dir)
    os.system('./generate-karma-lesson.py -a')

    def tag_to_release_number(string):
        match = re.match('RELEASE-(\\d+)', string)
        if match:
            return int(match.group(1))

    def largest_release_number():
        tags = subprocess.Popen('git tag -l \'RELEASE-*\'',
                                shell=True,
                                stdout=subprocess.PIPE)
        lines = tags.stdout.readlines()
        return max([0] + map(tag_to_release_number, lines))

    def tag_release():
        new_release_number = largest_release_number() + 1
        os.system('git tag -a -m release RELEASE-%s' % new_release_number)

    tag_release()
    os.system('git push --tags')
