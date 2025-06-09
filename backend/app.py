from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import os

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

OVERPASS_URL = "http://overpass-api.de/api/interpreter"
# Query all nodes within the given radius around the coordinates
OVERPASS_QUERY = '[out:json];node(around:{radius},{lat},{lon});out;'

@app.route('/places', methods=['GET'])
def get_places():
    lat = request.args.get('lat')
    lon = request.args.get('lon')
    radius = request.args.get('radius', default=5000, type=int)
    
    if not lat or not lon:
        return jsonify({"error": "Please provide both latitude and longitude"}), 400

    query = OVERPASS_QUERY.format(lat=lat, lon=lon, radius=radius)
    response = requests.get(OVERPASS_URL, params={'data': query})

    if response.status_code != 200:
        return jsonify({"error": "Error fetching data from Overpass API"}), 500

    data = response.json()
    places = []
    for element in data['elements']:
        tags = element.get("tags", {})
        places.append({
            "id": element.get("id"),
            "lat": element.get("lat"),
            "lon": element.get("lon"),
            "tags": tags
        })

    return jsonify(places)

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=True)
