#! /usr/bin/env python2.6
# -*- coding: utf-8 -*-

from html import HtmlDocument
import codecs
import os
import shutil
import string
import sys
import time
from optparse import OptionParser


argv0 = sys.argv[0]
now = time.strftime("%Y/%m/%d %H:%M:%S", time.localtime())
warning_text_lines = ['This file was generated by %s on %s.' % (argv0, now),
                      'Do not edit.',
                      'cwd: %s' % os.getcwd(),
                      'command: %s' % ' '.join(sys.argv)]


debug = True # TBD: doesn't do anything yet
theLesson = None

# TBD: provide a debug and optimized (minimized) version of the framework files.

karma_root = os.path.abspath(os.path.dirname(argv0))


class KarmaFile():
    def __init__(self, name, karma_path):
        self._name = name
        self._karma_path = karma_path

    def name(self):
        return self._name

    def relative_path(self, start):
        return os.path.relpath(os.path.join(karma_root, self._karma_path),
                               start)

    def make_available(self):
        pass


class GeneratedFile():
    def __init__(self, lesson, name):
        self.lesson = lesson
        self.name = name
        self.data = ''

    def write(self, x):
        self.data = self.data + x

    def relative_path(self, start):
        return os.path.relpath(self.absolute_path(), start)

    def absolute_path(self):
        return os.path.join(self.lesson.directory, 'js', self.name)

    def make_available(self):
        f = open(self.absolute_path(), 'w')
        print >>f, self.data
        f.close()


class File():
    def __init__(self, lesson, path):
        self._lesson = lesson
        self._name = os.path.basename(path)
        self.src = frob_path(path)
        self.dest = destination_path(self._name)

    def src_path(self):
        return self.src

    def relative_path(self, start):
        return os.path.relpath(self.absolute_path(), start)

    def absolute_path(self):
        return os.path.join(self._lesson.directory, self.dest)

    def make_available(self):
        if self.src_path() != self.absolute_path():
            check_file_exists(self.src_path())
            shutil.copy(self.src_path(), self.absolute_path())


class AssetFile():
    def __init__(self, lesson, path, name):
        self._lesson = lesson
        self._name = name
        self._path = absolute_path(path)
        check_file_exists(self._path)

    def name(self):
        return self._name

    def preload(self):
        return self._name != None

    def relative_path(self, start):
        return os.path.relpath(self.absolute_path(), start)

    def absolute_path(self):
        return os.path.join(self._lesson.directory,
                            self.dest_dir(),
                            self.basename())

    def make_available(self):
        shutil.copy(self._path, self.absolute_path())

    def dest_dir(self):
        assert(False)

    def basename(self):
        return os.path.basename(self._path)


class ImageFile(AssetFile):
    def __init__(self, lesson, path, name=None):
        AssetFile.__init__(self, lesson, path, name)

    def dest_dir(self):
        return 'assets/image'


class AudioFile(AssetFile):
    def __init__(self, lesson, path, name):
        AssetFile.__init__(self, lesson, path, name)

    def dest_dir(self):
        return 'assets/audio'


karma_java_script_files = [
    KarmaFile('jquery', 'js/jquery-1.4.2.js'),
    KarmaFile('jquery-ui', 'js/jquery-ui-1.8.2.js'),
    KarmaFile('ui.core', 'js/ui.core.js'),
    KarmaFile('ui.draggable', 'js/ui.draggable.js'),
    KarmaFile('ui.droppable', 'js/ui.droppable.js'),
    KarmaFile('jquery.watermarkinput', 'js/jquery.watermarkinput.js'),
    KarmaFile('ui.scoreboard', 'js/ui.scoreboard.js'),
    KarmaFile('jquery.svg', 'js/jquery.svg.js'),
    KarmaFile('karma', 'js/karma.js'),
    KarmaFile('global', 'js/global.js')
    ]


karma_css_files = [
    KarmaFile('global', 'css/global.css'),
    KarmaFile('ui.scoreboard', 'css/ui.scoreboard.css')
    ]

favicon = KarmaFile('favicon', 'image/favicon.ico')
title_block_lt = KarmaFile('title_block_lt', 'image/title_block_lt.png')
title_block_rt = KarmaFile('title_block_rt', 'image/title_block_rt.png')


#TBD: factor this out in a separate file, so it is easy to provide
#     your own header/footer
#TBD: make header/footer customizable
def generate_header(dir, body, title):
    header = body.div(id='header')

    header.div(id='topbtn_left').div(id='linkBackLesson',
                                     title='Back',
                                     className='linkBack')

    lesson_title = header.div(id='lesson_title')
    lesson_title.img(src=string.replace(title_block_lt.relative_path(dir), '\\', '/'),
                     width=33, height=75, align='absmiddle')
    lesson_title.text(title)
    lesson_title.img(src=string.replace(title_block_rt.relative_path(dir), '\\', '/'),
             width=33, height=75, align='absmiddle')


    header.div(id='topbtn_right').div(title='Help', id='linkHelp')

    # TBD: twice the id topbtn_right?
    header.div(id='topbtn_right').div(title=u'साझा शिक्षा ई-पाटी द्वारा निर्मित',
                                      id='linkOle')


