

  json.array! @museums do |museum|
    json.extract! museum, :name, :position, :latitude, :longitude, :postcode
  end

  Museum.delete_all
