// document.writeln() - gotowe
// document.getElementById() - gotowe
// window.prompt() - gotowe
// window.alert() - gotowe
// window.addEventListener() - gotowe
// button.addEventListener() - gotowe
// property innerHTML - gotowe
// parseInt()
// parseFloat()
// Math.random()
// Math.floor()
// control statements: if…else, case, while, do…while, for
// global variables

function destroyPage() {
  if (window.prompt('Are you sure? Write "Yes" to confirm.') === "Yes") {
    document.write(`
        <h1>Page has been destroyed!</h1>
        <button id="refresh">Refresh</button>
    `);

    const button = document.getElementById("refresh");
    button.addEventListener("click", () => {
      window.location.reload();

      return false;
    });
  }
}

function addDestroyListener() {
  const button = document.getElementById("destroy");
  button.addEventListener("click", destroyPage);
}

let counter = 1;

function addEnterListener() {
  window.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      const indexPageHeader = document.getElementById("index-page-header");
      indexPageHeader.innerHTML = `Index page, enter got clicked ${counter} times`;
      counter++;
    }
  });
}

function addListeners() {
  addDestroyListener();
  addEnterListener();
}

window.addEventListener("DOMContentLoaded", (event) => {
  window.alert("DOM loaded and parsed!");
  addListeners();
});
