const gameBoard = (function() {
    let board = ["", "", "",
                 "", "", "", 
                 "", "", ""];

    return {
        getBoard() {
            return board;
        },
        updateBoard(location, player) {
            board[location] = player;
        },
        resetBoard() {
            board = ["", "", "",
                     "", "", "",
                     "", "", ""];
        }
    }
})();

const Player = {
    playerX : "X",
    playerO : "O", 
    scoreX : 0,
    scoreO : 0,
    nameX : "Player X",
    nameO : "Player O",
    resetScore(){
        this.scoreX = 0;
        this.scoreO = 0;
    }
}

const Game = {
    turn : Player.playerX,
    isPlaying : false,
    start() {
        this.isPlaying = true;
        // optionally reset board here too
        displayController.displayNameScore();

    },
    winnerCombinations: [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]],
    playRound(location) { // Index of the board
        // Make sure box is empty, then insert value, update board, then check winner
        if(gameBoard.getBoard()[location] === "" && this.isPlaying)
        {        
            gameBoard.updateBoard(location, this.turn);
            displayController.displayBoxes();
        }

        if(this.checkWinner(location))
        {
            console.log("Player " + this.turn + " won this round!");
            alert("Player " + this.turn + " won this round!")
            if(this.turn === Player.playerX)
                Player.scoreX++;
            else if(this.turn === Player.playerO)
                Player.scoreO++;

            displayController.displayNameScore();
            this.isPlaying = false;
        } else if(!gameBoard.getBoard().includes("")) {
            alert("It's a tie!");
            console.log("It's a tie!");
            this.isPlaying = false;
        } else {
            this.turn = this.turn === Player.playerX ? Player.playerO : Player.playerX;
        }
    },    
    checkWinner(location) {
        // 1-2-3, 4-5-6, 7-8-9, 1-4-7, 2-5-8, 3-6-9, 1-5-9, 3-5-7 are winner combinations
        const subArrays = Game.winnerCombinations.filter(subArr => subArr.includes(location));
        
        for (const sub of subArrays) {
            if (
                gameBoard.getBoard()[sub[0]] === gameBoard.getBoard()[sub[1]] &&
                gameBoard.getBoard()[sub[1]] === gameBoard.getBoard()[sub[2]] &&
                gameBoard.getBoard()[sub[0]] !== "" // optional: avoid counting empty cells
            ) {
                return true;
            }
        }

        return false;
    },
    resetGame() {
        gameBoard.resetBoard();
        Player.resetScore();
    }
}

Object.freeze(Game.winnerCombinations);





// DOM scripts

//Form Page
const btnStart = document.getElementById('btn-start');
const nameXinput = document.getElementById('player-x');
const nameOinput = document.getElementById('player-o');

btnStart.addEventListener('click', () => {
    if(!(nameXinput.value === ''))
    {
        Player.nameX = nameXinput.value;
    }

    if(!(nameOinput.value === ''))
    {
        Player.nameO = nameOinput.value;
    }

    document.getElementById('name-form').classList.remove('active');
    document.getElementById('game-container').classList.add('active');
    Game.start();
});


// Reset Game Button

const btnResetGame= document.getElementById('btn-reset');
btnResetGame.addEventListener('click', () => {
    Game.resetGame();
    Game.start();
    //Display board again
    displayController.displayBoxes();
});

// New Game (Refresh Page)

const btnNewGame = document.getElementById('btn-new');
btnNewGame.addEventListener('click', () => {
    location.reload();
});

// Next Round Button

const btnNextRound = document.getElementById('btn-next');
btnNextRound.addEventListener('click', () => {
    if(!Game.isPlaying)
    {
        gameBoard.resetBoard();
        Game.start();
        displayController.displayBoxes();
    }


});

//Display Controller

const displayController = (function() {
    const boardButtons = document.querySelectorAll('.game-button');
    boardButtons.forEach(btn => btn.addEventListener('click', () => {
        if(btn.textContent === "")
        {
            Game.playRound(Number(btn.dataset.location));
        }
    }));

    return {
        displayBoxes(){
            boardButtons.forEach((el, index) => {
                el.textContent = gameBoard.getBoard()[index];
            });
        },
        displayNameScore(){
            const dispNameX = document.getElementById('display-x');
            const dispNameO = document.getElementById('display-o');
            
            dispNameX.textContent = Player.nameX + ": " + Player.scoreX;
            dispNameO.textContent = Player.nameO + ": " + Player.scoreO;
        }
    }
})();

