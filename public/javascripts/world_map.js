window.onload = function() {
  var mapOptions = {
    zoom: 1,
    mapTypeId: google.maps.MapTypeId.TERRAIN,
    disableDefaultUI: true,
    draggable: false,
    scrollwheel: false,
    center: new google.maps.LatLng(25,0)
  };

  var world_map = new google.maps.Map(document.getElementById("world_map"), mapOptions);

  var timeout;
  jQuery('#articles_countries_wrapper').mouseover(function() {
      clearTimeout(timeout);
  });
  jQuery('#articles_countries_wrapper').mouseout(function() {
          timeout=setTimeout("jQuery('#articles_countries_wrapper').hide('explode', 600)", 4000);
  });

  function plotMarker(position, world_map) {
    var lonLat = new google.maps.LatLng(position.latitude, position.longitude);
    marker = new google.maps.Marker({
      map:world_map,
      draggable:false,
      position:lonLat});
    return marker;
  }

  function plotCustomMarker(position, world_map) {
    var myIcon = new google.maps.MarkerImage("/images/green_marker.png",
    new google.maps.Size(20, 34));

    var lonLat = new google.maps.LatLng(position.latitude, position.longitude);
    var marker = new google.maps.Marker({
      map:world_map,
      draggable:false,
      position:lonLat,
      icon: myIcon
      });

    return marker;
  }

  var url = '/countries/info';
  jQuery.ajax({
    url: url,
    dataType: 'json',

    success: function(transport) {
      var countryInfo = transport;
      jQuery.each(countryInfo, function(idx, country) {
        var marker = plotMarker(country, world_map);
        // mouse listener
        google.maps.event.addListener(marker, 'mouseover', function(e) {
        console.log("over %o", marker);
          //marker.setAnimation(google.maps.Animation.BOUNCE);
          clearTimeout(timeout);
          var articleLinks = "";
          jQuery.each(country.articles, function(idx, article) {
            articleLinks += "<li><a href='/articles/" + article.id + "'>" + article.title + "</a></li>";
          });
          jQuery('#articles_countries').html(
          "<div><h1>" + country.countryName + "</h1></div><ul>" + articleLinks + "</ul>"
          );
          jQuery('#articles_countries_wrapper').fadeIn();
        });


        google.maps.event.addListener(marker, "mouseout", function(e) {
        console.log("out %o", marker);
          //marker.setAnimation(null);
          timeout=setTimeout("jQuery('#articles_countries_wrapper').hide('explode', 600)", 4000);
        });
      });
    }
  });

  jQuery('.user_location').each(function(idx, elem) {
    var lat = jQuery(elem).find('.user_location_latitude').text();
    var lon = jQuery(elem).find('.user_location_longitude').text();
    var username = jQuery(elem).find('.user_name').text();
    var marker = plotCustomMarker({longitude: lon, latitude: lat}, world_map);
    marker.setTitle(username + "'s location");
    });


  var removeGoogleTitleAndSetOwn = function() {
    $("#world_map div[title*='location'] img").each(function(i, elm) {
      $(elm).attr('title', $(elm).parent().attr('title'));
      $(elm).parent().attr('title', '');
      $(elm).tooltip({effect: 'slide'});
    });
  };
  setTimeout(removeGoogleTitleAndSetOwn, 800);

};
