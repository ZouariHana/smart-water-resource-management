from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root@localhost/pcd'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
CORS(app)

from viewsPDFDownload import *
from views import *

if __name__=="__main__":
    app.run(debug=True)