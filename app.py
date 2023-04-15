
from flask import Flask, request, jsonify, render_template, url_for
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

messages = []

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/messages', methods=['GET', 'POST'])
def handle_messages():
    if request.method == 'GET':
        return jsonify(messages)
    elif request.method == 'POST':
        data = request.get_json()
        messages.append(data)
        return jsonify(data)

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000)