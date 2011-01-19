class AddIncludeAssetInArticleOverview < ActiveRecord::Migration
  def self.up
    add_column :assets, :galleryitem_use_in_column, :boolean, :default => true
  end

  def self.down
    remove_column :assets, :galleryitem_use_in_column
  end
end
