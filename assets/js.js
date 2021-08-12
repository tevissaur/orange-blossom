// TODO: Login form
//       Create Account
//       Save info into cookies
//       Change DOM to reflect cookie data


// Adding in constructor functions, because all the objects just reference themselves recursively, which works. 
// However, I want to have a game where you can create custom player profiles, or choose whether or not the player will face a computer or human.


// Defining variables


const sides = ['X', 'O']
let selectedTiles = [];
const winConditions = [
    ["top-left", "top-mid", "top-right"], // All possible win conditions
    ["top-left", "center", "bot-right"],
    ["top-left", "mid-left", "bot-left"],
    ["mid-left", "center", "mid-right"],
    ["bot-left", "center", "top-right"],
    ["bot-left", "bot-mid", "bot-right"],
    ["top-mid", "center", "bot-mid"],
    ["top-right", "mid-right", "bot-right"]
]


const board = {
    elem: document.getElementById('board'),
    startButton: document.getElementById('start'),
    tileElem: document.getElementsByClassName('tile'),
    turnIndicator: document.getElementById('comp-think')
}


// Define Player Object
const player = {
    name: 'Player',
    side: undefined,
    isTurn: false,
    won: false,
    turn: function(tile) {
        // Prevents player from going before the computer completes it's turn or if the game is over
        if (!player.isTurn) {
            if (!game.game) {
                board.turnIndicator.innerHTML = 'If you want to play again, press the start button.'
            } else {
                board.turnIndicator.innerHTML = 'Please wait your turn.'
            }
        } else {

            // If this returns true, it tells the player to select another tile.
            if (!game.isSelected(tile.id)) {
                tile.innerHTML = player.side
                selectedTiles.push(tile.id)

                // Checking if selected tiles trigger win condidtions
                game.checkWin(player)
                if (player.won) {
                    game.end()
                } else {
                    game.nextTurn(player, comp)
                }

            } else {
                board.turnIndicator.innerHTML = 'That tile is already selected. Select another one.'
            }


        }
    }
}

// Define Computer Object
const comp = {
    name: 'Computer',
    side: undefined,
    isTurn: false,
    won: false,
    turn: async function() {
        let choice = board.tiles[Math.floor(Math.random() * board.tiles.length)]
            // Was running into errors, just trying to catch them. Should be fine now.
        try {
            if (game.catsGame()) {
                board.turnIndicator.innerHTML = "Cat's game. Play again?"
                game.end()
            } else {
                // If this returns true, it runs this function again.
                if (!game.isSelected(choice.id)) {

                    // Sleep function simulates the computer thinking and taking its time
                    await game.sleep(500)

                    // Manipulating DOM
                    document.getElementById(choice.id).innerHTML = comp.side

                    selectedTiles.push(choice.id)

                    // Checking if selected tiles trigger win condidtions
                    game.checkWin(comp)
                    if (comp.won) {
                        game.end()
                    } else {
                        game.nextTurn(comp, player)
                    }


                } else {
                    comp.turn()
                }

            }
        } catch (err) {
            console.log(err)
        }

    }
}


const game = {
    game: false,
    sleep: function(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    },
    isSelected: function(choice, who) {
        var selected = false

        if (selectedTiles.includes(choice)) {
            selected = true
        } else {
            selected = false
        }
        return selected
    },
    checkWin: async function(who) {
        console.log('Checking if ' + who.name + ' won.')
        for (w in winConditions) {
            console.log(document.getElementById(winConditions[w][0]).innerText)
            console.log(document.getElementById(winConditions[w][1]).innerHTML)
            console.log(document.getElementById(winConditions[w][2]).innerHTML)

            if ((document.getElementById(winConditions[w][0]).innerText === who.side) &&
                (document.getElementById(winConditions[w][1]).innerText === who.side) &&
                (document.getElementById(winConditions[w][2]).innerText === who.side)) {
                board.turnIndicator.innerHTML = who.name + ' has won! Play again?'
                who.won = true
                who.isTurn = false
                game.end(who)
            }
        }
    },
    nextTurn: function(current, next) {
        if (current.isTurn) {
            current.isTurn = false
            next.isTurn = true
            if (next.name === 'Computer') {
                board.turnIndicator.innerHTML = 'Computer is thinking...'
                next.turn()
            } else {
                board.turnIndicator.innerHTML = 'Your turn!'
            }
        }
    },
    reset: function() {
        selectedTiles = [];
        for (i in board.tiles) {
            board.tiles[i].innerHTML = glitch
            console.log(board.tiles[i].innerHTML)
        };
        for (i in player) {
            if (typeof i === Boolean) {
                i = false
            } else if (typeof i === Array) {
                i = []
            } else if (typeof i === String) {
                i = undefined
            }
        };
        for (i in board.tiles) {

        }
        board.turnIndicator.innerHTML = 'Your turn!'
        player.isTurn = false;
        player.won = false;
        comp.isTurn = false;
        comp.won = false;
        game.game = true;
    },
    catsGame: function() {
        if ((((board.tiles[0].innerText) === comp.side) || ((board.tiles[0].innerText) === player.side)) &&
            (((board.tiles[1].innerText) === comp.side) || ((board.tiles[1].innerText) === player.side)) &&
            (((board.tiles[2].innerText) === comp.side) || ((board.tiles[2].innerText) === player.side)) &&
            (((board.tiles[3].innerText) === comp.side) || ((board.tiles[3].innerText) === player.side)) &&
            (((board.tiles[4].innerText) === comp.side) || ((board.tiles[4].innerText) === player.side)) &&
            (((board.tiles[5].innerText) === comp.side) || ((board.tiles[5].innerText) === player.side)) &&
            (((board.tiles[6].innerText) === comp.side) || ((board.tiles[6].innerText) === player.side)) &&
            (((board.tiles[7].innerText) === comp.side) || ((board.tiles[7].innerText) === player.side)) &&
            (((board.tiles[8].innerText) === comp.side) || ((board.tiles[8].innerText) === player.side))) {
            return true
        } else {
            return false
        }
    },
    start: function() {
        game.reset()
        let i = Math.floor(Math.random() * 2) // Assigning player side randomly

        // Applying the sides.
        if (sides[i] === sides[0]) {
            player.side = sides[0]
            comp.side = sides[1]
            document.getElementById('player-side').innerHTML = player.name + ' is ' + player.side + ' and the computer is ' + comp.side + '. Player goes first.'
        } else {
            player.side = sides[1]
            comp.side = sides[0]
            document.getElementById('player-side').innerHTML = player.name + ' is ' + player.side + ' and the computer is ' + comp.side + '. Player goes first.'
        }

        // Showing the board and hiding the start button
        board.startButton.style.visibility = 'hidden'
        board.elem.style.visibility = 'visible'

        player.isTurn = true
    },

    end: function(winner) {
        this.game = false;
        startButton.style.visibility = 'visible';
    }
}

