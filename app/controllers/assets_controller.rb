class AssetsController < ApplicationController
  skip_before_filter :verify_authenticity_token, :only => :create
  before_filter :check_authorization

  def create
    @article = Article.find(params[:article_id], :include => :assets)
    asset_size = @article.assets.size
    @asset = Asset.new(:galleryitem_position => asset_size+1, :article_id => params[:article_id], :dataupload => UploadedObj.new(params[:binary_data], params[:file_name]))

    if @asset.save
      respond_to do |format|
        format.js
      end
    end
  end

end

class UploadedObj
  attr_reader :binaryData, :fileName
  def initialize(binaryData, fileName)
    @binaryData = binaryData
    @fileName = fileName
  end
end
