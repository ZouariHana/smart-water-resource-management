from flask import Flask,request, jsonify
from app import app,db
from datetime import datetime

import pickle
import numpy as np

# Load the model from the saved pickle file
model = pickle.load(open('model.pkl', 'rb'))

# Endpoint for making predictions
@app.route('/predict', methods=['POST'])
def predict():
    # Get the date from the request
    date_string = request.json['date']
    date_format = '%Y-%m-%d' 
    try:
        date = datetime.strptime(date_string, date_format).date()
    except ValueError:
        return jsonify({'error': 'Invalid date format. Please use yyyy-mm-dd.'})
    
    # Find the index of the date in the DataFrame
    df_test = pickle.load(open('model.pkl', 'rb')) 
    try:
        date_index = df_test.loc[df_test['Date'] == date.strftime(date_format)].index[0]
    except IndexError:
        return jsonify({'error': 'No prediction found for the given date.'})
    
    # Get the prediction for the given date
    prediction = float(df_test.iloc[date_index]['Predictions'])
    
    # Return the prediction as a JSON response
    return jsonify({'prediction': prediction})
    
   
    