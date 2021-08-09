
// Defining variables
const board = document.getElementById('board');
const tiles = board.children;
const sides = ['X', 'O'];
const startButton = document.getElementById('start');
const turnIndicator = document.getElementById('comp-think');
let selectedTiles = [];
const winConditions = [["top-left", "top-mid", "top-right"], // All possible win conditions
["top-left", "center", "bot-right"],
["top-left", "mid-left", "bot-left"],
["mid-left", "center", "mid-right"],
["bot-left", "center", "top-right"],
["bot-left", "bot-mid", "bot-right"],
["top-mid", "center", "bot-mid"],
["top-right", "mid-right", "bot-right"]]


console.log(tiles)
// Define Player Object
const player = {
    name: 'Player',
    side: undefined,
    isTurn: false,
    won: false,
    turn: function (tile) {
        console.log(tile, tile.id)
        if (!player.isTurn) {
            // Prevents player from going before the computer completes it's turn
            turnIndicator.innerHTML = 'Please wait your turn.'
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
                turnIndicator.innerHTML = 'That tile is already selected. Select another one.'
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
    turn: async function () {
        let choice = tiles[Math.floor(Math.random() * tiles.length)]
        // Was running into errors, just trying to catch them. Should be fine now.
        try {
            if ( game.catsGame() ){
                turnIndicator.innerHTML = "Cat's game. Play again?"
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


                }
                else {
                    comp.turn()
                }

            }
        } catch (err) {
            console.log(err)
        }

    }
}


const game = {
    sleep: function (ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    },
    isSelected: function (choice, who) {
        var selected = false

        if (selectedTiles.includes(choice)) {
            selected = true
        }
        else {
            selected = false
        }
        return selected
    },
    checkWin: async function (who) {
        console.log('Checking if ' + who.name + ' won.')
        for (w in winConditions) {
            if ((document.getElementById(winConditions[w][0]).innerHTML === who.side) &&
                (document.getElementById(winConditions[w][1]).innerHTML === who.side) &&
                (document.getElementById(winConditions[w][2]).innerHTML === who.side)) {
                turnIndicator.innerHTML = who.name + ' has won! Play again?'
                who.won = true
            }
        }
    },
    nextTurn: function (current, next) {
        if (current.isTurn) {
            current.isTurn = false
            next.isTurn = true
            if (next.name === 'Computer') {
                turnIndicator.innerHTML = 'Computer is thinking...'
                next.turn()
            } else {
                turnIndicator.innerHTML = 'Your turn!'
            }
        }
    },
    reset: function () {
        selectedTiles = [];
        for (i in tiles) {
            tiles[i].innerHTML = ''
            console.log(tiles[i].innerHTML)
        };
        for (i in player) {
            if (typeof i === Boolean) {
                i = false
            } else if (typeof i === Array) {
                i = []
            }
            console.log(i, player[i])
        };
        turnIndicator.innerHTML = 'Your turn!'
        player.isTurn = false;
        player.won = false;
        comp.isTurn = false;
        comp.won = false;

    },
    start: function () {
        game.reset()
        let i = Math.floor(Math.random() * 2) // Assigning player side randomly

        // Applying the sides.
        if (sides[i] === 'O') {
            player.side = sides[i]
            comp.side = 'X'
            document.getElementById('player-side').innerHTML = player.name + ' is ' + player.side + ' and the computer is ' + comp.side + '. Player goes first.'
        } else {
            player.side = sides[i]
            comp.side = 'O'
            document.getElementById('player-side').innerHTML = player.name + ' is ' + player.side + ' and the computer is ' + comp.side + '. Player goes first.'
        }

        // Showing the board and hiding the start button
        startButton.style.visibility = 'hidden'
        board.style.visibility = 'visible'

        player.isTurn = true
    },
    catsGame: function() {
        if ((((tiles[0].innerHTML) === comp.side) || ((tiles[0].innerHTML) === player.side)) &&
        (((tiles[1].innerHTML) === comp.side) || ((tiles[1].innerHTML) === player.side)) && 
        (((tiles[2].innerHTML) === comp.side) || ((tiles[2].innerHTML) === player.side)) &&
        (((tiles[3].innerHTML) === comp.side) || ((tiles[3].innerHTML) === player.side)) &&
        (((tiles[4].innerHTML) === comp.side) || ((tiles[4].innerHTML) === player.side)) &&
        (((tiles[5].innerHTML) === comp.side) || ((tiles[5].innerHTML) === player.side)) &&
        (((tiles[6].innerHTML) === comp.side) || ((tiles[6].innerHTML) === player.side)) &&
        (((tiles[7].innerHTML) === comp.side) || ((tiles[7].innerHTML) === player.side)) && 
        (((tiles[8].innerHTML) === comp.side) || ((tiles[8].innerHTML) === player.side))) {
            return true
        } else {
            return false
        }
    },
    end: function () {
        startButton.style.visibility = 'visible';
    }
}


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