$(document).ready(function(){

 $("#resultTable").hide();

  $("#data").submit(function(event) {
    var data = $("#data").serializeArray();
    console.log("Data form Form");
    console.log(data);
    console.log("----------------")
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

// Google Map
function initMap() {
  var myLatLng = {lat: -25.363, lng: 131.044};

  // Create a map object and specify the DOM element
  // for display.
  var map = new google.maps.Map(document.getElementById('map'), {
    center: myLatLng,
    zoom: 4
  });
}

// Builds the HTML Table out of myList.
function buildHtmlTable(data) {

  var doc = document;

  var fragment = doc.createDocumentFragment();

  var headers = ["Title", "Authors", "City", "Location"];

  var tr = doc.createElement("tr");

  headers.forEach(element => {
    var th = doc.createElement("th");
    th.innerHTML = element;
    fragment.appendChild(th);
  });

  fragment.appendChild(tr);

  for (i = 0; i < 3; i++) {
  
    var tr = doc.createElement("tr");
    for (j = 0; j < 4; j++){
      var td = doc.createElement("td");
      td.innerHTML = i;

      tr.appendChild(td);
    }

    fragment.appendChild(tr);
  }

var table = doc.createElement("table");

table.appendChild(fragment);

doc.getElementById("results").innerHTML = "";

doc.getElementById("results").appendChild(table);

$("#resultTable").show();

}