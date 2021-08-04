
// Defining variables
let tile = document.getElementsByClassName('tile');
let tileNames = ['top-left', 'top-mid', 'top-right',
    'mid-left', 'center', 'mid-right',
    'bot-left', 'bot-mid', 'bot-right']
let sides = ['X', 'O'];
let startButton = document.getElementById('start');
let game = true;
let winList = [];

// Define Player Object
const player = {
    firstName: 'Tevis',
    side: undefined
}
// Define Computer Object
const comp = {
    side: undefined
}


startButton.addEventListener("click", function chooseSide() {
    let i = Math.floor(Math.random() * 2)
    if (sides[i] === 'O') {
        player.side = sides[i]
        comp.side = 'X'
        document.getElementById('player-side').innerHTML = player.firstName + ' is ' + player.side + ' and the computer is ' + comp.side + '. Player goes first.'
        startGame(player.side)
    } else {
        player.side = sides[i]
        comp.side = 'O'
        document.getElementById('player-side').innerHTML = player.firstName + ' is ' + player.side + ' and the computer is ' + comp.side + '. Player goes first.'
        startGame(player.side)
    }
})

function checkTiles() {

}

// Computer picks a square
function compTurn() {
    let i = Math.floor(Math.random() * tileNames.length)
    let choice = tileNames[i]

    /* 
    Make sure the computer is not picking 
    a square that has already been picked
    */

    try {
        if ((choice === undefined)) {
            compTurn()
        } else {
            tile[i].className = 'tile ' + comp.side
            delete tileNames[i]
        }
    }
    catch (err) {
        catsGame()
    }
    console.log('comp', i, choice)
}

function catsGame() {

}

function endGame() {
    
}

function startGame(side) {
    startButton.style.visibility = 'hidden'
    for (let i = 0; i < tile.length; i++) {
        tile[i].addEventListener('click', function () {
            tile[i].className = 'tile ' + player.side
            console.log('Player', i, tile[i].id)
            delete tileNames[i]
            console.log(tileNames.length)
            compTurn()
        })
    }
}




