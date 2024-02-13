function GameBoard() {
  const rows = 3;
  const columns = 3;
  const board = [];

  // Populate board with empty cell values
  for (let i = 0; i < rows; i++) {
    board[i] = [];
    for (let j = 0; j < columns; j++) {
      board[i].push(null);
    }
  }

  const getBoard = () => board;

  const markCell = (row, column, token) => {
    board[row][column] ||= token;
  };

  const getCell = (row, column) => board[row][column];

  const printBoard = () => console.table(board);

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

  const playRound = (row, column) => {
    board.markCell(row, column, getActivePlayer().token);

    // TODO: Check for winner and handle with message

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

const game = GameController();
