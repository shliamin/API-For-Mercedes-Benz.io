from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import os

app = Flask(__name__)
CORS(app)

OVERPASS_URL = "http://overpass-api.de/api/interpreter"
OVERPASS_QUERY = '[out:json];node(around:{radius},{lat},{lon})[tourism=museum];out;'

@app.route('/museums', methods=['GET'])
def get_museums():
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
    museums = []
    for element in data['elements']:
        tags = element.get("tags", {})
        museums.append({
            "id": element.get("id"),
            "lat": element.get("lat"),
            "lon": element.get("lon"),
            "name": tags.get("name"),
            "email": tags.get("email"),
            "fee": tags.get("fee"),
            "image": tags.get("image"),
            "opening_hours": tags.get("opening_hours"),
            "phone": tags.get("phone"),
            "website": tags.get("website"),
            "wheelchair": tags.get("wheelchair"),
            "wikidata": tags.get("wikidata"),
            "wikimedia_commons": tags.get("wikimedia_commons"),
            "wikipedia": tags.get("wikipedia")
        })

    return jsonify(museums)

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=True)
