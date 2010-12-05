class ArticlesController < ApplicationController
  def new
    @article = Article.new
    @countries = Country.all
  end

  def show
    @article = Article.find(params[:id])
  end

  def create
    @article = Article.new(params[:article])
    publish_article @article if @article.published?
    if @article.save
      flash[:notice] = "Artikkel opprettet!"
      redirect_to @article
    else
      flash[:notice] = "Noe gikk galt"
      redirect_to root_url
    end
  end

  def edit
    @article = Article.find(params[:id])
    @countries = Country.all
  end

  def update
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
