import { useEffect, useState } from "react";
import { getHighScores } from "@/utils/cookieUtils";
import { Button } from "./ui/button";
import { Settings, Trophy } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSoundEffects } from "@/hooks/useSoundEffects";

interface PlayModalProps {
  onStart: () => void;
}

const PlayModal = ({ onStart }: PlayModalProps) => {
  const [highScores, setHighScores] = useState({ score: 0, wordCount: 0 });
  const navigate = useNavigate();
  const { playClick } = useSoundEffects();

  useEffect(() => {
    setHighScores(getHighScores());
  }, []);

  const handleStart = () => {
    playClick();
    onStart();
  };

  const handleSettings = () => {
    playClick();
    navigate('/settings');
  };

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

        <div className="flex gap-2">
          <Button
            onClick={handleStart} 
            className="flex-1 bg-hangman-primary hover:bg-hangman-primary/90 dark:text-white"
          >
            Play
          </Button>
          <Button
            onClick={handleSettings}
            className="p-2 w-10 h-10 bg-hangman-primary hover:bg-hangman-primary/90 dark:text-white"
          >
            <Settings className="w-5 h-5" />
          </Button>
          <Button
            onClick={() => { playClick(); navigate('/leaderboard') }}
            className="p-2 w-10 h-10 bg-hangman-primary hover:bg-hangman-primary/90 dark:text-white"
          >
            <Trophy size={20} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PlayModal;