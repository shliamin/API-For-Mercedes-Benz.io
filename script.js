// Initialize the map
var map = L.map('map').setView([52.5200, 13.4050], 13); // Default to Berlin
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Function to find museums
async function findMuseums() {
    var address = document.getElementById('address').value;
    var radius = document.getElementById('radius').value;

    // Convert address to latitude and longitude
    var geoResponse = await axios.get(`https://nominatim.openstreetmap.org/search?format=json&q=${address}`);
    if (geoResponse.data.length > 0) {
        var lat = geoResponse.data[0].lat;
        var lon = geoResponse.data[0].lon;

        // Center the map on the provided location
        map.setView([lat, lon], 13);

        // Fetch museums from your API
        var apiResponse = await axios.get(`https://geocodingapi-7cc21820406a.herokuapp.com/museums?lat=${lat}&lon=${lon}&
