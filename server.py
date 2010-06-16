#! /usr/bin/env python2.6

import BaseHTTPServer
import os
import subprocess
import json

def extension(path):
    return os.path.splitext(path)[1]

content_types = {
    '.html' : 'text/html',
    '.js' : 'text/javascript',
    '.css' : 'text/css',
    '.png' : 'image/png'
}

def dict_to_kw_args(dict):
    def quote(v):
        if isinstance(v, str) or isinstance(v, unicode):
            return "'" + v + "'"
        else:
            return str(v)
    return ', '.join([k + '=' + quote(v) for k,v in dict.items()])


def create_description(divs):
    f = open('description.txt', 'w')
    print >>f, "css('divs.css')"
    for js in ['json2.js', 'jquery', 'jquery-ui', 'raphael.js']:
        print >>f, "java_script('%s')" % js
    for div in divs:
        print >>f, "div(%s)" % dict_to_kw_args(div)
    f.close()

class MyHandler(BaseHTTPServer.BaseHTTPRequestHandler):
    def do_GET(self):
        ext = extension(self.path)
        if ext in content_types:
            f = open(os.curdir + os.sep + self.path)
            self.send_response(200)
            self.send_header('Content-type', content_types[ext])
            self.end_headers()
            self.wfile.write(f.read())
            self.wfile.close()
        else:
            print 'error unsupported path:', self.path

    def do_POST(self):
        print 'POST:'
        print self.headers
        length = int(self.headers.getheader('content-length'))        
        contents = self.rfile.read(length)
        handlers = {'/save': self.save,
                    '/generate': self.generate}
        result = handlers.setdefault(self.path, self.error)(contents)
        self.send_response(200)
        self.send_header('Content-type', content_types['.js'])
        self.end_headers()
        self.wfile.write(result)
        self.wfile.close()

    def save(self, contents):
        create_description(json.loads(contents))
        print >>open('saved.json', 'w'), contents
        return 'ok'

    def generate(self, contents):
        self.save(contents)
        subprocess.call(['./generate-karma-lesson.py', 'description.txt'])
        return 'ok'

    def error(self, contents):
        print 'Don''t know how to handle:', self.path

def run(server_class=BaseHTTPServer.HTTPServer,
        handler_class=BaseHTTPServer.BaseHTTPRequestHandler):
    server_address = ('', 8000)
    httpd = server_class(server_address, handler_class)
    httpd.serve_forever()

if __name__ == "__main__":
    run(handler_class=MyHandler)
