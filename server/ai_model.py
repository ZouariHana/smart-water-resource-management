import pandas as pd 
import numpy as np
import datetime
import tensorflow as tf
from tensorflow import keras
from flask import Flask,request, jsonify
from app import app,db




import warnings
import pickle
warnings.filterwarnings("ignore")

df = pd.read_csv('data2016--2022forSUMALL.csv')
df = df[['date','stock']]

def str_to_datetime(s):
  split = s.split('-')
  year,month,day = int(split[0]), int(split[1]) ,  int(split[2])
  return datetime.datetime(year=year,month=month , day=day) 



df['date']= df['date'].apply(str_to_datetime)


df.index = df.pop('date')


def df_to_windowed_df(dataframe, first_date_str, last_date_str, n=3):
  first_date = str_to_datetime(first_date_str)
  last_date  = str_to_datetime(last_date_str)

  target_date = first_date
  
  dates = []
  X, Y = [], []

  last_time = False
  while True:
    df_subset = dataframe.loc[:target_date].tail(n+1)
    
    if len(df_subset) != n+1:
      print(f'Error: Window of size {n} is too large for date {target_date}')
      return

    values = df_subset['stock'].to_numpy()
    x, y = values[:-1], values[-1]

    dates.append(target_date)
    X.append(x)
    Y.append(y)

    next_week = dataframe.loc[target_date:target_date+datetime.timedelta(days=7)]
    next_datetime_str = str(next_week.head(2).tail(1).index.values[0])
    next_date_str = next_datetime_str.split('T')[0]
    year_month_day = next_date_str.split('-')
    year, month, day = year_month_day
    next_date = datetime.datetime(day=int(day), month=int(month), year=int(year))
    
    if last_time:
      break
    
    target_date = next_date

    if target_date == last_date:
      last_time = True
    
  ret_df = pd.DataFrame({})
  ret_df['Target Date'] = dates
  
  X = np.array(X)
  for i in range(0, n):
    X[:, i]
    ret_df[f'Target-{n-i}'] = X[:, i]
  
  ret_df['Target'] = Y

  return ret_df

# Start day second time around: '2021-03-25'
windowed_df= df_to_windowed_df(df, 
                                '2016-01-04', 
                                '2022-12-31', 
                                n=3)


def windowed_df_to_date_X_y(windowed_dataframe):
    df_as_np= windowed_dataframe.to_numpy()

    dates = df_as_np[:, 0]

    middle_matrix = df_as_np[:, 1:-1]
    X = middle_matrix.reshape((len(dates), middle_matrix.shape[1], 1)) 
   
    Y = df_as_np[:, -1]
    return dates, X.astype(np.float32), Y.astype(np.float32)

dates, X, y = windowed_df_to_date_X_y(windowed_df)


q_80 = int(len(dates) * .8)
q_90 = int(len(dates) * .9)

dates_train, X_train, y_train = dates[:q_80], X[:q_80], y[:q_80]

dates_val, X_val, y_val = dates[q_80:q_90], X[q_80:q_90], y[q_80:q_90]
dates_test, X_test, y_test = dates[q_90:], X[q_90:], y[q_90:]




model = keras.Sequential([keras.layers.Input((3, 1)),
                          keras.layers.LSTM(64),
                          keras.layers.Dense(32, activation='relu'),
                          keras.layers.Dense(32, activation='relu'),
                          keras.layers.Dense(1)])

model.compile(loss='mse', 
              optimizer=tf.optimizers.Adam(learning_rate=0.001),
              metrics=['mean_absolute_error'])

model.fit(X_train, y_train, validation_data=(X_val, y_val), epochs=100)


test_predictions = model.predict(X_test).flatten() 

test_predictions = model.predict(X_test)

pickle.dump(test_predictions,open('model.pkl','wb')) 

# Create a DataFrame with dates for the year 2023
dates_2023 = pd.date_range('2023-01-01', '2030-12-31')

# Create a DataFrame with the inputs for the model
X_2023 = pd.DataFrame({'dayofweek': dates_2023.dayofweek,
                       'dayofyear': dates_2023.dayofyear,
                       'quarter':   dates_2023.quarter})


# Reshape the input data for the model
X_2023 = X_2023.values.reshape((-1, 3, 1))

# Use the model to make predictions on the input data
predictions_2023 = model.predict(X_2023).flatten()

# Create a DataFrame with the predictions
df_predictions_2023 = pd.DataFrame({'date': dates_2023, 'stock_value': predictions_2023})

with open('model.pkl', 'wb') as f:
    pickle.dump(df_predictions_2023, f)   
    
# Load the predictions for 2023 from the pickled file
with open('model.pkl', 'rb') as f:
    df_predictions_2023 = pickle.load(f)
print(df_predictions_2023)  




