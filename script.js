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

const PlayerFactory = (name) => {
  let score = 0;
  const getName = () => {return name};
  const getScore = () => {return score};
  const setScore= (val) => score = val;
  return {getScore, setScore, getName};
}; 

const displayController = (() => {
  divs = Array.from(document.querySelectorAll('.board__cell'));
  let x = 0;
  let y = 0;
  const refresh = () => {divs.forEach (function(element) {
    element.innerHTML = gameBoard.getBoard()[x][y];
    if (y == 2) {
      y = 0;
      x += 1;
    } else {
      y += 1;
    };
  });
  x = 0;
  y = 0;
  };
  return {refresh};
})();