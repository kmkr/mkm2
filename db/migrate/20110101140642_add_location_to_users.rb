class AddLocationToUsers < ActiveRecord::Migration
  def self.up
    add_column :users, :current_longitude, :float 
    add_column :users, :current_latitude, :float 
  end

  def self.down
    remove_column :users, :current_logitude
    remove_column :users, :current_latitude
  end
end
