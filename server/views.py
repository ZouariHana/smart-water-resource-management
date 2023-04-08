from flask import Flask
from flask import jsonify
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from Model import *
from app import app,db
from app import *
from datetime import date
from sqlalchemy import func
from decimal import Decimal
from dateutil.relativedelta import relativedelta
@app.route('/stocks/<dam_id>/<date>')
def get_stocks(dam_id, date):
    try:
        print(dam_id)
        date_object = datetime.strptime(date, '%d-%m-%Y')
        start_date = datetime(date_object.year, 1, 1)
        end_date = datetime(date_object.year,date_object.month,date_object.day)
        if dam_id == 'Tous les barrages':
        # Retrieve the sum of data for all dams
            stocks = db.session.query(func.sum(Stocks.Valeur_Stock), Stocks.Date_Stock).filter(
            Stocks.Date_Stock.between(start_date, end_date)).group_by(Stocks.Date_Stock)\
            .order_by(Stocks.Date_Stock).all()
            print("stocks value:", stocks, "Type:", type(stocks))
        elif dam_id =='Barrages ST Nord':
            stocks = db.session.query(func.sum(Stocks.Valeur_Stock), Stocks.Date_Stock)\
            .join(Barrage, Stocks.idBarrage == Barrage.idBarrage)\
            .group_by(Stocks.Date_Stock, Barrage.idRegion)\
            .filter(Stocks.Date_Stock.between(start_date, end_date),Barrage.idRegion == 1)\
            .order_by(Stocks.Date_Stock).all()
            print(stocks)
        elif dam_id =='Barrages ST Centre':
            stocks = db.session.query(func.sum(Stocks.Valeur_Stock), Stocks.Date_Stock)\
            .join(Barrage, Stocks.idBarrage == Barrage.idBarrage)\
            .filter(Stocks.Date_Stock.between(start_date, end_date))\
            .filter(Barrage.idRegion == 2).group_by(Stocks.Date_Stock)\
            .order_by(Stocks.Date_Stock, Barrage.idRegion).all()
        elif dam_id =='Barrages ST Cap-Bon':
            stocks = db.session.query(func.sum(Stocks.Valeur_Stock), Stocks.Date_Stock)\
            .join(Barrage, Stocks.idBarrage == Barrage.idBarrage)\
            .filter(Stocks.Date_Stock.between(start_date, end_date))\
            .filter(Barrage.idRegion == 3).group_by(Stocks.Date_Stock)\
            .order_by(Stocks.Date_Stock, Barrage.idRegion).all()
        else:
            stocks = db.session.query(Stocks.Valeur_Stock, Stocks.Date_Stock).filter( Stocks.idBarrage == int(dam_id)
            ,Stocks.Date_Stock.between(start_date, end_date)).order_by(Stocks.Date_Stock).all()

    # convert the stocks data to a list of dictionaries
        stocks_data = []
        for s in stocks:
            stock_dict = {"Valeur_Stock": s[0], "Date_Stock": s[1].strftime("%d-%m-%Y")}
            stocks_data.append(stock_dict)

        return ({"year": date_object.year, "stocks": stocks_data})
    except Exception as e:
        return ({"error": str(e)})

@app.route('/exploitation/<date>')
def get_exploitation(date):
    date_obj = datetime.strptime(date, '%d-%m-%Y')
    date_str = date_obj.strftime('%Y-%m-%d')
    exploitation = db.session.query(Lachers.utilisation).filter(Lachers.date_lacher==date_str).all()
    exp_data = []
    for s in exploitation:
            exp_data.append(s[0])
    # return jsonify({"date": date, "exp": exp_data})
    return(exp_data)
@app.route('/pourcentageexp/<date>')
def get_pourcentage(date):
     listExp = get_exploitation(date)

     for elem in listExp:
        if ',' in elem:
        # Split the element into separate elements using the comma as a delimiter
         split_elems = elem.split(',')
        # Add the resulting elements to the list
         listExp.extend(split_elems)
        
        # Remove the original fused element
         listExp.remove(elem)
     dict_counts = {elem: listExp.count(elem)/len(listExp) for elem in listExp}
     return(dict_counts)

