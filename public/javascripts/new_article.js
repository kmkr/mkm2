jQuery(function() {
  jQuery('#tabs').tabs();
  if (window.location.pathname === "/articles/new") {
    // Disable image tab
    jQuery('#tabs').tabs("option", "disabled", [1]);
  }

  jQuery( "#sortable" ).sortable({
    update: function(event, ui) {
      var listItems = jQuery('#sortable li');
      jQuery.each(listItems, function(index, listItem) {
       item = jQuery(listItem).children('input').first();
       item.val(index);
      });
    }
  });
  jQuery( "#sortable" ).disableSelection();
});

$(function() {
	var origMaxHeight;
   $('li.galleryitem img').mouseenter(function(e) {
		  origMaxHeight = $(this).css('maxHeight');
		  origHeight = $(this).css('height');
		  origWidth = $(this).css('width');
		  origLeft = $(this).css('left');
		  origTop = $(this).css('top');
		  $(this).css('zIndex', '300');
        $(this).animate({ maxHeight: '400px' }, 100);
    }).mouseleave(function(e) {
        $(this).animate({ maxHeight: origMaxHeight }, 100);
		  $(this).css('zIndex', '1');
    });
});
