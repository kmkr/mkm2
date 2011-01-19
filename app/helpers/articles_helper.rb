module ArticlesHelper
  def imagify(text, assets)
    iterations = [(text.length - 200)/1000, assets.size - 1].min
    index = 0
    image_html = ""

    while index <= iterations
      image = image_tag(assets[index].galleryitem.url(:medium))
      text = content_tag(:p, truncate(assets[index].galleryitem_caption, :length => 160, :omission => "..."), :class => 'caption')
      text_wrapper = content_tag(:div, text)
      image_html += content_tag(:div, image + text_wrapper, :class => 'article_image')
      index += 1
    end

    image_html
  end


  def getArticleStartEndDate(article)
    # ignoring year
    if article.end_date.month == article.start_date.month 
      format_date(article.start_date)
    else
       "around #{format_date(article.start_date)} to #{format_date(article.end_date)}"
    end
  end


  def getArticlePublishedDetails(article)
    if article.published_date
      "Published #{time_ago_in_words(article.published_date)} ago"
    else
      "The article is not yet published. #{link_to 'Click', publish_article_path(article)} to publish."
    end
  end


  private

  def format_date(date) 
    date.strftime("%B %Y") 
  end

  def suffix(value)
    case value
    when 1,21,31
      suffix = "st"
    when 2,22
      suffix = "nd"
    when 3,23
      suffix = "rd"
    else
      suffix = "th"
    end 
  end 
end
