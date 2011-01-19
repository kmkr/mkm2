jQuery(function() {
  var mapOpen = false;
  var position;
  var epsgProj = new OpenLayers.Projection("EPSG:4326");
  var size = new OpenLayers.Size(10,10);
  var icon = new OpenLayers.Icon('/images/ball_red.png', size, 0);
  var markers = new OpenLayers.Layer.Markers("Markers");
  OpenLayers.ImgPath = "http://js.mapbox.com/theme/dark/";
  
  var options = { projection: 'EPSG:4326', controls: [
    new OpenLayers.Control.Navigation({zoomWheelEnabled: true}),
    new OpenLayers.Control.ArgParser(),
  ],
  theme: null};
  var longitudeField = jQuery("#article_longitude");
  var latitudeField = jQuery("#article_latitude");
  var zoomField = jQuery("#article_zoom_level");

  var articleMap = new OpenLayers.Map( 'country_map', options);
  var layer = new OpenLayers.Layer.OSM( "Simple OSM Map");
  layer.setOpacity(.6);
  
  articleMap.addLayer(layer);
  articleMap.addLayer(markers);

  var longitudeValue = longitudeField.val();
  var latitudeValue = latitudeField.val();
  var zoom_level = zoomField.val();
  if (longitudeValue > 0) {
    jQuery('#country_map').show();
    var p = new OpenLayers.LonLat(longitudeValue*1, latitudeValue*1);
    var position = p.transform(epsgProj, articleMap.getProjectionObject())
      try {
        articleMap.setCenter(p, zoom_level*1);
        markers.addMarker(new OpenLayers.Marker(position, icon.clone()));
      } catch (e) {
        //log("unable to set map center. Running FF? %o", e);
      }
  }

  articleMap.events.register("click", articleMap, function(e) {
    var mapPos = this.events.getMousePosition(e);
    var position = articleMap.getLonLatFromPixel(mapPos).transform(articleMap.getProjectionObject(), epsgProj);
    longitudeField.val(position.lon);
    latitudeField.val(position.lat);
    zoomField.val(articleMap.getZoom());
    markers.clearMarkers();
    markers.addMarker(new OpenLayers.Marker(position.transform(epsgProj, articleMap.getProjectionObject()), icon.clone()));
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
        articleMap.setCenter(new OpenLayers.LonLat(longitude, latitude).transform(epsgProj, articleMap.getProjectionObject()), zoom_level, false, true);
      }
    });
    if (mapOpen == false) {
      jQuery('#country_map').show('fade');
      mapOpen = true;
    }
  });
});
