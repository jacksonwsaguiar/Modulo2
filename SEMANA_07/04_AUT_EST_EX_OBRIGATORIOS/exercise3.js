function validateNumber() {
    var number = document.getElementById("phone-number").value;
  
    if (number.length > 0 && number.charAt(0) != "(")
      document.getElementById("status-number").innerText = "Formato inválido";
    else if (number.length > 3 && number.charAt(3) != ")")
      document.getElementById("status-number").innerText = "Formato inválido";
    else if (number.length > 9 && number.charAt(9) != "-")
      document.getElementById("status-number").innerText = "Formato inválido";
    else document.getElementById("status-number").innerText = "";
  }