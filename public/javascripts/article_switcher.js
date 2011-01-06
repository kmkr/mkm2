jQuery(function() {
  var articleTabs = jQuery('#article_tabs').tabs(); 
  scrollToAndSwitchToTab = function(idx) {
      articleTabs.tabs('select', idx);
      $.scrollTo( '#article_tabs', 1400, {offset: -25, easing: 'easeOutElastic'} );
  }
});
