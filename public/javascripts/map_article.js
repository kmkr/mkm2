document.observe("dom:loaded", function() {
  var mapOpen = false;
  var latitude = 0;
  var longitude = 0;
  var zoom_level = 0;
  var articleMap, layer, position;
  var epsgProj = new OpenLayers.Projection("EPSG:4326");
  var size = new OpenLayers.Size(12,12);
  var icon = new OpenLayers.Icon('http://www.virtualdisasterviewer.com/vdv/images/red_point.gif', size, 0);
  var markers = new OpenLayers.Layer.Markers("Markers");
  
  var options = { projection: 'EPSG:4326', theme: null}


  var latitude = Form.Element.getValue('article_latitude');
  var longitude = Form.Element.getValue('article_longitude');
  var zoom_level = Form.Element.getValue('article_zoom_level');

  articleMap = new OpenLayers.Map( 'country_map', options);
  layer = new OpenLayers.Layer.OSM( "Simple OSM Map");
  
  articleMap.addLayer(layer);
  articleMap.addLayer(markers);
  articleMap.setCenter(new OpenLayers.LonLat(longitude, latitude).transform(epsgProj, articleMap.getProjectionObject()), zoom_level, false, true);
    markers.addMarker(new OpenLayers.Marker(position.transform(epsgProj, articleMap.getProjectionObject()), icon.clone()));
  Effect.Appear('country_map');
});
