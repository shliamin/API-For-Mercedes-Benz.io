Test assignment for mercedes-benz.io by Efim Shliamin.

This is the app that creates JSON application programming interfaces based on the latitude and longitude requests to help you build your geocoding-software.

The application uses MapBox JSON-APIs and returns a JSON-file with all museums near the given geographic coordinates.

First of all, MapBox JSON-API is used here to get all info in a given bbox about museums. The latitude and longitude are taken and increased / decreased by +/- 0.3 in order to set bbox values.

Postcodes and right addresses are searched for by the returned JSON-file.

The 'Request' model is created in the database, in which all user requests are recorded so that you can later see the search history.

The user’s last request is always used to create a url and get actual info from the MapBox.

A temporary JSON-file of all museums is created in the database, shown to the user and automatically deleted from the database. This is because the application is used only for demonstration. For real use, the code needs to be improved.
