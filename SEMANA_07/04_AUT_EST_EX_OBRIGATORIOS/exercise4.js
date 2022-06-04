function calculateTicketPrice() {
    var amount = parseInt(document.getElementById("amount").value);
    var shift = document.getElementById("shift-select").value;
  
    var value = 0;
    var discount = "";
  
    if (shift == "diurno") {
      value = 200;
      if (amount > 50) {
        discount = "Desconto de 40%<br/>";
        value -= value * 0.4;
      }
    } else {
      value = 100;
      if (amount > 50) {
        discount = "Desconto de 20%<br/>";
        value -= value * 0.2;
      }
    }
    document.getElementById("response").innerHTML =
      discount + "Valor total: " + value * amount;
  }
  