jQuery(function() {
  jQuery('.continent').each(function(index, el) {
    var element = jQuery(el);
    element.css({
      "background": "#fff7ed",
      "background": "-moz-linear-gradient(top,  #fff7ed,  #fff)",
      "background": "-webkit-gradient(linear, left top, left bottom, from(#fff7ed), to(#fff))"});
    var ulElem = element.children('.countries').first();
    var animationOn = false;
    element.mouseenter(function() {
      if (!animationOn) {
        animationOn = true;
        ulElem.slideDown(250, 'swing', function() {
          animationOn = false;
        });
        element.css("background", "");
        element.animate({ 
          "background-color": "#fff7ed",
        }, 600, 'easeOutQuart');
      }
    });

    element.mouseleave(function() {
      animationOn = true;
      ulElem.slideUp(200, 'swing', function() {
        animationOn = false;
      });
      element.css({
      "background": "#fff7ed",
      "background": "-moz-linear-gradient(top,  #fff7ed,  #fff)",
      "background": "-webkit-gradient(linear, left top, left bottom, from(#fff7ed), to(#fff))"});
    });
  });


  jQuery('.country').each(function(index, el) {
    var element = jQuery(el);
    var ulElem = element.children('.articles').first();
    element.mouseenter(function() {
      ulElem.show();
        element.css({ 
          "background-color": "#fff7ed"
        })
    });

    element.mouseleave(function() {
      ulElem.hide();
        element.css({ 
        "background-color": "#fff"
        })
    });
  });
});
