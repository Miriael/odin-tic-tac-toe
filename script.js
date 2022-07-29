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

const game = (() => {
  let turnCounter = 0;
  let currentPlayer = 'X';
  const switchCurrentPlayer = () => currentPlayer == 'X' ? currentPlayer = 'O' : currentPlayer = 'X';
  const getCurrentPlayer = () => {return currentPlayer};
  const buttonSetUp = () => {
    document.querySelectorAll('.board__cell').forEach((item) => {
      item.addEventListener('click', () => {
        if (item.innerHTML == ' ') {
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
    turnCounter += 1;
    let winner = ''
    let rowpieces = []
    let columnpieces = []
    let emptyfields = [' ']
    for (let rowevalx = 0; rowevalx < 3; rowevalx++) {
      rowpieces = [];
      for (let rowevaly = 0; rowevaly < 3; rowevaly++) {
        rowpieces.push(gameBoard.getBoard()[rowevalx][rowevaly])
        };
      if (new Set(rowpieces).size === 1 && rowpieces[0] !== emptyfields[0]) {
        winner = rowpieces[0];
        endGame(winner);
      };
    };
    for (let vertevaly = 0; vertevaly < 3; vertevaly++) {
      columnpieces = [];
      for (let vertevalx = 0; vertevalx < 3; vertevalx++) {
        columnpieces.push(gameBoard.getBoard()[vertevalx][vertevaly])
        };
      if (new Set(columnpieces).size === 1 && columnpieces[0] !== emptyfields[0]) {
      winner = columnpieces[0];
      endGame(winner);
      };
    };
    if (gameBoard.getBoard()[0][0] === gameBoard.getBoard()[1][1] && gameBoard.getBoard()[0][0] === gameBoard.getBoard()[2][2] && gameBoard.getBoard()[1][1] !== ' ') {
      winner = gameBoard.getBoard()[0][0];
      endGame(winner);
    };
    if (gameBoard.getBoard()[0][2] === gameBoard.getBoard()[1][1] && gameBoard.getBoard()[0][2] === gameBoard.getBoard()[2][0] && gameBoard.getBoard()[1][1] !== ' ') {
      winner = gameBoard.getBoard()[0][2];
      endGame(winner);
    };
    if (turnCounter === 9) {
      endGame();
    };
  }
  const startGame = () => {
    playerOne = PlayerFactory('Player 1', 'X');
    playerTwo = PlayerFactory('Player 2', 'O');
    document.querySelector('.player1-panel__name').innerHTML = playerOne.getName();
    document.querySelector('.player2-panel__name').innerHTML = playerTwo.getName();
    buttonSetUp();
  };
  const endGame = (winner) => {
    if (winner === 'X') {
      alert('Player 1 is victorious!');
      playerOne.incrementScore();
    } else if (winner === 'O') {
      alert('Player 2 is victorious!');
      playerTwo.incrementScore();
    } else {
      alert("It's a tie!");
    };
    restartGame();
  };
  const restartGame = () => {
    gameBoard.clearBoard();
    displayController.refresh();
    switchCurrentPlayer();
    turnCounter = 0;
  };
  const getTurnCounter = () => {return turnCounter}
  return {buttonSetUp, getCurrentPlayer, evaluateBoard, startGame, getTurnCounter};
})();

const PlayerFactory = (name, playerpiece) => {
  let score = 0;
  const getName = () => {return name};
  const setName = (newname) => name = newname 
  const getScore = () => {return score};
  const incrementScore = () => score += 1;
  const getPlayerPiece = () => {return playerpiece};
  return {getScore, incrementScore, getName, getPlayerPiece, setName};
}; 

const displayController = (() => {
  divs = Array.from(document.querySelectorAll('.board__cell'));
  let x = 0;
  let y = 0;
  const refresh = () => {divs.forEach (function(element) {
    document.querySelector('.player1-panel__score').innerHTML = `Score: ${playerOne.getScore()}`;
    document.querySelector('.player2-panel__score').innerHTML = `Score: ${playerTwo.getScore()}`;
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

const playerControls = (() => {
  document.querySelector('.player1-panel__namebutton').addEventListener('click', () => {
    playerOne.setName(prompt());
    document.querySelector('.player1-panel__name').innerHTML = playerOne.getName();
  })
  document.querySelector('.player2-panel__namebutton').addEventListener('click', () => {
    playerTwo.setName(prompt());
    document.querySelector('.player2-panel__name').innerHTML = playerTwo.getName();
  })
})();

game.startGame();
