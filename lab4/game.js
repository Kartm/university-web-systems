class Game {
  squares = [
    { cssBackgroundColor: "magenta", key: "m" },
    { cssBackgroundColor: "yellow", key: "y" },
    { cssBackgroundColor: "green", key: "g" },
    { cssBackgroundColor: "orange", key: "o" },
    { cssBackgroundColor: "pink", key: "p" },
  ];

  constructor() {
    this.gameBoxElement = gameBoxElement;
    this.scoreElement = scoreElement;
    this.color_field = color_field;

    this.state = {
      active: false,
      currentClickedKey: "",
    };

    window.addEventListener("keydown", (e) => {
      this.state.currentClickedKey = e.key;
      console.log(e.key);
    });

    window.addEventListener("keyup", (e) => {
      this.state.currentClickedKey = "";
    });

    this.addAndDisplayPoints(0);
  }

  get isActive() {
    return this.state.active;
  }

  get squareSize() {
    const smaller = Math.min(
      this.gameBoxElement.getBoundingClientRect().width,
      this.gameBoxElement.getBoundingClientRect().height
    );

    return smaller / 5;
  }

  _doSquaresOverlap(a, b) {
    // if they miss horizontally
    if (a.x + this.squareSize <= b.x || b.x + this.squareSize <= a.x) {
      return false;
    }

    // if they miss vertically
    if (a.y > b.y + this.squareSize || b.y > a.y + this.squareSize) {
      return false;
    }

    return true;
  }

  generateNonOverlappingSquares() {
    const nonOverlappingSquares = [];

    while (nonOverlappingSquares.length < this.squares.length) {
      const { width, height } = this.gameBoxElement.getBoundingClientRect();
      const candidateSquare = {
        x: Math.floor(Math.random() * (width - this.squareSize)),
        y: Math.floor(Math.random() * (height - this.squareSize)),
      };

      if (
        nonOverlappingSquares.some((p) =>
          this._doSquaresOverlap(candidateSquare, p)
        )
      ) {
        continue;
      }

      nonOverlappingSquares.push(candidateSquare);
    }

    return nonOverlappingSquares;
  }

  generateSquareCss(squareInfo, coordinates) {
    return {
      backgroundColor: squareInfo.cssBackgroundColor,
      width: `${this.squareSize}px`,
      height: `${this.squareSize}px`,
      position: "absolute",
      bottom: `${coordinates.y}px`,
      left: `${coordinates.x}px`,
      cursor: "pointer",
    };
  }

  begin() {
    this.state.active = true;

    const nonOverlappingSquares = this.generateNonOverlappingSquares();

    this.squares.forEach((s, i) => {
      console.log(s);
      const box = document.createElement("div");

      const coordinates = nonOverlappingSquares[i];
      Object.assign(box.style, this.generateSquareCss(s, coordinates));

      box.addEventListener("click", (e) => this.onSquareClicked(s, e.target));

      this.gameBoxElement.appendChild(box);
    });
  }

  addAndDisplayPoints(newPoints) {
    result += newPoints;
    scoreElement.innerHTML = `Points: ${result}`;
    if (result === 10) {
      scoreElement.innerHTML = `Points: ${result} (max!)`;
    }
  }

  onSquareClicked(data, target) {
    if (
      data.cssBackgroundColor === "yellow" &&
      (() => !["Control", "Meta"].includes(this.state.currentClickedKey))()
    ) {
      return;
    }

    target.style.display = "none";
    this.addAndDisplayPoints(1);
  }
}

colors = ["pink", "yellow", "orange", "violet", "red", "green", "blue"];
var result = 0;

window.addEventListener("DOMContentLoaded", function () {
  gameBoxElement = document.getElementById("game-box");
  scoreElement = document.getElementById("score");
  color_field = Math.floor(Math.random() * colors.length);

  const game = new Game(gameBoxElement, scoreElement, color_field);
  let this_color = colors[color_field];
  inputVal = document.getElementById("input_color");
  inputVal.style.backgroundColor = this_color;
  gameBoxElement.addEventListener("mouseover", () => {
    if (!game.isActive && confirm("Wanna play?")) {
      game.begin();
    }
  });
});
