document.observe("dom:loaded", function() {
  $$('.continent').each(function(el) {
    var ulElem = Element.firstDescendant(el);
    el.observe('mouseenter', function() {
        ulElem.blindDown({duration: 0.1});
    });

    el.observe('mouseleave', function() {
        ulElem.blindUp({duration: 0.1});
    });
  });

  $$('.country').each(function(el) {
    var ulElem = Element.firstDescendant(el);
    el.observe('mouseenter', function() {
        ulElem.blindDown({duration: 0.1});
    });

    el.observe('mouseleave', function() {
        ulElem.blindUp({duration: 0.1});
    });
  });
});
