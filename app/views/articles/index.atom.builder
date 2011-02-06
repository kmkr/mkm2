atom_feed do |feed|
  feed.title("MKM Travel Blog - Articles")
  feed.updated(@articles.first.updated_at)

  for article in @articles
    feed.entry(article) do |entry|
      entry.title article.title
      entry.content(RedCloth.new(truncate(article.body, :length => 500)).to_html)
    end
  end
end
