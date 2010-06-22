#! /usr/bin/env python2.6
# -*- coding: utf-8 -*-

import codecs
import os
import shutil
import sys
import time
from optparse import OptionParser

sys.path.append(sys.path[0] + '/markup-1.7')
import markup

argv0 = sys.argv[0]
now = time.strftime("%Y/%m/%d %H:%M:%S", time.localtime())

warning_text = 'This file was generated by %s on %s.\nDo not edit.\ncwd: %s\ncommand: %s' % (argv0, now, os.getcwd(), ' '.join(sys.argv))


debug = True # TBD: doesn't do anything yet
theLesson = None

# TBD: provide a debug and optimized (minimized) version of the framework files.

# TBD
karma_root = os.path.abspath(os.path.expanduser('~/projects/karma/karma'))

def karma_path(path):
    return os.path.abspath(os.path.join(karma_root, path))

framework_js_files = [
    dict(name='jquery',
         file=karma_path('js/jquery-1.4.js')),
    dict(name='jquery-ui',
         file=karma_path('js/ui.core-draggable-resizable-dialog.js')),
    dict(name='ui.core',
         file=karma_path('js/ui.core.js')),
    dict(name='ui.draggable',
         file=karma_path('js/ui.draggable.js')),
    dict(name='ui.droppable',
         file=karma_path('js/ui.droppable.js')),
    dict(name='jquery.svg',
         file=karma_path('js/jquery.svg.js')),
    dict(name='karma',
         file=karma_path('js/karma.js')),
    dict(name='global',
         file=karma_path('js/global.js'))
    ]

#TBD: get rid of markup library

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


#TBD: factor this out in a separate file, so it is easy to provide
#     your own header/footer
#TBD: make header/footer customizable
def generate_header(page, title):
    page.div(id='header')
   
    page.div(id='topbtn_left')
    page.div('',id='linkBackLesson', title='Back', class_='linkBack')
    page.div.close()

    page.div(id='lesson_title')
    page.img(src=karma_root + '/assets/image/title_block_lt.png',
             width=33, height=75, align='absmiddle')
    page.add(title)
    page.img(src=karma_root + '/assets/image/title_block_rt.png',
             width=33, height=75, align='absmiddle')
    page.div.close()
 

    page.div(id='topbtn_right')
    page.div('', title='Help', id='linkHelp')
    page.div.close()

    page.div(id='topbtn_right')
    page.div('', title=u'साझा शिक्षा ई-पाटी द्वारा निर्मित', id='linkOle')
    page.div.close()
    
    page.div.close()


def generate_footer(page):
    page.div(id='footer')

    page.div('', title='Next', id='linkNextLesson', class_='linkNext')
    page.div('', title='Previous', id='linkPrevLesson', class_='linkBack')

    page.div(id='botbtn_right')
    page.div('',title='Play Again', id='linkPlayAgain')
    page.div.close()

    page.div(id='botbtn_right')
    page.div('', title='Start', id='linkStart')
    page.div.close()

    page.div.close()


def page_to_unicode(page):
    if page._full and (page.mode == 'strict_html' or page.mode == 'loose_html'):
        end = ['</body>', '</html>']
    else:
        end = []
    return page.separator.join(page.header + page.content + page.footer + end)


def destination_path(name):
    images_dir = 'assets/image'
    sounds_dir = 'assets/audio'
    dirs = {'.js':'js',
            '.css':'css',
            '.png':images_dir,
            '.jpg':images_dir,
            '.jpeg':images_dir,
            '.ogg':sounds_dir,
            '.wav':sounds_dir}
    ext = os.path.splitext(name)[1]
    if ext not in dirs:
        print 'Don''t know how to handle', name
        sys.exit(1)
    return os.path.join(dirs[ext], name)


class File:
    def __init__(self, path, framework=False, generated=False, preload=True):
        self.name_ = os.path.basename(path)
        self.copy = not framework and not generated
        self.preload = preload
        
        if self.copy:
            self.src = frob_path(path)
        if not framework:
            self.dest = destination_path(self.name_)
        else:
            self.dest = path

    def name(self):
        return self.name_

    def src_path(self):
        return self.src

    def dest_path(self):
        return os.path.relpath(self.dest)

    def copy_if_needed(self):
        if self.copy and self.src_path() != self.dest_path():
            shutil.copy(self.src_path(), self.dest_path())


# TBD: sort the JavaScript files so that they are in the correct order (e.g.
# jquery before jquery.ui)

