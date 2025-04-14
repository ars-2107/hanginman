
import { Flame, Timer } from "lucide-react";

type ScoreTimerProps = {
  score: number;
  time: number;
  maxTime: number;
};

const ScoreTimer = ({ score, time, maxTime }: ScoreTimerProps) => {
  // Format score to always show 3 digits (e.g., 1 -> 001)
  const formattedScore = score.toString().padStart(1, "0");
  
  // Format time to show as MM:SS
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  const formattedTime = `${minutes.toString().padStart(1, "0")}:${seconds.toString().padStart(2, "0")}`;

  // Calculate time percentage for progress bar
  const timePercentage = (time / maxTime) * 100;
  
  // Determine color based on remaining time
  const getTimeColor = () => {
    if (time <= 10) return "bg-hangman-danger";
    if (time <= 20) return "bg-orange-500";
    return "bg-hangman-primary";
  };

  return (
    <div className="w-full max-w-md mx-auto px-4">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center">
          <Flame size={20} className="text-hangman-danger mr-1" />
          <span className="font-mono font-bold">{formattedScore}</span>
        </div>
        <div className="flex items-center">
          <Timer size={20} className="text-hangman-danger mr-1" />
          <div className="font-mono font-bold">{formattedTime}</div>
        </div>
      </div>
      
      {/* Time progress bar */}
      <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <div
          className={`h-full ${getTimeColor()} transition-all duration-1000 ease-linear`}
          style={{ width: `${timePercentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ScoreTimer;
