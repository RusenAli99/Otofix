from flask import Flask, request, jsonify
import joblib
import numpy as np

app = Flask(__name__)

# Modeli ve encoderları yükle
model = joblib.load('car_price_model.pkl')
le_marka = joblib.load('le_marka.pkl')
le_model = joblib.load('le_model.pkl')
le_yakit = joblib.load('le_yakit.pkl')
le_vites = joblib.load('le_vites.pkl')

@app.route('/', methods=['GET'])
def home():
    return "🚗 OtoFix Price Prediction API Çalışıyor!"

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()

    marka = le_marka.transform([data['Marka']])[0]
    model_adi = le_model.transform([data['Model']])[0]
    yil = data['Yıl']
    yakit = le_yakit.transform([data['YakıtTipi']])[0]
    vites = le_vites.transform([data['VitesTipi']])[0]
    km = data['Kilometre']

    input_data = np.array([[marka, model_adi, yil, yakit, vites, km]])

    pred_price = model.predict(input_data)[0]

    return jsonify({'estimated_price': int(pred_price)})

if __name__ == '__main__':
    app.run(debug=True)
