from flask_sqlalchemy import SQLAlchemy 
from datetime import date
from sqlalchemy import ForeignKey
from app import db
from uuid import uuid4

def get_uuid():
    return uuid4().hex 

class Utilisateur(db.Model):
    __tablename__ = 'utilisateur'
    idUser = db.Column(db.Integer, primary_key=True, autoincrement=True)
    idBarrage = db.Column(db.Integer, ForeignKey('barrage.idBarrage'), nullable=False)
    Nom = db.Column(db.String(45), nullable=False)
    Prenom = db.Column(db.String(45), nullable=False)
    email = db.Column(db.String(100), nullable=False)
    password = db.Column(db.String(100), nullable=False)

class Barrage(db.Model):
    __tablename__ = 'barrage'
    idBarrage = db.Column(db.Integer, primary_key=True, autoincrement=True)
    Nom = db.Column(db.Text, nullable=False)
    Bassin = db.Column(db.Integer, nullable=False)
    cote = db.Column(db.Float, nullable=False)
    cap_utile_actuelle = db.Column(db.Float, nullable=False)
    AnneeMiseEnService = db.Column(db.Integer, nullable=False)
    Latitude = db.Column(db.Float)
    Longitude = db.Column(db.Float)
    volume_regul_calcule = db.Column(db.Text, nullable=False)
    debit = db.Column(db.Integer)
    idRegion = db.Column(db.Integer, ForeignKey('region.idRegion'), nullable=False)
    region = db.relationship('Region', back_populates="barrage0", foreign_keys=[idRegion])
    lachers = db.relationship("Lachers", back_populates="barrage")
    apports = db.relationship("Apports", back_populates="barrage")
    stocks = db.relationship("Stocks", back_populates="barrage")
    pluv = db.relationship("Pluv", back_populates="barrage")
    rs = db.relationship("RS", back_populates="barrage")
    pompage = db.relationship("Pompage", back_populates="barrage")


class Lachers(db.Model):
    __tablename__ = "lacher"
    idLacher = db.Column(db.Integer, primary_key=True)
    idBarrage = db.Column(db.Integer, ForeignKey('barrage.idBarrage'), nullable=False)
    date_lacher = db.Column(db.Date, nullable=False)
    valeur_lacher = db.Column(db.DECIMAL(8, 3), nullable=False)
    utilisation = db.Column(db.String(10), nullable=False)
    barrage = db.relationship("Barrage", back_populates="lachers", foreign_keys=[idBarrage])
class Apports(db.Model):
    __tablename__ = "apport"
    idApport = db.Column(db.Integer, primary_key=True, autoincrement=True)
    idBarrage = db.Column(db.Integer,ForeignKey('barrage.idBarrage'), nullable=False)
    date_apport = db.Column(db.Date, nullable=False)
    valeur_apport = db.Column(db.Numeric(8, 3), nullable=False)
    barrage = db.relationship("Barrage", back_populates="apports", foreign_keys=[idBarrage])

class Stocks(db.Model):
    __tablename__ = "stock"
    idStock = db.Column(db.Integer, primary_key=True, autoincrement=True)
    idBarrage = db.Column(db.Integer, ForeignKey('barrage.idBarrage'), nullable=False)
    Date_Stock = db.Column(db.Date, nullable=False)
    Valeur_Stock = db.Column(db.Numeric(8, 3), nullable=False)
    barrage = db.relationship("Barrage", back_populates="stocks", foreign_keys=[idBarrage])

class Ichkel(db.Model):
    __tablename__ = 'lacher_ichkeul'
    ID_lachIch = db.Column(db.Integer, primary_key=True, autoincrement=True)
    Date_LachIch = db.Column(db.Date, nullable=False)
    valeur_lachIch = db.Column(db.Numeric(7, 3), nullable=False)

class Pluv(db.Model):
    __tablename__ = "pluviometrie"
    idPluv = db.Column(db.Integer, primary_key=True, autoincrement=True)
    idBarrage = db.Column(db.Integer, ForeignKey('barrage.idBarrage'), nullable=False)
    date_Pluv = db.Column(db.Date, nullable=True)
    valeur_Pluv = db.Column(db.Numeric(7, 3), nullable=True)
    barrage = db.relationship("Barrage", back_populates="pluv", foreign_keys=[idBarrage])

class RS(db.Model):
    __tablename__ = 'rs'
    idRS = db.Column(db.Integer, primary_key=True, autoincrement=True)
    idBarrage = db.Column(db.Integer,ForeignKey('barrage.idBarrage'), nullable=False)
    date_RS = db.Column(db.Date, nullable=True)
    valeur_RS = db.Column(db.Numeric(6, 2), nullable=True)
    barrage = db.relationship("Barrage", back_populates="rs", foreign_keys=[idBarrage])
class Pompage(db.Model):
    __tablename__ = 'pompage'
    idPompage = db.Column(db.Integer, primary_key=True, autoincrement=True)
    idBarrage = db.Column(db.Integer, db.ForeignKey('barrage.idBarrage'), nullable=False)
    Date_pompage = db.Column(db.Date, nullable=False)
    valeur_pompage = db.Column(db.Numeric(8, 3), nullable=False)
    barrage = db.relationship("Barrage", back_populates="pompage", foreign_keys=[idBarrage])
    
class Region(db.Model):
    __tablename__ = "region"
    idRegion = db.Column(db.Integer, primary_key=True, unique=True)
    Nom= db.Column(db.String(100),unique=True)
    barrage0 = db.relationship('Barrage', back_populates="region", foreign_keys='Barrage.idRegion')

class Admin(db.Model):
    __tablename__ = 'admin'
    idAdmin = db.Column(db.Integer, primary_key=True, autoincrement=True)
    email = db.Column(db.String(100), nullable=False)
    password = db.Column(db.String(100), nullable=False)

class GererUt(db.Model):
    __tablename__ = 'gererut'
    idUser = db.Column(db.Integer, db.ForeignKey('utilisateur.idUser'), primary_key=True)
    idAdmin = db.Column(db.Integer, db.ForeignKey('admin.idAdmin'), primary_key=True)
    utilisateur = db.relationship('Utilisateur', backref=db.backref('gererut'))
    admin = db.relationship('Admin', backref=db.backref('gererut'))