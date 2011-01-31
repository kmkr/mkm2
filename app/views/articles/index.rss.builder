xml.instruct! :xml, :version => "1.0"
xml.rss :version => "2.0" do
  xml.channel do
    xml.title "Articles"
    xml.description "MKM Travel Articles"
    xml.link articles_url(:rss)

    for article in @articles
      xml.item do
        xml.title article.title
        xml.description truncate(article.body, :length => 400, :omission => link_to(" (read more)", article_url(article)))
        xml.pubDate article.published_date
        xml.link article_url(article, :rss)
      end
    end
  end
end
