from flask import Flask,request,redirect,flash,session , jsonify,render_template,url_for
from flask_bcrypt import Bcrypt
from app import app,db
from Model import  Utilisateur, Barrage,Lachers,Apports,Stocks,Ichkel,Pluv,Admin1,RS
from flask_session import Session
from flask_admin import Admin
from flask_admin.contrib.sqla import ModelView
from datetime import datetime


bcrypt = Bcrypt(app)




@app.route("/@me")
def get_current_user():
    user_id = session.get("user_id")
    
    if not user_id:
        return jsonify({"error": "Unauthorized"}), 401
    
    user_type = session.get("user_type")
    
    if user_type == "admin":
        user = Admin1.query.filter_by(id=user_id).first()
        return jsonify({
            "id": user.id,
            "email": user.email,
            "type": user_type
        })
    elif user_type == "utilisateur":
        user = Utilisateur.query.filter_by(id=user_id).first()
        return jsonify({
            "id": user.id,
            "email": user.email,
            "type": user_type
        })
    else:
        return jsonify({"error": "Unknown user type"}), 400
    
    
@app.route("/gestionAgent",methods=["POST"])
def taches_agent():
    nom_barrage   = request.json["nom_barrage"]  
    valeur_lacher = request.json["valeur_lacher"]
    utilisation = request.json["utilisation"]
    valeur_apport = request.json["valeur_apport"]
    Valeur_Stock = request.json["Valeur_Stock"]
    valeur_lachIch = request.json["valeur_lachIch"]
    valeur_RS = request.json["valeur_RS"]
    valeur_Pluv  = request.json["valeur_Pluv"]
    date = request.json["date"]
    date_obj = datetime.strptime(date, '%d-%m-%Y')
    formatted_date = date_obj.strftime('%Y-%m-%d')

    identique = Barrage.query.filter(Barrage.Nom == nom_barrage).first()
    if identique is None:
      return jsonify({"error": "Le barrage n'existe pas."}), 409
    else:
       barrage_id = identique.idBarrage
    
    new_lacher = Lachers(idBarrage=barrage_id,valeur_lacher=valeur_lacher,utilisation=utilisation,date_lacher=formatted_date)
    db.session.add(new_lacher )
    db.session.commit()
    
    session["lacher_id"] = new_lacher.idLacher
    
    new_apport = Apports(idBarrage=barrage_id, valeur_apport= valeur_apport,  date_apport =formatted_date)
    db.session.add(new_apport)
    db.session.commit()
    
    session["apport_id"] = new_apport.idApport
    
    
    new_stock = Stocks(idBarrage=barrage_id,Valeur_Stock =Valeur_Stock , Date_Stock=formatted_date)
    db.session.add(new_stock)
    db.session.commit()
    
    session["stock_id"] = new_stock. idStock
    
    
    new_ichkel = Ichkel(valeur_lachIch=valeur_lachIch,Date_LachIch=formatted_date)
    db.session.add(new_ichkel )
    db.session.commit()
    
    session["ichkel_id"] = new_ichkel.ID_lachIch
    
    
    new_rs = RS(idBarrage=barrage_id, valeur_RS= valeur_RS ,date_RS=formatted_date)
    db.session.add(new_rs )
    db.session.commit()
    
    session["rs_id"] = new_rs. idRS
    
    
    
    new_pluv = Pluv(idBarrage=barrage_id,valeur_Pluv=valeur_Pluv,date_Pluv =formatted_date)
    db.session.add(new_pluv )
    db.session.commit()
    
    session["pluv_id"] = new_pluv.idPluv
    
    return jsonify({
        "idBarrage": barrage_id,
        "valeur_lacher": valeur_lacher,
        "utilisation": utilisation ,
        "valeur_apport": valeur_apport,
        "Valeur_Stock" :Valeur_Stock,
        "valeur_lachIch": valeur_lachIch,
        "valeur_RS" :  valeur_RS ,
        "valeur_Pluv" : valeur_Pluv ,
        "date": date 
        
    })

    
@app.route("/register",methods=["POST"])
def register_user():
    email = request.json["email"]
    password = request.json["password"]

    user_exists = Admin1.query.filter_by(email=email).first() is not None

    if user_exists:
        return jsonify({"error": "User already exists"}), 409

    hashed_password = bcrypt.generate_password_hash(password)
    new_user = Admin1(email=email, password=hashed_password)
    db.session.add(new_user)
    db.session.commit()
    
    session["user_id"] = new_user.idAdmin
    
   


    

