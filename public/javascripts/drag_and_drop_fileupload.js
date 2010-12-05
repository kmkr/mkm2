document.observe("dom:loaded", function() {
    var dropArea = $("drop_area");
    var fileList = $("file_list");
    console.log(dropArea);
    console.log(fileList);

    function traverseFiles (files) {
    console.log("traversing");
    var li,
    img,
    file,
    reader,
    fileInfo;
    fileList.empty();

    for (var i=0, il=files.length; i<il; i++) {
    file = files[i];
    if (!file.type.match('image.*')) {
    console.log("not an image");
    continue;
    }

    li = new Element("li");

    img = new Element("img", {'class': 'thumbnail'});
    reader = new FileReader();
    reader.onload = (function (theImg) {
        return function (evt) {
        theImg.src = evt.target.result;
        };
        }(img));
    reader.readAsDataURL(file);

    // Send fila her med xhr...
    var url = "/articles/update" + ....
    new Ajax.Request(url, {
      method: 'post',

      onSuccess: function(transport) {
        var result = transport.responseJSON.country;
        latitude = result.latitude;
        longitude = result.longitude;
        zoom_level = result.zoom_level;
        map.setCenter(new OpenLayers.LonLat(longitude, latitude).transform(epsgProj, map.getProjectionObject()), zoom_level, false, true);
      }
    });

    var fileInfo = new Element("div");
    fileInfo.setStyle({"display": "none"});

    fileInfo.update("Name: " + file.name);
    fileInfo.update("Type: " + file.type);

    li.appendChild(fileInfo);

    if (typeof img !== "undefined") {
      li.appendChild(img);

    }
    fileList.appendChild(li);
    }
    };

    dropArea.observe("dragleave", function (evt) {
        this.className = "";
        evt.preventDefault();
        evt.stopPropagation();
        }, false);

    dropArea.observe("dragenter", function (evt) {
        this.className = "over";
        evt.preventDefault();
        evt.stopPropagation();
        }, false);

    dropArea.observe("dragover", function (evt) {
        evt.preventDefault();
        evt.stopPropagation();
        }, false);

    dropArea.observe("drop", function (evt) {
        traverseFiles(evt.dataTransfer.files);
        evt.preventDefault();
        evt.stopPropagation();
        }, false);
});
