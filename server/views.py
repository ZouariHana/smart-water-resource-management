from flask import Flask
from flask import jsonify
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from Model import *
from app import *
from datetime import date
from sqlalchemy import func
from decimal import Decimal
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
            print(stocks)
        elif dam_id =='Barrages S/T Nord':
            stocks = db.session.query(func.sum(Stocks.Valeur_Stock))\
            .join(Barrage, Stocks.idBarrage == Barrage.idBarrage)\
            .join(Region, Barrage.idRegion == Region.idRegion)\
            .filter(Stocks.Date_Stock.between(start_date, end_date))\
            .filter(Region.Nom == 'S/T Nord').group_by(Stocks.Date_Stock)\
            .order_by(Stocks.Date_Stock).all()
        elif dam_id =='Barrages S/T Centre':
            stocks = db.session.query(func.sum(Stocks.Valeur_Stock))\
            .join(Barrage, Stocks.idBarrage == Barrage.idBarrage)\
            .join(Region, Barrage.idRegion == Region.idRegion)\
            .filter(Stocks.Date_Stock.between(start_date, end_date))\
            .filter(Region.Nom == 'S/T Centre').group_by(Stocks.Date_Stock)\
            .order_by(Stocks.Date_Stock).all()
        elif dam_id =='Barrages S/T Cap-Bon':
            stocks = db.session.query(func.sum(Stocks.Valeur_Stock))\
            .join(Barrage, Stocks.idBarrage == Barrage.idBarrage)\
            .join(Region, Barrage.idRegion == Region.idRegion)\
            .filter(Stocks.Date_Stock.between(start_date, end_date))\
            .filter(Region.Nom == 'S/T Cap-Bon').group_by(Stocks.Date_Stock)\
            .order_by(Stocks.Date_Stock).all()
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
        stocks_data = response["stocks"]
        last_stock = stocks_data[-1]
        stock = last_stock['Valeur_Stock']
        date_object = datetime.strptime(date, '%d-%m-%Y')
        if dam_id == 'Tous les barrages':
        # Retrieve the sum of data for all dams
            capacity = db.session.query(func.sum(Barrage.cap_utile_actuelle)).scalar()
            taux = (stock/capacity)*100
        elif dam_id =='Barrages S/T Nord':
            print("hello")
            capacity = db.session.query(func.sum(Barrage.cap_utile_actuelle))\
            .join(Region, Barrage.idRegion == Region.idRegion)\
            .filter(Region.Nom == 'S/T Nord').scalar()
            print(capacity)
        elif dam_id =='Barrages S/T Centre':
            capacity = db.session.query(func.sum(Barrage.cap_utile_actuelle))\
            .join(Region, Barrage.idRegion == Region.idRegion)\
            .filter(Region.Nom == 'S/T Centre').scalar()
        elif dam_id =='Barrages S/T Cap-Bon': 
            capacity = db.session.query(func.sum(Barrage.cap_utile_actuelle))\
            .join(Region, Barrage.idRegion == Region.idRegion)\
            .filter(Region.Nom == 'S/T Cap-Bon').scalar()
        else:
            capacity = db.session.query(Barrage.cap_utile_actuelle)\
            .filter(Barrage.idBarrage == int(dam_id)).scalar()
            
        capacity = Decimal(capacity)
        taux = (stock/capacity)*100
        taux = round(taux, 1)
        return ([taux])
    