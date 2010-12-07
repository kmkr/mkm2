module ArticlesHelper
  def imagify(text, assets)
    num_h2s = text.count "<h2>" 
    num_images = assets.count - 1

    max_iterations = num_h2s > num_images ? num_images : num_h2s

    className = 'left';
    max_iterations.times do |i|
      text.sub!("<h2>", "<h2 >" + image_tag (assets[i+1].galleryitem.url(:medium), :class => className))
      if className = 'left'
        className = 'right' 
      else
        className = 'left'
      end
    end

    text
  end
end
