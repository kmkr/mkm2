class Article < ActiveRecord::Base
  validates_presence_of :latitude, :longitude, :title, :country

  belongs_to :country
  has_many :assets, :dependent => :destroy, :order => 'galleryitem_position'
  has_many :comments, :dependent => :destroy, :order => 'created_at DESC'
  accepts_nested_attributes_for :assets, :allow_destroy => true

  def main_asset
    assets.first if assets.first
  end

  def column_imgs
    imgs = []
    assets.each do |item|
      imgs << item if item.use_in_column?
    end

    imgs
  end

  def published?
    published_date != nil 
  end

end
