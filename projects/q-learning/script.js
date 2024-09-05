let turn = 0;
let board = ["", "", "", "", "", "", "", "", ""];
let player = "X";
let computer = "O";
let board_full = false;

function render_board() {
    const board_container = document.querySelector("#play-area");
    board_container.innerHTML = "";
    board.forEach((e, i) => {
        board_container.innerHTML += `<div id="block_${i}" class="block" onclick="addPlayerMove(${i})">${board[i]}</div>`;
        if (e == player || e == computer) {
            document.querySelector(`#block_${i}`).classList.add("occupied");
        }
    });
};

function addPlayerMove(e) {
    if (board[e] == "" && turn == 0) {
        board[e] = player;
        turn = 1;
        render_board();
        doAI();
    }
}

function addComputerMove(e) {
    if (board[e] == "" && turn == 1) {
        board[e] = computer;
        turn = 0;
        render_board();
    }
}

function doAI() {
    let move = -1
    while (turn == 1) {
        move = Math.round(Math.random() * board.length);
        addComputerMove(move);
    }
}