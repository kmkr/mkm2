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
    :convert_options => { :all => '-auto-orient' },
    :storage => :ftp,
    :path => "/:attachment/:id/:style/:filename",
    :url => "http://84.234.222.3/mkm_2/:id/:style/:filename"

  def dataupload=(uploadedObj)
    base64EncodedFile = uploadedObj.binaryData
    fileName = uploadedObj.fileName
    binary = Base64.decode64 base64EncodedFile
    tmpFileName = "#{RAILS_ROOT}/tmp/#{fileName}"
    writeFile = File.open(tmpFileName, 'w') { |f| f.write(binary) }
    readFile = File.open(tmpFileName, 'r')
    self.galleryitem = readFile
  end

end
