# from . import crawl_table
import os
import psycopg2
from dotenv import load_dotenv

load_dotenv()


def dump(courses_data: list):

    # Establish database connection
    conn = psycopg2.connect(os.getenv('DB_URL'))
    
    try:
        # Create cursor
        cur = conn.cursor()

        # Create table if not exists
        cur.execute('''
            CREATE TABLE IF NOT EXISTS courses (
                course_code VARCHAR(10) PRIMARY KEY,
                course_name_vn VARCHAR(255),
                course_type VARCHAR(50),
                management_unit VARCHAR(50),
                theory_credits INTEGER,
                practical_credits INTEGER,
                total_credits INTEGER
            )
        ''')

        # Prepare bulk insert data
        insert_data = [
            (
                str(course['Mã MH']),  # Explicitly convert to string
                str(course['Tên MH (Tiếng Việt)']),
                str(course['Loại MH']),
                str(course['Đơn vị quản lý chuyên môn']),
                int(course['Số TCLT'] or 0),  # Handle potential empty strings
                int(course['Số TCTH'] or 0),
                int((course['Số TCLT'] or 0)) + int((course['Số TCTH'] or 0)),
            ) for course in courses_data
        ]

        # Bulk insert with upsert
        cur.executemany('''
            INSERT INTO courses 
            (course_code, course_name_vn, course_type, management_unit, theory_credits, practical_credits, total_credits)
            VALUES (%s, %s, %s, %s, %s, %s, %s)
            ON CONFLICT (course_code) DO UPDATE
            SET course_name_vn = EXCLUDED.course_name_vn,
                course_type = EXCLUDED.course_type,
                management_unit = EXCLUDED.management_unit,
                theory_credits = EXCLUDED.theory_credits,
                practical_credits = EXCLUDED.practical_credits,
                total_credits = EXCLUDED.total_credits
        ''', insert_data)

        # Commit the transaction
        conn.commit()
        print(f"Successfully imported {len(courses_data)} courses")

    except Exception as e:
        print(f"Error importing data: {e}")
        conn.rollback()

    finally:
        # Close connection
        cur.close()
        conn.close()



# if __name__ == "__main__":
#     print("====CRAWLING DATA FROM UIT====")
#     df = crawl_table.crawl_table('https://daa.uit.edu.vn/danh-muc-mon-hoc-dai-hoc')
#     print("====SYNC DATA====")
#     dump(df.to_dict(orient='records'))