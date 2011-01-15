$(function() {
  var imgs = $('#article_thumb_images img');
  imgs.fadeTo(0, .65);
  imgs.hover(function() {
      $(this).fadeTo("fast", 1);
    },
    function() {
      $(this).fadeTo("fast", .65); 
    });
});