class Lesson:
    def __init__(self):
        self.directory = None
        self.title = ''
        self.lesson_title = ''
        self.java_script_files = []
        self.css_files = []
        self.images = []
        self.audios = []
        self.divs = []

        self.java_script_files.append(File('lesson-karma.js', generated=True))

    def copy_files(self):
        for f in self.java_script_files + self.css_files:
            f.copy_if_needed()
        for f in self.images + self.audios:
            f[1].copy_if_needed()

    def print_html_on(self, stream):
        page = markup.page()
        page.init(doctype='<!DOCTYPE html>',
                  css=[f.dest_path() for f in self.css_files],
                  title=self.title,
                  charset='utf-8',
                  script=Scripts(zip([f.dest_path() for f in self.java_script_files],
                                     constantly('javascript'))))
        [page.addheader('<!-- %s -->' % c) for c in warning_text.split('\n')]
        generate_header(page, self.lesson_title)
        for div in self.divs:
            page.div('', id=div['id'])
        generate_footer(page)
        print >>stream, page_to_unicode(page)

    def print_css_on(self, stream):
        print >>stream, '/*'
        for l in warning_text.split('\n'):
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

    def print_karma_js_on(self, stream):
        print >>stream, '/*'
        for l in warning_text.split('\n'):
            print >>stream, ' *', l
        print >>stream, ' */'
        def format_image(img):
            return "{name:'%s', file:'%s'}" % (img[0], img[1].name())
        def format_audio(a):
            return "{name:'%s', file:'%s'}" % (a[0], a[1].name())
        def format_assets(name, assets, format_asset):
            prefix = '    %s: [' % name
            sep = ',\n' + len(prefix) * ' '
            postfix = ']'
            to_preload = filter(lambda asset: asset[1].preload, assets)
            return prefix + sep.join(map(format_asset, to_preload)) + postfix
        print >>stream, 'function lesson_karma() {'
        print >>stream, '  return Karma({'
        print >>stream, ',\n'.join([format_assets('image',
                                                  self.images,
                                                  format_image),
                                    format_assets('audio',
                                                  self.audios,
                                                  format_audio)]) + '});'
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


def lesson_title(name):
    theLesson.lesson_title = name


def resolve_framework_file(name, framework_files, **kw):
    for f in framework_files:
        if f['name'] == name:
            return File(f['file'], framework=True, **kw)
    return File(name, **kw)


def java_script(name, **kw):
    result = resolve_framework_file(name, framework_js_files, **kw)
    theLesson.java_script_files.append(result)
    return result


framework_css_files = [
    dict(name= 'global',
         file=karma_path('css/global.css'))]


def css(name):
    result = resolve_framework_file(name, framework_css_files)
    theLesson.css_files.append(result)
    return result


def image(name, file, **kw):
    result = File(file, **kw)
    theLesson.images.append([name, result])
    return result


def audio(name, file):
    result = File(file)
    theLesson.audios.append([name, result])
    return result


def div(**info):
    theLesson.divs.append(info)


include_stack = []


def frob_path(path):
    if not os.path.isabs(path):
        return os.path.normpath(os.path.join(os.path.dirname(include_stack[-1]),
                                             path))
    else:
        return os.path.abspath(path)


def include(path):
    path = frob_path(path)
    include_stack.append(path)
    execfile(path, globals())
    include_stack.pop()


def directory(dir):
    if not theLesson.directory:
        theLesson.directory = dir
        create_directories(dir)


def create_directories(destination_dir):
    def create_dir(d):
        if not os.path.exists(d):
            os.makedirs(d)
    create_dir(destination_dir)
    os.chdir(destination_dir)
    map(create_dir, ['css', 'js', 'assets/image', 'assets/audio', 'assets/video'])

if __name__ == '__main__':
    parser = OptionParser(usage="Usage: %prog [options] file")
    parser.add_option('-d', '--debug', dest='debug', default=True,
                      help='use non-minimized JavaScript libraries')
    parser.add_option('-o', '--output', dest='output',
                      help='use output as a destination directory')
    (options, args) = parser.parse_args()
    debug = options.debug
    if not args:
        print 'Specify a file as an argument.'
        parser.print_help()
        sys.exit(1)

    description = os.path.abspath(args[0])

    theLesson = Lesson()
    if options.output:
        theLesson.directory = options.output
        create_directories(options.output)

    include_stack.append(description)
    execfile(description)
    include_stack.pop()

    theLesson.copy_files()
    theLesson.print_html_on(codecs.open('index.html', 'w', 'UTF-8'))
    theLesson.print_css_on(open('css/divs.css', 'w'))
    theLesson.print_karma_js_on(open('js/lesson-karma.js', 'w'))
