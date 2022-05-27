$(document).ready(function () {
  var url = "http://127.0.0.1:3052/user";

  var xhttp = new XMLHttpRequest();
  xhttp.open("GET", url, false);
  xhttp.send();

  var data = JSON.parse(xhttp.response);

  $("#info-name").append(data.name);
  $("#info-email").append(data.email);
  $("#info-phone").append(data.phone);
  $("#info-port").append(data.portfolio);
  $("#photo").attr("src", data.photo);
});
var hiddenPhoto = $("#photo");
var link = $("#link-photo");
link.on("click", function (event) {
  hiddenPhoto.show();
  link.hide();
});
