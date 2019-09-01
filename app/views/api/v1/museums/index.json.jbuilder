

  json.array! @museums do |museum|
    json.extract! museum, :name, :position, :latitude, :longitude, :postcode
  end


  # all = JSON.parse(DATA.read)[0]['postcode']
  # puts all
  # json.extract! @museums, :postcode

  Museum.delete_all

# all = JSON.parse(DATA.read)['events']['event']
# museums.group_by{ |h| [h[postcodes]] }.each do |loc,events|
#   puts "'#{loc.join(',')}': #{events.length} event#{:s if events.length!=1}"
#   print "--> "
#   puts events.map{ |e| e['status'] }.join(', ')
# end
