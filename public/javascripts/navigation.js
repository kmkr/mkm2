jQuery(function() {
  jQuery('.continent').each(function(index, el) {
    var element = jQuery(el);
    var ulElem = element.children('.countries').first();
    element.mouseenter(function() {
      ulElem.slideDown();
    });

    element.mouseleave(function() {
      ulElem.slideUp();
    });
  });

  jQuery('.country').each(function(index, el) {
    var element = jQuery(el);
    var ulElem = element.children('.articles').first();
    element.mouseenter(function() {
      ulElem.effect('slide');
    });

    element.mouseleave(function() {
      ulElem.hide();
    });
  });
});
