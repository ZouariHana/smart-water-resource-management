from flask import Flask,request,redirect,flash,session , jsonify,render_template,url_for
from flask_bcrypt import Bcrypt
from app import app,db
from Model import  Utilisateur, Barrage,Lachers,Apports,Stocks,Ichkel,Pluv,Admin1,RS
from flask_session import Session
from flask_admin import Admin
from flask_admin.contrib.sqla import ModelView 
from datetime import datetime
from flask_mail import Mail , Message 
from flask_jwt_extended import jwt_required, get_jwt_identity, JWTManager






bcrypt = Bcrypt(app)


app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 465
app.config['MAIL_USE_SSL'] = True
app.config['MAIL_USERNAME'] = 'imen.rjab@ensi-uma.tn'
app.config['MAIL_PASSWORD'] = '26648680'
app.config['JWT_TOKEN_LOCATION'] = ['headers', 'cookies']
jwt = JWTManager(app)

mail=Mail(app)


@app.route('/send-email', methods=['POST'])
def send_email():
    admin_email = request.json.get('adminEmail')
    admin_password = request.json.get('adminPassword')
    recipient_email = request.json.get('recipientEmail')
    recipient_password = request.json.get('recipientPassword')
    
    if not all([admin_email, admin_password, recipient_email, recipient_password]):
        return jsonify({'error': 'Missing email or password parameters.'}), 400
    
    
    subject = 'Login Credentials for Agent Account'
    body = f"Dear Agent,\n\nYour login credentials are as follows:\nEmail: {recipient_email}\nPassword: {recipient_password}\n\nPlease use these credentials to log in as an agent.\n\nBest regards,\nThe Admin Team"
    
    message = Message(subject, sender=admin_email, recipients=[recipient_email])
    message.body = body

    try:
        with app.app_context():
            mail.send(message)
            return jsonify({'message': 'Email sent successfully!'})
    except Exception as e:
        print(str(e))
        return jsonify({'error': 'Failed to send email.'}), 500  





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
    nomBarrage   = request.json["nomBarrage"]  
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

    identique = Barrage.query.filter(Barrage.Nom == nomBarrage).first()
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
    
    
@app.route("/admin/agent-page")
def agent_page():
    barrage_id = session.get("barrage_id")
    barrage = Barrage.query.get(barrage_id)
    if not barrage:
        return "Barrage not found."
    return render_template("agent-page.html", barrage_nom=barrage.Nom)



@app.route("/login", methods=["POST"])
def login_user():
    email = request.json.get("email")
    password = request.json.get("password")

    admin = Admin1.query.filter_by(email=email).first()
    if admin:
        if not bcrypt.check_password_hash(admin.password, password):
            return jsonify({"error": "Unauthorized"}), 401
        session["admin_id"] = admin.idAdmin
        return jsonify({
            "id": admin.idAdmin,
            "email": admin.email,
            "user_type": "admin" 
        }),200  

    user = Utilisateur.query.filter_by(email=email).first()
    if user:
        if user.password != password:
            return jsonify({"error": "Unauthorized"}), 401
        session["user_id"] = user.idUser 
        return jsonify({
            "id": user.idUser,
            "email": user.email,
            "user_type": "utilisateur"
        }),200

    return jsonify({"error": "Unauthorized"}), 401 



@app.route('/agent', methods=['GET'])
def get_agent_info():
    idUser = session.get('user_id')
    if idUser is None:
        return jsonify({'error': 'Not logged in'}), 401

    agent = Utilisateur.query.filter_by(idUser=idUser).first()
    if not agent:
        return jsonify({'error': 'Agent not found'}), 404

    barrage = Barrage.query.filter_by(idBarrage=agent.idBarrage).first()
    return jsonify({
        'idUser': agent.idUser,
        'nom': agent.Nom,
        'prenom': agent.Prenom,
        'email': agent.email,
        'idBarrage': agent.idBarrage,
        'nomBarrage': barrage.Nom if barrage else None
    }), 200
    

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

@app.route("/getAdmin", methods=["GET"])
def get_admin():
    users = Admin1.query.all()
    result = []
    for user in users:
        admin_data = {
            "id": user.idAdmin,
            "email": user.email,
            "password":user.password,
            # Add any other fields you want to include in the response
        }
        result.append(admin_data)
    return jsonify(result)


@app.route('/Barrage/<int:idBarrage>', methods=['GET'])
def get_barrage(idBarrage):
    barrage = Barrage.query.get_or_404(idBarrage)
    barrage_data = {
        'idBarrage': barrage.idBarrage,
        'Nom': barrage.Nom,
        'Bassin': barrage.Bassin,
        'cote': barrage.cote,
        'cap_utile_actuelle': barrage.cap_utile_actuelle,
        'AnneeMiseEnService': barrage.AnneeMiseEnService,
        'Latitude': barrage.Latitude,
        'Longitude': barrage.Longitude,
        'volume_regul_calcule': barrage.volume_regul_calcule,
        'debit': barrage.debit,
        'idRegion': barrage.idRegion,
        # Add any other fields you want to include in the response
    }
    return jsonify(barrage_data)
 
 
 
@app.route("/updateAgent/<int:user_id>", methods=["PUT"])
def update_agent(user_id):
    user = Utilisateur.query.get(user_id)
    nom_barrage = request.json.get("nom_barrage")
    nom = request.json.get("nom")
    prenom = request.json.get("prenom")
    email = request.json.get("email")
    password = request.json.get("password")
    
    if nom_barrage is not None:
        identique = Barrage.query.filter(Barrage.Nom == nom_barrage).first()
        if identique is None:
            return jsonify({"error": "Le barrage n'existe pas."}), 409
        user.idBarrage = identique.idBarrage
    
    if nom is not None:
        user.Nom = nom
    
    if prenom is not None:
        user.Prenom = prenom
    
    if email is not None:
        user.email = email
    
    if password is not None:
        user.password = password
    
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
        password=password
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
    
    
    

@app.route('/create_admin', methods=['POST'])
def create_admin():
    email = request.json.get('email')
    password = request.json.get('password')
    
    # Check if email already exists
    user_exists = Admin1.query.filter_by(email=email).first() is not None
    if user_exists:
        return jsonify({'error': 'Admin already exists'}), 409
    
    # Create the new agent
    new_admin = Admin1(
        email=email,
        password=bcrypt.generate_password_hash(password)   
    )
    
    # Add the new agent to the database
    db.session.add(new_admin)
    db.session.commit()
    
    return jsonify({
        'id': new_admin.idAdmin,
        'email': new_admin.email,
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
    

@app.route("/deleteAdmin/<int:user_id>", methods=["DELETE"])
def delete_admin(user_id):
    user = Admin1.query.get(user_id)
    if not user:
        return jsonify({"error": "Admin not found"}), 404
    
    db.session.delete(user)
    db.session.commit() 
    
    flash('Admin deleted successfully')
    return jsonify({
        "message":"Admin deleted successfully"
    }), 200

@app.route("/updateAdmin/<int:user_id>", methods=["PUT"])
def update_admin(user_id):
    user = Admin1.query.get(user_id)
    if not user:
        return jsonify({"error": "Admin not found"}), 404
    
    data = request.json
    user.email = data.get('email')
    user.password = data.get('password')
    
    db.session.commit() 
    
    flash('Admin updated successfully')
    return jsonify({
        "message":"Admin updated successfully"
    }), 200



@app.route("/logout", methods=["POST"])
def logout_user():
    if "user_id" in session:
        session.pop("user_id")
    return "200"

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

if __name__ == "__main__":
    app.run(debug=True)