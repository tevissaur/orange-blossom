
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
                     ["bot-left", "center", "top-right"]
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
})

// Player turn
function playerTurn(side) {
    startButton.style.visibility = 'hidden'
    if (currentTurn) {
        for (let i = 0; i < tile.length; i++) {
            tile[i].addEventListener('click', function () {

                // If this returns true, it tells the player to select another tile.
                if (!checkIfSelected(tile[i].id)) {
                    tile[i].className = 'tile ' + player.side
                    player.selectedTiles.push(tile[i].id)
                    player.selectedTiles.reverse()


                    // Tracking selections and selected tiles
                    console.log('Player', i, tile[i].id)
                    console.log('Player', player.selectedTiles)
                    catsGame()
                    endGame(player.selectedTiles)
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
            comp.selectedTiles.reverse()
            currentTurn = true
            turnIndicator.innerHTML = 'Your Turn'

            // Tracking selections and selected tiles
            console.log('Comp', i, choice)
            console.log('Comp', comp.selectedTiles)
        } else {
            compTurn()
            endGame(comp.selectedTiles)
            catsGame()
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

function endGame(selectedTiles) {
    console.log(JSON.stringify(selectedTiles))
    for (var w = 0;  w < winConditions.length; w++) {
        if (JSON.stringify(selectedTiles) == JSON.stringify(winConditions[w])){
            console.log(selectedTiles)
            console.log(winConditions[w])
            console.log('win?')
        }
    }
}





