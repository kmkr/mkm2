class CommentsController < ApplicationController
  def create
    @article = Article.find(params[:article_id])
    @comment = Comment.new(params[:comment])
    @article.comments << @comment

    if @comment.save
      respond_to do |format|
        format.js
      end
    else
      render :template => 'comments/clear_comment.rjs'
    end
  end
end
