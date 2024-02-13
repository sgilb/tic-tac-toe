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

  const markCell = (player, row, column) => {
    board[row][column] ||= player;
  };

  const getCell = (row, column) => board[row][column];

  const printBoard = () => {
    const boardText = "";
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        boardText += getCell(row, column) + " ";
      }
      console.log(boardText);
      boardText = "";
    }
  };

  return { getBoard, markCell, printBoard };
}
