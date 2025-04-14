import { useEffect, useState } from "react";
import { getHighScores } from "@/utils/cookieUtils";
import { Button } from "./ui/button";

interface PlayModalProps {
  onStart: () => void;
}

const PlayModal = ({ onStart }: PlayModalProps) => {
  const [highScores, setHighScores] = useState({ score: 0, wordCount: 0 });

  useEffect(() => {
    setHighScores(getHighScores());
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-70 animate-fade-in">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-[90%] max-w-sm shadow-xl">
        <h2 className="text-2xl font-bold mb-4 text-center">Welcome!</h2>

        <div className="mb-6 p-3 bg-gray-100 dark:bg-gray-700 rounded-md">
          <h3 className="text-lg font-mono font-semibold mb-2 text-center">HOW TO PLAY</h3>
          <ul className="font-mono text-sm space-y-2">
            <li className="flex">
              <span className="mr-2">-</span>
              <span>Guess as many words as possible in 5 minutes</span>
            </li>
            <li className="flex">
              <span className="mr-2">-</span>
              <span>Each incorrect letter adds to the hangman, which persists across words</span>
            </li>
            <li className="flex">
              <span className="mr-2">-</span>
              <span>Use the refresh button to skip difficult words (costs 5 seconds)</span>
            </li>
            <li className="flex">
              <span className="mr-2">-</span>
              <span>Score is based on word length and time taken to guess</span>
            </li>
            <li className="flex">
              <span className="mr-2">-</span>
              <span>Game ends when time runs out or hangman is complete</span>
            </li>
          </ul>
        </div>
        
        <div className="space-y-4 mb-6">
          <div className="flex justify-between items-center">
            <span>Highest Score:</span>
            <span className="font-bold">{highScores.score}</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span>Most Words Guessed:</span>
            <span className="font-bold">{highScores.wordCount}</span>
          </div>
        </div>

        <Button
          onClick={onStart} 
          className="w-full bg-hangman-primary hover:bg-hangman-primary/90"
        >
          Play
        </Button>
      </div>
    </div>
  );
};

export default PlayModal;