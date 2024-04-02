from flask import Flask, request, jsonify
from model import predict

app = Flask(__name__)

@app.route('/model/predict', methods=['POST'])
def model_predict():
    request_data = request.get_json()
    print(request_data)
    if not request_data:
        return jsonify({"error": "No data provided"}), 400
    data = request_data.get('data')
    if not data:
        return jsonify({"error": "Data field missing in payload"}), 400
    prediction = predict(data)
    return jsonify({'condition': prediction})

if __name__ == '__main__':
    app.run(debug=True)
