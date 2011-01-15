module ArticlesHelper
  def imagify(text, assets)
    distance_between_imgs = 1000
    current_location = 0
    last_location = 0

    index = 1
    while text.length > current_location += distance_between_imgs do
      break if index >= assets.size 

      # verify there is a certain amount of text left
      break if current_location + 400 > text.length

      text_to_scan = text.slice(current_location, distance_between_imgs)
      current_location -= 120 unless text.scan(/<h\d>/).empty? # headings use whitespace, subtract a bit from the position
      current_location -= 50 unless text.scan("<p>").empty? # p use whitespace, subtract
      current_location = last_location + distance_between_imgs if current_location <= last_location + 50 # with little text between headings and p's we might end up subtracting too much. this should be rare, however, and not happen for real articles

      # check if text contains an odd number of tags
      if text_to_scan.match(/\<\w+/) and !text_to_scan.match(/\<\/\w+\>/)
        start_of_end_tag = text.index(/<\/\w+>/, current_location)
        text_to_scan = text.slice(current_location, start_of_end_tag + 15) # an end tag is not larger than 15
      end

      # check that we dont insert INTO another tag
      # if first end-tag starts before the first start tag, we're in trouble
      first_end_tag = text_to_scan.index("</")
      first_start_tag = text_to_scan.index(/<\w/)
      if first_end_tag < first_start_tag
        current_location += first_end_tag + 6
      end

      text.insert(current_location, "<span class='article_image'>#{image_tag assets[index].galleryitem.url(:medium), :class => 'text_image'}</span>")
      index += 1
      last_location = current_location
      distance_between_imgs = 1100
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
