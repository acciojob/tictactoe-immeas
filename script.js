//your JS code here. If required.
document.getElementById("submit").addEventListener("click", startGame);
document.getElementById("reset").addEventListener("click", resetGame);

let player1 = "";
let player2 = "";
let currentPlayer = "";
let currentSymbol = "";
let gameBoard = ["", "", "", "", "", "", "", "", ""];
let gameActive = false;

function startGame() {
    player1 = document.getElementById("player-1").value.trim();
    player2 = document.getElementById("player-2").value.trim();

    if (player1 === "" || player2 === "") {
        alert("Please enter names for both players!");
        return;
    }

    currentPlayer = player1;
    currentSymbol = "X";
    gameActive = true;

    document.getElementById("player-form").style.display = "none";
    document.querySelector(".board-container").style.display = "block";
    document.querySelector(".message").innerText = `${currentPlayer}, you're up!`;

    document.querySelectorAll(".cell").forEach(cell => {
        cell.addEventListener("click", handleCellClick);
    });
}

function handleCellClick(event) {
    const cellIndex = event.target.id - 1;

    if (gameBoard[cellIndex] !== "" || !gameActive) {
        return;
    }

    gameBoard[cellIndex] = currentSymbol;
    event.target.innerText = currentSymbol;

    if (checkWinner()) {
        document.querySelector(".message").innerText = `${currentPlayer}, congratulations! You won! 🎉`;
        gameActive = false;
        document.getElementById("reset").style.display = "block";
        return;
    }

    if (gameBoard.every(cell => cell !== "")) {
        document.querySelector(".message").innerText = "It's a draw!";
        document.getElementById("reset").style.display = "block";
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === player1 ? player2 : player1;
    currentSymbol = currentSymbol === "X" ? "O" : "X";
    document.querySelector(".message").innerText = `${currentPlayer}, you're up!`;
}

function checkWinner() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],  // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8],  // Columns
        [0, 4, 8], [2, 4, 6]              // Diagonals
    ];

    return winPatterns.some(pattern => {
        const [a, b, c] = pattern;
        return gameBoard[a] !== "" && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c];
    });
}

function resetGame() {
    gameBoard = ["", "", "", "", "", "", "", "", ""];
    gameActive = true;
    currentPlayer = player1;
    currentSymbol = "X";

    document.querySelectorAll(".cell").forEach(cell => {
        cell.innerText = "";
    });

    document.querySelector(".message").innerText = `${currentPlayer}, you're up!`;
    document.getElementById("reset").style.display = "none";
}
