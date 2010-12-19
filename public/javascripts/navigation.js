jQuery(function() {
  jQuery('.continent').each(function(index, el) {
    var element = jQuery(el);
    var ulElem = element.children('.countries').first();
    var animationOn = false;
    element.mouseenter(function() {
      if (!animationOn) {
        animationOn = true;
        ulElem.slideDown(300, 'swing', function() {
          animationOn = false;
        });
      }
    });

    element.mouseleave(function() {
      animationOn = true;
      ulElem.slideUp(300, 'swing', function() {
        animationOn = false;
      });
    });
  });


  jQuery('.country').each(function(index, el) {
    var element = jQuery(el);
    var ulElem = element.children('.articles').first();
    element.mouseenter(function() {
      ulElem.show();
    });

    element.mouseleave(function() {
      ulElem.hide();
    });
  });
});
