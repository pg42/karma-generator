#! /usr/bin/env python2.6

import json
import sys
import time

argv0 = sys.argv[0]
now = time.strftime("%Y/%m/%d %H:%M:%S", time.localtime())

def print_on(stream, x):
    if isinstance(x, str):
        print >>stream, '&amp'.join(x.split('&'));
    else:
        x.print_on(stream)

class HtmlElement:
    def __init__(self, name):
        self.name = name
        self.children = []
        self.attributes = {}

    def set_attributes(self, dict):
        self.attributes = dict
        return self

    def html(self):
        self.html = HtmlElement('html')
        return self.html

    def append(self, child):
        self.children.append(child)
        return child

    def head(self):
        return self.append(HtmlElement('head'))

    def body(self):
        return self.append(HtmlElement('body'))

    def css(self, path):
        return self.append(HtmlElement('link').set_attributes({'type' : 'text/css',
                                                               'rel' : 'stylesheet',
                                                               'href' : path}))

    def div(self):
        return self.append(HtmlElement('div'))

    def js(self, path):
        return self.append(HtmlElement('script').set_attributes({'type' : 'text/javascript',
                                                                 'src' : path}))

    def title(self, name):
        title = HtmlElement('title')
        title.append(name);
        return self.append(title)

    def print_on(self, stream):
        def attribute_to_string(tuple):
            return tuple[0] + '="' + tuple[1] + '"'

        def attributes_to_string():
            result = ''
            for item in self.attributes.items():
                result += ' ' + attribute_to_string(item)
            return result

        print >>stream, '<' + self.name + attributes_to_string() + '>'
        [print_on(stream, child) for child in self.children]
        print >>stream, '</' + self.name + '>'

class HtmlDocument(HtmlElement):
    def __init__(self):
        HtmlElement.__init__(self, 'html')

    def comment(self, stream, str):
        print >>stream, '<!--', str, '-->'
    
    def print_on(self, stream):
        print >>stream, '<!DOCTYPE html>'
        self.comment(stream, 'This file was generated by %s on %s.' % (argv0, now))
        self.comment(stream, 'Do not edit.')
        HtmlElement.print_on(self, stream)

def create_html(title, css_files, js_files, json_divs):
    doc = HtmlDocument()
    head = doc.head()
    head.title('CSS')
    [head.css(css) for css in css_files]
    [head.js(js) for js in js_files]
    body = doc.body()
    for x in json_divs:
        div = body.div()
        div.set_attributes({'id' : x['id']})
    return doc

css_file_name = 'css/divs.css'

css_keywords = {
    'left' : 'left',
    'top' : 'top',
    'width' : 'width',
    'height' : 'height'
}

def create_css(json_divs):
    f = open(css_file_name, 'w')

    print >>f, "/*"
    print >>f, " * This file was generated by %s on %s." % (argv0, now)
    print >>f, " * Do not edit."
    print >>f, " */"
    print >>f
    for x in json_divs:
        print >>f, '#%s {' % x['id']
        for (k,v) in x.items():
            if k in css_keywords:
                # TBD: do not hardcode px
                print >>f, '  %s: %spx;' % (css_keywords[k], v)
        print >>f, '  border: 1px solid black;'
        print >>f, '  position: absolute;'
        print >>f, '}'

json_divs = json.load(open('saved.json'))

create_css(json_divs)

html = create_html('Lesson',
                   [css_file_name],
                   ['js/json2.js',
                    'js/jquery-1.4.1.js',
                    'js/jquery-ui-1.8.1.custom.min.js',
                    'js/raphael.js'],
                   json_divs)

f = open('index.html', 'w')
html.print_on(f)

