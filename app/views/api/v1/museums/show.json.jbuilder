json.extract! @museum, :id, :name, :position, :latitude, :longitude, :postcode
Museum.delete_all
