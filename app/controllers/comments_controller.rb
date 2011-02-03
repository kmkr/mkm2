class CommentsController < ApplicationController
  before_filter :check_authorization, :except => [:create]
  def create
    @article = Article.find(params[:article_id])
    @comment = Comment.new(params[:comment])
    @article.comments << @comment

    unless @comment.save
      render :template => 'comments/clear_comment.rjs'
    end
  end

  def destroy
    params.each_pair { |key,value| puts "#{key}: #{value}"}
    comment = Comment.find(params[:id])
    @id = comment.id
    comment.destroy
  end
end
