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
  var items = $('li.galleryitem img');
	var origMaxHeight = items.first().css('maxHeight');
  var origBorder = items.first().css("border");
   items.mouseenter(function(e) {
		    $(this).css('zIndex', '300');
        $(this).animate({ maxHeight: '400px' }, 100);
    }).mouseleave(function(e) {
        $(this).animate({ maxHeight: origMaxHeight }, 100);
        $(items).css({zIndex: '1', maxHeight: origMaxHeight, border: origBorder});
    }).mousedown(function(e) {
        $(this).css("border", "2px solid #ccc"); 
    });
});
