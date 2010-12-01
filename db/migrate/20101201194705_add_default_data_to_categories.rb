class AddDefaultDataToCategories < ActiveRecord::Migration
  def self.up
    europe = Category.create(:title => 'Europa')
    america = Category.create(:title => 'Amerika')
    oceania = Category.create(:title => 'Oseania')
    africa = Category.create(:title => 'Afrika')
    asia = Category.create(:title => 'Asia')

    australia = Category.create(:title => 'Australia')
    australia.parent = oceania
    australia.save
  end

  def self.down
    Category.all.each do |category|
      category.destroy
    end
  end
end
