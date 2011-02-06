var galleryLoaded = false;
var article_gallery;

function findStartAtIndex() {
    //var hash_image_name = window.location.split("=").pop();
    var hash = window.location.hash;
    if (hash.indexOf("image=") == -1) {
      return 0;
    }

    var hash_image_name = hash.split("image=").pop();
    var start_at_idx = 0;
    var found_image = false;
    $('.ad-thumb-list img').each(function(idx, image) {
      var img_name = $(image).attr('src').split("/").pop().split("?").shift();

      if (img_name == hash_image_name) {
        start_at_idx = idx;
        found_image = true;
      }
    });

    if (!found_image) {
      $('#no_such_hash').dialog({modal: true, width: 450, draggable: true});
    }

    return start_at_idx;
}

function loadGallery() {
  if (!galleryLoaded) {

    var startAtIndex = findStartAtIndex();

    var galleries = jQuery('.ad-gallery').adGallery({
      loader_image: '/images/loader.gif',
      slideshow: {
        enable: false
      },
      start_at_index: startAtIndex,

      callbacks: {
        init: function() {
          this.preloadImage(0);
          this.preloadImage(1);
        },
        beforeImageVisible: function(new_image, old_image) {
        },
        afterImageVisible: function() {
          var state = {},
          id = 'image';
          var image_name = this.images[this.current_index].image.split("/").pop().split("?").shift();
          // Set the state!
          state[ id ] = image_name;
          $.bbq.pushState( state );
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

    article_gallery = galleries[0];

    galleryLoaded = true;
  }
}

$(function() {
  // assumes a hashchange indicates a gallery view
  // in case this is a fresh page load, fire the event to show correct image
  $(window).bind( 'hashchange', function(e) {
    /*
    switchToTab(1);
    loadGallery();
    */
    scrollToAndSwitchToTab(1);
    var new_index = findStartAtIndex();
    if (article_gallery.current_index != new_index) {
      article_gallery.showImage(new_index);
    }
  });
});
