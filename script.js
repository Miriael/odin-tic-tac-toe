const gameBoard = (() => {
  let board = [['', '', ''],
               ['', '', ''],
               ['', '', '']];
  const getBoard = () => {return board};
  const addToBoard = (piece, x, y) => board[x][y] = piece; 
  const clearBoard = () => {for (let x = 0; x < board.length; x++) {
    for (let y = 0; y < board[x].length; y++) {
      console.log(board[x][y]);
      board[x][y] = 'ass';
    };
  }};
  return {addToBoard, clearBoard, getBoard};
})();

