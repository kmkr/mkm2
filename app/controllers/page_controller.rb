class PageController < ApplicationController

  def index
    @newest_articles = Article.find(:first, :order => 'published_date DESC').to_a
  end

end