gFooterConfiguration = dict(link_previous=True,
                            link_next=True,
                            scoreboard=False)


def generate_footer(body):
    footer = body.div(id='footer')

    if gFooterConfiguration['link_next']:
        footer.div(title='Next', id='linkNextLesson', className='linkNext')
    if gFooterConfiguration['link_previous']:
        footer.div(title='Previous', id='linkPrevLesson', className='linkBack')
    if gFooterConfiguration['scoreboard']:
        footer.div(id='score_box', display='none')

    footer.div(className='botbtn_right').div(title='Play Again', id='linkPlayAgain')
    footer.div(className='botbtn_right').div(title='Start', id='linkStart')


def destination_path(name):
    dirs = {'.js':'js',
            '.css':'css'}
    ext = os.path.splitext(name)[1]
    if ext not in dirs:
        print 'Don\'t know how to handle', name
        sys.exit(1)
    return os.path.join(dirs[ext], name)


def absolute_path(path):
    if os.path.isabs(path):
        return os.path.normpath(path)
    else:
        # paths are relative to the file in which they occur.
        return os.path.normpath(os.path.join(os.path.dirname(include_stack[-1]),
                                             path))


def topological_sort(nodes, dependencies, key):
    """Sort nodes topologically according to dependencies.
    A dependency is a tuple (key(earlier_node), key(later_node)),
    meaning that earlier_node should come before later_node in the
    result."""
    from collections import deque
    successors = {}
    predecessor_count = {}
    node_map = {}
    for node in nodes:
        k = key(node)
        node_map[k] = node
        successors[k] = []
        predecessor_count[k] = 0
    for (dep0, dep1) in dependencies:
        if dep0 in node_map and dep1 in node_map:
            successors[dep0].append(dep1)
            predecessor_count[dep1] = predecessor_count[dep1] + 1
    next = deque()
    for k,v in successors.items():
        if predecessor_count[k] == 0:
            next.append(k)
    result = []
    while len(next) != 0:
        k = next.popleft()
        result.append(node_map[k])
        for successor in successors[k]:
            predecessor_count[successor] = predecessor_count[successor] - 1
            if predecessor_count[successor] == 0:
                next.append(successor)
    if len(result) != len(nodes):
        print 'Error: dependency loop.'
        sys.exit(1)
    return result


java_script_dependencies = [
    ('jquery', 'jquery-ui'),
    ('jquery', 'ui.core'),
    ('ui.core', 'ui.draggable'),
    ('ui.core', 'ui.droppable'),
    ('jquery', 'jquery.watermarkinput'),
    ('ui.core', 'ui.scoreboard'),
    ('jquery', 'jquery.svg')
    ]


def sort_java_script_files(files):
    karma_files = filter(lambda x: isinstance(x, KarmaFile), files)
    other_files = filter(lambda x: not isinstance(x, KarmaFile), files)
    result = topological_sort(karma_files,
                              java_script_dependencies,
                              lambda x: x.name()) + other_files
    return result


class Lesson:
    def __init__(self):
        self.parent_directory = None
        self.directory = None
        self.title = ''
        self.lesson_title = ''
        self.java_script_files = []
        self.css_files = []
        self.image_files = []
        self.audio_files = []
        self.divs = []

        self.java_script_files.append(GeneratedFile(self, 'lesson-karma.js'))

    def copy_files(self):
        def create_dir(d):
            if not os.path.exists(d):
                os.makedirs(d)
        create_dir(self.directory)
        os.chdir(self.directory)
        map(create_dir, ['css', 'js', 'assets/image', 'assets/audio', 'assets/video'])
        
        for f in self.java_script_files + self.css_files:
            f.make_available()
        for f in self.image_files + self.audio_files:
            f[1].make_available()

    def set_directory(self, dir):
        self.directory = os.path.abspath( os.path.join(self.parent_directory, dir) )
            
    def print_html_on(self, stream):
        doc = HtmlDocument()
        for line in warning_text_lines:
            doc.comment(line)
        html = doc.html()
        head = html.head()
        head.title().text(self.title)
        head.meta(content='text/html, charset=utf-8', httpEquiv='Content-Type')
        for file in self.css_files:
            head.link(type='text/css',
                      rel='stylesheet',
                      href=string.replace(file.relative_path(self.directory), '\\', '/'))
        head.link(type='image/ico',
                  rel='icon',
                  href=string.replace(favicon.relative_path(self.directory), '\\', '/'))
        for file in sort_java_script_files(self.java_script_files):
            head.script(type='text/javascript',
                        src=string.replace(file.relative_path(self.directory), '\\', '/'))
        body = html.body()
        generate_header(self.directory, body, self.lesson_title)
        for div in self.divs:
            body.div(id=div['id'])
        generate_footer(body)
        doc.print_on(stream)

    def print_css_on(self, stream):
        print >>stream, '/*'
        for l in warning_text_lines:
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
        for l in warning_text_lines:
            print >>stream, ' *', l
        print >>stream, ' */'
        def format_image(img):
            return "{name:'%s', file:'%s'}" % (img[0], img[1].basename())
        def format_audio(a):
            return "{name:'%s', file:'%s'}" % (a[0], a[1].basename())
        def format_assets(name, assets, format_asset, indentation):
            prefix = '%s: [' % name
            sep = ',\n' + (len(prefix) + indentation) * ' '
            postfix = ']'
            to_preload = filter(lambda asset: asset[1].preload(), assets)
            return prefix + sep.join(map(format_asset, to_preload)) + postfix
        print >>stream, 'function lesson_karma() {'
        return_karma = '    return Karma({'
        indentation = len(return_karma)
        print >>stream, return_karma + (',\n' + indentation * ' ').join(
            [format_assets('image',
                           self.image_files,
                           format_image,
                           indentation),
             format_assets('audio',
                           self.audio_files,
                           format_audio,
                           indentation)]) + '});'
        print >>stream, '}'

