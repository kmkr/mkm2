var galleryLoaded = false;
var article_gallery;

// set the #article_main_image width according to the actual image size
var resizeImageIfCssIsWrong = function () {
  var imageWidth = $('#article_main_image img').width();
  var cssWidth = $('#article_main_image').width();
  if (cssWidth > imageWidth) {
    $('#article_main_image').css('width', imageWidth);
  }
};

$(function () {
  var popUpDialog = function() {
    $('#no_such_hash').dialog({
      modal: true,
      width: 440
    });
  };

  var articleTabs = jQuery('#article_tabs').tabs();
  var switchToTab = function (idx) {
    articleTabs.tabs('select', idx);
  };

  var findStartAtIndex = function () {
    var hash = window.location.hash;
    if (hash.indexOf("image=") === -1) {
      return 0;
    }

    var hash_image_name = hash.split("image=").pop();
    hash_image_name = decodeURIComponent(hash_image_name);
    hash_image_name = hash_image_name.replace(/\+/g, " ");
    console.log("hash: %s", hash_image_name);
    var start_at_idx = 0;
    var found_image = false;
    $('.uber-thumb-list img').each(function (idx, image) {
      var img_name = $(image).attr('src').split("/").pop().split("?").shift();
      console.log("fant: %s", img_name);

      if (img_name === hash_image_name) {
        start_at_idx = idx;
        found_image = true;
      }
    });
    if (!found_image) {
      // timeout as we need the page to center on the image
      setTimeout(popUpDialog, 650);
    }

    return start_at_idx;
  };

  var popImageName = function(image_name) {
    return image_name.split("/").pop().split("?").shift();
  };

  var loadGallery = function () {
    if (!galleryLoaded) {

      var startAtIndex = findStartAtIndex();

      var galleries = jQuery('.uber-gallery').adGallery({
        loader_image: '/images/loader.gif',
        slideshow: {
          enable: false
        },
        start_at_index: startAtIndex,

        callbacks: {
          init: function () {
            this.preloadImage(this.current_index + 1);
            this.preloadImage(this.current_index + 2);
            this.preloadImage(this.current_index + 3);
          },
          beforeImageVisible: function (new_image, old_image) {
            $('p.uber-image-description').fadeTo(0, 0.85);
          },
          afterImageVisible: function () {
            var state = {},
                id = 'image';
            var image_name = popImageName(this.images[this.current_index].image);
            // Set the state!
            state[id] = image_name;
            $.bbq.pushState(state);
            this.preloadImage(this.current_index + 1);
            this.preloadImage(this.current_index + 2);
            this.preloadImage(this.current_index + 3);
          }
        }
      });

      article_gallery = galleries[0];

      galleryLoaded = true;

    }
  };

  var myScrollTo = function() {
    $.scrollTo('#article', 1400, {
      offset: -25,
      easing: 'easeOutElastic'
    });
  };

  var scrollToAndSwitchToTab = function (idx) {
    switchToTab(idx);
    loadGallery();
    myScrollTo();
  };
  // assumes a hashchange indicates a gallery view
  // in case this is a fresh page load, fire the event to show correct image
  $(window).bind('hashchange', function (e) {
    switchToTab(1);
    loadGallery();
    var new_index = findStartAtIndex();
    if (article_gallery.current_index !== new_index) {
      article_gallery.showImage(new_index);
    }
  });


  // load gallery for clicks on tab1
  $('#article_tabs').bind('tabsshow', function (evt, ui) {
    if (ui.index === 0) {
      resizeImageIfCssIsWrong();
      reloadArticleMap();
    }
    if (ui.index === 1) {
      loadGallery();
    }
  });

});


$(function () {
  $('#comment_email').tooltip({
    position: "center right"
  });
  $('#email_updates').click(function () {
    $(this).hide('puff', function () {
      $('#email_address_info').show('fade');
    });
    return false;
  });
});

$(function() {
  var images = $(".article_image img, #article_main_image img");
  var spans = $(".article_image img[title], #article_main_image img[title]");
  $(spans).tooltip({effect: 'slide', bounce: true, position: "top center", predelay: 500});

  $(images).each(function(i, img) {
    $(img).click(function() {
      var image_name = img.src.split("/").pop().split("?").shift();
      image_name = decodeURIComponent(image_name);
      var state = {},
      id = 'image';
      state[id] = image_name;
      $.bbq.pushState(state);
      scrollTo();
    });
  });
});

window.onload = resizeImageIfCssIsWrong;
