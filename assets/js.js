
// Defining variables
let tile = document.getElementsByClassName('tile');
let sides = ['X', 'O'];
let startButton = document.getElementById('start');
let currentTurn = document.getElementById('comp-think')
let numChoices = 0;

// Define Player Object
const player = {
    firstName: 'Tevis',
    side: undefined,
    selectedTiles: []
}
// Define Computer Object
const comp = {
    side: undefined,
    selectedTiles: []
}

// Sleep function
function sleep(ms) {
    currentTurn.innerHTML = 'Computer is thinking.'
    return new Promise(resolve => setTimeout(resolve, ms));
}



// Starts the game
startButton.addEventListener("click", function chooseSide() {
    let i = Math.floor(Math.random() * 2)
    if (sides[i] === 'O') {
        player.side = sides[i]
        comp.side = 'X'
        document.getElementById('player-side').innerHTML = player.firstName + ' is ' + player.side + ' and the computer is ' + comp.side + '. Player goes first.'
        playerTurn(player.side)
    } else {
        player.side = sides[i]
        comp.side = 'O'
        document.getElementById('player-side').innerHTML = player.firstName + ' is ' + player.side + ' and the computer is ' + comp.side + '. Player goes first.'
        playerTurn(player.side)
    }
})

// Player turn
function playerTurn(side) {
    startButton.style.visibility = 'hidden'
    for (let i = 0; i < tile.length; i++) {
        tile[i].addEventListener('click', function () {
            if (!checkIfSelected(tile[i].id)) {
                tile[i].className = 'tile ' + player.side
                player.selectedTiles.push(tile[i].id)
                player.selectedTiles.reverse()
                // Checking if values are correct
                console.log('Player', i, tile[i].id)
                console.log('Player', player.selectedTiles)
                compTurn()
            } else {
                currentTurn.innerHTML = 'That tile is already selected. Select another one.'
            }

        })
    }
}

// Computer picks a square: async function allows the sleep function to work
async function compTurn() {
    var i = Math.floor(Math.random() * tile.length)
    let choice = tile[i].id

    /* 
    Make sure the computer is not picking 
    a square that has already been picked
    */
    // TODO: FIND A WAY TO REMOVE ITEMS FROM tileNames LIST
    await sleep(750)
    try {
        if (!checkIfSelected(choice)) {
            tile[i].className = 'tile ' + comp.side
            comp.selectedTiles.push(choice)
            comp.selectedTiles.reverse()
            currentTurn.innerHTML = 'Your Turn'
            // Checking if values are correct
            console.log('Comp', i, choice)
            console.log('Comp', comp.selectedTiles)
        } else {
            compTurn()
        }

    }
    catch (err) {
        console.log(err)
    }
}

function checkIfSelected(choice) {
    var bool = false
    for (var c = 0; c < comp.selectedTiles.length; c++) {
        if (comp.selectedTiles[c] === choice) {
            bool = true
            return bool
        }
    }
    for (var p = 0; p < comp.selectedTiles.length; p++) {
        if (player.selectedTiles[p] === choice) {
            bool = true
            return bool
        }
    }
    return bool

}


function catsGame() {

}

function endGame() {

}





