import React, { useState } from "react";
import "./App.css";

const MULTIPLIERS = [
  1.23, 1.53, 1.92, 2.4, 2.99, 3.7, 4.68, 5.85, 7.31, 9.14, 11.42, 14.28,
];

const NUM_ROWS = 5;
const NUM_COLS = 5;

const generateBombs = () => {
  const bombPositions = [];
  for (let row = 0; row < NUM_ROWS; row++) {
    const col = Math.floor(Math.random() * NUM_COLS);
    bombPositions.push(`${row}-${col}`);
  }
  return bombPositions;
};

function App() {
  const [bombs, setBombs] = useState([]);
  const [revealed, setRevealed] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [multiplier, setMultiplier] = useState(1.0);
  const [message, setMessage] = useState("Choose your bet and press Start");

  const [balance, setBalance] = useState(100.0);
  const [bet, setBet] = useState(1.0);

  const [currentRow, setCurrentRow] = useState(NUM_ROWS - 1); // start at bottom

  const startGame = () => {
    if (gameStarted || bet <= 0 || bet > balance) return;

    setBombs(generateBombs());
    setRevealed([]);
    setGameStarted(true);
    setGameOver(false);
    setMultiplier(1.0);
    setBalance((prev) => parseFloat((prev - bet).toFixed(2)));
    setMessage(`Pick a diamond in row ${currentRow + 1}`);
    setCurrentRow(NUM_ROWS - 1); // row 4
  };

  const handleClick = (row, col) => {
    if (!gameStarted || gameOver) return;

    const key = `${row}-${col}`;
    if (revealed.includes(key)) return;

    if (row !== currentRow) {
      setMessage(`⛔ Pick a tile in row ${currentRow + 1}`);
      return;
    }

    if (bombs.includes(key)) {
      setGameOver(true);
      setGameStarted(false);
      setMessage("💣 Boom! You hit a bomb.");
      return;
    }

    const newRevealed = [...revealed, key];
    setRevealed(newRevealed);

    const newMultiplier =
      MULTIPLIERS[newRevealed.length - 1] ||
      MULTIPLIERS[MULTIPLIERS.length - 1];
    setMultiplier(newMultiplier);

    if (currentRow === 0) {
      const winnings = parseFloat((bet * newMultiplier).toFixed(2));
      setBalance((prev) => parseFloat((prev + winnings).toFixed(2)));
      setGameOver(true);
      setGameStarted(false);
      setMessage(
        `🎉 You made it to the top! x${newMultiplier} — Won $${winnings}`
      );
    } else {
      setCurrentRow(currentRow - 1);
      setMessage(`💎 Safe! Now pick on row ${currentRow}`);
    }
  };

  const cashOut = () => {
    const winnings = parseFloat((bet * multiplier).toFixed(2));
    setBalance((prev) => parseFloat((prev + winnings).toFixed(2)));
    setGameOver(true);
    setGameStarted(false);
    setMessage(
      `💰 You cashed out with x${multiplier.toFixed(
        2
      )}! You won $${winnings.toFixed(2)}`
    );
  };

  const renderGrid = () => {
    const grid = [];
    for (let row = 0; row < NUM_ROWS; row++) {
      const rowElements = [];
      for (let col = 0; col < NUM_COLS; col++) {
        const key = `${row}-${col}`;
        const isRevealed = revealed.includes(key);
        const isBomb = bombs.includes(key);
        const isClickable =
          row === currentRow && gameStarted && !gameOver && !isRevealed;

        let content = "";
        if (gameOver && isBomb) content = "💣";
        else if (isRevealed) content = "💎";

        let cellClass = "cell";
        if (isRevealed || (gameOver && isBomb)) cellClass += " revealed";
        if (isClickable) cellClass += " clickable";

        // Make revealed rows or current row fully visible
        const rowHasBeenClicked = revealed.some((key) =>
          key.startsWith(`${row}-`)
        );
        const isVisibleRow = row === currentRow || rowHasBeenClicked;
        if (!isVisibleRow && !gameOver) cellClass += " dimmed";

        rowElements.push(
          <div
            key={key}
            onClick={() => isClickable && handleClick(row, col)}
            className={cellClass}
          >
            {content}
          </div>
        );
      }
      // Add rows to the TOP of grid so row 0 renders at top visually
      grid.unshift(
        <div key={row} className="row">
          {rowElements}
        </div>
      );
    }
    return grid;
  };

  return (
    <div className="container">
      <h1>💎 Diamond Bomb Game</h1>
      <p>{message}</p>
      <p className="multiplier">Multiplier: x{multiplier.toFixed(2)}</p>
      <p className="balance">💵 Balance: ${balance.toFixed(2)}</p>

      <div className="controls">
        <label>
          Bet: $
          <input
            type="number"
            value={bet}
            step="0.01"
            min="0"
            max={balance}
            disabled={gameStarted}
            onChange={(e) => setBet(parseFloat(e.target.value))}
          />
        </label>
      </div>

      <div className="grid">{renderGrid()}</div>

      <div className="buttons">
        <button
          onClick={startGame}
          disabled={gameStarted || bet <= 0 || bet > balance}
        >
          START
        </button>
        {gameStarted && !gameOver && (
          <button onClick={cashOut}>CASH OUT</button>
        )}
      </div>
    </div>
  );
}

export default App;
