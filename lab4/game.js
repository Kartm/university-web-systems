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

    this.result = 0;
    this.lastClicked = null;

    this.state = {
      active: false,
      currentClickedKey: "",
    };

    window.addEventListener("keydown", (e) => {
      this.state.currentClickedKey = e.key;
    });

    window.addEventListener("keyup", (e) => {
      this.state.currentClickedKey = "";
    });

    document.getElementById("input_color").addEventListener("input", (e) => {
      const insertedLetter = e.target.value;

      const s = this.squares.find((s) => s.key === insertedLetter);

      if (this.lastClicked !== null && this.lastClicked.key === s.key) {
        this.addAndDisplayPoints(1);

        e.target.value = "";
      }
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
      const box = document.createElement("div");

      const coordinates = nonOverlappingSquares[i];
      Object.assign(box.style, this.generateSquareCss(s, coordinates));

      box.addEventListener("click", (e) => this.onSquareClicked(s, e.target));

      this.gameBoxElement.appendChild(box);
    });
  }

  addAndDisplayPoints(newPoints) {
    this.result += newPoints;
    scoreElement.innerHTML = `Points: ${this.result}`;
    if (this.result === 10) {
      scoreElement.innerHTML = `Points: ${this.result} (max!)`;
    }
  }

  onSquareClicked(data, target) {
    this.lastClicked = data;

    if (
      data.cssBackgroundColor === "yellow" &&
      (() => !["Control", "Meta"].includes(this.state.currentClickedKey))()
    ) {
      return;
    }

    // target.style.display = "none";
    target.style.backgroundColor = "black";
    this.addAndDisplayPoints(1);
  }
}

window.addEventListener("DOMContentLoaded", function () {
  gameBoxElement = document.getElementById("game-box");
  scoreElement = document.getElementById("score");

  const game = new Game(gameBoxElement, scoreElement);

  gameBoxElement.addEventListener("mouseover", () => {
    if (!game.isActive && confirm("Wanna play?")) {
      game.begin();
    }
  });

  const colorSelect = document.getElementById("bg-color-select");

  game.squares.forEach((s) => {
    const selectOption = document.createElement("option");
    selectOption.appendChild(document.createTextNode(s.cssBackgroundColor));

    colorSelect.appendChild(selectOption);
  });

  colorSelect.addEventListener("change", function (e) {
    const s = game.squares.find((s) => s.cssBackgroundColor === this.value);

    if (s) {
      document.body.style.backgroundColor = s.cssBackgroundColor;
    }
  });
});