@app.route("/login", methods=["POST"])
def login_user():
    email = request.json.get("email")
    password = request.json.get("password")

    admin = Admin1.query.filter_by(email=email).first()
    if admin:
        if not bcrypt.check_password_hash(admin.password, password):
            return jsonify({"error": "Unauthorized"}), 400
        session["admin_id"] = admin.idAdmin
        return jsonify({
            "id": admin.idAdmin,
            "email": admin.email,
            "user_type": "admin"
        }),200  

    user = Utilisateur.query.filter_by(email=email).first()
    if user:
        if not bcrypt.check_password_hash(user.password,password):
            return jsonify({"error": "Unauthorized"}), 401
        session["user_id"] = user.idUser
        return jsonify({
            "id": user.idUser,
            "email": user.email,
            "user_type": "utilisateur"
        }),200

    return jsonify({"error": "Unauthorized"}), 401

 
 
@app.route("/getAgents", methods=["GET"])
def get_agents():
    users = Utilisateur.query.all()
    result = []
    for user in users:
        agent_data = {
            "id": user.idUser,
            "Nom": user.Nom,
            "Prénom": user.Prenom,
            "email": user.email,
            "idBarrage": user.idBarrage,
            "password":user.password,
            # Add any other fields you want to include in the response
        }
        result.append(agent_data)
    return jsonify(result)
 
 
 
 
@app.route("/updateAgent/<int:user_id>", methods=["PUT"])
def update_agent(user_id):
    user = Utilisateur.query.get(user_id)
    nom_barrage = request.json.get("Nom Barrage")
    nom = request.json.get("Nom")
    prenom = request.json.get("Prénom")
    email = request.json.get("email")
    password = request.json.get("password")
    
    if nom_barrage:
        identique = Barrage.query.filter(Barrage.Nom == nom_barrage).first()
        if identique is None:
            return jsonify({"error": "Le barrage n'existe pas."}), 409
        user.idBarrage = identique.idBarrage
    
    if nom:
        user.Nom = nom
    
    if prenom:
        user.Prenom = prenom
    
    if email:
        user.email = email
    
    if password:
        hashed_password = bcrypt.generate_password_hash(password)
        user.password = hashed_password
    
    db.session.commit()
    flash('Agent Updated Successfully')
    return jsonify({
        "message": "User updated successfully"
    }), 201

   
    
    
@app.route('/create_agent', methods=['POST'])
def create_agent():
    nom_barrage = request.json.get('nom_barrage')
    nom = request.json.get('nom')
    prenom = request.json.get('prenom')
    email = request.json.get('email')
    password = request.json.get('password')
    
    # Check if email already exists
    user_exists = Utilisateur.query.filter_by(email=email).first() is not None
    if user_exists:
        return jsonify({'error': 'Agent already exists'}), 409
    
    # Check if barrage exists
    barrage = Barrage.query.filter_by(Nom=nom_barrage).first()
    if barrage is None:
        return jsonify({'error': 'Le barrage n\'existe pas.'}), 409
    
    # Create the new agent
    new_agent = Utilisateur(
        idBarrage=barrage.idBarrage,
        Nom=nom,
        Prenom=prenom,
        email=email,
        password=bcrypt.generate_password_hash(password)
    )
    
    # Add the new agent to the database
    db.session.add(new_agent)
    db.session.commit()
    
    return jsonify({
        'id': new_agent.idUser,
        'email': new_agent.email,
        'idBarrage': new_agent.idBarrage,
        'nom': new_agent.Nom,
        'prenom': new_agent.Prenom
    }), 201


# Delete an existing user
@app.route("/deleteAgent/<int:user_id>", methods=["DELETE"])
def delete_agent(user_id):
    user = Utilisateur.query.get(user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404
    
    db.session.delete(user)
    db.session.commit() 
    
    flash('Agent deleted successfully')
    return jsonify({
        "message":"User deleted successfully"
    }), 200
  


@app.route("/logout", methods=["POST"])
def logout_user():
    session.pop("user_id")
    return "200"

if __name__ == "__main__":
    app.run(debug=True)

@app.route('/barrages')
def situation1():
    data = db.session.query(
        Barrage.Nom,
        Barrage.Latitude,
        Barrage.Longitude
    ).filter(
        Barrage.Latitude.isnot(None),
        Barrage.Longitude.isnot(None)
    ).all()
    json_data = []
    for row in data:
        json_data.append({
            'Nom': row[0],
            'Latitude': row[1],
            'Longitude': row[2],
        })
    return jsonify(json_data)