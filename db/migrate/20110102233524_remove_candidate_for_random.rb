class RemoveCandidateForRandom < ActiveRecord::Migration
  def self.up
    remove_column :assets, :candidate_for_random
  end

  def self.down
    add_column :assets, :candidate_for_random, :boolean
  end
end
