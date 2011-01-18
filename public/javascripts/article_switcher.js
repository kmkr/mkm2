jQuery(function() {
  var articleTabs = jQuery('#article_tabs').tabs(); 

  // load gallery for clicks on tab1
  $('#article_tabs').bind('tabsshow', function(evt, ui) { if (ui.index == 1) { loadGallery(); } } );

  scrollToAndSwitchToTab = function(idx) {
      articleTabs.tabs('select', idx);
      loadGallery();
      $.scrollTo( '#article_tabs', 1400, {offset: -25, easing: 'easeOutElastic'} );
  }
});
