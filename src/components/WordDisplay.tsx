
import { useEffect, useState } from "react";

type WordDisplayProps = {
  word: string;
  guessedLetters: string[];
};

const WordDisplay = ({ word, guessedLetters }: WordDisplayProps) => {
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
    <div className="flex justify-center items-center my-4 flex-wrap">
      {displayLetters?.map((item, index) => (
        <div
          key={index}
          className={`letter-box ${
            item.isRevealed ? "letter-box-filled animate-scale-in" : "letter-box-empty"
          }`}
        >
          {item.isRevealed ? item.letter : ""}
        </div>
      ))}
    </div>
  );
};

export default WordDisplay;
