jQuery(function() {
  var mapOpen = false;
  var latitude = 0;
  var longitude = 0;
  var zoom_level = 0;
  var epsgProj = new OpenLayers.Projection("EPSG:4326");
  var size = new OpenLayers.Size(10,10);
  var icon = new OpenLayers.Icon('/images/ball_red.png', size, 0);
  var markers = new OpenLayers.Layer.Markers("Markers");
  OpenLayers.ImgPath = "http://js.mapbox.com/theme/dark/";
  
  var options = { projection: 'EPSG:4326', controls: [
    new OpenLayers.Control.Navigation(),
    new OpenLayers.Control.PanZoom()
  ],
  theme: null};


  var latitude = $('#article_latitude').val();
  var longitude = $('#article_longitude').val();
  var zoom_level = $('#article_zoom_level').val();

  var articleMap = new OpenLayers.Map( 'show_article_country_map', options);
  console.log(articleMap);
  var layer = new OpenLayers.Layer.Google( "article gphy",
  {type: G_PHYSICAL_MAP});
  $('#show_article_country_map').fadeTo("fast", 0.6);
  
  articleMap.addLayer(layer);
  articleMap.addLayer(markers);
  var position = new OpenLayers.LonLat(longitude, latitude).transform(epsgProj, articleMap.getProjectionObject());
  articleMap.setCenter(position, zoom_level, false, true);
    markers.addMarker(new OpenLayers.Marker(new OpenLayers.LonLat(longitude, latitude).transform(epsgProj, articleMap.getProjectionObject()), icon.clone()));
});
