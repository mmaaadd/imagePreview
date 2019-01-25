// function responsible for drag and drop part
$('#dropArea').on({
    'dragover dragenter': function(e) {
        e.preventDefault();
        e.stopPropagation();
    },
    'drop': function(e) {
        //console.log(e.originalEvent instanceof DragEvent);
        var dataTransfer =  e.originalEvent.dataTransfer;
        if( dataTransfer && dataTransfer.files.length) {
            e.preventDefault();
            e.stopPropagation();
            $.each( dataTransfer.files, function(i, file) { 
              var reader = new FileReader();
              reader.onload = $.proxy(function(file, $imageArea, event) {
                 img = file.type.match('image.*') ? "<img id='previedImage' src='" + event.target.result + "' /> " : "";
                previewDroppedImage (img)
                //$imageArea.empty();
                //$imageArea.append(img);
              }, this, file, $("#hiddenimageArea"));
              reader.readAsDataURL(file);
            });
        }          
     }
});


//make sure that image element exists before adjusting it.
function waitAndAdjust() {
    if ($("#previedImage").height()==0) {
        console.log('Waiting for your location...');
        setTimeout(waitAndAdjust, 100);
        return;
    } else {
        adjustImageFormat()
    }
}

//function previewing image from external link
function previewDroppedImage(img) {
    $("#imageArea").empty();
    $("#imageArea").append(img)
    adjustImageFormat()
  }

//function previewing image from external link
function previewImageFromLink() {
    $("#imageArea").empty();
    $("#imageArea").append("<img id='previedImage' src='"+ $("#imageLink").val() + "'/>")
    adjustImageFormat()
  }

//function adjusting image size to display area
function adjustImageFormat() {
    if ($("#previedImage").height()==0) { //make sure that image already exists in DOM
        console.log('Waiting for your location...');
        setTimeout(waitAndAdjust, 100);
        return;
    } else {
        var containerRatio = $("#previedImage").parent().height() / $("#previedImage").parent().width()
        var imageRatio = $("#previedImage").height() / $("#previedImage").width()
        if (imageRatio >= containerRatio) {
            $("#previedImage").css("height","100%")
            $("#previedImage").css("width","")
            $("#previedImage").css("top","0px")
            $("#previedImage").css("position","relative")        
        } else {
            $("#previedImage").css("width","100%")
            $("#previedImage").css("height","")
            var topMargin = ($("#previedImage").parent().height() - $("#previedImage").height())/2
            $("#previedImage").css("top",topMargin)
            $("#previedImage").css("position","relative")
        }    
    }
}

//adjust image size when window size changes
$( window ).resize(function() {
    waitAndAdjust()   
 });