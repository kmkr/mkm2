document.observe("dom:loaded", function() {
  $$('.continent').each(function(el) {
    var ulElem = Element.firstDescendant(el);
    el.observe('mouseenter', function() {
        ulElem.blindDown({duration: 0.2});
    });

    el.observe('mouseleave', function() {
        ulElem.blindUp({duration: 0.2});
    });
  });

  $$('.country').each(function(el) {
    var ulElem = Element.firstDescendant(el);
    el.observe('mouseenter', function() {
        ulElem.blindDown({duration: 0.2});
    });

    el.observe('mouseleave', function() {
        ulElem.blindUp({duration: 0.2});
    });
  });
});
