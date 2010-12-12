document.observe("dom:loaded", function() {
    var dropArea = $("drop_area");
    var fileList = $("file_list");


    function traverseFiles (files) {
      var li,
      img,
      file,
      dataUrlReader,
      fileInfo, completed;
    jQuery( "#progressbar" ).progressbar({
        value: 0
      });
      completed = 0;

    fileList.empty();

    for (var i=0, il=files.length; i<il; i++) {
      jQuery('#progressbar').effect('appear');
      file = files[i];
      if (!file.type.match('image.*')) {
        alert("Fil nummer " + i + " ser ikke ut som et bilde");
        continue;
      }

      li = new Element("li");

      img = new Element("img", {'class': 'thumbnail'});
      dataUrlReader = new FileReader();
      dataUrlReader.onload = (function (theImg) {
        return function (evt) {
          theImg.src = evt.target.result;
        };
      }(img));
      dataUrlReader.readAsDataURL(file);

      binaryReader = new FileReader();
      var imageBinary;
      binaryReader.onload = (function (theImg) {
        return function (evt) {
           imageBinary = evt.target.result;
          // looks like the image is ok
          // send it to the server
          var encodedData = jQuery.URLEncode(jQuery.base64Encode(imageBinary));
          var actionPath = jQuery('#article_form').attr('action').split('/');
          var article_id = actionPath[actionPath.length - 1] * 1;
          alert(article_id);
          jQuery.ajax({
            type: "POST",
            url: "/assets",
            data: "article_id="+article_id+"&binary_data="+encodedData,
            success: function(msg){
            console.log(msg);
              completed += 1;
              jQuery( "#progressbar" ).progressbar( "option", "value", (completed/files.length)*100);
            }
         });
        };
      }(img));
      binaryReader.readAsBinaryString(file);

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
