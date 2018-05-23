$(document).ready(function(){

  $.ajax({
    type: "GET",
    url : "http://localhost:8081",
     success: function(result){
    }, error: function(error){
    }
  });

  $("#data").submit(function(event) {

    var url;

    var data = $("#data").serializeArray();

    if($("action").val() == geolocation){
      getLocation();
      url =  "http://localhost:8081/"+data[1].value+"/book?"+data[2].value+"="+data[0].value+"&"+
    } else {
      url = "http://localhost:8081/"+data[1].value+"/book?"+data[2].value+"="+data[0].value;
    }

    event.preventDefault();

    $.ajax({
      type: "GET",
      url : url,
       success: function(result){
         console.log(result);
         buildResult(result);
      }, error: function(error){
        console.log(error)
        $("#error").html(error);
      }
    });
  })
});

// Google Map

function initMap() {
  // Create a map object and specify the DOM element
  // for display.
  return map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -25.363, lng: 131.044},
    zoom: 4
  });
}

function createPoint(map, book) {
    var marker = new google.maps.Marker({
      map: map,
      position: book.location,
      title: book.title,
      optimized: false
    });
}

// Builds the HTML Table out of myList.
function buildResult(books) {

  var doc = document;
  var map = initMap();

  var fragment = doc.createDocumentFragment();

  // Headers

  var headers = ["Title", "Authors"];
  var tr = doc.createElement("tr");

  headers.forEach(element => {
    var th = doc.createElement("th");
    th.innerHTML = element;
    fragment.appendChild(th);
  });

  fragment.appendChild(tr);

  // Each book

  books.forEach(element => {
    var tr = doc.createElement("tr");

    for (var key in element) {
      if(key != "cities" && key != "location" && key != "id"){
        var td = doc.createElement("td");
        td.innerHTML = element[key];
        tr.appendChild(td);
      }
    }

    createPoint(map, element)

    fragment.appendChild(tr);
  });

var table = doc.createElement("table");

table.appendChild(fragment);

doc.getElementById("results").innerHTML = "";

table.classList.add("table");

doc.getElementById("searchField").value = "";

doc.getElementById("results").appendChild(table);

}

function getLocation() {

  if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
  } else {
      x.innerHTML = "Geolocation is not supported by this browser.";
  }
}
function showPosition(position) {
  document.getElementById("searchField").value = position.coords.latitude + ", " + position.coords.longitude;
}