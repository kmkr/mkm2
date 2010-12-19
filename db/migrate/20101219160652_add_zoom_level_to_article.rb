class AddZoomLevelToArticle < ActiveRecord::Migration
  def self.up
    add_column :articles, :zoom_level, :string
    Article.all do |article|
      article.zoom_level = 5
    end
  end

  def self.down
    remove_column :articles, :zoom_level
  end
end