board.startButton.addEventListener('click', game.start)

// OLD CODE: Made the program more object oriented


// // Starts the game
// startButton.addEventListener("click", function () {

//     let i = Math.floor(Math.random() * 2) // Assigning player side randomly

//     // Applying the sides.
//     if (sides[i] === 'O') {
//         player.side = sides[i]
//         comp.side = 'X'
//         document.getElementById('player-side').innerHTML = player.name + ' is ' + player.side + ' and the computer is ' + comp.side + '. Player goes first.'
//     } else {
//         player.side = sides[i]
//         comp.side = 'O'
//         document.getElementById('player-side').innerHTML = player.name + ' is ' + player.side + ' and the computer is ' + comp.side + '. Player goes first.'
//     }

//     // Showing the board and hiding the start button
//     startButton.style.visibility = 'hidden'
//     board.style.visibility = 'visible'

//     player.isTurn = true
//     player.turn()
// })





// // Sleep function
// function sleep(ms) {
//     turnIndicator.innerHTML = 'Computer is thinking.'
//     return new Promise(resolve => setTimeout(resolve, ms));
// }





// // Player turn
// function playerTurn() {




//     if (!player.isTurn) {
//         compTurn()
//     } else {
//         for (let i = 0; i < tile.length; i++) {
//             tile[i].addEventListener('click', function () {

//                 // If this returns true, it tells the player to select another tile.
//                 if (!isSelected(tile[i].id)) {
//                     tile[i].innerHTML = player.side
//                     player.selectedTiles.push(tile[i].id)
//                     player.selectedTiles.sort()


//                     // Tracking selections and selected tiles
//                     // console.log('Player', tile[i].id)

//                     // Checking if selected tiles trigger win condidtions
//                     checkWin(player, player.selectedTiles)
//                     compTurn()

//                 } else {
//                     turnIndicator.innerHTML = 'That tile is already selected. Select another one.'
//                 }

//             })
//         }
//     }

// }

// // Computer picks a square: async function allows the sleep function to work
// async function compTurn() {
//     let choice = tile[Math.floor(Math.random() * tile.length)]



//     // Was running into errors, just trying to catch them. Should be fine now.
//     try {

//         // If this returns true, it runs this function again.
//         if (!isSelected(choice.id)) {
//             // Sleep provides a feeling that the computer is taking its time.
//             await sleep(750)

//             // Manipulating DOM
//             choice.innerHTML = comp.side

//             comp.selectedTiles.push(choice.id)
//             comp.selectedTiles.sort()
//             comp.isTurn = false
//             player.isTurn = true
//             turnIndicator.innerHTML = 'Your Turn'

//             // Tracking selections and selected tiles, not necessary anymore
//             // console.log('Comp', choice.id)

//             // Checking if selected tiles trigger win condidtions
//             checkWin(comp, comp.selectedTiles)
//             catsGame()

//         } else {
//             compTurn()
//         }

//     }
//     catch (err) {
//         console.log(err)
//     }
// }


// // Checks if the selected tile has already been selected by the comp or player. Returns a boolean. 

// /* It works most of the time, but every once in a while the computer will choose a 
// tile selected by the player. SOLVED: in second for loop I was iterating through the 
// computer tiles */
// function isSelected(choice) {
//     var bool = false

//     // Iterates through selected computer tiles
//     for (var c = 0; c < comp.selectedTiles.length; c++) {
//         if (comp.selectedTiles[c] === choice) {
//             bool = true
//             return bool
//         }
//     }

//     // Iterates through selected player tiles
//     for (var p = 0; p < player.selectedTiles.length; p++) {
//         if (player.selectedTiles[p] === choice) {
//             bool = true
//             return bool
//         }
//     }
//     return bool

// }



// function catsGame() {

// }


// // Checks the HTML content of each tile and compares it to each of the win conditions
// function checkWin(who) {

//     console.log('Checking if ' + who.name + ' won.')
//     if (who.selectedTiles.length >= 3) {

//         for (w in winConditions) {

//             if ((document.getElementById(winConditions[w][0]).innerHTML == who.side) &&
//                 (document.getElementById(winConditions[w][1]).innerHTML == who.side) &&
//                 (document.getElementById(winConditions[w][2]).innerHTML == who.side)) {
//                 console.log(who.name + ' won!!')
//                 who.
//                     endGame()
//             }
//         }
//     }
// }

// function endGame() {

// }

// function game() {

// }