class CommentsController < ApplicationController
  before_filter :check_authorization, :except => [:create]
  def create
    @article = Article.find(params[:article_id])
    @comment = Comment.new(params[:comment])
    @article.comments << @comment

    if @comment.save
      CommentMailer.comment_mail(@comment)
    else
      render :template => 'comments/clear_comment.rjs'
    end
  end

  def destroy
    comment = Comment.find(params[:id])
    @id = comment.id
    comment.destroy
  end
end
