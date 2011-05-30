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
		  $(this).css('zIndex', '300');
        $(this).animate({ maxHeight: '400px' }, 100);
    }).mouseleave(function(e) {
        $(this).animate({ maxHeight: origMaxHeight }, 100);
        $('li.galleryitem img').css({zIndex: '1', maxHeight: origMaxHeight});
    }).click(function(e) {
      $(this).css("border", "1px solid #ccc"); 
    });
});
