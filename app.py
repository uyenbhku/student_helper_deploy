from flask import Flask, render_template, json, request, jsonify
from services import select_data, insert_data, send_email

app = Flask(__name__)



@app.route('/')
def home():
    # rows, columns = select_data.select_all('courses')
    data = select_data.select_all('courses')
    
    return render_template('base.html', data=json.dumps(data))


@app.route('/about')
def about():
    return render_template('base.html', data=json.dumps({}))


@app.route('/contact', methods=['GET', 'POST'])
def contact():
    # Predefined data to pass to the template
    
    if request.method == 'POST':
        # If the form is submitted, process the data
        form_data = request.get_json()  # Get the form data sent from React
        name = form_data.get('name')
        email = form_data.get('email')
        content = form_data.get('content')
        
        # Here, you can process the data (e.g., store in the database, send an email, etc.)
        # Store in the database 
        insert_data.insert('user_messages', { 'name': name, 'email': email, 'content': content})
        send_email.send(name, email, content)        
        return jsonify({"status": "success", "message": "Tin nhắn được gửi thành công!"})
    
    # Render the page with the predefined data (you can include the form as well)
    return render_template('base.html', data=json.dumps({}))