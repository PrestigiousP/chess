window.onload = function () {
  var cursorX;
  var cursorY;

  var tablePos = document.querySelector("table").getBoundingClientRect();

  var td = document.querySelectorAll("td");

  td.forEach((cell) => {
    cell.addEventListener("dragend", function (e) {
      const squareCoord = getSquareCoordinates();
      if (squareCoord == null) {
        return;
      }

      // copy the image
      if (this.children[0].children.length > 0) {
        var img = document.createElement("img");
        img.src = this.children[0].children[0].getAttribute("src");
        img.id = this.children[0].children[0].getAttribute("id");
      }

      // finds the td so we can move the image
      const row = document.getElementById("board").rows[squareCoord.row];
      const selectedDiv = row.children.item(squareCoord.col).children[0];

      // check if piece in that square
      if (selectedDiv.children.length > 0) {
        const id = selectedDiv.children[0].getAttribute("id");
        const imElem = document.getElementById(id);
        imElem.parentNode.removeChild(imElem);
      }

      // put the image in the square
      selectedDiv.appendChild(img);

      // delete the position of the previous image
      e.target.parentNode.removeChild(this.children[0].children[0]);

      // console.log(`${squareCoord.row} ${squareCoord.col}`);
    });
  });

  // keep track of mouse position while dragging
  document.ondragover = function (e) {
    cursorX = e.clientX;
    cursorY = e.clientY;
  };

  // find the square coordinates on there board
  // that the player dropped the piece on
  function getSquareCoordinates() {
    const squareWidth = tablePos.width / 8;
    const squareHeight = tablePos.height / 8;

    // Get the position of the cursor relative to the board
    const relativeX = cursorX - tablePos.x;
    const relativeY = cursorY - tablePos.y;

    const isOutsideBoardLeftOrTop = relativeX < 0 || relativeY < 0;
    if (isOutsideBoardLeftOrTop) {
      return null;
    }

    // Get the col and row where the image should get dropped
    const row = Math.trunc(relativeY / squareHeight);
    const col = Math.trunc(relativeX / squareWidth);

    const isOutsideBoardRightOrDown = col > 7 || row > 7;
    if (isOutsideBoardRightOrDown) {
      return null;
    }

    return { row: row, col: col };
  }
};
