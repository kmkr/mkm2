jQuery(function() {
  var latitude = 0;
  var longitude = 0;
  var zoom_level = 0;

  var latitude = $('#article_latitude').val()*1;
  var longitude = $('#article_longitude').val()*1;
  var zoom_level = $('#article_zoom_level').val()*1;

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
