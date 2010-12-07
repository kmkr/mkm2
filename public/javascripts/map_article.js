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
  OpenLayers.ImgPath = "http://js.mapbox.com/theme/dark/";
  
  var options = { projection: 'EPSG:4326', theme: null}


  var latitude = Form.Element.getValue('article_latitude');
  var longitude = Form.Element.getValue('article_longitude');
  var zoom_level = Form.Element.getValue('article_zoom_level');

  articleMap = new OpenLayers.Map( 'show_article_country_map', options);
  layer = new OpenLayers.Layer.OSM( "Simple OSM Map");
  layer.setOpacity(.6);
  
  articleMap.addLayer(layer);
  articleMap.addLayer(markers);
  var position = new OpenLayers.LonLat(longitude, latitude).transform(epsgProj, articleMap.getProjectionObject());
  articleMap.setCenter(position, zoom_level*1 + 1, false, true);
    markers.addMarker(new OpenLayers.Marker(new OpenLayers.LonLat(longitude, latitude).transform(epsgProj, articleMap.getProjectionObject()), icon.clone()));
});
