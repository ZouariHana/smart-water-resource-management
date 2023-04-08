from flask import Flask
from flask_cors import CORS , cross_origin
from flask_session import Session
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS 
from dotenv import load_dotenv
import os
import redis


app = Flask(__name__)



load_dotenv()

class ApplicationConfig:
    SECRET_KEY = os.environ["SECRET_KEY"]

    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_ECHO = True
    SQLALCHEMY_DATABASE_URI = 'mysql://root:pcdpcdimen@localhost/pcd'

    SESSION_TYPE = "redis"
    SESSION_PERMANENT = False
    SESSION_USE_SIGNER = True
    SESSION_REDIS = redis.from_url("redis://127.0.0.1:6379")



app.config.from_object(ApplicationConfig)
CORS(app, resources={r"/*": {"origins": "http://localhost:3000", "methods": ["GET", "POST","DELETE","PUT"]}}, supports_credentials=True)
#CORS(app, origins='http://localhost:3000')

db = SQLAlchemy()


server_session = Session(app) 
db.init_app(app)


with app.app_context():
    db.create_all()
    
from view1 import * 
from viewsPDFDownload import *
from views import *

if __name__=="__main__":
    app.run(debug=True)