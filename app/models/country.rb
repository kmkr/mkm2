class Country < ActiveRecord::Base
  has_many :articles
  belongs_to :continent

  def self.country_info
    countryInfo = []
    countries = Country.all(:include => :articles)
    countries.each do |country|
      last_updated_at = nil
      articles = []
      country.articles.each do |article|
        last_updated_at = article.updated_at if last_updated_at == nil
        last_updated_at = article.updated_at if article.updated_at > last_updated_at
        articles << {
          :id => article.id,
          :title => article.title
        }

      end
      countryInfo << {
        :countryName => country.title,
        :longitude => country.longitude,
        :latitude => country.latitude,
        :updated_at => last_updated_at,
        :articles => articles
        }
    end

    countryInfo
  end
end
