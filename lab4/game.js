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

    this.state = {
      active: false,
      points: 0,
    };

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

  generateNonOverlappingSquares() {
    const nonOverlappingSquares = [];

    while (nonOverlappingSquares.length < this.squares.length) {
      const { width, height } = this.gameBoxElement.getBoundingClientRect();
      var x = Math.floor(Math.random() * (width - this.squareSize));
      var y = Math.floor(Math.random() * (height - this.squareSize));

      if (
        nonOverlappingSquares.every((p) => {
          // If one rectangle is on left side of other
          if (x + this.squareSize <= p.x || p.x + this.squareSize <= x) {
            return true;
          }

          // If one rectangle is above other
          if (y > p.y + this.squareSize || p.y > y + this.squareSize) {
            return true;
          }

          return false;
        })
      ) {
        nonOverlappingSquares.push({ x, y });
      }
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

      box.addEventListener("click", (e) =>
        this.onSquareClicked({ s }, e.target)
      );

      this.gameBoxElement.appendChild(box);
    });
  }

  addAndDisplayPoints(newPoints) {
    this.state.points += newPoints;
    scoreElement.innerHTML = `Points: ${this.state.points}`;
  }

  onSquareClicked(data, target) {
    console.log(data, target);

    target.style.display = "none";
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
});
