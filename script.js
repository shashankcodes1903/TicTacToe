const boxes = document.querySelectorAll(".box");
 const gameInfo = document.querySelector(".game-info");
 const newGameBtn = document.querySelector(".btn");

 let currentPlayer;
 let gameGrid;

 const winningPosition = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
 ];
 //function to initialize the game

 function initGame(){
    currentPlayer = "X";
    gameGrid = ["","","","","","","","",""];
    //UI per empty karna padega
    boxes.forEach((box,index) => {
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";
        box.classList = `box box${index+1}`;
    })
    newGameBtn.classList.remove("active");
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
    
 }

 initGame();

function swapTurn(){
    if(currentPlayer === "X"){
        currentPlayer = "O";
    }
    else{
        currentPlayer = "X";
    }

    gameInfo.innerText = `Current Player - ${currentPlayer}`;
    newGameBtn.classList.add("active");
}

function checkGameOver(){

    let answer = "";

    winningPosition.forEach((position) => {

        //all 3 boxes should be non-empty and exactly same in value

        if((gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "") && (gameGrid[position[0]] === gameGrid[position[1]] ) && (gameGrid[position[1]] === gameGrid[position[2]] )){
            if(gameGrid[position[0]] == "X"){
                answer = "X";
            }
            else{
                answer = "O";
            }

            boxes.forEach((box) => {
                box.style.pointerEvents = "none";
            })

            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
        }

    })

    if(answer !== ""){
        gameInfo.innerText = `Winner - ${answer}`;
        return; 
    }

    let ans = 0;

    gameGrid.forEach((box) => {
        // let ans = true;
        if(box !== ""){
            ans++;
        }

        
    })

    if(ans === 9){
        gameInfo.innerText = "Game Tied!";
    }

    
    

}

 function handleClick(index){
    if(gameGrid[index] === ""){
        boxes[index].innerText = currentPlayer;
        gameGrid[index] = currentPlayer;
        boxes[index].style.pointerEvents = "none";
        swapTurn();
        checkGameOver();
    }
 }

 boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        handleClick(index);
    })
 });

 newGameBtn.addEventListener("click", initGame);