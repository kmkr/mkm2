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
      l(article.start_date, :format => :dy_mo_yr)
    else
       "fra #{l(article.start_date, :format => :dy_mo_yr)} til #{l(article.end_date, :format => :dy_mo_yr)}"
    end
  end


  def getArticlePublishedDetails(article)
    if article.published_date
      "Artikkelen ble publisert for #{time_ago_in_words(article.published_date)} siden."
    else
      "Artikkelen er ikke publisert. #{link_to 'Trykk', publish_article_path(article)} for å publisere."
    end
  end
end
