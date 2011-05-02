class RemoveUserLocation < ActiveRecord::Migration
  def self.up
      remove_column :users, :current_logitude
      remove_column :users, :current_latitude
  end

  def self.down
      add_column :users, :current_logitude, :float
      add_column :users, :current_latitude, :float
  end
end
