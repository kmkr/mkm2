document.observe("dom:loaded", function() {
  var switchLinkElement = $('switchLink');
  function switchToGallery() {
    jQuery('#article').fadeOut("slow");
    jQuery('#article_galleryitems').fadeIn("slow");
    switchLinkElement.innerHTML = '&laquo; Tilbake til artikkel';
    observeClickInGallery();
    return false;
  }

  function switchToArticle() {
    jQuery('#article_galleryitems').fadeOut("slow");
    jQuery('#article').fadeIn("slow");
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
