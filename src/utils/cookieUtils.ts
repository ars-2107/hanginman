export const getHighScores = () => {
  const highScore = localStorage.getItem('hangman_high_score');
  const highWordCount = localStorage.getItem('hangman_high_word_count');
  
  return {
    score: highScore ? parseInt(highScore) : 0,
    wordCount: highWordCount ? parseInt(highWordCount) : 0
  };
};

export const setHighScores = (score: number, wordCount: number) => {
  const currentHighScores = getHighScores();
  
  if (score > currentHighScores.score) {
    localStorage.setItem('hangman_high_score', score.toString());
  }
  
  if (wordCount > currentHighScores.wordCount) {
    localStorage.setItem('hangman_high_word_count', wordCount.toString());
  }
};