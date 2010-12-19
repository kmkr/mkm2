jQuery(function() { 
  // between -5 and 5 is the key
  jQuery('#random_imgs img').each(function(idx, element) {
    jQuery(element).rotate(Math.random()*10 -5); 
  });
});

jQuery(function() { //perform actions when DOM is ready
  var z = 0; //for setting the initial z-index's
  var inAnimation = false; //flag for testing if we are in a animation

  jQuery('#random_imgs canvas, #random_imgs img').each(function(idx, element) { //set the initial z-index's
    z++; //at the end we have the highest z-index value stored in the z variable
    jQuery(this).css('z-index', z); //apply increased z-index to <img>
  });

  function swapFirstLast(isFirst) {
    if(inAnimation) return false; //if already swapping pictures just return
    else inAnimation = true; //set the flag that we process a image

    var processZindex, direction, newZindex, inDeCrease; //change for previous or next image

    if(isFirst) { processZindex = z; direction = '-'; newZindex = 1; inDeCrease = 1; } //set variables for "next" action
    else { processZindex = 1; direction = ''; newZindex = z; inDeCrease = -1; } //set variables for "previous" action

    jQuery('#random_imgs canvas, #random_imgs img').each(function() { //process each image
      if(jQuery(this).css('z-index') == processZindex) { //if its the image we need to process
        jQuery(this).animate({ 'top' : direction + jQuery(this).height() + 'px' }, 300, function() { //animate the img above/under the gallery (assuming all pictures are equal height)
          jQuery(this).css('z-index', newZindex) //set new z-index
            .animate({ 'top' : '0' }, 300, function() { //animate the image back to its original position
              inAnimation = false; //reset the flag
            });
        });
      } else { //not the image we need to process, only in/de-crease z-index
        jQuery(this).animate({ 'top' : '0' }, 300, function() { //make sure to wait swapping the z-index when image is above/under the gallery
          jQuery(this).css('z-index', parseInt(jQuery(this).css('z-index')) + inDeCrease); //in/de-crease the z-index by one
        });
      }
    });

    return false; //don't follow the clicked link
  }


  setInterval(swapImg, 8000);
  function swapImg() {
    swapFirstLast(true);
  }

});