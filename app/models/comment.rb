class Comment < ActiveRecord::Base
  validates_presence_of :author
  validates_format_of :author, :with => /\A[\w\s\-]+\z/
  validates_format_of :body, :with => /\A[\w\s\-\_!?\.\"\'\,]+\z/
  validates_length_of :body, :minimum => 3
  validates_format_of :email, :with => /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/

  belongs_to :article
end
