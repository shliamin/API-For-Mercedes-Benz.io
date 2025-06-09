// Initialize the map
document.addEventListener("DOMContentLoaded", function() {
    var map = L.map('map').setView([52.5200, 13.4050], 13); // Default to Berlin
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    var searchCircle; // Variable to hold the search radius circle

    // Function to find generic places
    async function findPlaces() {
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
                fillColor: 'blue',
                fillOpacity: 0.2,
                radius: radius // Radius in meters
            }).addTo(map);

            // Fetch places from your API
            var apiResponse = await fetch(`https://geocodingapi-7cc21820406a.herokuapp.com/places?lat=${lat}&lon=${lon}&radius=${radius}`);
            var places = await apiResponse.json();

            // Clear existing markers
            map.eachLayer(function (layer) {
                if (layer instanceof L.Marker) {
                    map.removeLayer(layer);
                }
            });

            // Add markers for each place
            places.forEach(function (place) {
                var name = place.tags && place.tags.name ? place.tags.name : 'Unnamed';
                var marker = L.marker([place.lat, place.lon]).addTo(map);
                var email = place.tags && place.tags.email ? 'Email: ' + place.tags.email + '<br>' : '';
                var phone = place.tags && place.tags.phone ? 'Phone: ' + place.tags.phone + '<br>' : '';
                var website = place.tags && place.tags.website ? '<a href="' + place.tags.website + '" target="_blank">Website</a>' : '';
                marker.bindPopup(`<b>${name}</b><br>${email}${phone}${website}`);
            });
        } else {
            alert('Address not found');
        }
    }

    // Make findPlaces function available globally
    window.findPlaces = findPlaces;
});
