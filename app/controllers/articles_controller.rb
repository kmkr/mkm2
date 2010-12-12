class ArticlesController < ApplicationController
  def new
    @article = Article.new
    @countries = Country.all
    4.times { @article.assets.build }
  end

  def show
    @article = Article.find(params[:id])
    @title = @article.title
  end

  def create
    @article = Article.new(params[:article])
    @countries = Country.all
    if @article.save
      flash[:notice] = "Artikkel opprettet, på tide å laste opp bilder!"
      redirect_to edit_article_url(@article, :anchor => 'tabs-2')
    else
    logger.debug @article.errors.size
      flash[:notice] = "Noe gikk galt"
      render :action => 'new'
    end
  end

  def edit
    @article = Article.find(params[:id])
    @countries = Country.all
    4.times { @article.assets.build }
  end

  def update
    @article = Article.find(params[:id])

   # publish_article @article if @article.published?
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
