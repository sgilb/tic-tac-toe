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

  const clearBoard = () => {
    for (let i = 0; i < rows * columns; i++) {
      board[i] = null;
    }
  };

  const isFull = () => {
    for (let i = 0; i < rows * columns; i++) {
      if (board[i] === null) {
        return false;
      }
    }
    return true;
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

  return { getBoard, markCell, getCell, clearBoard, isFull, printBoard };
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
  let gameOver = false;

  const switchPlayerTurn = () => {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
  };

  const getActivePlayer = () => activePlayer;

  const setPlayerName = (player, name) => {
    if (name !== null || name !== "") {
      players[player - 1].name = name;
    }
  };

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
    if (gameOver) {
      console.log("Game over! Please start a new game.");
      return;
    }

    board.markCell(position, getActivePlayer().token);

    if (checkWin(getActivePlayer().token)) {
      board.printBoard();
      console.log(`${getActivePlayer().name} wins!`);
      const winnerOutput = document.getElementById("result");
      winnerOutput.innerText = getActivePlayer().name + " wins!";
      gameOver = true;
      return;
    } else if (board.isFull()) {
      board.printBoard();
      console.log("It's a draw!");
      const winnerOutput = document.getElementById("result");
      winnerOutput.innerText = "It's a draw!";
      return;
    }

    switchPlayerTurn();
    printNewRound();
  };

  // Initial prompt to start play
  printNewRound();

  const resetButton = document.getElementById("reset-game");

  resetButton.addEventListener("click", () => {
    const winnerOutput = document.getElementById("result");
    winnerOutput.innerText = "";
    board.clearBoard();
    display.displayMarkers(game.getBoard());
    gameOver = false;
    printNewRound();
  });

  return {
    playRound,
    getActivePlayer,
    setPlayerName,
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
  });
});

const playerOneInput = document.getElementById("player-one");
const playerTwoInput = document.getElementById("player-two");

playerOneInput.addEventListener("change", (e) =>
  game.setPlayerName(1, e.target.value)
);
playerTwoInput.addEventListener("change", (e) =>
  game.setPlayerName(2, e.target.value)
);
