import sqlite3
connection=sqlite3.connect('mydb.db')
cursor=connection.cursor()
create_table="create table user(id INTEGER PRIMARY KEY,FirstName text,LastName text,Email text,password text)"
cursor.execute(create_table)
connection.commit()
connection.close()
