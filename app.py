from flask import Flask, render_template, json, request
from flask.ext.mysql import MySQL
from werkzeug import generate_password_hash, check_password_hash

app = Flask(__name__)

@app.route('/')
def main():
    return render_template('index.html')
@app.route('/index.html')
def showHome():
    return render_template('index.html')
@app.route('/video.html')
def playVideo():
    return render_template('video.html')
@app.route('/video-detail.html')
def videoDetail():
    return render_template('video-detail.html')
@app.route('/listen.html')
def listen():
    return render_template('listen.html')
@app.route('/demo')
def demo():
    return render_template('demo.html')

if __name__ == "__main__":
    app.run()
