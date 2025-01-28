import os
import smtplib
from dotenv import load_dotenv
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

load_dotenv()

def send(name: str, email: str, content: str) -> dict:
    try:
        # Retrieve email credentials from the environment variables
        my_email = os.getenv("MY_EMAIL")
        smtp_host = os.getenv("SMTP_HOST")
        smtp_port = int(os.getenv("SMTP_PORT"))
        smtp_user = os.getenv("SMTP_USER")
        smtp_password = os.getenv("SMTP_PASSWORD")
        
        # Prepare the email content
        subject = "STUDENT HELPER -- FROM USER"
        body = f"Subject: {subject}\nFrom: {name} - {email}\n\n{content}"

        # Create the email message
        msg = MIMEMultipart()
        msg['From'] = smtp_user
        msg['To'] = my_email
        msg['Subject'] = subject
        msg.attach(MIMEText(body, 'plain'))

        # Establish a secure connection with the email server
        with smtplib.SMTP(smtp_host, smtp_port) as server:
            server.starttls()  # Start TLS encryption
            server.login(smtp_user, smtp_password)
            server.sendmail(smtp_user, my_email, msg.as_string())

        # Return success message
        return {"status": "success", "message": "Email sent successfully."}

    except Exception as e:
        print(f"Error sending email: {e}")
        return {"status": "error", "message": str(e)}
