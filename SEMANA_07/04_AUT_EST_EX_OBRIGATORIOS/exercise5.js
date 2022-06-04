function generateInputs() {
  var inputs = "";
  var students = parseInt(document.getElementById("numberOfStudents").value);
  for (let index = 0; index < students; index++) {
    inputs += `
      <h5>Aluno ${index + 1} </h5>
        <div>
        <input placeholder="Nota da prova" id="test-${index}"/>
        <input  placeholder="Nota do trabalho"  id="labor-${index}"/>
        </div>
        <br />`;
  }
  document.getElementById("inputs").innerHTML =
    inputs + "<button onclick='calculateNotes()'>Calcular</button>";
}
function calculateNotes() {
  var students = parseInt(document.getElementById("numberOfStudents").value);
  var lesserTest = 0;
  var biggerTest = 0;
  var lesserLabor = 0;
  var biggerLabor = 0;

  var testsNotes = 0;
  var laborsNotes = 0;
  var generalAverage = 0;
  var averages = "";

  for (let index = 0; index < students; index++) {
    var test = parseInt(document.getElementById("test-" + index).value);
    var labor = parseInt(document.getElementById("labor-" + index).value);

    testsNotes += test;
    laborsNotes += labor;

    var average = (test * 2 + labor * 3) / 5;
    generalAverage += average;
    averages += `
      <span>
      <h5>Aluno ${index + 1}</h5>
      <p>Média: ${average} </p>
      </span>
      `;

    if (test > biggerTest) {
      biggerTest = test;
    }
    if (labor > biggerLabor) {
      biggerLabor = labor;
    }
    if (index == 0) {
      lesserTest = test;
      lesserLabor = labor;
    } else {
      if (test < lesserTest) lesserTest = test;
      if (labor < lesserLabor) lesserLabor = labor;
    }
  }

  document.getElementById("report").innerHTML = `
    <hr>
    ${averages}
    <hr>
    <h5>Média geral: ${generalAverage / students}</h5>
    <hr>
    <h5>Trabalhos</h5>
    <h6>Média artiméticas das notas da prova: ${testsNotes / students}</h6>
    <h6>Maior nota da prova: ${biggerLabor}</h6>
    <h6>Menor da prova: ${lesserLabor}</h6>
    <hr>
    <h5>Provas</h5>
    <h6>Média artiméticas das notas do trabalho: ${laborsNotes / students} </h6>
    <h6>Maior nota do trabalho: ${biggerTest} </h6>
    <h6>Menor da trabalho: ${lesserTest}</h6>
   
    `;
}