@app.route('/tauxRemplissage/<dam_id>/<date>')
def get_taux(dam_id, date):
        print(dam_id)
        response = get_stocks(dam_id, date)
        print("Hello HELLO:", response) 
        if "stocks" not in response:
            raise ValueError("Response does not contain 'stocks' key")
        stocks_data = response["stocks"] 
        last_stock = stocks_data[-1]
        stock = last_stock['Valeur_Stock']
        date_object = datetime.strptime(date, '%d-%m-%Y')
        if dam_id == 'Tous les barrages':
        # Retrieve the sum of data for all dams
            capacity = db.session.query(func.sum(Barrage.cap_utile_actuelle)).first()[0]
        elif dam_id =='Barrages ST Nord':
            print("hello")
            capacity = db.session.query(func.sum(Barrage.cap_utile_actuelle))\
            .group_by(Barrage.idRegion)\
            .filter(Barrage.idRegion == 1).scalar()
            print(stock)
            print(capacity)
        elif dam_id =='Barrages ST Centre':
            capacity = db.session.query(func.sum(Barrage.cap_utile_actuelle))\
            .group_by(Barrage.idRegion)\
            .filter(Barrage.idRegion == 2).scalar()
        elif dam_id =='Barrages ST Cap-Bon': 
            capacity = db.session.query(func.sum(Barrage.cap_utile_actuelle))\
            .group_by(Barrage.idRegion)\
            .filter(Barrage.idRegion == 3).scalar()
        else:
            capacity = db.session.query(Barrage.cap_utile_actuelle)\
            .filter(Barrage.idBarrage == int(dam_id)).first()[0]
            
        print("Capacity value:", capacity, "Type:", type(capacity))
        capacity = Decimal(capacity)
        taux = (stock/capacity)*100
        taux = round(taux, 1)
        return ([taux])

@app.route('/lacher/<dam_id>/<date>')
def get_lacher(dam_id, date):
    try:
        print(dam_id)
        date_object = datetime.strptime(date, '%d-%m-%Y')
        last_year_date = date_object - relativedelta(years=1)
        if dam_id == "Tous les barrages":
            lacher1 = db.session.query(func.sum(Lachers.valeur_lacher))\
            .group_by(Lachers.date_lacher)\
            .filter(Lachers.date_lacher== date_object).scalar()
            lacher2 = db.session.query(func.sum(Lachers.valeur_lacher))\
            .group_by(Lachers.date_lacher)\
            .filter(Lachers.date_lacher== last_year_date ).scalar()
        elif dam_id == 'Barrages ST Nord':
            lacher1 = db.session.query(func.sum(Lachers.valeur_lacher))\
            .join(Barrage, Barrage.idBarrage == Lachers.idBarrage)\
            .group_by(Lachers.date_lacher, Barrage.idRegion)\
            .filter(Lachers.date_lacher== date_object, Barrage.idRegion == 1).scalar()
            lacher2 = db.session.query(func.sum(Lachers.valeur_lacher))\
            .join(Barrage, Barrage.idBarrage == Lachers.idBarrage)\
            .group_by(Lachers.date_lacher, Barrage.idRegion)\
            .filter(Lachers.date_lacher== last_year_date, Barrage.idRegion == 1).scalar()
        elif dam_id =='Barrages ST Centre':
            lacher1 = db.session.query(func.sum(Lachers.valeur_lacher))\
            .join(Barrage, Barrage.idBarrage == Lachers.idBarrage)\
            .group_by(Lachers.date_lacher, Barrage.idRegion)\
            .filter(Lachers.date_lacher== date_object, Barrage.idRegion == 2).scalar()
            lacher2 = db.session.query(func.sum(Lachers.valeur_lacher))\
            .join(Barrage, Barrage.idBarrage == Lachers.idBarrage)\
            .group_by(Lachers.date_lacher, Barrage.idRegion)\
            .filter(Lachers.date_lacher== last_year_date, Barrage.idRegion == 2).scalar()
        elif dam_id =='Barrages ST Cap-Bon': 
            lacher1 = db.session.query(func.sum(Lachers.valeur_lacher))\
            .join(Barrage, Barrage.idBarrage == Lachers.idBarrage)\
            .group_by(Lachers.date_lacher, Barrage.idRegion)\
            .filter(Lachers.date_lacher== date_object, Barrage.idRegion == 3).scalar()
            lacher2 = db.session.query(func.sum(Lachers.valeur_lacher))\
            .join(Barrage, Barrage.idBarrage == Lachers.idBarrage)\
            .group_by(Lachers.date_lacher, Barrage.idRegion)\
            .filter(Lachers.date_lacher== last_year_date, Barrage.idRegion == 3).scalar()
        else:
            lacher1 = db.session.query(Lachers.valeur_lacher).filter( Lachers.idBarrage == int(dam_id)
            ,Lachers.date_lacher== date_object).scalar()
            lacher2 = db.session.query(Lachers.valeur_lacher).filter( Lachers.idBarrage == int(dam_id)
            ,Lachers.date_lacher== last_year_date).scalar()
        
        return ([lacher1, lacher2])
    except Exception as e:
        return ({"error": str(e)})
    
