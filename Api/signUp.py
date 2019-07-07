import sqlite3
import os
import smtplib
from email.message import EmailMessage
import quotes;
from flask_cors import CORS
from flask import Flask,jsonify,request
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager,create_access_token
from validate_email import validate_email
from datetime import datetime

app=Flask(__name__)
CORS(app)
bcrypt=Bcrypt(app)
app.secret_key=os.environ.get('SECRET_KEY')
jwt=JWTManager(app)
@app.route('/signUp',methods=['POST'])
def signUp():
    request_data=request.get_json()

    connection=sqlite3.connect('mydb.db')
    cursor=connection.cursor()
    _tuple=(request_data['email'],)
    select_query="Select * from user where email=?"
    rows=cursor.execute(select_query,(_tuple))
    rows=rows.fetchone()
    if rows is not None:
        return (jsonify({"msg":"Username already exists"}))
    else:
        insert_query="INSERT INTO USER VALUES(null,?,?,?,?)"
        _insertionData=(request_data['firstName'],request_data['lastName'],request_data['email'],bcrypt.generate_password_hash(request_data['password']).decode('utf-8'))
        
        cursor.execute(insert_query,_insertionData)
        connection.commit()
        connection.close()
        EMAIL_ADDRESS=os.environ.get('EMAIL_ADDRESS')
        EMAIL_PASSWORD=os.environ.get('EMAIL_PASSWORD')
        msg=EmailMessage()
        msg['Subject']='Checkout !'
        msg['From']=EMAIL_ADDRESS
        msg['To']=request_data['email']
        is_valid = validate_email(request_data['email'],verify=True)
        if is_valid:

            msg.set_content("ThankYou for signing up in Wonderflow!\n Hello Worlds")
            with smtplib.SMTP_SSL('smtp.gmail.com',465) as smtp:
                smtp.login(EMAIL_ADDRESS,EMAIL_PASSWORD)
                smtp.send_message(msg)
            return(jsonify({"msg":"Record Added"}),201)
        else: 
            return(jsonify({"msg":"Invalid Email Id"}))
@app.route('/login',methods=['POST'])
def login():
    request_data=request.get_json()
    connection=sqlite3.connect('mydb.db')
    cursor=connection.cursor()
    email=(request_data['email'],)
    password=request_data['password']
    select_query="Select * from user where email=?"
    rows=cursor.execute(select_query,(email))
    row=rows.fetchone()
    connection.commit()
    connection.close()
    
    if row is not None and bcrypt.check_password_hash(row[4],password):
        access_token=create_access_token(identity= {
            'firstName':row[1],
            'lastName':row[2],
            'email':row[3]
            })
        return(jsonify({"result":access_token}))
    else:
        return(jsonify({"result":"Invalid username or password"}))
@app.route('/questions',methods=['GET'])
def showQuestions():
    connection=sqlite3.connect('mydb.db')
    cursor=connection.cursor()
    select_query="select * from questions"
    rows=cursor.execute(select_query)
    questions=[]
    
    for row in rows:
        _dict={
            'id':row[0],
            'title':row[1],
            'description':row[2],
            'tags':row[3],
            'subject':row[4],
            'upvotes':row[5],
            'downvotes':row[6],
            'author':row[7],
            'datetime':row[8],
            'comments':row[9],
            'addedtofavorites':row[10],
            'answered':row[11]
            }
        questions.append(_dict)
    return(jsonify({'questions':questions}))

@app.route('/questions',methods=['POST'])
def putQuestion():
    request_data=request.get_json()
    
    title=request_data['title']
    subject=request_data['subject']
    description=request_data['description']
    tags=request_data['tags']
    subject=request_data['subject']
    upvotes=request_data['upvotes']
    downvotes=request_data['downvotes']
    author=request_data['author']
    dateTime=request_data['dateTime']
    comments=request_data['comments']
    addedtofavorites=request_data['addedtofavorites']
    answered=request_data['answered']
    category=request_data['category']
    insertion_data=(title,description,tags,subject,upvotes,downvotes,author,dateTime,comments,addedtofavorites,answered,category)
    connection=sqlite3.connect('mydb.db')
    cursor=connection.cursor()
    insertion_query="INSERT INTO QUESTIONS VALUES(NULL,?,?,?,?,?,?,?,?,?,?,?,?)"
    cursor.execute(insertion_query,insertion_data)
    connection.commit()
    connection.close()
    return(jsonify({'msg':"Response successfully submitted"}))
@app.route("/",methods=['GET'])
def showCategory():

    connection=sqlite3.connect('mydb.db')
    cursor=connection.cursor()
    select_query="select distinct category from questions"
    rows=cursor.execute(select_query)
    
    _ansDict=[]
    keys=[]
    for row in rows:
        
        
        keys.append(row[0])
    for key in keys:
        
        cursor=connection.cursor()
        count_query="select count(category) from questions where category=?"
        number=cursor.execute(count_query,(key,)).fetchone()[0]
        _ansDict.append({'category':key,'count':number})
        

    return (jsonify({'category':_ansDict}))
@app.route("/category/<category>", methods=['GET'])
def displayCategoryQuestions(category):
    connection=sqlite3.connect('mydb.db')
    cursor=connection.cursor()
    select_query="select * from questions where category=?"
    rows=cursor.execute(select_query,(category,))
    _ansDict=[]
    for row in rows:
        _ansDict.append({'title':row[1],'desc':row[2],'tags':row[3],'subject':row[4],'upvotes':row[5],'downvotes':row[6],'author':row[7],'dateTime':row[8],'category':row[12]})
    return (jsonify({'question':_ansDict}))    
@app.route("/quotes",methods=['GET'])
def showQuotes():
    quote=quotes.quotes[quotes.x]
    return(jsonify({'quotes':quote}))


app.run(debug=True)