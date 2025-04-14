
import { useEffect } from "react";

type KeyboardProps = {
  onKeyPress: (letter: string) => void;
  correctLetters: string[];
  wrongLetters: string[];
  disabled: boolean;
};

const Keyboard = ({ onKeyPress, correctLetters, wrongLetters, disabled }: KeyboardProps) => {
  const rows = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
    ["Z", "X", "C", "V", "B", "N", "M"],
  ];

  // Physical keyboard support
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (disabled) return;
      
      const key = event.key.toUpperCase();
      if (/^[A-Z]$/.test(key)) {
        onKeyPress(key);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onKeyPress, disabled]);

  const getKeyClass = (letter: string) => {
    if (correctLetters.includes(letter)) {
      return "key-correct";
    } else if (wrongLetters.includes(letter)) {
      return "key-wrong";
    } else {
      return "key-default";
    }
  };

  return (
    <div className="w-full max-w-md mx-auto mt-auto p-2">
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} className="flex justify-center my-1">
          {rowIndex === 1 && <div className="w-2"></div>}
          {row.map((letter) => (
            <button
              key={letter}
              className={`keyboard-key ${getKeyClass(letter)}`}
              onClick={() => onKeyPress(letter)}
              disabled={disabled || correctLetters.includes(letter) || wrongLetters.includes(letter)}
            >
              {letter}
            </button>
          ))}
          {rowIndex === 1 && <div className="w-2"></div>}
        </div>
      ))}
    </div>
  );
};

export default Keyboard;
