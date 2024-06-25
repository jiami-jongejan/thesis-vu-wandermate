from flask import Flask, request, jsonify
from flask_cors import CORS
import logging
import os
from openai import AzureOpenAI
from trip import Trip

app = Flask(__name__)
CORS(app)

@app.route('/submit_form', methods=['POST'])
def submit_form():
    trip = Trip()

    logging.info('Processing a request.')

    try:
        req_body = request.json
    except ValueError:
        return jsonify({"message": "Invalid JSON"}), 400

    trip.startDate = req_body.get('startDate')
    trip.endDate = req_body.get('endDate')
    trip.interests = req_body.get('interests')
    trip.countries = req_body.get('countries')
    trip.isSustainable = req_body.get('isSustainable')

    openai_client = AzureOpenAI(
        azure_endpoint=os.environ['OPENAI_ENDPOINT'],
        api_key=os.environ['OPENAI_API_KEY'],
        api_version="2023-03-15-preview"
    )

    chat_deployment_name = "wandermate-openai4"
    question = trip.generate_question()

    response = openai_client.chat.completions.create(
        model=chat_deployment_name,
        messages=[
            {
                "role": "user",
                "content": question
            }
        ]
    )

    res = response.choices[0].message.content
    res = res[res.find('['):res.rfind(']') + 1]
    return jsonify({"message": "Data received", "res": res}), 200

if __name__ == '__main__':
    app.run(debug=True)
