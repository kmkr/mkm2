class Country < ActiveRecord::Base
  has_many :articles
  belongs_to :continent
end
