// document.writeln() - gotowe
// document.getElementById() - gotowe
// window.prompt() - gotowe
// window.alert() - gotowe
// window.addEventListener() - gotowe
// button.addEventListener() - gotowe
// property innerHTML - gotowe
// parseInt()- gotowe
// parseFloat()- gotowe
// Math.random()- gotowe
// Math.floor()- gotowe
// control statements: if…else, case, while, do…while, for
// global variables

var min = 20;

function destroyPage() {
  if (window.prompt('Are you sure? Write "Yes" to confirm.') === "Yes") {
    document.write(`
        <h1>Page has been destroyed!</h1>
        <button id="refresh">Refresh</button>
    `);

    const button = document.getElementById("refresh");
    button.addEventListener("click", function () {
      window.location.reload();

      return false;
    });
  }
}

function addDestroyListener() {
  const button = document.getElementById("destroy");
  button.addEventListener("click", destroyPage);
}

function addGuesserListener() {
  const button = document.getElementById("guesser");
  button.addEventListener("click", guesser);
}

let counter = 1;

function addEnterListener() {
  window.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      const header = document.getElementById("index-page-header");
      header.innerHTML = `Index page, enter clicked ${counter} times`;
      counter = counter + 1;
    }
  });
}

function addListeners() {
  addDestroyListener();
  addEnterListener();
  addGuesserListener();
}

window.addEventListener("DOMContentLoaded", function () {
  window.alert("DOM loaded and parsed!");
  addListeners();
});

function guesser() {
  const header_random = document.getElementById("result_random");
  var number = 0;
  var string_float = window.prompt("Write a float");
  var floatn = parseFloat(string_float);
  if (floatn === 0) {
    header_random.innerHTML = `Sorry, the float cannot be 0`;
  } else {
    do {
      var string_number = window.prompt(
        "Write an integer, must be bigger than 20"
      );
      number = parseInt(string_number);
    } while (number < min);
    var random = Math.random() * number * 5;
    var result = Math.floor(Math.abs(floatn - random));
    header_random.innerHTML = `From ${floatn} and ${number} we generated ${result}`;
  }
}
