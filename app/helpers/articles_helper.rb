module ArticlesHelper
  def imagify(text, assets)
    regex = /<h2>([^<]+<\/h2>)/
    regex_paragraphs = /<h2>.*<\/h2>[\n\s]+<p>.*<\/p>/
    min_size = 370
    text.sub!("<h2>", "<h2 class='visited'>")

    num_paragraphs = text.split(regex_paragraphs).size
    num_images = assets.count

    max_iterations = [ num_paragraphs, num_images-1].min
    
    currentIdx = 1
    max_iterations.times do |i|
      match = text.match(regex_paragraphs)
      unless match and match[0].size > min_size
        text.sub!("<h2>", "<h2 class='visited'>")
        next
      end
      text.sub!(regex) {
      "<span class='article_image'>#{image_tag assets[currentIdx].galleryitem.url(:medium), :class => 'text_image'}</span><h2 class='visited'>#{$1}"
      }

      currentIdx += 1
      min_size +=80 if i == 0
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
