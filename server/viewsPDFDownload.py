from flask import jsonify, Flask, request, make_response
from app import app,db
from Model import *
import pdfkit


@app.route('/barrage/<date>')
def situation(date):
    data = db.session.query(
        Barrage.Nom,
        Barrage.AnneeMiseEnService,
        Region.Nom,
        Barrage.Bassin,
        Barrage.volume_regul_calcule,
        Barrage.cote,
        Barrage.debit,
        Barrage.cap_utile_actuelle,
        Apports.valeur_apport,
        Lachers.valeur_lacher,
        Lachers.utilisation,
        Stocks.Valeur_Stock,
        Pluv.valeur_Pluv,
        RS.valeur_RS
    ).join(Region).join(Apports).join(Lachers).join(Stocks).outerjoin(Pluv).outerjoin(RS).filter(
        Stocks.Date_Stock == date,
        Lachers.date_lacher == date,
        Apports.date_apport == date,
        (Pluv.date_Pluv == date) | (Pluv.date_Pluv == None),
        (RS.date_RS == date) | (RS.date_RS == None),
    ).all()

    json_data = []
    for row in data:
        json_data.append({
            'Nom': row[0],
            'AnneeMiseEnService': row[1],
            'Region': row[2],
            'Bassin': row[3],
            'volume_regul_calcule': row[4],
            'cote': row[5],
            'debit': row[6],
            'cap_utile_actuelle': row[7],
            'valeur_apport': row[8],
            'valeur_lacher': row[9],
            'utilisation': row[10],
            'Valeur_Stock': row[11],
            'valeur_Pluv': row[12],
            'valeur_RS': row[13]
        })

    return jsonify(json_data)


@app.route('/down', methods=['POST', 'GET'])
def generate_pdf():
    html = request.json['html'] # get the HTML page from the request data
    print(html)
    pdf = pdfkit.from_string(html, False, configuration=pdfkit.configuration(wkhtmltopdf='C:/Program Files/wkhtmltopdf/bin/wkhtmltopdf.exe'))
   
    response = make_response(pdf)

    response.headers['Content-Type'] = 'application/pdf'
    response.headers['Content-Disposition'] = 'attachment; filename=situation_hydraulique.pdf' # set the filename of the PDF file

    return response