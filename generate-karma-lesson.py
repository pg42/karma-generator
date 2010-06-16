#! /usr/bin/env python2.6

import sys
import time
from optparse import OptionParser

sys.path.append('markup-1.7')
import markup

argv0 = sys.argv[0]
now = time.strftime("%Y/%m/%d %H:%M:%S", time.localtime())

debug = True # doesn't do anything yet
theLesson = None

# TBD: provide a debug and optimized (minimized) version of the framework files.

framework_js_files = [
    {'name':'jquery',
     'file':'../js/jquery-1.4.js'},
    {'name':'jquery-ui',
     'file':'../js/ui.core-draggable-resizable-dialog.js'},
    {'name':'jquery.svg',
     'file':'../js/jquery.svg.js'},
    {'name':'karma',
     'file':'../js/karma.js'}
    ]

# Kludge: the script argument to markup.Page.init() should be a
# dictionary, but we need to guarantee an order for the scripts.
class Scripts(dict):
    def __init__(self, items):
        self.items = items

    def iteritems(self):
        return self.items

def constantly(x):
    while True:
        yield x

def warning_text():
    return 'This file was generated by %s on %s.\nDo not edit.' % (argv0, now)

# TBD: sort the JavaScript files so that they are in the correct order (e.g.
# jquery before jquery.ui)

class Lesson:
    def __init__(self):
        self.title = ''
        self.java_script_files = []
        self.css_files = []
        self.images = []
        self.audios = []
        self.divs = []

    def print_html_on(self, stream):
        page = markup.page()
        page.init(doctype='<!DOCTYPE html>',
                  css=self.css_files,
                  title=self.title,
                  script=Scripts(zip(self.java_script_files,
                                     constantly('text/javascript'))))
        [page.addheader('<!-- %s -->' % c) for c in warning_text().split('\n')]
        for div in self.divs:
            page.div('', id=div['id'])
        print >>stream, page

    def print_css_on(self, stream):
        print >>stream, '/*'
        for l in warning_text().split('\n'):
            print >>stream, ' *', l
        print >>stream, ' */'
        for div in self.divs:
            print >>stream, '#%s {' % div['id']
            for k,v in div.items():
                if k != 'id':
                    print >>stream, '  %s: %spx;' % (k, v)
            print >>stream, '  border: 1px solid black;'
            print >>stream, '  position: absolute;'
            print >>stream, '}'

    def dump_css(self):
        self.print_css_on(sys.stdout)

    def dump_html(self):
        self.print_html_on(sys.stdout)

    def dump(self):
        print 'java_script_files:', self.java_script_files
        print 'css_files:', self.css_files
        print 'images:', self.images
        print 'audios:', self.audios
        print 'divs:', self.divs
    

def title(name):
    theLesson.title = name


def java_script(name):
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


def div(**info):
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
#     theLesson.dump_html()
#     theLesson.dump_css()
    theLesson.print_html_on(open('index.html', 'w'))
    theLesson.print_css_on(open('css/divs.css', 'w'))
