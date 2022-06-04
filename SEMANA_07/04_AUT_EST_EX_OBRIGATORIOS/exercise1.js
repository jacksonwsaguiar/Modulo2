function plus() {
  document.getElementById("product-value").value =
    parseInt(document.getElementById("product-value").value) + 1;
}
function less() {
  var value = parseInt(document.getElementById("product-value").value);
  if (value != 0) document.getElementById("product-value").value = value - 1;
  else document.getElementById("product-value").value = "";
}
