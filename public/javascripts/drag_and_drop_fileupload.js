document.observe("dom:loaded", function() {
  var dropArea = $("drop_area");
  var filesWaiting = [];
  var ongoingTransfer = false;
  var completedTransfers = 0;
  var totalNumFiles = 0;
  jQuery( "#progressbar" ).progressbar({ value: 0 });
  jQuery("#progressbar").hide();

  function transferFile(postData) {
     jQuery.ajax({
       type: "POST",
       url: "/assets",
       data: postData,
       success: function(msg){
          updateCompletion(1);
         if (filesWaiting.length > 0) {
            var file = filesWaiting.shift();
            transferFile(file);
         } else {
            ongoingTransfer = false;
         }
       }
    });
  }

  function updateCompletion(num) {
    completedTransfers += num;
    var newValue = (completedTransfers/totalNumFiles)*100;
    jQuery( "#progressbar" ).progressbar( "option", "value", newValue);

    if (newValue == 100) {
      jQuery("#progressbar").hide('bounce', 1000);
      jQuery("#statusupdate").html('Lastet opp ' + totalNumFiles + " fil(er)");
      jQuery("#statusdiv").effect('highlight');
    }
  }

  function traverseFiles (files) {
    var li, img, file, fileInfo; 
    totalNumFiles += files.length;
    updateCompletion(0); // Fire change 

    for (var i=0, il=files.length; i<il; i++) {
      jQuery('#progressbar').show();
      file = files[i];
      if (!file.type.match('image.*')) {
        alert("Fil nummer " + i + " ser ikke ut til å være et bilde");
        continue;
      }

      var binaryReader = new FileReader();
      binaryReader.onload = (function (theImg) {
        return function (evt) {

           var imageBinary = evt.target.result;
          // looks like the image is ok
          // send it to the server
          var base64Value = jQuery.base64Encode(imageBinary);
          var encodedData = encodeURIComponent(base64Value);
          var actionPath = jQuery('#article_form').attr('action').split('/');
          var article_id = actionPath[actionPath.length - 1] * 1;
          var postData = "article_id="+article_id+"&binary_data="+encodedData;

          if (ongoingTransfer == true) {
            filesWaiting.push(postData);
          } else {
            ongoingTransfer = true;
            transferFile(postData);
         }
        };
      }(img));
      binaryReader.readAsBinaryString(file);

    }
  };
  if ("files" in DataTransfer.prototype) {
    // file API is available 
    jQuery('#degregated_upload_area').hide();
    dropArea.observe("dragleave", function (evt) {
          this.className = "";
         evt.preventDefault();
          evt.stopPropagation();
        }, false);

    dropArea.observe("dragenter", function (evt) {
          this.className = "dragenter";
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
    }  else {
      jQuery('#drop_area').hide();
    }
});
