const squares = [
  { cssBackgroundColor: "magenta", key: "m" },
  { cssBackgroundColor: "yellow", key: "y" },
  { cssBackgroundColor: "green", key: "g" },
  { cssBackgroundColor: "orange", key: "o" },
  { cssBackgroundColor: "pink", key: "p" },
];

let gameBoxElement;
let scoreElement;

const gameState = {
  points: 0,
};

const addAndDisplayPoints = (newPoints) => {
  gameState.points += newPoints;
  scoreElement.innerHTML = `Points: ${gameState.points}`;
};

window.addEventListener("DOMContentLoaded", function () {
  gameBoxElement = document.getElementById("game-box");
  scoreElement = document.getElementById("score");

  addAndDisplayPoints(0);

  const getSquareSize = () => {
    const smaller = Math.min(
      gameBoxElement.getBoundingClientRect().width,
      gameBoxElement.getBoundingClientRect().height
    );

    return smaller / 5;
  };

  const squareSize = getSquareSize();

  const nonOverlappingPositions = [];

  while (nonOverlappingPositions.length < 5) {
    const { width, height } = gameBoxElement.getBoundingClientRect();
    var x = Math.floor(Math.random() * (width - squareSize));
    var y = Math.floor(Math.random() * (height - squareSize));

    if (
      nonOverlappingPositions.every((p) => {
        // If one rectangle is on left side of other
        if (x + squareSize <= p.x || p.x + squareSize <= x) {
          return true;
        }

        // If one rectangle is above other
        if (y > p.y + squareSize || p.y > y + squareSize) {
          return true;
        }

        return false;
      })
    ) {
      nonOverlappingPositions.push({ x, y });
    }
  }

  squares.forEach((s, i) => {
    const { x, y } = nonOverlappingPositions[i];

    const box = document.createElement("div");
    box.style.backgroundColor = s.cssBackgroundColor;
    box.style.width = `${squareSize}px`;
    box.style.height = `${squareSize}px`;
    box.style.position = "absolute";
    box.style.bottom = `${y}px`;
    box.style.left = `${x}px`;
    box.style.cursor = "pointer";

    gameBoxElement.appendChild(box);
  });
});
