class CreateArticles < ActiveRecord::Migration
  def self.up
    create_table :articles do |t|
      t.string :title
      t.text :body
      t.datetime :start_date
      t.datetime :end_date
      t.datetime :published_date
      t.boolean :published
      t.integer :country_id
      t.float :latitude
      t.float :longitude

      t.timestamps
    end
  end

  def self.down
    drop_table :articles
  end
end
