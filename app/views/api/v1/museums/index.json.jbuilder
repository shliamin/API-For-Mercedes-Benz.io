

  json.array! @museums do |museum|
    json.extract! museum, :id, :name, :position, :latitude, :longitude, :postcode
  end

  # Museum.delete_all
