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

  begin() {
    this.state.active = true;

    const nonOverlappingPositions = [];

    while (nonOverlappingPositions.length < 5) {
      const { width, height } = this.gameBoxElement.getBoundingClientRect();
      var x = Math.floor(Math.random() * (width - this.squareSize));
      var y = Math.floor(Math.random() * (height - this.squareSize));

      if (
        nonOverlappingPositions.every((p) => {
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
        nonOverlappingPositions.push({ x, y });
      }
    }

    this.gameBoxElement.innerHTML = "";

    this.squares.forEach((s, i) => {
      const { x, y } = nonOverlappingPositions[i];

      const box = document.createElement("div");
      box.style.backgroundColor = s.cssBackgroundColor;
      box.style.width = `${this.squareSize}px`;
      box.style.height = `${this.squareSize}px`;
      box.style.position = "absolute";
      box.style.bottom = `${y}px`;
      box.style.left = `${x}px`;
      box.style.cursor = "pointer";

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