@app.route('/apport/<dam_id>/<date>')
def get_apport(dam_id, date):
    try:
        print(dam_id)
        date_object = datetime.strptime(date, '%d-%m-%Y')
        last_year_date = date_object - relativedelta(years=1)
        if dam_id == "Tous les barrages":
            apport1 = db.session.query(func.sum(Apports.valeur_apport))\
            .group_by(Apports.date_apport)\
            .filter(Apports.date_apport== date_object).scalar()
            apport2 = db.session.query(func.sum(Apports.valeur_apport))\
            .group_by(Apports.date_apport)\
            .filter(Apports.date_apport== last_year_date ).scalar()
        elif dam_id == 'Barrages ST Nord':
            apport1 = db.session.query(func.sum(Apports.valeur_apport))\
            .join(Barrage, Barrage.idBarrage == Apports.idBarrage)\
            .group_by(Apports.date_apport, Barrage.idRegion)\
            .filter(Apports.date_apport== date_object, Barrage.idRegion == 1).scalar()
            apport2 = db.session.query(func.sum(Apports.valeur_apport))\
            .join(Barrage, Barrage.idBarrage == Apports.idBarrage)\
            .group_by(Apports.date_apport, Barrage.idRegion)\
            .filter(Apports.date_apport== last_year_date, Barrage.idRegion == 1).scalar()
        elif dam_id =='Barrages ST Centre':
            apport1 = db.session.query(func.sum(Apports.valeur_apport))\
            .join(Barrage, Barrage.idBarrage == Apports.idBarrage)\
            .group_by(Apports.date_apport, Barrage.idRegion)\
            .filter(Apports.date_apport== date_object, Barrage.idRegion == 2).scalar()
            apport2 = db.session.query(func.sum(Apports.valeur_apport))\
            .join(Barrage, Barrage.idBarrage == Apports.idBarrage)\
            .group_by(Apports.date_apport, Barrage.idRegion)\
            .filter(Apports.date_apport== last_year_date, Barrage.idRegion == 2).scalar()
        elif dam_id =='Barrages ST Cap-Bon': 
            apport1 = db.session.query(func.sum(Apports.valeur_apport))\
            .join(Barrage, Barrage.idBarrage == Apports.idBarrage)\
            .group_by(Apports.date_apport, Barrage.idRegion)\
            .filter(Apports.date_apport== date_object, Barrage.idRegion == 3).scalar()
            apport2 = db.session.query(func.sum(Apports.valeur_apport))\
            .join(Barrage, Barrage.idBarrage == Apports.idBarrage)\
            .group_by(Apports.date_apport, Barrage.idRegion)\
            .filter(Apports.date_apport== last_year_date, Barrage.idRegion == 3).scalar()
        else:
            apport1 = db.session.query(Apports.valeur_apport).filter( Apports.idBarrage == int(dam_id)
            ,Apports.date_apport== date_object).scalar()
            apport2 = db.session.query(Apports.valeur_apport).filter( Apports.idBarrage == int(dam_id)
            ,Apports.date_apport== last_year_date).scalar()
        
        return ([apport1, apport2])
    except Exception as e:
        return ({"error": str(e)})