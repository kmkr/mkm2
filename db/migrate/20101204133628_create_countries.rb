class CreateCountries < ActiveRecord::Migration
  def self.up
    create_table :countries do |t|
      t.string :title
      t.float :longitude
      t.float :latitude
      t.integer :zoom_level
      t.integer :continent_id

      t.timestamps
    end
  end

  def self.down
    drop_table :countries
  end
end
