$(function() {

  $.featureList(
    $("#random_articles_list li a"),
    $("#output li"), {
      start_item  : 0
    }
  );
});
