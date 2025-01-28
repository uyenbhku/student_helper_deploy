import os
import psycopg2
from dotenv import load_dotenv

load_dotenv()


def select_all(table_name: str) -> dict:

    # Establish database connection
    conn = psycopg2.connect(os.getenv('DB_URL'))
    
    try:
        # Create cursor
        cur = conn.cursor()

        # Create table if not exists
        cur.execute(f'SELECT * FROM {table_name};')

        # Fetch data
        rows = cur.fetchall()

         # Fetch column names
        column_names = [desc[0] for desc in cur.description]

        # Convert rows into a list of dictionaries
        courses_dict = [dict(zip(column_names, row)) for row in rows]
    
        
        return courses_dict

    except Exception as e:
        print(f"Error retrieving data: {e}")

    finally:
        # Close connection
        cur.close()
        conn.close()