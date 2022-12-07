
const statusDisplay = document.querySelector('.game-status');

let gameActive = true;
let currentPlayer = "X";
let gameState = ["", "", "", "", "", "", "", "", ""];

const winningConditions = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
];

function winningMessage() {
  return `Player ${currentPlayer} has won!`;
}

function drawMessage() {
  return `Game ended in a draw!`;
}

function currentPlayerTurn() {
  return `It is ${currentPlayer}'s turn!`;
}

statusDisplay.innerHTML = currentPlayerTurn();


function playCell(clickedCell, clickedCellIndex) {
  console.log("inside play cell");
  gameState[clickedCellIndex] = currentPlayer;
  clickedCell.innerHTML = currentPlayer;
}


function changePlayer() {
  console.log("inside changeplayer");
  if (currentPlayer === "X"){
    currentPlayer = "O";
  }else{
    currentPlayer = "X";
  }
  statusDisplay.innerHTML = currentPlayerTurn();
}


function validateResult(){
  console.log("inside validate result");
  let gameOver = false;
  for (let i = 0; i <= 7; i++){
    const condition = winningConditions[i];
    let a = gameState[condition[0]];
    let b = gameState[condition[1]];
    let c = gameState[condition[2]];

    if (a === "" || b === "" || c === ""){
      continue;
    }
    if (a === b && b === c){
      gameOver = true;
      break;
    }
  }

  if (gameOver){
    statusDisplay.innerHTML = winningMessage();
    gameActive = false;
    return;
  }

  const draw = !gameState.includes("");
  if (draw){
    statusDisplay.innerHTML = drawMessage();
    gameActive = false;
    return
  }
  changePlayer();
}


function clickCell(cellEvent) {
  console.log("inside click cell");
  const clickedCell = cellEvent.target;
  const cellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));

  if (gameState[cellIndex] !== "" || !gameActive) return;

  playCell(clickedCell, cellIndex);
  validateResult();
}

function restartGame() {
  console.log("inside restart");
  gameActive = true;
  currentPlayer = "X";
  gameState = ["", "", "", "", "", "", "", "", ""];
  statusDisplay.innerHTML = currentPlayerTurn();
  document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = "");
}

document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', clickCell));
document.querySelector('.game-reset').addEventListener('click', restartGame);
