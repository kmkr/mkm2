$(function() {
  var spans = $('#article_thumb_images div.article_image');
  $("img", spans).fadeTo(0, .65);
  spans.hover(function() {
      $("img", this).fadeTo(400, 1);
      $("p", this).show('slide', {direction: 'up'}, 400);
    },
    function() {
      $("img", this).fadeTo(400, .65); 
      $("p", this).hide('slide', {direction: 'up'}, 400);
    });
});
