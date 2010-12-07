class Article < ActiveRecord::Base
  belongs_to :country
  has_many :assets, :dependent => :destroy
  accepts_nested_attributes_for :assets, :allow_destroy => true

  def main_asset
    assets.first if assets.first
  end

  def self.all
    # sjekk etter admin her, kall super. hvis ikke admin, kall super med kun publiserte
    super
  end
end
