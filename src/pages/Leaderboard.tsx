import { useSoundEffects } from '@/hooks/useSoundEffects';
import { ArrowLeft, Trophy, Award, Crown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const MOCK_LEADERBOARD = [
  { rank: 1, name: 'ARS', difficulty: 'Hard', score: 2577, words: 15 },
  { rank: 2, name: 'DEEP', difficulty: 'Hard', score: 2112, words: 13 },
  { rank: 3, name: 'One4', difficulty: 'Hard', score: 2008, words: 12 },
  { rank: 4, name: 'RYN', difficulty: 'Easy', score: 1900, words: 12 },
  { rank: 5, name: 'TOM', difficulty: 'Medium', score: 1700, words: 11 },
  { rank: 6, name: 'KAR', difficulty: 'Hard', score: 1500, words: 10 },
  { rank: 7, name: 'RAH', difficulty: 'Easy', score: 1300, words: 9 },
  { rank: 8, name: 'JOK', difficulty: 'Medium', score: 1100, words: 8 },
  { rank: 9, name: 'SHA', difficulty: 'Hard', score: 900, words: 7 },
  { rank: 10, name: 'XAV', difficulty: 'Easy', score: 700, words: 6 },
];

const Leaderboard = () => {
  const navigate = useNavigate();
  const { playClick } = useSoundEffects();

  const getSortedLeaderboard = (data) => {
    const difficultyMultiplier = {
      Easy: 1,
      Medium: 1.5,
      Hard: 2,
    };

    console.log([...data]
      .map((player) => ({
        ...player,
        impactScore: player.score * (difficultyMultiplier[player.difficulty] || 1),
      }))
      .sort((a, b) => b.impactScore - a.impactScore)
      .map((player, index) => ({
        ...player,
        rank: index + 1,
      })));
  
    return [...data]
      .map((player) => ({
        ...player,
        impactScore: player.score * (difficultyMultiplier[player.difficulty] || 1),
      }))
      .sort((a, b) => b.impactScore - a.impactScore)
      .map((player, index) => ({
        ...player,
        rank: index + 1, // Reassign rank after sorting
      }));
  };  

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-black dark:to-gray-900 p-4">
      <div className="max-w-md mx-auto">
        
      <div className="flex items-center gap-2 mb-6">
          <button
            onClick={() => { playClick(); navigate(-1);}}
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors"
            aria-label="End Game"
          >
            <ArrowLeft size={20} className="text-hangman-primary dark:text-hangman-secondary" />
          </button>
          
          <h1 className="text-2xl ml-2 font-semibold">Leaderboard</h1>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700">
          {/* Header */}
          <div className="grid grid-cols-4 gap-2 p-4 bg-gradient-to-r from-hangman-primary/10 to-purple-500/10 dark:from-hangman-secondary/20 dark:to-purple-600/20 text-gray-700 dark:text-gray-200 font-semibold uppercase text-xs tracking-wider">
            <div className="flex justify-center">Rank</div>
            <div className="flex justify-start pl-2">Player</div>
            <div className="flex justify-center">Score</div>
            <div className="flex justify-center">Words</div>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-gray-100 dark:divide-gray-700">
            {getSortedLeaderboard(MOCK_LEADERBOARD).map((player) => (
              <div
                key={player.rank}
                className={`grid grid-cols-4 gap-2 p-4 items-center text-gray-700 dark:text-gray-300 ${
                  player.rank <= 3 ? 'bg-gradient-to-r from-gray-50 to-gray-50 dark:from-gray-800 dark:to-gray-800' : ''
                }`}
              >
                {/* Rank with special styling for top 3 */}
                <div className="flex justify-center">
                  {player.rank === 1 && (
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-yellow-100 dark:bg-yellow-900/30">
                      <Crown size={16} className="text-yellow-500" />
                    </div>
                  )}
                  {player.rank === 2 && (
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700/50">
                      <Award size={16} className="text-gray-400 dark:text-gray-300" />
                    </div>
                  )}
                  {player.rank === 3 && (
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-900/30">
                      <Award size={16} className="text-amber-600 dark:text-amber-500" />
                    </div>
                  )}
                  {player.rank > 3 && (
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700">
                      <span className="text-sm font-medium">{player.rank}</span>
                    </div>
                  )}
                </div>
                
                {/* Player name with visual emphasis for top players */}
                <div className={`font-medium pl-2 ${
                  player.rank === 1 ? 'text-yellow-600 dark:text-yellow-400 font-bold' :
                  player.rank === 2 ? 'text-gray-400 dark:text-gray-300 font-bold' :
                  player.rank === 3 ? 'text-amber-700 dark:text-amber-500 font-bold' : ''
                }`}>
                  {player.name}
                </div>
                
                {/* Score with visual treatment */}
                <div className="flex justify-center">
                  <span className="font-mono font-semibold text-hangman-primary dark:text-hangman-secondary">{player.score}</span>
                </div>
                
                {/* Words count */}
                <div className="flex justify-center">
                  <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-md text-xs font-medium">{player.words}</span>
                </div>
                
                {/* Streak with visual indicator */}
                <div className="flex justify-center">
                  <div className="flex items-center gap-1">
                    <span className="font-medium">{player.streak}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;