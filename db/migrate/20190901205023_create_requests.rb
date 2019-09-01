class CreateRequests < ActiveRecord::Migration[5.2]
  def change
    create_table :requests do |t|
      t.string :latitude
      t.string :longitude

      t.timestamps
    end
  end
end
