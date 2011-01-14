class PageController < ApplicationController

  def index
    articles = Article.order('updated_at DESC').where('published_date IS NOT NULL').includes(:assets)
    @newest_articles = articles.first.to_a
    @random_articles = (articles - @newest_articles).shuffle.first(4) 
    @title = "Welcome"
    @random_articles = []
    @newest_articles = []
  end

end
