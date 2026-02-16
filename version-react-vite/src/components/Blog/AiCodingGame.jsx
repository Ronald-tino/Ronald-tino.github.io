import React, { useState, useEffect, useCallback } from "react";
import BlogPost from "./BlogPost.jsx";

function AiCodingGame() {
  const [board, setBoard] = useState(Array(3).fill(null).map(() => Array(3).fill("")));
  const [gameOver, setGameOver] = useState(false);
  const [playerTurn, setPlayerTurn] = useState(false); // false = AI (O), true = Player (X)
  const [status, setStatus] = useState("AI is thinking...");

  const getWinner = useCallback((b) => {
    for (let i = 0; i < 3; i++) {
        if (b[i][0] && b[i][0] === b[i][1] && b[i][1] === b[i][2]) return b[i][0];
        if (b[0][i] && b[0][i] === b[1][i] && b[1][i] === b[2][i]) return b[0][i];
    }
    if (b[0][0] && b[0][0] === b[1][1] && b[1][1] === b[2][2]) return b[0][0];
    if (b[0][2] && b[0][2] === b[1][1] && b[1][1] === b[2][0]) return b[0][2];
    return null;
  }, []);

  const isBoardFull = useCallback((b) => {
    return b.flat().every(cell => cell !== "");
  }, []);

  const minimax = useCallback((b, depth, isMaximizing, alpha, beta) => {
    const winner = getWinner(b);
    if (winner === "O") return 10 - depth;
    if (winner === "X") return depth - 10;
    if (isBoardFull(b)) return 0;

    if (isMaximizing) {
      let maxEval = -Infinity;
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (b[i][j] === "") {
            b[i][j] = "O";
            let ev = minimax(b, depth + 1, false, alpha, beta);
            b[i][j] = "";
            maxEval = Math.max(maxEval, ev);
            alpha = Math.max(alpha, ev);
            if (beta <= alpha) break;
          }
        }
      }
      return maxEval;
    } else {
      let minEval = Infinity;
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (b[i][j] === "") {
            b[i][j] = "X";
            let ev = minimax(b, depth + 1, true, alpha, beta);
            b[i][j] = "";
            minEval = Math.min(minEval, ev);
            beta = Math.min(beta, ev);
            if (beta <= alpha) break;
          }
        }
      }
      return minEval;
    }
  }, [getWinner, isBoardFull]);

  const aiMove = useCallback(() => {
    if (gameOver) return;

    let newBoard = board.map(row => [...row]);
    
    // If first move, pick a corner
    if (newBoard.flat().every(c => c === "")) {
      const corners = [[0, 0], [0, 2], [2, 0], [2, 2]];
      const [r, c] = corners[Math.floor(Math.random() * 4)];
      newBoard[r][c] = "O";
    } else {
        let bestScore = -Infinity;
        let move = null;
        for (let i = 0; i < 3; i++) {
          for (let j = 0; j < 3; j++) {
            if (newBoard[i][j] === "") {
                newBoard[i][j] = "O";
              let score = minimax(newBoard, 0, false, -Infinity, Infinity);
              newBoard[i][j] = "";
              if (score > bestScore) {
                bestScore = score;
                move = { i, j };
              }
            }
          }
        }
        if (move) newBoard[move.i][move.j] = "O";
    }

    setBoard(newBoard);
    setPlayerTurn(true);
    
    const winner = getWinner(newBoard);
    if (winner) {
        setGameOver(true);
        setStatus(winner === "O" ? "AI wins! (O)" : "You win! (How?!)");
    } else if (isBoardFull(newBoard)) {
        setGameOver(true);
        setStatus("It's a draw!");
    } else {
        setStatus("Your turn (X)");
    }
  }, [board, gameOver, getWinner, isBoardFull, minimax]);

  useEffect(() => {
    if (!playerTurn && !gameOver) {
      const timer = setTimeout(aiMove, 600);
      return () => clearTimeout(timer);
    }
  }, [playerTurn, gameOver, aiMove]);

  const handleCellClick = (r, c) => {
    if (board[r][c] !== "" || gameOver || !playerTurn) return;

    const newBoard = board.map(row => [...row]);
    newBoard[r][c] = "X";
    setBoard(newBoard);
    setPlayerTurn(false);
    setStatus("AI is thinking...");

    const winner = getWinner(newBoard);
    if (winner) {
        setGameOver(true);
        setStatus(winner === "O" ? "AI wins! (O)" : "You win!");
    } else if (isBoardFull(newBoard)) {
        setGameOver(true);
        setStatus("It's a draw!");
    }
  };

  const restartGame = () => {
    setBoard(Array(3).fill(null).map(() => Array(3).fill("")));
    setGameOver(false);
    setPlayerTurn(false);
    setStatus("AI is thinking...");
  };

  const content = (
    <div>
      <p>
        Will AI take over coding? This is a question many developers are asking today. To explore the power of algorithms and "vibe coding," I built an unbeatable Tic-Tac-Toe game in less than 40 minutes.
      </p>

      <div style={{
          background: 'rgba(30, 255, 90, 0.1)',
          padding: '2rem',
          borderRadius: '20px',
          border: '1.5px solid rgba(30, 255, 90, 0.35)',
          textAlign: 'center',
          margin: '2rem 0',
          color: '#39ff14'
      }}>
        <h2 style={{ color: '#39ff14', textShadow: '0 0 10px #39ff14' }}>Life's Unfair Game</h2>
        <p style={{ fontSize: '1.2rem', marginBottom: '1.5rem' }}>{status}</p>
        
        <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 80px)',
            gap: '15px',
            justifyContent: 'center',
            marginBottom: '1.5rem'
        }}>
          {board.map((row, rIdx) => 
            row.map((cell, cIdx) => (
                <div 
                    key={`${rIdx}-${cIdx}`}
                    onClick={() => handleCellClick(rIdx, cIdx)}
                    style={{
                        width: '80px',
                        height: '80px',
                        background: 'rgba(255, 255, 255, 0.1)',
                        borderRadius: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '2rem',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        transition: '0.2s',
                        border: '1px solid rgba(255,255,255,0.2)'
                    }}
                >
                    {cell}
                </div>
            ))
          )}
        </div>
        
        <button 
            onClick={restartGame}
            style={{
                padding: '0.7rem 2rem',
                borderRadius: '12px',
                background: 'rgba(30, 255, 90, 0.2)',
                border: '1.5px solid #39ff14',
                color: '#39ff14',
                fontWeight: 'bold',
                cursor: 'pointer'
            }}
        >
            Restart Game
        </button>
      </div>

      <h2 className="purple">The Algorithm Behind the "Vibe"</h2>
      <p>
        The game uses the <strong>Minimax algorithm</strong> with alpha-beta pruning. It's a recursive algorithm used for decision-making in game theory and AI. It provides an optimal move for the player, assuming that the opponent is also playing optimally.
      </p>
      
      <h2 className="purple">Why I Built This</h2>
      <p>
        This project was a quick exercise in "vibe coding"—using AI tools to rapidly prototype a functional and polished application. It serves as a reminder that while AI handles the heavy lifting of logic, the developer's role is to guide the "vibe" and ensure the user experience is seamless.
      </p>
    </div>
  );

  return (
    <BlogPost
      title="Will AI take over coding? (Life's Unfair Game)"
      subtitle="An unbeatable Tic-Tac-Toe game built with Minimax AI in under 40 minutes."
      author="Ron-tino"
      date="July 23, 2025"
      content={content}
    />
  );
}

export default AiCodingGame;
