$(function() {
  var spans = $('#article_thumb_images div.article_image');
  $("img", spans).fadeTo(0, 0.75);
  spans.hover(function() {
      $("img", this).fadeTo(400, 1);
      $("p", this).show('slide', {direction: 'up'}, 400);
    },
    function() {
      $("img", this).fadeTo(400, 0.75); 
      $("p", this).hide('slide', {direction: 'up'}, 400);
    });
});