def lesson(grade, subject, title, week, browser_title=None, lesson_title=None):
    def camelcase(str):
        words = str.replace("'", '').split()
        return ''.join([words[0].lower()] + [x.capitalize() for x in words[1:]])

    dirname = '%s_%s_%s_%s_K' % (grade, subject, camelcase(title), week);
    theLesson.set_directory( dirname )
    theLesson.lesson_title = lesson_title or title
    theLesson.title = browser_title or 'Class %s %s %s' % (grade, subject, title)


def resolve_karma_file(name, karma_files, **kw):
    for f in karma_files:
        if f.name() == name:
            return f
    return File(theLesson, name, **kw)


def java_script(name, **kw):
    result = None
    if 'generated' in kw and kw['generated']:
        result = GeneratedFile(theLesson, name)
    else:
        result = resolve_karma_file(name, karma_java_script_files, **kw)
    theLesson.java_script_files.append(result)
    return result


def css(name):
    result = resolve_karma_file(name, karma_css_files)
    theLesson.css_files.append(result)
    return result


def image(file, name=None):
    result = ImageFile(theLesson, file, name)
    theLesson.image_files.append([name, result])
    return result


def audio(file, name):
    result = AudioFile(theLesson, file, name)
    theLesson.audio_files.append([name, result])
    return result


def div(**info):
    theLesson.divs.append(info)


def footer_configuration(**kw):
    global gFooterConfiguration
    for k,v in kw.items():
        if not k in gFooterConfiguration:
            print 'Error: unsupported footer configuration option: ' + k + '.'
            print 'Possible options:', ', '.join(gFooterConfiguration.keys())
            sys.exit(1)
        gFooterConfiguration[k] = v
    if gFooterConfiguration['scoreboard']:
        css('ui.scoreboard')
        java_script('ui.scoreboard')
        java_script('../../js/scoreboard.js') #TBD: fix path


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
    check_file_exists(path)
    execfile(path, globals())
    include_stack.pop()


def add_help():
    help_path = os.path.join(os.path.dirname(include_stack[-1]),
                             'help.png')
    if (os.path.exists(help_path)):
        div(id='help')
        image('help.png')
    else:
        print 'Warning: the file ' + str(help_path) + ' doesn\'t exist.'


def check_file_exists(path):
    if not os.path.isfile(path):
        print 'Error: the file ' + path + ' doesn\'t exist.'
        sys.exit(1)
    

if __name__ == '__main__':
    parser = OptionParser(usage="Usage: %prog [options] file")
    parser.add_option('-d', '--debug', dest='debug', default=True,
                      help='use non-minimized JavaScript libraries')
    parser.add_option('-o', '--output', dest='output',
                      help='use output as a destination directory')
    parser.add_option('-k', '--karma', dest='karma',
                      help='DEPRECATED - path to the karma directory')
    (options, args) = parser.parse_args()
    debug = options.debug
    if not args:
        print 'Specify a file as an argument.'
        parser.print_help()
        sys.exit(1)

    if options.karma:
        print "WARNING: 'karma' option (-k, --karma) is deprecated and no longer needed"

    description = os.path.abspath(args[0])

    theLesson = Lesson()
    if options.output:
        theLesson.parent_directory = os.path.abspath(options.output)

	java_script('jquery')
    include_stack.append(description)
    add_help()
    check_file_exists(description)
    execfile(description)
    include_stack.pop()

    theLesson.copy_files()
    theLesson.print_html_on(codecs.open('index.html', 'w', 'UTF-8'))
    theLesson.print_css_on(open('css/divs.css', 'w'))
    theLesson.print_karma_js_on(open('js/lesson-karma.js', 'w'))
