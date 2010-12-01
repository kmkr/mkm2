class ArticlesController < ApplicationController
  def new
    @article = Article.new
    @categories = Category.find(:all, :conditions => "parent_id IS NOT NULL")
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
