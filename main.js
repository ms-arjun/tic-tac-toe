const cell = document.querySelectorAll(".cell");
const status1 = document.querySelector("#status");
const restart = document.querySelector("#restart");

const winCondition = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

let option = ["","","","","","","","",""];
let currentPlayer = "x";
let running = false;

initializeGame()

function initializeGame(){
    cell.forEach((cells)=>cells.addEventListener("click",cellClicked));
    restart.addEventListener("click",restartGame);
    status1.textContent =`${currentPlayer}'s turn`;
    running = true;

}

function cellClicked(){
 const cellIndex = this.getAttribute("cellIndex");

 if(option[cellIndex] != "" || !running){
    return ;
 }
 cellUpdate(this,cellIndex);

 checkWinner();
}

function cellUpdate(cell,index){
 option[index] = currentPlayer;
 cell.textContent = currentPlayer;
}

function changePlayer(){
 currentPlayer = (currentPlayer == 'x')? "o" : "x";
 status1.textContent = `${currentPlayer}'s turn`

}

function checkWinner(){
  let roundwon = false;

  for(let i = 0; i < winCondition.length;i++){
    const condition = winCondition[i];
    const cellA = option[condition[0]];
    const cellB = option[condition[1]];
    const cellC = option[condition[2]];

    if(cellA == "" || cellB == "" || cellC == ""){
       continue;
    }
    if(cellA == cellB && cellB == cellC){
        roundwon = true;
       break;
     }
 
  }
  
  if(roundwon){
    status1.textContent = `${currentPlayer} wins!`;
    running = false;
  }
  else if(!option.includes("")){
    status1.textContent = `Draw :)`;
    running = false;

  }
 
  else{
    changePlayer();
  }
}

function restartGame(){
    currentPlayer = 'x';
    let option = ["","","","","","","","",""];
    status1.textContent = `${currentPlayer}'s turn`;
    cell.forEach(cells => cells.textContent = "");
    running = true;

}
