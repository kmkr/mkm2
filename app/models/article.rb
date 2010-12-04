class Article < ActiveRecord::Base
  belongs_to :country

  def self.fetch_positions
    positions = []
    Article.all do |article|
      positions << [article.lon, article.lat, article.updated_on]
    end

    positions
  end
end
