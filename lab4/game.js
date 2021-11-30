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
      nonOverlappingPositions.some((p) => {
        const l1 = {
          x: p.x,
          y: p.y,
        };
        const r1 = {
          x: p.x + squareSize,
          y: p.y + squareSize,
        };

        const l2 = {
          x: x,
          y: x,
        };
        const r2 = {
          x: x + squareSize,
          y: y + squareSize,
        };
        // If one rectangle is on left side of other
        if (l1.x >= r2.x || l2.x >= r1.x) return false;

        // If one rectangle is above other
        if (r1.y >= l2.y || r2.y >= l1.y) return false;

        return true;
        // check overlap
      })
    ) {
      continue;
    }

    nonOverlappingPositions.push({ x, y });
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
