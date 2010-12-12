document.observe("dom:loaded", function() {
  jQuery('#tabs').tabs();
  *
  if (document.URL.endsWith("articles/new")) {
    // Disable image tab
    jQuery('#tabs').tabs("option", "disabled", [1]);
  }
});
