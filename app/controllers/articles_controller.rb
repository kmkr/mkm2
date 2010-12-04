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
    if @article.save
      flash[:notice] = "Artikkel opprettet!"
      redirect_to @article
    else
      flash[:notice] = "Noe gikk galt"
      redirect_to root_url
    end
  end

  def edit
  end

  def update
  end

  def destroy
  end

end
