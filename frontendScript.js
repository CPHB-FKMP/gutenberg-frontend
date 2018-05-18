$(document).ready(function(){
  $("#data").submit(function(event) {
    var data = $("#data").serializeArray();
    console.log(data);
    $.ajax({
      type: "GET",
      url: "https://jsonplaceholder.typicode.com/posts/1",
       success: function(result){
         console.log(result);
        buildHtmlTable(result);
      }, error: function(error){
         console.log(error);
        $("#demo").html(error);
      }
    });
  })

});

// Builds the HTML Table out of myList.
function buildHtmlTable(result) {
  var data = JSON.stringify(result);
  var columns = ["Title", "Author", "City"];

  for (var i = 0; i < data.length; i++) {
    console.log("1");
    var row$ = $('<tr/>');
    for (var colIndex = 0; colIndex < columns.length; colIndex++) {
      console.log("2");
      var cellValue = data[i][columns[colIndex]];
      if (cellValue == null) cellValue = "";
      row$.append($('<td/>').html(cellValue));
    }
    console.log("3");
    $("#results").append(row$);
    console.log($("#results"));
  }
}

function initMap() {
  var myLatLng = {lat: -25.363, lng: 131.044};

  // Create a map object and specify the DOM element
  // for display.
  var map = new google.maps.Map(document.getElementById('map'), {
    center: myLatLng,
    zoom: 4
  });

  // Create a marker and set its position.
  var marker = new google.maps.Marker({
    map: map,
    position: myLatLng,
    title: 'Hello World!'
  });

  var marker2 = new google.maps.Marker({
    map: map,
    position: {lat: -30, lng: 131.044},
    title: 'Hello World!'
  });
}