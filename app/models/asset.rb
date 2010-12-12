require 'mime/types'
require "base64"
class Asset < ActiveRecord::Base
  belongs_to :article
  has_attached_file :galleryitem, 
    :styles => {
      :thumb => '150x150>',
      :medium => '600x600>',
      :large => '1280x1280>'
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
