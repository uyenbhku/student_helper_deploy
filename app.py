from flask import Flask, render_template, json
app = Flask(__name__)

@app.route('/')
def hello_world():
    data = {
        "user": "John Doe",
        "items": ["Item 1", "Item 2", "Item 3"]
    }
    return render_template('base.html', data=json.dumps(data))



@app.route('/about')
def about():
    
    data = {
        "user": "John Doe",
        "items": ["Item 1", "Item 2", "Item 3"]
    }
    return render_template('base.html', data=json.dumps(data))


@app.route('/contact')
def contact():
    
    data = {
        "user": "John Doe",
        "items": ["Item 1", "Item 2", "Item 3"]
    }
    return render_template('base.html', data=json.dumps(data))