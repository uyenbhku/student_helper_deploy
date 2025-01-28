import os
import psycopg2
from dotenv import load_dotenv

load_dotenv()


def insert(table_name: str, data: dict) -> dict:

    # Establish database connection
    conn = psycopg2.connect(os.getenv('DB_URL'))    
    cur = conn.cursor()


    try:
        # Create the column names and values for the insert query dynamically
        columns = ', '.join(data.keys())
        values = ', '.join([f"%({key})s" for key in data.keys()])

        # Construct the SQL query for insertion
        query = f"INSERT INTO {table_name} ({columns}) VALUES ({values}) RETURNING *"
        
        # Execute the query
        cur.execute(query, data)
        
        # Commit the transaction
        conn.commit()

        # Fetch the inserted row to return it
        inserted_row = cur.fetchone()

        # Return the inserted data as a dictionary
        return {
            "status": "success",
            "inserted_row": inserted_row
        }
    except Exception as e:
        print(f"Error inserting data: {e}")

    finally:
        # Close connection
        cur.close()
        conn.close()