jQuery(function() {
if ($('#user_map').length > 0) {
  var epsgProj = new OpenLayers.Projection("EPSG:4326");
  var size = new OpenLayers.Size(10,10);
  var icon = new OpenLayers.Icon('/images/ball_yellow.png', size, 0);
  var userMapMarkers = new OpenLayers.Layer.Markers("Markers");
  var options = { projection: 'EPSG:4326', controls: [
    new OpenLayers.Control.Navigation({zoomWheelEnabled: false})
  ],
  theme: null
  }
  var userMap = new OpenLayers.Map( 'user_map', options);
  var userMapLayer = new OpenLayers.Layer.Google( "user map", 
  {type: G_PHYSICAL_MAP});
  userMap.addLayer(userMapLayer);
  $('#user_map').fadeTo("fast", 0.8);
  
  userMap.addLayer(userMapMarkers);
  userMap.setCenter(new OpenLayers.LonLat(20,20), 1, false, true);

  if (user_longitude != undefined && user_latitude != undefined) {
    var lonLat = new OpenLayers.LonLat(user_longitude, user_latitude);
    var countryMarker = new OpenLayers.Marker(lonLat.transform(epsgProj, userMap.getProjectionObject()), icon.clone());
    userMapMarkers.addMarker(countryMarker);
  }

    // mouse listener
    userMap.events.register("click", userMap, function(e) {
    var mapPos = this.events.getMousePosition(e);
    var position = userMap.getLonLatFromPixel(mapPos).transform(userMap.getProjectionObject(), epsgProj);
    jQuery.ajax({
      type: 'PUT',
      url: '/users/' + user_id,
      data: "latitude="+position.lat + "&longitude=" + position.lon,
      success: function(data) {
        userMapMarkers.clearMarkers();
        userMapMarkers.addMarker(new OpenLayers.Marker(position.transform(epsgProj, userMap.getProjectionObject()), icon.clone()));
      },
      error: function(xhr, status, e) {
        alert("FAIL!! " + e);
      }
    });

    });


}
});
