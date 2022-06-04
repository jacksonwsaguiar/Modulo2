function exchangeValues() {
    var input1 = document.getElementById("firstInput").value;
    var input2 = document.getElementById("secondInput").value;
    document.getElementById("firstInput").value = input2;
    document.getElementById("secondInput").value = input1;
  }
  