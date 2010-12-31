class AssetsController < ApplicationController
  skip_before_filter :verify_authenticity_token, :only => :create
  before_filter :check_authorization

  def create
    @article = Article.find(params[:article_id])
    @asset = Asset.new(:article_id => params[:article_id], :dataupload => params[:binary_data])

    if @asset.save
      respond_to do |format|
        format.js
      end
    end
  end

end
