//Eventually need an array of boards from backend 

//Programmatically add boards to the boards list
for (let i = 0; i<25; i++){ //iterate over the board list
    let newBoard = document.createElement('div')   
    newBoard.classList.add('board')  
    const anchor = document.createElement('a')
    anchor.textContent='eh' 
    anchor.href = "../../src/html/board.html";
    newBoard.appendChild(anchor)
    document.getElementById("boardslist").appendChild(newBoard)   
}

function to_home(){
    window.location.href = "../../src/html/index.html"
}

function add_board(){
    //Prompt for title
    //Pass to backend
    //Update flexboard
}