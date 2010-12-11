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
  var worldMap = new OpenLayers.Map( 'world_map', options);
  var worldMapLayer = new OpenLayers.Layer.OSM( "Simple OSM Map");
  worldMapLayer.setOpacity(.6);
  worldMap.addLayer(worldMapLayer);
  
  worldMap.addLayer(worldMapMarkers);
  worldMap.setCenter(new OpenLayers.LonLat(20,20), 1, false, true);

    var timeout;
    $('articles_countries').observe('mouseover', function() {
        clearTimeout(timeout);
    });
    $('articles_countries').observe('mouseout', function() {
            timeout=setTimeout("Effect.SwitchOff('articles_countries')", 4000);
    });

    var url = '/countries/info'
    new Ajax.Request(url, {
      method: 'get',
      requestHeaders: ['Accept', 'application/json'],

      onSuccess: function(transport) {
        var countryInfo = transport.responseJSON;
        countryInfo.each(function(position) {
          var lonLat = new OpenLayers.LonLat(position.longitude, position.latitude);
          var countryMarker = new OpenLayers.Marker(lonLat.transform(epsgProj, worldMap.getProjectionObject()), icon.clone());
          worldMapMarkers.addMarker(countryMarker);
          // mouse listener
          countryMarker.events.register("mouseover", countryMarker, function(e) {
          clearTimeout(timeout);
          var articleLinks = "";
          position.articles.each(function(article) {
            articleLinks += "<li><a href='/articles/" + article.id + "'>" + article.title + "</a></li>";
          });
            $('articles_countries').update("<div><h1>" + position.countryName + "</h1></div><ul>" + articleLinks + "</ul>");
            Effect.Appear('articles_countries', {duration: 0.5});
          });

          countryMarker.events.register("mouseout", countryMarker, function(e) {
            timeout=setTimeout("Effect.SwitchOff('articles_countries')", 4000);
          });
        });
      }
    });



});
