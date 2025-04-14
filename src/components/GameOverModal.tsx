import { useEffect, useState } from "react";
import { getHighScores } from "@/utils/cookieUtils";
import { Button } from "@/components/ui/button";

type GameOverModalProps = {
  isVisible: boolean;
  score: number;
  wordCount: number;
  word: string;
  onRestart: () => void;
};

const GameOverModal = ({
  isVisible,
  score,
  wordCount,
  word,
  onRestart,
}: GameOverModalProps) => {
  const [highScores, setHighScores] = useState({ score: 0, wordCount: 0 });
  const [isNewHighScore, setIsNewHighScore] = useState(false);
  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    setHighScores(getHighScores());
    setIsNewHighScore(score > highScores.score);
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isVisible, score, highScores.score]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-70 animate-fade-in">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-[90%] max-w-sm shadow-xl">
        <h2 className="text-2xl font-bold mb-4 text-center">Game Over!</h2>
        <h3 className="text-lg font-bold mb-4 text-center">The word was: <span className="text-hangman-primary">{word}</span></h3>

        <div className="space-y-4 mb-6">
          <div className="flex justify-between items-center">
            <span>Final Score:</span>
            <span className="font-bold text-xl text-hangman-primary">{score}</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span>Words Completed:</span>
            <span className="font-bold">{wordCount}</span>
          </div>
          
          <div className="border-t border-gray-200 dark:border-gray-700 my-4"></div>

          {isNewHighScore && (
            <div className="bg-hangman-primary text-white p-3 rounded-md mb-4 text-center font-bold">
              🌟 New High Score!
            </div>
          )}
          
          <div className="flex justify-between items-center">
            <span>Highest Score:</span>
            <span className="font-bold">{Math.max(highScores.score, score)}</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span>Most Words Guessed:</span>
            <span className="font-bold">{Math.max(highScores.wordCount, wordCount)}</span>
          </div>
        </div>
        
        <Button 
          onClick={onRestart} 
          className="w-full bg-hangman-primary hover:bg-hangman-primary/90"
        >
          Play Again
        </Button>
      </div>
    </div>
  );
};

export default GameOverModal;
