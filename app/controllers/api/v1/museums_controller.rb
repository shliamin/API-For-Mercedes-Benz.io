class Api::V1::MuseumsController < Api::V1::BaseController
  def index
    @museums = policy_scope(Museum)

      require 'json'
  require 'open-uri'

  url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/museum.json?bbox=30.283840,59.965217,60.34384,80.025217&limit=10&access_token=pk.eyJ1Ijoic2hsaWFtaW5lZmltIiwiYSI6ImNqdmdnd3ljODA2enU0OG1tMHo3M213NzQifQ.WTmGdYvf0jgrVig_HvPwUw'
  museum_serialized = open(url).read
  mus = JSON.parse(museum_serialized)

  counter = 0
  features_number = mus["features"].count
  (0..features_number-1).each do |var|
    context_number = mus["features"][var]["context"].count
    (0..context_number-1).each do |var1|
      if mus["features"][var]["context"][var1]["id"][0..7] == "postcode"
        right_postcode = mus["features"][var]["context"][var1]["text"]
        Museum.create(name: mus["features"][var]["place_name"], postcode: right_postcode, latitude: mus["features"][var]["geometry"]["coordinates"][0], longitude: mus["features"][var]["geometry"]["coordinates"][1], position: mus["features"][var]["properties"]["address"])
        counter += 1
      elsif counter < 1
        Museum.create(name: mus["features"][var]["place_name"], latitude: mus["features"][var]["geometry"]["coordinates"][0], longitude: mus["features"][var]["geometry"]["coordinates"][1], position: mus["features"][var]["properties"]["address"])
      end
    end
  end
  end
end
