// Initialize the map
document.addEventListener("DOMContentLoaded", function() {
    var map = L.map('map').setView([52.5200, 13.4050], 13); // Default to Berlin
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    var searchCircle; // Variable to hold the search radius circle

    // Function to find museums
    async function findMuseums() {
        var address = document.getElementById('address').value;
        var radius = document.getElementById('radius').value;

        // Convert address to latitude and longitude
        var geoResponse = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${address}`);
        var geoData = await geoResponse.json();

        if (geoData.length > 0) {
            var lat = geoData[0].lat;
            var lon = geoData[0].lon;

            // Center the map on the provided location
            map.setView([lat, lon], 13);

            // Remove existing search radius circle if it exists
            if (searchCircle) {
                map.removeLayer(searchCircle);
            }

            // Add new search radius circle
            searchCircle = L.circle([lat, lon], {
                color: 'blue',
                fillColor: '#blue',
                fillOpacity: 0.2,
                radius: radius // Radius in meters
            }).addTo(map);

            // Fetch museums from your API
            var apiResponse = await fetch(`https://geocodingapi-7cc21820406a.herokuapp.com/museums?lat=${lat}&lon=${lon}&radius=${radius}`);
            var museums = await apiResponse.json();

            // Clear existing markers
            map.eachLayer(function (layer) {
                if (layer instanceof L.Marker) {
                    map.removeLayer(layer);
                }
            });

            // Add markers for each museum
            museums.forEach(function (museum) {
                var marker = L.marker([museum.lat, museum.lon]).addTo(map);
                marker.bindPopup(`<b>${museum.name}</b><br>${museum.email ? 'Email: ' + museum.email + '<br>' : ''}${museum.phone ? 'Phone: ' + museum.phone + '<br>' : ''}${museum.website ? '<a href="' + museum.website + '" target="_blank">Website</a>' : ''}`);
            });
        } else {
            alert('Address not found');
        }
    }

    // Make findMuseums function available globally
    window.findMuseums = findMuseums;
});
