class Country < ActiveRecord::Base
  has_many :articles
  belongs_to :continent

  def self.fetch_positions
    positions = []
    countries = Country.all(:include => :articles)
    countries.each do |country|
      last_updated_at = nil
      country.articles.each do |article|
        last_updated_at = article.updated_at if last_updated_at == nil

        last_updated_at = article.updated_at if article.updated_at > last_updated_at
      end
      positions << {
        :longitude => country.longitude,
        :latitude => country.latitude,
        :updated_at => last_updated_at
        }
    end

    positions
  end
end
