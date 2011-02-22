jQuery(function() {
  var latitude = parseFloat($('#article_latitude').val());
  var longitude = parseFloat($('#article_longitude').val());
  var zoom_level = parseInt($('#article_zoom_level').val(), 10);
  if(!zoom_level) {
    zoom_level = 1;
  }

  if(!latitude) {
    latitude = 1;
  }

  if(!longitude) {
    longitude = 1;
  }

  var mapOptions = {
    zoom: zoom_level,
    mapTypeControl: false,
    streetViewControl: false,
    scrollView: false,
    mapTypeId: google.maps.MapTypeId.TERRAIN,
    center: new google.maps.LatLng(latitude,longitude)
  };

  var article_map = new google.maps.Map(document.getElementById("show_article_country_map"), mapOptions);

  $('#show_article_country_map').fadeTo("fast", 0.6);
  
    var lonLat = new google.maps.LatLng(latitude, longitude);
    marker = new google.maps.Marker({
      map:article_map,
      position:lonLat});
});
