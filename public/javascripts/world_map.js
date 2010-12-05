document.observe("dom:loaded", function() {
  var epsgProj = new OpenLayers.Projection("EPSG:4326");
  var size = new OpenLayers.Size(12,12);
  var icon = new OpenLayers.Icon('http://www.virtualdisasterviewer.com/vdv/images/red_point.gif', size, 0);
  var worldMapMarkers = new OpenLayers.Layer.Markers("Markers");
  var options = { projection: 'EPSG:4326', controls: [
    new OpenLayers.Control.Navigation(),
    new OpenLayers.Control.ArgParser(),
    new OpenLayers.Control.Attribution()
  ],
  theme: null
  }
  var worldMap = new OpenLayers.Map( 'worldMap', options);
  worldMap.addLayer(new OpenLayers.Layer.OSM( "Simple OSM Map"));
  
  worldMap.addLayer(worldMapMarkers);
  worldMap.setCenter(new OpenLayers.LonLat(20,20), 1, false, true);

    var url = '/positions'
    new Ajax.Request(url, {
      method: 'get',
      requestHeaders: ['Accept', 'application/json'],

      onSuccess: function(transport) {
        var positions = transport.responseJSON;
        positions.each(function(position) {
          var lonLat = new OpenLayers.LonLat(position.longitude, position.latitude);
          worldMapMarkers.addMarker(new OpenLayers.Marker(lonLat.transform(epsgProj, worldMap.getProjectionObject()), icon.clone()));
        });
      }
    });
});
