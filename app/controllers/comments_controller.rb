class CommentsController < ApplicationController
  def create
    article = Article.find(params[:article_id])
    @comment = Comment.create(params[:comment])
    article.comments << @comment

    respond_to do |format|
      format.js
    end
  end
end
