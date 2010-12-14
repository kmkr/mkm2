jQuery(function() {
  var randomImgDiv = jQuery('#random_image'); 
  var randomImages = [];
  var currentCounter = 0;
  var url = '/assets/random';
    randomImgDiv.animate({
      opacity: 0,
    }, 1);
  new Ajax.Request(url, {
    method: 'get',
    requestHeaders: ['Accept', 'application/json'],
    onSuccess: function(transport) {
      jQuery.each(transport.responseJSON, function(i, val) {
        randomImages.push(val.asset); 
      });
      loopRandomImages();
    }
  });


  function loopRandomImages() {
    switchImage();
  }

  function switchImage() {
    var str = "<img src=\"" + randomImages[currentCounter] + "\" />";
    randomImgDiv.html(str);

    setTimeout(switchImage, 10500);
    currentCounter++;

    randomImgDiv.animate({
      opacity: 1,
    }, 3000);
    randomImgDiv.animate({
      opacity: 1,
    }, 2000);
    randomImgDiv.animate({
      opacity: 0,
    }, 3000);
    if (currentCounter == randomImages.length-1) {
      currentCounter = 0;
    }
  }
});
