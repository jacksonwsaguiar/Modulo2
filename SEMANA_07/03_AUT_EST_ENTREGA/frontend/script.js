var url = "http://127.0.0.1:3052/";

$(document).ready(function () {
  var xhttp = new XMLHttpRequest();
  xhttp.open("GET", url + "user", false);
  xhttp.send();

  var data = JSON.parse(xhttp.response);

  $("#info-name").append(data.name);
  $("#info-email").append(data.email);
  $("#info-phone").append(data.phone);
  $("#info-port").append(data.portfolio);
  $("#photo").attr("src", data.photo);

  getRecomendations();
});
var hiddenPhoto = $("#photo");
var link = $("#link-photo");
link.on("click", function (event) {
  hiddenPhoto.show();
  link.hide();
});

async function getRecomendations() {
  var data = [];
  await $.ajax({
    type: "GET",
    url: url + "recomendation",
    // data: { id:id, description: desc },
    dataType: "text",
    success: function (response) {
      data = JSON.parse(response);
      var items = "";
      data.forEach((element) => {
        items += `<div class="item">
      <i>"${element.description}"</i>
      <button href="" onclick="deleteRecomendation(${element.id})">excluir</button>
      <button onclick="selectItem({id: ${element.id},description: '${element.description}'})">
        editar
      </button>
      </div><hr />`;
      });
      document.getElementById("recomendations-list").innerHTML = items;
    },
  });
}

async function updateRecomendation() {
  var desc = document.getElementById("input-description").value;
  var id = document.getElementById("input-id").value;

  await $.ajax({
    type: "PUT",
    url: url + "recomendation",
    contentType: "application/json",
    data: JSON.stringify({ id: id, description: desc }),
    dataType: "json",
    success: function (resultData) {
      document.getElementById("edit-button").style.display = "none";
      document.getElementById("add-button").style.display = "block";
      getRecomendations();
      clearInputs();
    },
  });
}

async function deleteRecomendation(id) {
  // console.log(id);
  await $.ajax({
    type: "DELETE",
    url: url + "recomendation/" + id,
    // data: { description: desc },
    dataType: "text",
    success: function (resultData) {
      // alert("Recomendação deletada com sucesso");
      getRecomendations();
    },
  });
}

async function createRecomendation() {
  var desc = document.getElementById("input-description").value;
  await $.ajax({
    type: "POST",
    contentType: "application/json",
    url: url + "recomendation",
    data: JSON.stringify({ description: desc }),
    dataType: "json",
    success: function (resultData) {
      clearInputs();
      alert("Recomendação adicionada com sucesso!");
      getRecomendations();
    },
  });
}

function clearInputs() {
  document.getElementById("input-description").value = "";
  document.getElementById("input-id").value = "";
}

function selectItem(item) {

  document.getElementById("input-description").value = item.description;
  document.getElementById("input-id").value = item.id;

  document.getElementById("edit-button").style.display = "block";
  document.getElementById("add-button").style.display = "none";
}
