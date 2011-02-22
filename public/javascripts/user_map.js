jQuery(function() {
var marker;

if ($('#user_map').length > 0) {
  var mapOptions = {
    zoom: 1,
    mapTypeControl: false,
    streetViewControl: false,
    scrollView: false,
    mapTypeId: google.maps.MapTypeId.TERRAIN,
    center: new google.maps.LatLng(1,1)
  };
  var user_map = new google.maps.Map(document.getElementById("user_map"), mapOptions);

  $('#user_map').fadeTo("fast", 0.8);
  

  if (user_longitude !== undefined && user_latitude !== undefined) {
    var lonLat = new google.maps.LatLng(user_latitude, user_longitude);
    marker = new google.maps.Marker({
      map:user_map,
      position:lonLat});
  }

  google.maps.event.addListener(user_map, 'click', function(e) {
    jQuery.ajax({
      type: 'PUT',
      url: '/users/' + user_id,
      data: "latitude="+e.latLng.lat() + "&longitude=" + e.latLng.lng(),
      success: function(data) {
        marker.setMap(null); // remove the marker
        marker = new google.maps.Marker({
          map:user_map,
          position:e.latLng});
        },
      error: function(xhr, status, e) {
        alert("FAIL!! " + e);
      }
    });

  });
}
});
