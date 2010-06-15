#! /usr/bin/env python2.6

import sys
from optparse import OptionParser

debug = True # doesn't do anything yet
theLesson = None

# TBD: provide a debug and optimized (minimized) version of the framework files.

framework_js_files = [
    {'name':'jquery',
     'file':'../js/jquery-1.4.js'},
    {'name':'jquery.ui',
     'file':'../js/ui.core-draggable-resizable-dialog.js'},
    {'name':'jquery.svg',
     'file':'../js/jquery.svg.js'},
    {'name':'karma.js',
     'file':'../js/karma.js'}
    ]

# TBD: sort the JavaScript files so that they are in the correct order (e.g.
# jquery before jquery.ui)

class Lesson:
    def __init__(self):
        self.java_script_files = []
        self.css_files = []
        self.images = []
        self.audios = []
        self.divs = []

    def dump(self):
        print 'java_script_files:', self.java_script_files
        print 'css_files:', self.css_files
        print 'images:', self.images
        print 'audios:', self.audios
        print 'divs:', self.divs


def javaScript(name):
    def filename():
        for f in framework_js_files:
            if f['name'] == name:
                return f['file']
        return 'js/' + name
    theLesson.java_script_files.append(filename())


def css(name):
    theLesson.css_files.append('css/' + name)


def image(name, file):
    theLesson.images.append([name, file])


def audio(name, file):
    theLesson.audios.append([name, file])


def div(info):
    theLesson.divs.append(info)


if __name__ == '__main__':
    parser = OptionParser(usage="Usage: %prog [options] file")
    parser.add_option('-d', '--debug', dest='debug', default=True,
                      help='use non-minimized JavaScript libraries')
    (options, args) = parser.parse_args()
    debug = options.debug
    if not args:
        print 'Specify a file as an argument.'
        parser.print_help()
        sys.exit(1)
    theLesson = Lesson()
    execfile(args[0])
    theLesson.dump()
