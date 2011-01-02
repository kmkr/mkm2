jQuery(function() {

  jQuery.featureList(
    jQuery("#random_articles_list li a"),
    jQuery("#output li"), {
      start_item  : 0
    }
  );
});
