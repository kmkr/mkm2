class AddDataToAssets < ActiveRecord::Migration
  def self.up
    add_column :assets, :galleryitem_file_name,    :string
    add_column :assets, :galleryitem_content_type, :string
    add_column :assets, :galleryitem_file_size,    :integer
    add_column :assets, :galleryitem_updated_at,   :datetime
  end

  def self.down
    remove_column :assets, :galleryitem_file_name
    remove_column :assets, :galleryitem_content_type
    remove_column :assets, :galleryitem_file_size
    remove_column :assets, :galleryitem_updated_at
  end
end
