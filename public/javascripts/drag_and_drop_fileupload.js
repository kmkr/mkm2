jQuery(function() {
  var dropArea = $("#drop_area");
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

    if (newValue == 100) { //completed
      jQuery("#progress").hide(); 
      jQuery("#progressbar").hide('fade', 500);
      jQuery("#statusupdate").html('Uploaded ' + totalNumFiles + " file(s)");
      jQuery("#statusdiv").show('highlight');
      totalNumFiles = 0;
      completedTransfers = 0;
    }
  }

  function traverseFiles (files) {
    var li, img, file, fileInfo; 
    var readFiles = 0;
    totalNumFiles += files.length;
    updateCompletion(0); // Fire change 

    for (var i=0, il=files.length; i<il; i++) {
      jQuery('#progressbar').show();
      jQuery("#statusdiv").hide('fade');
      jQuery('#progress').show();
      file = files[i];
      if (!file.type.match('image.*')) {
        alert("File number " + i + " does not look like an image");
        continue;
      }
      var files = files;

      var binaryReader = new FileReader();
      binaryReader.onload = (function (theImg) {
        return function (evt) {
          var imageBinary = evt.target.result;
          var fileName = files[readFiles].fileName;
          // looks like the image is ok
          // send it to the server
          var base64Value = jQuery.base64Encode(imageBinary);
          var fileNameEncoded = encodeURIComponent(fileName);
          var encodedData = encodeURIComponent(base64Value);
          var actionPath = jQuery('#article_form').attr('action').split('/');
          var article_id = actionPath[actionPath.length - 1] * 1;
          var postData = "article_id="+article_id+"&file_name="+fileNameEncoded+ "&binary_data="+encodedData;
          readFiles = readFiles + 1;

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
  var dataTransferAvailable = true;
  try {
  var dt = DataTransfer;
  if (!("files" in DataTransfer.prototype)) {
    dataTransferAvailable = false;
  }
  } catch (e) {
    dataTransferAvailable = false;
  }
  if (dataTransferAvailable) {
    // file API is available 
    jQuery('#degregated_upload_area').hide();
    dropArea.bind("dragleave", function (evt) {
          this.className = "";
         evt.preventDefault();
          evt.stopPropagation();
        });

    dropArea.bind("dragenter", function (evt) {
          this.className = "dragenter";
          evt.preventDefault();
          evt.stopPropagation();
        });

    dropArea.bind("dragover", function (evt) {
          evt.preventDefault();
          evt.stopPropagation();
        });

    dropArea.bind("drop", function (evt) {
        traverseFiles(evt.originalEvent.dataTransfer.files);
          evt.preventDefault();
          evt.stopPropagation();
        });
    }  else {
      jQuery('#drop_area').hide();
    }
});
