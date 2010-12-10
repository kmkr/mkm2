document.observe("dom:loaded", function() {
  var switchLinkElement = $('switchLink');
  function switchToGallery() {
    //Effect.Fade('article', {duration: 0.5, queue: 'end'});
    //Effect.Appear('article_galleryitems', {duration: 0.5, queue: 'end'});
    $('article').hide();
    $('article_galleryitems').show();
    switchLinkElement.innerHTML = '&laquo; Tilbake til artikkel';
    observeClickInGallery();
    return false;
  }

  function switchToArticle() {
    //Effect.Fade('article_galleryitems', {duration: 0.5, queue: 'end'});
    //Effect.Appear('article', {duration: 0.5, queue: 'end'});
    $('article_galleryitems').hide();
    $('article').show();
    switchLinkElement.innerHTML = 'Vis galleri';
    observeClickInArticle();
    return false;
  }

  function observeClickInArticle() {
    switchLinkElement.stopObserving('click');
    switchLinkElement.observe('click', switchToGallery);
  }

  function observeClickInGallery() {
    switchLinkElement.stopObserving('click');
    switchLinkElement.observe('click', switchToArticle);
  }

  observeClickInArticle();
});
