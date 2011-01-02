class PageController < ApplicationController

  def index
    articles = Article.find(:all, :order => 'updated_at DESC', :conditions => 'published_date not null')
    @newest_articles = articles.first.to_a
    @random_articles = (articles - @newest_articles).shuffle.first(4) 
  end

end
