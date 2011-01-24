class CommentsController < ApplicationController
  def create
    @article = Article.find(params[:article_id])
    @comment = Comment.new(params[:comment])
    @article.comments << @comment

    unless @comment.save
      render :template => 'comments/clear_comment.rjs'
    end
  end
end
