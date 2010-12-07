document.observe("dom:loaded", function() {
  var mapOpen = false;
  var articleMap, layer, position;
  var epsgProj = new OpenLayers.Projection("EPSG:4326");
  var size = new OpenLayers.Size(12,12);
  var icon = new OpenLayers.Icon('http://www.virtualdisasterviewer.com/vdv/images/red_point.gif', size, 0);
  var markers = new OpenLayers.Layer.Markers("Markers");
  OpenLayers.ImgPath = "http://js.mapbox.com/theme/dark/";
  
  var options = { projection: 'EPSG:4326', theme: null}
  var longitudeField = $("article_longitude");
  var latitudeField = $("article_latitude");
  var zoomField = $("article_zoom_level");

  articleMap = new OpenLayers.Map( 'country_map', options);
  layer = new OpenLayers.Layer.OSM( "Simple OSM Map");
  layer.setOpacity(.6);
  
  articleMap.addLayer(layer);
  articleMap.addLayer(markers);

  var longitudeValue = Form.Element.getValue(longitudeField);
  var latitudeValue = Form.Element.getValue(latitudeField);
  var zoom_level = Form.Element.getValue(zoomField);
      var position = new OpenLayers.LonLat(longitudeValue, latitudeValue);
      if (longitudeValue > 0) {
        markers.addMarker(new OpenLayers.Marker(position.transform(epsgProj, articleMap.getProjectionObject()), icon.clone()));
        // Hvorfor virker ikke denne ? :-(
        //articleMap.setCenter(position.transform(epsgProj, articleMap.getProjectionObject()), zoom_level, false, true);
        Effect.Appear('country_map');
      }

  articleMap.events.register("click", articleMap, function(e) {
    var mapPos = this.events.getMousePosition(e);
    var position = articleMap.getLonLatFromPixel(mapPos).transform(articleMap.getProjectionObject(), epsgProj);
    Form.Element.setValue(longitudeField, position.lon);
    Form.Element.setValue(latitudeField, position.lat);
    markers.clearMarkers();
    markers.addMarker(new OpenLayers.Marker(position.transform(epsgProj, articleMap.getProjectionObject()), icon.clone()));
  });
  

  Event.observe("article_country_id", "change", function(event) {
    var countryId = $(this).options[this.selectedIndex].value;

    var url = '/countries/' + countryId
    new Ajax.Request(url, {
      method: 'get',
      requestHeaders: ['Accept', 'application/json'],

      onSuccess: function(transport) {
        var result = transport.responseJSON.country;
        var latitude = result.latitude;
        var longitude = result.longitude;
        var zoom_level = result.zoom_level;
        articleMap.setCenter(new OpenLayers.LonLat(longitude, latitude).transform(epsgProj, articleMap.getProjectionObject()), zoom_level, false, true);
      }
    });
    if (mapOpen == false) {
      Effect.Appear('country_map');
      mapOpen = true;
    }
  });
});
