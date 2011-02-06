jQuery(function() {
  var mapOpen = false;

  var longitude_field = $('#article_longitude');
  var longitude = longitude_field.val()*1;
  var latitude_field = $('#article_latitude');
  var latitude = latitude_field.val()*1;
  var zoom_field = $("#article_zoom_level");
  var zoom_level = zoom_field.val()*1;
  var marker;

  var mapOptions = {
    zoom: zoom_level,
    mapTypeControl: false,
    streetViewControl: false,
    scrollView: false,
    mapTypeId: google.maps.MapTypeId.TERRAIN,
    center: new google.maps.LatLng(latitude,longitude)
  };
  var article_map = new google.maps.Map(document.getElementById("country_map"), mapOptions);
  $('#country_map').fadeTo("fast", 0.6);
  
  if (longitude > 0) {
    jQuery('#country_map').show();
    var lonLat = new google.maps.LatLng(latitude, longitude);
    marker = new google.maps.Marker({
      map:article_map,
      position:lonLat});
  }

  google.maps.event.addListener(article_map, 'click', function(e) {
    zoom_field.val(article_map.getZoom());
    longitude_field.val(e.latLng.lng());
    latitude_field.val(e.latLng.lat());
    if (marker != undefined) {
      marker.setMap(null); // remove the marker
    }
    marker = new google.maps.Marker({
      map:article_map,
      position:e.latLng});
  });
  

  jQuery("#article_country_id").change(function(event) {
    var countryId = jQuery(this).val();

    var url = '/countries/' + countryId
    jQuery.ajax({ 
      url: url,

      success: function(transport) {
        var result = transport.country;
        var latitude = result.latitude;
        var longitude = result.longitude;
        var zoom_level = result.zoom_level;
        article_map.setCenter(new google.maps.LatLng(latitude, longitude));
        article_map.setZoom(zoom_level);
      }
    });
    if (mapOpen == false) {
      jQuery('#country_map').show('fade');
      mapOpen = true;
    }
  });
});
