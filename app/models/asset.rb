require 'mime/types'
require "base64"
class Asset < ActiveRecord::Base
  belongs_to :article
  has_attached_file :galleryitem, 
    :styles => {
      :thumb => '250x250>',
      :medium => '700x700>',
      :large => '1480x1480>'
    },
    :storage => :ftp,
    :path => "/:attachment/:id/:style/:filename",
    :url => "http://84.234.222.3/mkm_2/:id/:style/:filename"

  def dataupload=(base64EncodedFile) 
    binary = Base64.decode64 base64EncodedFile
    writeFile = File.open('/tmp/upload', 'w') { |f| f.write(binary) }
    readFile = File.open('/tmp/upload', 'r')
    self.galleryitem = readFile
  end

  def self.selected_best_images_sorted_randomly
    random_assets = Asset.find_all_by_candidate_for_random true  
    random_assets.shuffle
  end

end
