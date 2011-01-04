jQuery(function() {
  var epsgProj = new OpenLayers.Projection("EPSG:4326");
  var size = new OpenLayers.Size(10,10);
  var icon_red = new OpenLayers.Icon('/images/ball_red.png', size, 0);
  var icon_yellow = new OpenLayers.Icon('/images/ball_yellow.png', size, 0);
  var worldMapMarkers = new OpenLayers.Layer.Markers("Markers");
  var options = { projection: 'EPSG:4326', controls: [
    new OpenLayers.Control.Navigation({zoomWheelEnabled: false})
  ],
  theme: null
  }
  var worldMap = new OpenLayers.Map( 'world_map', options);
  var worldMapLayer = new OpenLayers.Layer.Google(
    "gphy",
    {type: G_PHYSICAL_MAP}
    );

  worldMap.addLayer(worldMapLayer);
  
  worldMap.addLayer(worldMapMarkers);
  worldMapLayer.setOpacity(.8);

  worldMap.zoomToMaxExtent();
  worldMap.setCenter(new OpenLayers.LonLat(0, 0), 1);


  var timeout;
  jQuery('#articles_countries').mouseover(function() {
      clearTimeout(timeout);
  });
  jQuery('#articles_countries').mouseout(function() {
          timeout=setTimeout("jQuery('#articles_countries').hide('explode', 600)", 4000);
  });

  var url = '/countries/info'
  jQuery.ajax({
    url: url,
    dataType: 'json',
    beforeSend: function(xhrObj){
      xhrObj.setRequestHeader("Accept","application/json");
    },

    success: function(transport) {
      var countryInfo = transport;
      jQuery.each(countryInfo, function(idx, country) {
        var marker = plotMarker(country, icon_red.clone());
        // mouse listener
        marker.events.register("mouseover", marker, function(e) {
          clearTimeout(timeout);
          var articleLinks = "";
          jQuery.each(country.articles, function(idx, article) {
            articleLinks += "<li><a href='/articles/" + article.id + "'>" + article.title + "</a></li>";
          });
          jQuery('#articles_countries').html(
          "<div><h1>" + country.countryName + "</h1></div><ul>" + articleLinks + "</ul>"
          );
          jQuery('#articles_countries').fadeIn();
        });

        marker.events.register("mouseout", marker, function(e) {
          timeout=setTimeout("jQuery('#articles_countries').hide('explode', 600)", 4000);
        });
      });
    }
  });

  jQuery('.user_location').each(function(idx, elem) {
    var lat = jQuery(elem).find('.user_location_latitude').text();
    var lon = jQuery(elem).find('.user_location_longitude').text();
    var marker = plotMarker({longitude: lon, latitude: lat}, icon_yellow.clone());
    marker.events.register("mouseover", marker, function(e) {
    });
  });

  function plotMarker(position, icon) {
    var lonLat = new OpenLayers.LonLat(position.longitude, position.latitude);
    var countryMarker = new OpenLayers.Marker(lonLat.transform(epsgProj, worldMap.getProjectionObject()), icon);
    worldMapMarkers.addMarker(countryMarker);
    return countryMarker;
  }

});
