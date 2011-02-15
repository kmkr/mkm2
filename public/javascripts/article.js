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

});

// set the #article_main_image width according to the actual image size
jQuery(function() {
    var resizeImageIfCssIsWrong = function() {
  		var imageWidth = $('#article_main_image img').width();
      var cssWidth = $('#article_main_image').width();
		  if (cssWidth > imageWidth) {
  			$('#article_main_image').css('width', imageWidth);
	  	}
    }
    setTimeout(resizeImageIfCssIsWrong, 600);
});

jQuery(function() {
  $('#email_address_field').tooltip({ position: "center right"});
  $('#email_updates').click(function() {
    $(this).hide('puff', function() {
      $('#email_address_info').show('fade');
    });
    return false;
  });
});
