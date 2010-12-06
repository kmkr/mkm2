class Article < ActiveRecord::Base
  belongs_to :country
  has_many :assets, :dependent => :destroy
  accepts_nested_attributes_for :assets, :allow_destroy => true
end
