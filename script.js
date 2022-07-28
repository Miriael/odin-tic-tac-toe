const game = (() => {
  let currentPlayer = 'X';
  const switchCurrentPlayer = () => currentPlayer == 'X' ? currentPlayer = 'O' : currentPlayer = 'X';
  const getCurrentPlayer = () => {return currentPlayer};
  const buttonSetUp = () => {
    document.querySelectorAll('.board__cell').forEach((item) => {
      item.addEventListener('click', () => {
        if (item.innerHTML == '') {
        gameBoard.addToBoard(currentPlayer, item.dataset.x, item.dataset.y);
        displayController.refresh();
        switchCurrentPlayer();
        evaluateBoard();
        } else {
          alert('Invalid placement');
        };
      });
    });
  };
  const evaluateBoard = () => {
    let winner = ''
    let rowpieces = []
    let columnpieces = []
    let nothing = new Set(' ')
    for (let rowevalx = 0; rowevalx < 3; rowevalx++) {
      rowpieces = [];
      for (let rowevaly = 0; rowevaly < 3; rowevaly++) {
        rowpieces.push(gameBoard.getBoard()[rowevalx][rowevaly])
        };
      if (new Set(rowpieces).size === 1 && new Set(rowpieces) !== nothing) {
        console.log(Array.from(new Set(rowpieces)) != Array.from(nothing))
        console.log(Array.from(new Set(rowpieces)))
        console.log(Array.from(nothing))
        winner = rowpieces[0];
        endGame();
      };
    };
    for (let vertevaly = 0; vertevaly < 3; vertevaly++) {
      columnpieces = [];
      for (let vertevalx = 0; vertevalx < 3; vertevalx++) {
        columnpieces.push(gameBoard.getBoard()[vertevalx][vertevaly])
        };
      if (new Set(columnpieces).size === 1 && new Set(columnpieces) != new Set(' ')) {
      winner = columnpieces[0];
      //endGame();
      };
    };
    if (new Set([gameBoard.getBoard()[0][0], gameBoard.getBoard()[1][1], gameBoard.getBoard()[2][2]]).size === 1 
        && new Set([gameBoard.getBoard()[0][0], gameBoard.getBoard()[1][1], gameBoard.getBoard()[2][2]]) != new Set(' ')) {
      winner = gameBoard.getBoard()[0][0];
      //endGame();
    };
    if (new Set([gameBoard.getBoard()[0][2], gameBoard.getBoard()[1][1], gameBoard.getBoard()[2][0]]).size === 1
        && new Set([gameBoard.getBoard()[0][2], gameBoard.getBoard()[1][1], gameBoard.getBoard()[2][0]]) != new Set(' '))
      winner = gameBoard.getBoard()[0][2];
      //endGame();
  };
  const startGame = () => {
    playerOne = PlayerFactory('Player 1', 'X');
    playerTwo = PlayerFactory('Player 2', 'O');
    buttonSetUp();
  };
  const endGame = (winner) => {
    alert(`Player ${winner} is victorious!`)
  };
  const restartGame = () => {
    gameBoard.clearBoard();
    switchCurrentPlayer();
  };
  return {buttonSetUp, getCurrentPlayer, evaluateBoard, startGame};
})();

const gameBoard = (() => {
  let board = [[' ', ' ', ' '],
               [' ', ' ', ' '],
               [' ', ' ', ' ']];
  const getBoard = () => {return board};
  const addToBoard = (piece, x, y) => board[x][y] = piece; 
  const clearBoard = () => {for (let x = 0; x < board.length; x++) {
    for (let y = 0; y < board[x].length; y++) {
      console.log(board[x][y]);
      board[x][y] = ' ';
    };
  }};
  return {addToBoard, clearBoard, getBoard};
})();

const PlayerFactory = (name, playerpiece) => {
  let score = 0;
  const getName = () => {return name};
  const getScore = () => {return score};
  const setScore= (val) => score = val;
  const getPlayerPiece = () => {return playerpiece};
  return {getScore, setScore, getName, getPlayerPiece};
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

game.startGame();