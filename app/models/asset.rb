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
    writeFile = File.open('/tmp/upload.gif', 'w') { |f| f.write(binary) }
    readFile = File.open('/tmp/upload.gif', 'r')
    self.galleryitem = readFile
  end

end
