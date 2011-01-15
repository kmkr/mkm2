module ArticlesHelper
  def imagify(text, assets)
    current_location_in_text = 1000
    index = 1
    image_html = ""

    while text.length > current_location_in_text + 200
      break if index >= assets.size 
      image = image_tag(assets[index].galleryitem.url(:medium))
      text = content_tag(:p, assets[index].galleryitem_caption)
      image_html += content_tag(:span, image + text, :class => 'article_image')
      index += 1
      current_location_in_text += 1000
    end

    image_html
  end


  def getArticleStartEndDate(article)
    if article.end_date - article.start_date == 0 
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
