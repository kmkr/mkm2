class AddDefaultDataToCategories < ActiveRecord::Migration
  def self.up
    europe = Continent.create(:title => 'Europa')
    america = Continent.create(:title => 'Amerika')
    oceania = Continent.create(:title => 'Oseania')
    africa = Continent.create(:title => 'Afrika')
    asia = Continent.create(:title => 'Asia')

  end

  def self.down
    Continent.all.each do |category|
      category.destroy
    end
  end
end
