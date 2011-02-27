require 'mime/types'
require "base64"
class Asset < ActiveRecord::Base
  belongs_to :article
  has_attached_file :galleryitem, 
    :styles => {
      :thumb => '250x250>',
      :medium => '410x410>',
      :large => '1000x1000>'
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
	 # Make sure file name is unique
	 fileName = DateTime.now.strftime("%s%L") + "_" + fileName
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
