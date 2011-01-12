module ArticlesHelper
  def imagify(text, assets)
    distance_between_imgs = 900
    current_location = 0
    last_location = 0

    index = 1
    while text.length > current_location += distance_between_words do
      break if index == assets.size 
      text_to_scan = text.splice(current_location, distance_between_words)
      current_location -= 70 unless text.scan("<h2>").empty?
      current_location -= 100 unless text.scan("<p>").empty?

      current_location = last_location + distance_between_imgs if current_location <= last_location + 50
      text.insert(current_location, "<span class='article_image'>#{image_tag assets[index].galleryitem.url(:medium), :class => 'text_image'}</span>")
      index += 1
      last_location = current_location
      distance_between_imgs = 1150
    end

    text
  end


  def getArticleStartEndDate(article)
    if article.end_date - article.start_date == 0 
      format_date(article.start_date)
    else
       "from #{format_date(article.start_date)} to #{format_date(article.end_date)}"
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
    date.strftime("%A %d#{suffix(date.day)} of %B %Y") 
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
