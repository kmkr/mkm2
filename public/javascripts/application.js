var galleryLoaded = false;
function loadGallery() {
  if (!galleryLoaded) {
    jQuery('.ad-gallery').adGallery({
      slideshow: {
        enable: false
      },

      callbacks: {
        init: function() {
          this.preloadImage(0);
          this.preloadImage(1);
        },
        beforeImageVisible: function(new_image, old_image) {
          // impl hashchange
        }
      }
    });
    galleryLoaded = true;
  }
}
