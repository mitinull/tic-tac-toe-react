const MAXIMIZE_PLAYER = 'X';

function opponent(p) {
    return p === 'X' ? 'O' : 'X';
}

function findBestMove(b, p) {
    let board = [...b];
    let bestMoves = [];
    let bestScore = p===MAXIMIZE_PLAYER ? -Infinity : Infinity;
    for (let i = 0; i < board.length; i++) {
        if (board[i] === '') {
            board[i] = p;
            let score = minimax(board, opponent(p));
            board[i] = '';
            if (p === MAXIMIZE_PLAYER) {
                if (score > bestScore) {
                    bestScore = score;
                    bestMoves = [i];
                }
                else if (score === bestScore) {
                    bestMoves.push(i);
                }
            }
            else {
                if (score < bestScore) {
                    bestScore = score;
                    bestMoves = [i];
                }
                else if (score === bestScore) {
                    bestMoves.push(i);
                }
            }
        }
    }
    return bestMoves[Math.floor(Math.random() * bestMoves.length)];
}
export default findBestMove;

function minimax(b, p) {
    let board = [...b];
    if( gameState(board).isOver) {
        if (gameState(board).winner === 'tie') {
            return 0;
        } else if (gameState(board).winner === MAXIMIZE_PLAYER) {
            return 1;
        } else {
            return -1;
        }
    }
    if (p === MAXIMIZE_PLAYER) {
        let bestScore = -Infinity;
        for (let i = 0; i < board.length; i++) {
            if (board[i] === '') {
                board[i] = p;
                let score = minimax(board, opponent(p));
                board[i] = '';
                bestScore = Math.max(score, bestScore);
                if (score === 1) {
                    return 1;
                }
            }
        }
        return bestScore;
    }
    else {
        let bestScore = Infinity;
        for (let i = 0; i < board.length; i++) {
            if (board[i] === '') {
                board[i] = p;
                let score = minimax(board, opponent(p));
                board[i] = '';
                bestScore = Math.min(score, bestScore);
                if (score === -1) {
                    return -1;
                }
            }
        }
        return bestScore;
    }

}

function gameState(board) {
    let winner = '';
    if (board[0] === board[1] && board[1] === board[2] && board[0] !== '') {
        winner = board[0];
    } else if (board[3] === board[4] && board[4] === board[5] && board[3] !== '') {
        winner = board[3];
    } else if (board[6] === board[7] && board[7] === board[8] && board[6] !== '') {
        winner = board[6];
    } else if (board[0] === board[3] && board[3] === board[6] && board[0] !== '') {
        winner = board[0];
    } else if (board[1] === board[4] && board[4] === board[7] && board[1] !== '') {
        winner = board[1];
    } else if (board[2] === board[5] && board[5] === board[8] && board[2] !== '') {
        winner = board[2];
    } else if (board[0] === board[4] && board[4] === board[8] && board[0] !== '') {
        winner = board[0];
    } else if (board[2] === board[4] && board[4] === board[6] && board[2] !== '') {
        winner = board[2];
    } else if (board.every(cell => cell !== '')) {
        winner = 'tie';
    }
    return {isOver: (winner !== ''), winner: winner};
}
