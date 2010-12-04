class ArticlesController < ApplicationController
  def new
    @article = Article.new
    @countries = Country.all
  end

  def create
  end

  def edit
  end

  def update
  end

  def destroy
  end

end
