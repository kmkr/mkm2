class ArticlesController < ApplicationController
  layout :choose_layout
  before_filter :check_authorization, :except => [ :show, :preview, :choose_layout ]

  def new
    @article = Article.new
    @countries = Country.all
    4.times { @article.assets.build }
  end

  def show
    @article = Article.find(params[:id])
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
    logger.debug @article.errors.size
      flash[:notice] = "Noe gikk galt"
      render :action => 'new'
    end
  end

  def edit
    @article = Article.find(params[:id])
    @countries = Country.all
    4.times { @article.assets.build }
  end

  def update
    @article = Article.find(params[:id])

   # publish_article @article if @article.published?
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

    respond_to do |format|
      format.html
    end
  end

  private
  def publish_article(article)
    article.published_date = Time.now
  end

  def choose_layout
  logger.debug action_name
    if 'preview'.include? action_name
      'preview_article'
    else
      'main'
    end
  end

end
