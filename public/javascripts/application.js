var galleryLoaded = false;
function loadGallery() {
  if (!galleryLoaded) {
    jQuery('.ad-gallery').adGallery({
      loader_image: '/images/loader.gif',
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
        },
        afterImageVisible: function() {
          var context = this;
          this.loading(true);
          this.preloadImage(this.current_index + 1,
            function() {
              // This function gets executed after the image has been loaded
              context.loading(false);
            }
          );
        }
      }
    });
    galleryLoaded = true;
  }
}
