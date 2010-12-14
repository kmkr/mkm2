class AddRandomCandidateFieldToAsset < ActiveRecord::Migration
  def self.up
    add_column :assets, :candidate_for_random, :boolean
  end

  def self.down
    remove_column :assets, :candidate_for_random
  end
end
