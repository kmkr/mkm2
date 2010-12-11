class ArticlesController < ApplicationController
  def new
    @article = Article.new
    @countries = Country.all
    3.times {@article.assets.build}
  end

  def show
    @article = Article.find(params[:id])
    @title = @article.title
  end

  def create
    @article = Article.new(params[:article])
    @countries = Country.all
    publish_article @article if @article.published?
    if @article.save
      flash[:notice] = "Artikkel opprettet!"
      redirect_to @article
    else
    logger.debug @article.errors.size
      flash[:notice] = "Noe gikk galt"
      render :action => 'new'
    end
  end

  def edit
    @article = Article.find(params[:id])
    @countries = Country.all
    3.times {@article.assets.build}
  end

  def update
    @article = Article.find(params[:id])

    if @article.update_attributes(params[:article])
      flash[:notice] = "Oppdaterte artikkel"
      redirect_to @article
    else
      flash[:error] = "Fikk ikke oppdatert artikkel"
      redirect_to root_url
    end
  end

  def destroy
  end

# TODO:
  def browse 
    article = Article.find(params[:id])
	  @gallery_item = Asset.find(params[:asset_id])
  end

  def publish
    article = Article.find(params[:id])
    publish_article(article)
    article.save
    flash[:notice] = "Artikkel publisert!"
    redirect_to article
  end

  private
  def publish_article(article)
    article.published_date = Time.now
  end

end
