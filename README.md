
# API For Mercedes-Benz.io

### Efim Shliamin

## Overview

This project provides a web application that allows users to search for museums around a specified address within a given radius. The application uses a backend API to fetch museum data and displays the results on an interactive map.

## Frontend

The frontend of this project is built using HTML, CSS, and JavaScript. The interactive map is implemented using the [Leaflet](https://leafletjs.com/) library. The search functionality is powered by AJAX requests to the backend API.

### Key Features
- User inputs an address and search radius.
- The application converts the address to geographic coordinates.
- An interactive map displays markers for each museum found within the search radius.
- The search radius is visually represented on the map.

### Libraries and Frameworks
- Leaflet.js: For interactive maps.
- OpenStreetMap: For map tiles and geocoding.
- HTML/CSS: For structuring and styling the webpage.
- JavaScript: For client-side logic and AJAX requests.

## Backend

The backend of this project is built using [Flask](https://flask.palletsprojects.com/), a lightweight WSGI web application framework in Python. The backend API handles requests from the frontend to fetch museum data based on geographic coordinates.

### Key Features
- Endpoint `/museums`: Accepts latitude, longitude, and radius as query parameters and returns a list of museums within the specified radius.
- Uses the [Overpass API](https://overpass-api.de/) to fetch museum data from OpenStreetMap.

### Libraries and Frameworks
- Flask: For building the web server and API.
- Requests: For making HTTP requests to the Overpass API.
- Flask-CORS: For handling Cross-Origin Resource Sharing (CORS).

## How It Works

1. **User Input**: The user inputs an address and a search radius on the frontend.
2. **Geocoding**: The frontend sends a request to the Nominatim API to convert the address into geographic coordinates (latitude and longitude).
3. **API Request**: The frontend sends the coordinates and radius to the backend API endpoint `/museums`.
4. **Data Fetching**: The backend API uses the Overpass API to fetch data about museums within the specified radius.
5. **Data Display**: The frontend receives the list of museums and displays them as markers on the Leaflet map, with a circle representing the search radius.

## How to Run

### Prerequisites

- Python 3.x
- Flask
- Requests
- Flask-CORS

## Usage

1. Open the web application in a browser.
2. Enter an address and a search radius.
3. Click the "Search" button to view museums on the map within the specified radius.

