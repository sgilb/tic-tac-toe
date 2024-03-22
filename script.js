function GameBoard(rows = 3, columns = 3) {
  const board = [];

  // Populate board with blank values
  for (let i = 0; i < rows * columns; i++) {
    board.push(null);
  }

  const getBoard = () => board;

  const markCell = (position, token) => {
    board[position] ||= token;
  };

  const getCell = (position) => {
    return board[position] === null ? "_" : board[position];
  };

  const printBoard = () => {
    for (let i = 0; i < rows; i++) {
      let row = ""; // String to build each row
      for (let j = 0; j < columns; j++) {
        row += getCell(i * columns + j) + " "; // Get cell value, add space
      }
      console.log(row);
    }
  };

  return { getBoard, markCell, getCell, printBoard };
}

function GameController(
  playerOneName = "Player One",
  playerTwoName = "Player Two"
) {
  const board = GameBoard();

  const players = [
    {
      name: playerOneName,
      token: "X",
    },
    {
      name: playerTwoName,
      token: "O",
    },
  ];

  let activePlayer = players[0];

  const switchPlayerTurn = () => {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
  };

  const getActivePlayer = () => activePlayer;

  const printNewRound = () => {
    board.printBoard();
    console.log(`${getActivePlayer().name}'s turn.`);
  };

  const checkWin = (token) => {
    let win = false;

    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    let gameBoard = board.getBoard();
    let line = [];
    // Retrieve positions of token
    for (let i = 0; i < gameBoard.length; i++) {
      if (gameBoard[i] === token) {
        line.push(i);
      }
    }

    const includesAll = (array, values) =>
      values.every((value) => array.includes(value));

    // Check if the marked cells match a winning combination
    for (const combination of winningCombinations) {
      if (includesAll(line, combination)) {
        win = true;
      }
    }
    return win;
  };

  const playRound = (position) => {
    board.markCell(position, getActivePlayer().token);

    if (checkWin(getActivePlayer().token)) {
      board.printBoard();
      console.log(`${getActivePlayer().name} wins!`);
      return;
    }

    switchPlayerTurn();
    printNewRound();
  };

  // Initial prompt to start play
  printNewRound();

  return {
    playRound,
    getActivePlayer,
    getBoard: board.getBoard,
  };
}

function DisplayController() {
  const container = document.getElementById("container");

  const createGrid = (rows, cols) => {
    container.style.setProperty("--grid-rows", rows);
    container.style.setProperty("--grid-cols", cols);
    for (c = 0; c < rows * cols; c++) {
      let cell = document.createElement("div");
      cell.innerText = "";
      container.appendChild(cell).className = "grid-item";
    }
  };

  const displayMarkers = (board) => {
    const gridItems = document.querySelectorAll(".grid-item");
    for (let i = 0; i < gridItems.length; i++) {
      gridItems[i].textContent = board[i];
    }
  };

  createGrid(3, 3);

  return {
    displayMarkers,
  };
}

const game = GameController();
const display = DisplayController();

const gridItems = document.querySelectorAll(".grid-item");
gridItems.forEach((item, index) => {
  item.addEventListener("click", () => {
    if (item.innerText === "") {
      game.playRound(index); // Pass the cell index to the game controller
      display.displayMarkers(game.getBoard()); // Update the display
    }
    // TODO: Display result (win/loss/draw)
  });
});
