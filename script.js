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
    nameO : "Player O"
}

const Game = {
    turn : Player.playerX,
    isPlaying : false,
    start() {
        this.isPlaying = true;
        this.turn = Player.playerX;
        // optionally reset board here too

    },
    winnerCombinations: [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]],
    playRound(location, player) { // Index of the board
        // Make sure box is empty, then insert value, update board, then check winner
        if(gameBoard.getBoard()[location] === "")
        {        
            gameBoard.updateBoard(location, player);
        }

        if(this.checkWinner(location))
        {
            console.log("Player " + this.turn + " won! Game done.");
            if(this.turn === Player.playerX)
                Player.scoreX++;
            else if(this.turn === Player.playerO)
                Player.scoreO++;
            this.isPlaying = false;
        } else if(!gameBoard.getBoard().includes("")) {
            console.log("It's a tie!");
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
        Player.scoreX = 0;
        Player.scoreO = 0;
    }
}

Object.freeze(Game.winnerCombinations);





