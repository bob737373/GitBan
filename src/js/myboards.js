//Eventually need an array of boards from backend 

//Programmatically add boards to the boards list
for (let i = 0; i<5; i++){ //iterate over the board list
    let newBoard = document.createElement('div')
    newBoard.classList.add('flex-board')
    const p = document.createElement('p')
    p.textContent='eh' //pull text from the board list
    newBoard.appendChild(p)
    document.getElementById("boardslist").appendChild(newBoard)   
}

function open_board(){
    window.location.href = "board.html"
}

function add_board(){
    //Prompt for title
    //Pass to backend
    //Update flexboard
}