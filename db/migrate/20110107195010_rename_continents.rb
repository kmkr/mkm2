class RenameContinents < ActiveRecord::Migration
  def self.up
    self.rename 'Europa', 'Europe'
    self.rename 'Amerika', 'America'
    self.rename 'Oseania', 'Oceania'
    self.rename 'Afrika', 'Africa'
  end

  def self.down
    self.rename 'Europe', 'Europa'
    self.rename 'America', 'Amerika'
    self.rename 'Oceania', 'Oseania'
    self.rename 'Africa', 'Afrika'
  end

  def self.rename(old, new)
    cont = Continent.find_by_title(old)
    cont.title = new
    cont.save
  end
end
