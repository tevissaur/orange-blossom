
// Defining variables
let tile = document.getElementsByClassName('tile');
let sides = ['X', 'O'];
let startButton = document.getElementById('start');
let turnIndicator = document.getElementById('comp-think')
let currentTurn = true
let numChoices = 0;
let winConditions = [["top-left", "top-mid", "top-right"],
["top-left", "center", "bot-right"],
["top-left", "mid-left", "bot-left"],
["mid-left", "center", "mid-right"],
["bot-left", "center", "top-right"],
["bot-left", "bot-mid", "bot-right"],
["top-mid", "center", "bot-mid"],
["top-right", "mid-right", "bot-right"]]

// Define Player Object
const player = {
    firstName: 'Player',
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
    turnIndicator.innerHTML = 'Computer is thinking.'
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
    startButton.style.visibility = 'hidden'
    document.getElementById('board').style.visibility = 'visible'
})

// Player turn
function playerTurn(side) {
    if (currentTurn) {
        for (let i = 0; i < tile.length; i++) {
            tile[i].addEventListener('click', function () {

                // If this returns true, it tells the player to select another tile.
                if (!checkIfSelected(tile[i].id)) {
                    tile[i].className = 'tile ' + player.side
                    player.selectedTiles.push(tile[i].id)
                    player.selectedTiles.sort()


                    // Tracking selections and selected tiles
                    console.log('Player', i, tile[i].id)
                    console.log('Player', player.selectedTiles)

                    // Checking if selected tiles trigger win condidtions
                    checkWin('Player',player.selectedTiles)
                    catsGame()
                    compTurn()

                } else {
                    turnIndicator.innerHTML = 'That tile is already selected. Select another one.'
                }

            })
        }
        currentTurn = false
    }
}

// Computer picks a square: async function allows the sleep function to work
async function compTurn() {
    var i = Math.floor(Math.random() * tile.length)
    let choice = tile[i].id



    // Was running into errors, just trying to catch them. Should be fine now.
    try {

        // If this returns true, it runs this function again.
        if (!checkIfSelected(choice)) {
            // Sleep provides a feeling that the computer is taking its time.
            await sleep(750)

            // Manipulating DOM
            tile[i].className = 'tile ' + comp.side
            comp.selectedTiles.push(choice)
            comp.selectedTiles.sort()
            currentTurn = true
            turnIndicator.innerHTML = 'Your Turn'

            // Tracking selections and selected tiles
            console.log('Comp', i, choice)
            console.log('Comp', comp.selectedTiles)

            // Checking if selected tiles trigger win condidtions
            checkWin('Comp',comp.selectedTiles)
            catsGame()

        } else {
            compTurn()
        }

    }
    catch (err) {
        console.log(err)
    }
}


// Checks if the selected tile has already been selected by the comp or player. Returns a boolean. 

/* It works most of the time, but every once in a while the computer will choose a 
tile selected by the player. SOLVED: in second for loop I was iterating through the 
computer tiles */
function checkIfSelected(choice) {
    var bool = false

    // Iterates through selected computer tiles
    for (var c = 0; c < comp.selectedTiles.length; c++) {
        if (comp.selectedTiles[c] === choice) {
            bool = true
            return bool
        }
    }

    // Iterates through selected player tiles
    for (var p = 0; p < player.selectedTiles.length; p++) {
        if (player.selectedTiles[p] === choice) {
            bool = true
            return bool
        }
    }
    return bool

}

// TODO: Create win conditions

function catsGame() {

}

function checkWin(who, selectedTiles) {

    let winCounter = 0

    for (var winIndex = 0; winIndex < winConditions.length; winIndex++) {

        winConditions[winIndex].sort()
        console.log(who, winConditions[winIndex])

        for (var tileIndex = 0; tileIndex < selectedTiles.length; tileIndex++) {

            if ( ( winConditions[winIndex].includes(selectedTiles[tileIndex]) ) || ( selectedTiles.includes(winConditions[winIndex][tileIndex]) ) ) {

                console.log(winConditions[winIndex][tileIndex], selectedTiles)
            }
        }
    }
}


// var array1 = ["top-left", "top-mid", "top-right"]
// var array2 = ["top-left", "top-mid", "top-right", "bot-left"]

// array1.sort()
// array2.sort()

// console.log(array1, array2)
// console.log(array1.includes(array2), array2.includes(array1))