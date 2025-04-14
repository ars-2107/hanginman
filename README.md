# Hangin' Man

A fast-paced word-guessing game where you race against the clock! Guess as many words as you can before time runs out—but watch out, wrong guesses add to your hangman. Skip tough words (for a small time penalty) and try to beat your high score!

<p align="center">
  <img src="https://i.imgur.com/WpFh7oG.png" alt="Demo" width="738">
</p>

## Features

- **Time-Based Scoring**: Score points based on how quickly you guess words, with bonus points for longer words and maintaining streaks.

- **Helpful Hints**: Get assistance with word definitions and similar words to help you guess correctly.

- **Dark/Light Theme**: Switch between dark and light themes for comfortable gameplay in any environment.

- **High Score Tracking**: Your best scores and word counts are saved locally, so you can track your progress.

- **Responsive Design**: Play seamlessly on any device with a fully responsive interface.

## Built With

- **[React](https://reactjs.org/)**
- **[TypeScript](https://www.typescriptlang.org/)**
- **[Tailwind CSS](https://tailwindcss.com/)**
- **[Vite](https://vitejs.dev/)**

## Getting Started

### Prerequisites

**Node.js and npm:** Install [Node.js](https://nodejs.org/) on your machine. npm (Node Package Manager) comes bundled with Node.js.

### Usage

- Clone the Repository:

   ```sh
   git clone https://github.com/yourusername/hangman.git
   ```

- Navigate to the Project Directory:

   ```sh
   cd hangman
   ```

- Install Dependencies:

   ```sh
   npm install
   ```

- Run the Development Server:

   ```sh
   npm run dev
   ```
  Open [http://localhost:8080](http://localhost:8080) to view it in the browser.

## Game Rules

1. You have 6 wrong guesses before the game ends
2. Each word has a time limit of 5 minutes
3. Score points based on:
   - Word length
   - Time taken to guess
   - Current streak
4. Skip words with a 5-second time penalty
5. Complete words to earn time rewards