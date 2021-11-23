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

// do formatowania uzylem https://beautifier.io/
// i on chcial zeby uzyc https://www.jslint.com/ pozniej do sprawdzenia skladni

function destroyPage() {
    if (window.prompt("Are you sure? Write \"Yes\" to confirm.") === "Yes") {
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
}

window.addEventListener("DOMContentLoaded", function () {
    window.alert("DOM loaded and parsed!");
    addListeners();
});