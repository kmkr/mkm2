jQuery(function() {
  var articleTabs = jQuery('#article_tabs').tabs(); 

  // load gallery for clicks on tab1
  $('#article_tabs').bind('tabsshow', function(evt, ui) { if (ui.index == 1) { loadGallery(); } } );

  scrollToAndSwitchToTab = function(idx) {
    switchToTab(idx);
    loadGallery();
    $.scrollTo( '#article', 1400, {offset: -25, easing: 'easeOutElastic'} );
  }
  switchToTab = function(idx) {
      articleTabs.tabs('select', idx);
  }

  // set the #article_main_image width according to the actual image size
	var width = $('#article_main_image img').attr('width');
	if (width*1 > 0) {
		$('#article_main_image').css('width', width);
	}
});
