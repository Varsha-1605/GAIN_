from flask import Flask, request, jsonify
import joblib
import pandas as pd
from flask_cors import CORS
import os

# Load the model
try:
    print(f"Current working directory: {os.getcwd()}")
    print(f"Files in current directory: {os.listdir()}")
    model = joblib.load('investment_model.pkl')
    print("Model loaded successfully")
except Exception as e:
    print(f"Error loading model: {str(e)}")

app = Flask(__name__)
CORS(app)

def get_investment_advice(model, user_inputs):
    try:
        # Convert user inputs to DataFrame
        user_data = pd.DataFrame([user_inputs])

        # Make prediction using the model
        predictions = model.predict(user_data)
        advice = predictions[0]
        return advice
    except Exception as e:
        print(f"Error in get_investment_advice: {e}")
        raise

@app.route('/predict/stock', methods=['POST'])
def predict():
    try:
        # Retrieve and validate input data
        data = request.get_json()
        required_fields = ['Age_Group', 'Risk_Level', 'Amount_to_Invest', 'Investment_Term', 'Diversity_Option']

        if not all(field in data for field in required_fields):
            return jsonify({'error': 'Missing required fields'}), 400
        
        # Prepare user inputs
        user_inputs = {
            'Age_Group': data.get('Age_Group'),
            'Risk_Level': data.get('Risk_Level'),
            'Amount_to_Invest': data.get('Amount_to_Invest'),
            'Investment_Term': data.get('Investment_Term'),
            'Diversity_Option': data.get('Diversity_Option')
        }
        
        # Get investment advice
        advice = get_investment_advice(model, user_inputs)
        return jsonify({'Investment Advice': advice})
    
    except KeyError as e:
        return jsonify({'error': f'Missing field: {e}'}), 400
    except Exception as e:
        print(f"Error in predict endpoint: {e}")
        return jsonify({'error': 'An internal error occurred'}), 500

if __name__ == '__main__':
    host = os.getenv('HOST', '0.0.0.0')
    port = int(os.getenv('PORT', 5002))
    app.run(host=host, port=port, debug=False)
