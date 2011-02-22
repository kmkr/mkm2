$(function() {
  // Since the event is only triggered when the hash changes, we need to trigger
  // the event now, to handle the hash the page may have loaded with.
  if (window.location.hash.charAt(0) == "#") { 
    $(window).trigger( 'hashchange' );
    scrollToAndSwitchToTab(1);
  }
});
