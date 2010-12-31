module ArticlesHelper
  def imagify(text, assets)
    regex = /<h2>([^>]+>)[\n\s]+<p>([^\.]+\.\s){2}/
    regex_paragraphs = /<h2>.*<\/h2>[\n\s]+<p>.*<\/p>/
    min_size = 370
    text.sub!("<h2>", "<h2 class='visited'>")

    num_paragraphs = text.split(regex_paragraphs).size
    num_images = assets.count - 1

    max_iterations = [ num_paragraphs, num_images].min
    
    max_iterations.times do |i|
      match = text.match(regex_paragraphs)
      unless match and match[0].size > min_size
        text.sub!("<h2>", "<h2 class='visited'>")
        next
      end
      text.sub!(regex) {
      "<span class='floatLeft'></span><h2 class='visited'>#{$1}<p>#{$2}<span class='article_image'>#{image_tag assets[i+1].galleryitem.url(:medium), :class => 'text_image'}</span>"
      }
    end

    text
  end


  def getArticleStartEndDate(article)
    if article.end_date - article.start_date == 0 
      article.start_date.strftime("%A %d %B")
    else
       "from #{article.start_date.strftime("%A %d %B")} to #{article.end_date.strftime("%A %d %B")}"
    end
  end


  def getArticlePublishedDetails(article)
    if article.published_date
      "Published #{time_ago_in_words(article.published_date)} ago."
    else
      "The article is not yet published. #{link_to 'Click', publish_article_path(article)} to publish."
    end
  end
end
