$(document).ready(function(){

   $("#resultTable").hide();

  $.ajax({
    type: "GET",
    url : "http://localhost:8081",
     success: function(result){
    }, error: function(error){
    }
  });

  $("#data").submit(function(event) {
    var data = $("#data").serializeArray();
    console.log(data[2].value);
    if(data[2].value == "geolocation"){
      console.log(navigator.geolocation);
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          getData("http://localhost:8081/"+data[1].value+"/book?lat="+position.coords.latitude+"&long="+position.coords.longitude);
        });
      }
    } else {
      getData("http://localhost:8081/"+data[1].value+"/book?"+data[2].value+"="+data[0].value);
    }

    event.preventDefault();

    
  })
});

function getData(url){
  $.ajax({
      type: "GET",
      url : url,
       success: function(result){
         console.log(result);
         buildResult(result);
      }, error: function(error){
        $("#error").html(error);
      }
    });
}

// Google Map

function initMap(book) {
  // Create a map object and specify the DOM element
  // for display.
  if(book.cities!= null){
    var location = {lat: book.cities[0].latitude, lng: book.cities[0].longitude};
  } else {
    location = {lat: 48.5, lng: 23.383333};
  }
  return map = new google.maps.Map(document.getElementById('map'), {
    center: location,
    zoom: 4
  });
}

function createPoint(map, book) {
  book.cities.forEach(city => {
    var marker = new google.maps.Marker({
      map: map,
      position: {lat : city.latitude , lng : city.longitude},
      title: book.title
    });
  })  
}

// Builds the HTML Table out of myList.
function buildResult(books) {

  var doc = document;
  var map = initMap(books[0]);

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
      if(key == "title"){
        var td = doc.createElement("td");
        td.innerHTML = element[key];
        tr.appendChild(td);
      } else if(key == "authors" && element[key] !== null) {
        var td = doc.createElement("td");
        td.innerHTML = element[key].map(e => e.name).join(",");
        tr.appendChild(td);
      } else if (key == "cities" && element[key] !== null){
          createPoint(map, element)
      }
    }

    

    fragment.appendChild(tr);
  });

  var table = doc.createElement("table");

  table.appendChild(fragment);

  doc.getElementById("results").innerHTML = "";

  table.classList.add("table");

  doc.getElementById("searchField").value = "";

  doc.getElementById("results").appendChild(table);

  $("#resultTable").show();
}