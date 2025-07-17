# Diamond Bomb Game – Casino-Style Simulation for Gambling Awareness

**Diamond Bomb** is a web-based game that simulates the psychological patterns of risk-based gambling. Inspired by games like “Mine Gems,” players climb through rows of diamonds while avoiding randomly placed bombs. The goal is to safely reach the top row and multiply their virtual balance — but one wrong move resets everything.

This tool is not designed to promote gambling — instead, it is built as a **harm reduction and awareness exercise**. By mimicking the structure of a typical online gambling game, Diamond Bomb encourages users to reflect on loss patterns, risk behaviors, and the illusion of “beatable” odds — all without involving real money.

---

## 🎮 Play Online

You can try the live version here:  
**[https://diamondgamewebsite.onrender.com/](https://diamondgamewebsite.onrender.com/)**

No installation required — just open the link in your browser (desktop or mobile).

---

## Features

- 5 selectable tiles per row (only 1 bomb per row)
- Progressively increasing multipliers:  
  `[1.23, 1.53, 1.92, 2.4, 2.99, 3.7, 4.68, 5.85, 7.31, 9.14, 11.42, 14.28]`
- Player balance that you can adjust manually
- “Start” button disables mid-game to prevent overlap
- Visual feedback: glowing diamonds and detonated bombs

---

## Purpose

Gambling games often use variable rewards and simple win/loss mechanics to reinforce risk-taking behaviors. Diamond Bomb exposes these psychological mechanics in a controlled, safe, and educational format.

It is designed for:
- Simulating **risk escalation** and the **urge to “go one more”**
- Demonstrating **loss streaks** and volatility
- Teaching **probability limits** and **behavior reflection**
- Offering a no-money-required way to engage with the experience

---

## Tech Stack

- **Frontend:** JavaScript, HTML, CSS
- **Build Tool:** Vite
- **Platform:** Render (hosted site), browser-based client

---

## Getting Started (For Developers)

1. Clone the repository
```bash
git clone https://github.com/yourusername/diamond-bomb-game.git
cd diamond-bomb-game
```

2. Install dependencies
```bash
npm install
```

3. Run the local dev server
```bash
npm run dev
```

---

## Example Gameplay

1. Start with a balance (e.g., $100)
2. Click a tile on the first row
3. If no bomb → you move up and multiplier increases
4. Cash out anytime or risk the next row
5. Hitting a bomb resets your bet to $0

---

## Educational Focus

Diamond Bomb is ideal for:
- Mental health counselors educating clients on gambling triggers
- Students studying behavioral psychology
- Developers researching risk-based game design
- Anyone who wants to safely experience the thrill and risk of gambling without monetary loss

---

## License

MIT License — Feel free to use and adapt this game for education, research, or outreach. Please do not rebrand or repurpose it for actual gambling or microtransaction use.

---

## Disclaimer

This project is for **educational and harm-reduction purposes only**. It does **not involve real money** or promote actual gambling. If you or someone you know is struggling with gambling addiction, contact [https://www.ncpgambling.org](https://www.ncpgambling.org) or call 1-800-GAMBLER.
