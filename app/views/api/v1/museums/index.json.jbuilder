json.array! @museums do |museum|
  json.extract! museum, :id, :name, :postcode
end
