#! /usr/bin/env python

import sys

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
    
    def print_on(self, stream):
        print >>stream, '<!DOCTYPE html>'
        HtmlElement.print_on(self, stream)

def create_html(title, js_files):
    doc = HtmlDocument()
    head = doc.head()
    head.title('CSS editor')
    [head.js(js) for js in js_files]
    doc.body()
    return doc

html = create_html('CSS editor',
                   ['js/jquery-1.4.1.js',
                    'js/jquery-ui-1.8.1.custom.min.js',
                    'js/raphael.js',
                    'js/css-editor.js'])
html.print_on(sys.stdout)

