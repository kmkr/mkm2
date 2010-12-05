document.observe("dom:loaded", function() {
  var latitude = 0;
  var longitude = 0;
  var zoom_level = 0;
  var map, layer, position;
  var epsgProj = new OpenLayers.Projection("EPSG:4326");
  var size = new OpenLayers.Size(12,12);
  var icon = new OpenLayers.Icon('http://www.virtualdisasterviewer.com/vdv/images/red_point.gif', size, 0);
  var markers = new OpenLayers.Layer.Markers("Markers");
  OpenLayers.ImgPath = "http://js.mapbox.com/theme/dark/";
  
  var options = { projection: 'EPSG:4326', theme: null}



  map = new OpenLayers.Map( 'countryMap', options);
  layer = new OpenLayers.Layer.OSM( "Simple OSM Map");
  
  map.addLayer(layer);
  map.addLayer(markers);

  map.setCenter(new OpenLayers.LonLat(20,20), 1, false, true);
  
  map.events.register("click", map, function(e) {
    var longitudeField = $("article_longitude");
    var latitudeField = $("article_latitude");
    var mapPos = this.events.getMousePosition(e);
    position = map.getLonLatFromPixel(mapPos).transform(map.getProjectionObject(), epsgProj);
    Form.Element.setValue(longitudeField, position.lon);
    Form.Element.setValue(latitudeField, position.lat);
    markers.clearMarkers();
    markers.addMarker(new OpenLayers.Marker(position.transform(epsgProj, map.getProjectionObject()), icon.clone()));
  });
  

  Event.observe("article_country_id", "change", function(event) {
    var countryId = $(this).options[this.selectedIndex].value;

    var url = '/countries/' + countryId
    new Ajax.Request(url, {
      method: 'get',
      requestHeaders: ['Accept', 'application/json'],

      onSuccess: function(transport) {
        var result = transport.responseJSON.country;
        latitude = result.latitude;
        longitude = result.longitude;
        zoom_level = result.zoom_level;
        map.setCenter(new OpenLayers.LonLat(longitude, latitude).transform(epsgProj, map.getProjectionObject()), zoom_level, false, true);
      }
    });
  });
});
