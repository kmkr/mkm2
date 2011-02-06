class ArticlesController < ApplicationController
  layout :choose_layout
  before_filter :check_authorization, :except => [ :index, :show, :preview, :choose_layout ]

  def new
    @article = Article.new
    @countries = Country.all
    3.times { @article.assets.build }
  end

  def index
    if logged_in?
      @articles = Article.order("updated_at DESC")
    else
      @articles = Article.where("published_date is not null").order("updated_at DESC")
    end

    respond_to do |format|
      format.atom
    end
  end

  def show
    @article = Article.find(params[:id], :include => :assets)
    unless @article.published_date
      check_authorization
    end
    @title = @article.title
    @comment = Comment.new
  end

  def create
    @article = Article.new(params[:article])
    @countries = Country.all
    if @article.save
      flash[:notice] = "Article was successfully created, time to upload some pictures!"
      redirect_to edit_article_url(@article, :anchor => 'tabs-2')
    else
      flash[:error] = "Unable to create article"
      render :action => 'new'
    end
  end

  def edit
    @article = Article.find(params[:id])
    @countries = Country.all
    3.times { @article.assets.build }
  end

  def update
    @article = Article.find(params[:id])

    if @article.update_attributes(params[:article])
      flash[:notice] = "Article updated"
      redirect_to @article
    else
      flash[:error] = "Unable to update article"
      redirect_to root_url
    end
  end

  def destroy
  end

  def publish
    article = Article.find(params[:id])
    publish_article(article)
    article.save
    flash[:notice] = "Article #{article.title} is now published!"
    redirect_to article
  end

  def preview
    if params[:id]
      @article = Article.find(params[:id])
    else 
      @article = Article.new
    end

    @data = params[:data]
  end

  private
  def publish_article(article)
    article.published_date = Time.now
  end

  def choose_layout
    if 'preview'.include? action_name
      'preview_article'
    else
      'application'
    end
  end

end
