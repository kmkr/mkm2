jQuery(function() {
  var mapOptions = {
    zoom: 1,
    mapTypeId: google.maps.MapTypeId.TERRAIN,
    disableDefaultUI: true,
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

  var url = '/countries/info'
  jQuery.ajax({
    url: url,
    dataType: 'json',

    success: function(transport) {
      var countryInfo = transport;
      jQuery.each(countryInfo, function(idx, country) {
        var marker = plotMarker(country, world_map);
        // mouse listener
        google.maps.event.addListener(marker, 'mouseover', function(e) {
          marker.setAnimation(google.maps.Animation.BOUNCE);
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
          marker.setAnimation(null);
          timeout=setTimeout("jQuery('#articles_countries_wrapper').hide('explode', 600)", 4000);
        });
      });
    }
  });

  jQuery('.user_location').each(function(idx, elem) {
    var lat = jQuery(elem).find('.user_location_latitude').text();
    var lon = jQuery(elem).find('.user_location_longitude').text();
    var username = jQuery(elem).find('.user_name').text();
    var marker = plotMarker({longitude: lon, latitude: lat}, world_map);
    marker.setTitle(username + "'s location");
  });

  function plotMarker(position, world_map) {
    var lonLat = new google.maps.LatLng(position.latitude, position.longitude);
    marker = new google.maps.Marker({
      map:world_map,
      draggable:false,
      position:lonLat});
    return marker;
  }

});
