jQuery(function() {
  jQuery('.continent').each(function(index, el) {
    var element = jQuery(el);
    element.css("background", "#f9ecdc");
    var ulElem = element.children('.countries').first();
    var animationOn = false;
    element.mouseenter(function() {
      if (!animationOn) {
        animationOn = true;
        ulElem.slideDown(250, 'swing', function() {
          animationOn = false;
        });
        element.animate({ 
          "background-color": "#f8dbb6"
        }, 400, 'easeOutQuart');
      }
    });

    element.mouseleave(function() {
      animationOn = true;
      ulElem.slideUp(200, 'swing', function() {
        animationOn = false;
      });
        element.animate({ 
          "background-color": "#f9ecdc"
        }, 600, 'easeOutQuart');
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
