import { useEffect, useState } from "react";

interface WordDisplayProps {
  word: string;
  guessedLetters: string[];
  hintLetters: string[];
}

const WordDisplay = ({ word, guessedLetters, hintLetters }: WordDisplayProps) => {
  const [displayLetters, setDisplayLetters] = useState<{ letter: string; isRevealed: boolean }[]>([]);

  useEffect(() => {
    // Initialize the display letters from the current word
    setDisplayLetters(
      word?.split("").map((letter) => ({
        letter: letter,
        isRevealed: guessedLetters.includes(letter)
      }))
    );
  }, [word, guessedLetters]);

  return (
    <div className="flex justify-center items-center gap-2 p-4">
      {word.split("").map((letter, index) => (
        <div
          key={index}
          className={`letter-box w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center text-xl sm:text-2xl font-bold rounded border
          ${guessedLetters.includes(letter) ? "letter-box-filled animate-scale-in" : "letter-box-empty"}
          `}>
          {guessedLetters.includes(letter) ? letter : ""}
        </div>
      ))}
    </div>
  );
};

export default WordDisplay;