class AssetsController < ApplicationController
  skip_before_filter :verify_authenticity_token, :only => :create

  def create
    @article = Article.find(params[:article_id])
    @asset = Asset.new(:article_id => params[:article_id], :dataupload => params[:binary_data])

    if @asset.save
      respond_to do |format|
        format.js
      end
    end
  end

  def random
    random_assets = Asset.find_all_by_candidate_for_random true  
    json = ""
    random_assets.each do |asset|
      json = json + "{\"asset\":\"#{asset.galleryitem.url(:thumb)}\"},"
    end

    json = "[" + json.chop + "]"

    render :json => json
  end

end
