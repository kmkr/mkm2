class AddDefaultDataToCountries < ActiveRecord::Migration
  def self.up
    createCountry('Australia', 'Oseania', '133.64', '-25.24', 4)
    createCountry('Thailand', 'Asia', '101.14', '13.74', 5)
    createCountry('Indonesia', 'Asia', '111.03', '-7.25', 4)
    createCountry('Malaysia', 'Asia', '108.26', '4.42', 5)
    createCountry('Egypt', 'Afrika', '29.49', '26.51', 5)
    createCountry('Frankrike', 'Europa', '2.46', '46.62', 5)
    createCountry('England', 'Europa', '-1.27', '52.48', 5)
  end

  def self.down
    Country.all do |country|
      country.destroy
    end
  end

  def self.createCountry(countryTitle, continentTitle, lon, lat, zoomLevel)
    country = Country.create(:title => countryTitle, :longitude => lon, :latitude => lat, :zoom_level => zoomLevel)
    country.continent = Continent.find_by_title(continentTitle)
    country.save
  end
end
