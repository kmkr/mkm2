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
    :s3_credentials => "#{Rails.root}/config/s3.yml",
    :storage => :s3,
    :url => ':s3_alias_url',
    :path => ":attachment/:id/:style/:filename",
    :s3_host_alias => YAML::load(File.open("#{Rails.root}/config/s3.yml"))[Rails.env]["s3_host_alias"]

  def dataupload=(uploadedObj)
    base64EncodedFile = uploadedObj.binaryData
    fileName = uploadedObj.fileName
    fileName.gsub!(/[^a-z0-9A-Z\.-]/, "_")
    binary = Base64.decode64 base64EncodedFile
    tmpFileName = "#{Rails.root}/tmp/#{fileName}"
    writeFile = File.open(tmpFileName, 'w') { |f| f.write(binary) }
    readFile = File.open(tmpFileName, 'r')
    self.galleryitem = readFile
  end

end

class AWS::S3::NoSuchBucket < AWS::S3::ResponseError
  # Force the class to be created as a proper subclass of ResponseError thanks to AWS::S3's autocreation of exceptions
end
