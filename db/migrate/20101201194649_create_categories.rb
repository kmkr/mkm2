class CreateCategories < ActiveRecord::Migration
  def self.up
    create_table :continents do |t|
      t.string :title
      t.integer :priority

      t.timestamps
    end
  end

  def self.down
    drop_table :continents
  end
end
