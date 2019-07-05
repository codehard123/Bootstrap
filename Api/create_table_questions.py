import sqlite3
connection=sqlite3.connect('mydb.db')
cursor=connection.cursor()
create_table="create table questions (id INTEGER PRIMARY KEY,title text,description text,tags text,subject text,upvotes int,downvotes int,author text,datetime text,comments text,addedtofavorites boolean,answered boolean,category text)"
cursor.execute(create_table)
connection.commit()
connection.close()
