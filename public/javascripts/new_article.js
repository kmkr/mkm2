jQuery(function() {
  jQuery('#tabs').tabs();
  if (window.location.pathname == "/articles/new") {
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
