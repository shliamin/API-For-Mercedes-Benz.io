class CreateMuseums < ActiveRecord::Migration[5.2]
  def change
    create_table :museums do |t|
      t.string :name
      t.string :postcode
      t.string :latitude
      t.string :longitude
      t.string :position

      t.timestamps
    end
  end
end
