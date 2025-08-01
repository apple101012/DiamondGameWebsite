import React, { useState, useRef, useEffect } from "react";
import "./App.css";

const MULTIPLIERS = [
  1.23, 1.53, 1.92, 2.4, 2.99, 3.7, 4.68, 5.85, 7.31, 9.14, 11.42, 14.28,
];

const NUM_ROWS = MULTIPLIERS.length;
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
  const [currentRow, setCurrentRow] = useState(NUM_ROWS - 1);

  const rowRefs = useRef([]);

  // ✅ Initialize refs ONCE for all rows
  if (rowRefs.current.length !== NUM_ROWS) {
    rowRefs.current = Array(NUM_ROWS)
      .fill()
      .map(() => React.createRef());
  }

  // ✅ Auto scroll to current row
  // ⬇️ REPLACE your existing useEffect with this one
  useEffect(() => {
    if (!gameStarted || gameOver) return;

    const rowRefObj = rowRefs.current[currentRow];
    const rowElem = rowRefObj && rowRefObj.current;

    if (rowElem) {
      rowElem.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [currentRow, gameStarted, gameOver]);

  const startGame = () => {
    if (gameStarted || bet <= 0 || bet > balance) return;

    setBombs(generateBombs());
    setRevealed([]);
    setGameStarted(true);
    setGameOver(false);
    setMultiplier(1.0);
    setBalance((prev) => parseFloat((prev - bet).toFixed(2)));
    setMessage(`Pick a diamond on row ${NUM_ROWS}`);
    setCurrentRow(NUM_ROWS - 1);
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
      MULTIPLIERS[NUM_ROWS - currentRow - 1] ||
      MULTIPLIERS[MULTIPLIERS.length - 1];
    setMultiplier(newMultiplier);

    if (currentRow === 0) {
      const winnings = parseFloat((bet * newMultiplier).toFixed(2));
      setBalance((prev) => parseFloat((prev + winnings).toFixed(2)));
      setGameOver(true);
      setGameStarted(false);
      setMessage(
        `🎉 You reached the top! x${newMultiplier} — Won $${winnings}`
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

    for (let row = NUM_ROWS - 1; row >= 0; row--) {
      const rowElements = [];

      for (let col = 0; col < NUM_COLS; col++) {
        const key = `${row}-${col}`;
        const isRevealed = revealed.includes(key);
        const isBomb = bombs.includes(key);
        const isCurrent = row === currentRow;

        let content = "";
        if (gameOver && isBomb) content = "💣";
        else if (isRevealed) content = "💎";

        const cellClass = `cell ${isRevealed ? "revealed shine" : ""} ${
          gameOver && isBomb ? "revealed" : ""
        } ${isCurrent || isRevealed || (gameOver && isBomb) ? "" : "dimmed"}`;

        rowElements.push(
          <div
            key={key}
            onClick={() => handleClick(row, col)}
            className={cellClass}
          >
            {content}
          </div>
        );
      }

      grid.push(
        <div key={row} ref={rowRefs.current[row]} className="row snap-row">
          {rowElements}
        </div>
      );
    }

    return grid;
  };

  return (
    <div className="container">
      <h1>💎 Diamond Bomb</h1>
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

      <div className="grid scrollable">{renderGrid()}</div>

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
