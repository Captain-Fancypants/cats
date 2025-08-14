# vulnerable_app.py
import sqlite3
import sys

def get_user_info(username):
    conn = sqlite3.connect("users.db")
    cursor = conn.cursor()

    # BAD: SQL injection vulnerability
    query = f"SELECT * FROM users WHERE username = '{username}'"
    print(f"Running query: {query}")
    cursor.execute(query)

    result = cursor.fetchall()
    conn.close()
    return result

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python vulnerable_app.py <username>")
        sys.exit(1)

    username_input = sys.argv[1]
    user_info = get_user_info(username_input)
    print(user_info)
