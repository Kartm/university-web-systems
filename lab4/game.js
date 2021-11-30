const squares = [
  { cssBackgroundColor: "magenta", key: "m" },
  { cssBackgroundColor: "yellow", key: "y" },
  { cssBackgroundColor: "green", key: "g" },
  { cssBackgroundColor: "orange", key: "o" },
  { cssBackgroundColor: "pink", key: "p" },
];

window.addEventListener("DOMContentLoaded", function () {
  const gameBox = document.getElementById("game-box");

  const getSingleSquareSize = () => {
    const smaller = Math.min(
      gameBox.getBoundingClientRect().width,
      gameBox.getBoundingClientRect().height
    );

    return smaller / 5;
  };

  const squareSize = getSingleSquareSize();

  const nonOverlappingPositions = [];

  while (nonOverlappingPositions.length < 5) {
    const { width, height } = gameBox.getBoundingClientRect();
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

    gameBox.appendChild(box);
  });
});
