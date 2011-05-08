$(function() {
  jQuery( "#progressbar" ).progressbar({ value: 0 });

  var filesWaiting = [];
  var ongoingTransfer = false;
  var completedTransfers = 0;
  var totalNumFiles = 0;

  var resetTransfer = function() {
      $("#progress").hide('fade'); 
      $("#progressbar").hide('fade');
      $('#uploading_in_progress').hide('fade');

      $('#drop_wrapper').show('fade');
      $("#statusupdate").html('Uploaded ' + completedTransfers + " file(s)");
      $("#statusdiv").show('highlight');
      totalNumFiles = 0;
      completedTransfers = 0;
		filesWaiting = [];
  };

  var dropArea = $("#drop_area");
  jQuery("#progressbar").hide();

	function transferNextFile() {
   	var file = filesWaiting.shift();
      transferFile(file);
	}

  function transferFile(postData) {
     jQuery.ajax({
       type: "POST",
       url: "/assets",
       data: postData,
       success: function(msg){
          updateCompletion(1);
         if (filesWaiting.length > 0) {
				setTimeout(transferNextFile, 2000);
         } else {
            ongoingTransfer = false;
         }
       },
		 error: function(jqXhr, textStatus, error) {
			resetTransfer();
			alert("Ops, error while uploading pictures '" + textStatus + "' '" + error +"'");
		 }
    });
  }

  function updateCompletion(num) {
    if (num == 0) {
      $('#uploading_in_progress').show('fade');
      $('#uploading_in_progress p').effect('pulsate', { times: 100 }, 900);
      $('#drop_wrapper').hide('fade');
    }
    completedTransfers += num;
    var newValue = (completedTransfers/totalNumFiles)*100;
    jQuery( "#progressbar" ).progressbar( "option", "value", newValue);

    if (newValue === 100) { //completed
		resetTransfer();
    }
  }

  function traverseFiles (files) {
    var img, file;
    var readFiles = 0;
    var i = 0;
    totalNumFiles += files.length;
    updateCompletion(0); // Fire change 


    for (i=0, il=files.length; i<il; i++) {
      jQuery('#progressbar').show();
      jQuery("#statusdiv").hide('fade');
      jQuery('#progress').show();
      file = files[i];
      if (!file.type.match('image.*')) {
        alert("File number " + i + " does not look like an image");
        continue;
      }

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
          var article_id = parseInt(actionPath[actionPath.length - 1], 10);
          var postData = "article_id="+article_id+"&file_name="+fileNameEncoded+ "&binary_data="+encodedData;
          readFiles = readFiles + 1;

          if (ongoingTransfer) {
            filesWaiting.push(postData);
          } else {
            ongoingTransfer = true;
            transferFile(postData);
         }
        };
      }(img));
      binaryReader.readAsBinaryString(file);

    }
  }

  var dataTransferAvailable = true;
  try {
  if (!!FileReader && isEventSupported('drag') && 
      isEventSupported('dragstart') && 
      isEventSupported('dragenter') &&
      isEventSupported('dragover') &&
      isEventSupported('dragleave') &&
      isEventSupported('dragend') &&
      isEventSupported('drop')) {
    dataTransferAvailable = true;
  } else {
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
          this.className = "";
          evt.preventDefault();
         evt.preventDefault();
          evt.stopPropagation();
        traverseFiles(evt.originalEvent.dataTransfer.files);
        });
    }  else {
      jQuery('#drop_area').hide();
    }
});
