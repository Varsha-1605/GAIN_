from flask import Flask, request, jsonify
import pandas as pd
import numpy as np
from sklearn.preprocessing import MinMaxScaler
from sklearn.model_selection import train_test_split
from tensorflow.keras.models import Sequential, load_model
from tensorflow.keras.layers import LSTM, Dense
from tensorflow.keras.optimizers import Adam
import os
from dotenv import load_dotenv
from flask_cors import CORS
import threading
import logging

# Set up logging
logging.basicConfig(level=logging.INFO)

# Load environment variables from .env file
load_dotenv()

np.seterr(invalid='ignore')  # Ignore invalid (NaN) values

app = Flask(__name__)
CORS(app, supports_credentials=True)

# Load and prepare the data
df = pd.read_csv('complete_data.csv')
df['Date'] = pd.to_datetime(df['Date'], format='mixed')
df = df.sort_values(['Company', 'Date'])

# Create target variable (1 if price went up, 0 if down)
df['Target'] = (df.groupby('Company')['Close'].shift(-1) > df['Close']).astype(int)

# Select features for the model
features = ['Open', 'High', 'Low', 'Close', 'Adj Close', 'Volume', 'Sentiment']

# Handle null values
def handle_nulls(group):
    for feature in features:
        if group[feature].isnull().any():
            group[feature] = group[feature].fillna(group[feature].median())
    return group

df = df.groupby('Company').apply(handle_nulls).reset_index(drop=True)

# Normalize the features
scaler = MinMaxScaler()
df[features] = scaler.fit_transform(df[features])

# Function to create sequences
def create_sequences(data, seq_length):
    X, y = [], []
    for i in range(len(data) - seq_length):
        X.append(data.iloc[i:(i + seq_length)][features].values)
        y.append(data.iloc[i + seq_length]['Target'])
    return np.array(X), np.array(y)

# Prepare data for each company
sequence_length = 10  # You can adjust this
company_models = {}
models_dir = 'models'

if not os.path.exists(models_dir):
    os.makedirs(models_dir)

def get_model(company):
    if company not in company_models:
        model_path = os.path.join(models_dir, f'{company}.h5')
        if os.path.exists(model_path):
            logging.info(f"Loading model for {company}")
            company_models[company] = load_model(model_path)
        else:
            logging.warning(f"Model not found for {company}")
            return None
    return company_models[company]

def load_company_models_background():
    logging.info("Starting background model loading")
    for company in df['Company'].unique():
        if pd.isna(company):
            logging.warning("Skipping NaN company name")
            continue
        
        logging.info(f"Processing company: {company}")
        company_data = df[df['Company'] == company]
        logging.info(f"Company data shape: {company_data.shape}")
        
        if len(company_data) <= sequence_length:
            logging.warning(f"Skipping {company} due to insufficient data")
            continue
        
        model_path = os.path.join(models_dir, f'{company}.h5')
        
        if os.path.exists(model_path):
            logging.info(f"Model exists for {company}")
        else:
            try:
                X, y = create_sequences(company_data, sequence_length)
                logging.info(f"Sequences created. X shape: {X.shape}, y shape: {y.shape}")
                
                # Split into train and test sets
                X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
                
                # Create and compile the model
                model = Sequential([
                    LSTM(50, activation='relu', input_shape=(sequence_length, len(features))),
                    Dense(1, activation='sigmoid')
                ])
                model.compile(optimizer=Adam(learning_rate=0.001), loss='binary_crossentropy', metrics=['accuracy'])
                
                # Train the model
                model.fit(X_train, y_train, epochs=50, batch_size=32, validation_split=0.1, verbose=0)
                
                # Evaluate the model
                loss, accuracy = model.evaluate(X_test, y_test, verbose=0)
                logging.info(f"{company} - Test Accuracy: {accuracy:.4f}")
                
                # Save the model
                model.save(model_path)
                
            except Exception as e:
                logging.error(f"Error processing {company}: {str(e)}")
                continue
    logging.info("Finished background model loading")

# Start background loading
threading.Thread(target=load_company_models_background).start()

def predict_stock_movement(company, latest_data):
    model = get_model(company)
    if model is None:
        return "Company model not found."
    
    # Ensure we're only using the specified features
    latest_data_features = latest_data[features]
    
    # Scale the data
    latest_data_scaled = scaler.transform(latest_data_features)
    
    # Reshape for LSTM input (samples, time steps, features)
    sequence = latest_data_scaled.reshape(1, sequence_length, len(features))
    
    prediction = model.predict(sequence)[0, 0]
    
    return "Up" if prediction > 0.51 else "Down"

@app.route('/warmup')
def warmup():
    return "OK", 200

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    company_name = data.get('company')
    
    if not company_name:
        return jsonify({"error": "Company name is required"}), 400
    
    latest_data = df[df['Company'] == company_name].tail(sequence_length)
    
    if latest_data.empty:
        return jsonify({"error": "Company not found or insufficient data"}), 404
    
    prediction = predict_stock_movement(company_name, latest_data)
    return jsonify({"company": company_name, "prediction": prediction})

if __name__ == '__main__':
    host = os.getenv('HOST', '0.0.0.0')
    port = int(os.getenv('PORT', 5005))
    logging.info(f"Starting application on {host}:{port}")
    app.run(host=host, port=port, debug=False)
