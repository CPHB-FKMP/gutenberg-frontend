$(document).ready(function(){

 var books = 
 [
  {title : "Kloden", author : "Thomas", city : "Sydney", location : {lat: -25.363, lng: 140.044}},
  {title : "Hej", author : "Mads", city : "Copenhagen", location : {lat: -25.363, lng: 120.044}},
  {title : "abc", author : "Geo", city : "USA", location : {lat: -25.363, lng: 150.044}}
  ];

  $("#data").submit(function(event) {
    var data = $("#data").serializeArray();
    console.log("Data form Form");
    console.log(data);
    console.log("----------------")
    $.ajax({
      type: "GET",
      url: "https://jsonplaceholder.typicode.com/posts/1",
       success: function(result){
         buildResult(books);
      }, error: function(error){
        $("#demo").html(error);
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
      title: book.title
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
      if(key != "city" && key != "location"){
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

doc.getElementById("results").appendChild(table);

}