class Comment < ActiveRecord::Base
  validates_presence_of :author, :body
  belongs_to :article
end
