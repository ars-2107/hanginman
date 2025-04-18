import { useState, useEffect, useCallback } from "react";
import HangmanSVG from "./HangmanSVG";
import WordDisplay from "./WordDisplay";
import HintSection from "./HintSection";
import Keyboard from "./Keyboard";
import ScoreTimer from "./ScoreTimer";
import GameOverModal from "./GameOverModal";
import PlayModal from "./PlayModal";
import Loader from "./Loader";
import { getRandomWord, calculateScore, WordData, getHintLettersCount, getRandomPositions } from "@/utils/wordUtils";
import { setHighScores } from "@/utils/cookieUtils";
import { toast } from "@/components/ui/use-toast";
import Header from "./Header";
import { useMusicPlayer } from "@/hooks/useMusicPlayer";
import { useSoundEffects } from "@/hooks/useSoundEffects";

const MAX_WRONG_GUESSES = 6;
const MAX_TIME = 300; // 5 minutes
const TIME_PENALTY = 5; // 5 seconds penalty for skipping
const TIME_REWARD_FACTOR = 2; // 2 seconds per character in the word

const HangmanGame = () => {
  const { playMusic } = useMusicPlayer();
  const { playClick, playRightGuess, playWrongGuess, playLose } = useSoundEffects();
  const [currentWord, setCurrentWord] = useState<WordData>({ word: '', category: '', hint: '' });
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
  const [wrongLetters, setWrongLetters] = useState<string[]>([]);
  const [wrongGuesses, setWrongGuesses] = useState(0);
  const [score, setScore] = useState(0);
  const [wordCount, setWordCount] = useState(0);
  const [streakCount, setStreakCount] = useState(0);
  const [timeLeft, setTimeLeft] = useState(MAX_TIME);
  const [gameOver, setGameOver] = useState(false);
  const [isCorrectGuess, setIsCorrectGuess] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [wordLoadTime, setWordLoadTime] = useState<number>(0);
  const [showPlayModal, setShowPlayModal] = useState(true);
  const [hintLetters, setHintLetters] = useState<string[]>([]);
  
  // Get distinct correct letters (letters in the word that have been guessed)
  const correctLetters = guessedLetters.filter(letter => 
    currentWord.word.includes(letter)
  );
  
  // Check if all letters in the word have been guessed
  const isWordGuessed = currentWord.word
    ?.split("")
    ?.every(letter => guessedLetters.includes(letter));

  // Check if time is running low (under 10 seconds)
  const isTimeRunningOut = timeLeft <= 10;

  // Auto-play music when game starts
  useEffect(() => {
    if (!showPlayModal) {
      const savedMusic = localStorage.getItem('hangmanMusic') || 'none';
      if (savedMusic !== 'none') {
        playMusic(savedMusic);
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showPlayModal]);

  // Fetch new word
  const fetchNewWord = useCallback(async () => {
    setIsLoading(true);
    try {
      const word = await getRandomWord();
      setCurrentWord(word);
      setGuessedLetters([]);
      setWrongLetters([]);
      setWordLoadTime(Date.now());

      const wordLength = word.word.length;
      const hintCount = getHintLettersCount(wordLength);
      const hintPositions = getRandomPositions(wordLength, hintCount);
      const newHintLetters = hintPositions.map(pos => word.word[pos]);
      setHintLetters(newHintLetters);
      setGuessedLetters(newHintLetters);
    } catch (error) {
      console.error('Error fetching word:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Initialize first word
  useEffect(() => {
    fetchNewWord();
  }, [fetchNewWord]);

  // Reset game state and start a new game
  const startNewGame = useCallback(async () => {
    await fetchNewWord();
    setWrongGuesses(0);
    setScore(0);
    setWordCount(0);
    setStreakCount(0);
    setTimeLeft(MAX_TIME);
    setGameOver(false);
  }, [fetchNewWord]);

  // Handle letter guess
  const handleGuess = useCallback((letter: string) => {
    if (guessedLetters.includes(letter) || gameOver || isLoading) return;

    setGuessedLetters((prev) => [...prev, letter]);

    if (currentWord.word.includes(letter)) {
      setIsCorrectGuess(true);
      playRightGuess();
      setTimeout(() => setIsCorrectGuess(false), 1000);
    } else {
      setWrongLetters((prev) => [...prev, letter]);
      setWrongGuesses((prev) => prev + 1);
      playWrongGuess();
    }
  }, [currentWord.word, guessedLetters, gameOver, isLoading, playRightGuess, playWrongGuess]);

  // Handle refresh/skip
  const handleRefresh = useCallback(async () => {
    playClick();
    setTimeLeft((prev) => Math.max(1, prev - TIME_PENALTY));
    setStreakCount(0);
    await fetchNewWord();
    toast({
      title: "Word Skipped",
      description: `Time penalty: -${TIME_PENALTY} seconds`,
      duration: 3000,
    });
  }, [fetchNewWord, playClick]);

  // Timer countdown
  useEffect(() => {
    if (timeLeft > 0 && !gameOver && !isLoading && !showPlayModal) {
      const timerId = setTimeout(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      
      return () => clearTimeout(timerId);
    } else if (timeLeft === 0 && !gameOver) {
      setGameOver(true);
      playLose();
    }
  }, [timeLeft, gameOver, isLoading, showPlayModal, playLose]);

  // Watch for word completion
  useEffect(() => {
    if (isWordGuessed && !gameOver && !isLoading) {
      const timeTaken = Math.floor((Date.now() - wordLoadTime) / 1000);
      const wordScore = calculateScore(
        currentWord.word.length,
        timeTaken,
        streakCount
      );
      const timeReward = currentWord.word.length * TIME_REWARD_FACTOR;
      setTimeLeft((prev) => Math.min(MAX_TIME, prev + timeReward));
      setScore((prev) => prev + wordScore);
      setWordCount((prev) => prev + 1);
      setStreakCount((prev) => prev + 1);
      
      fetchNewWord();
      
      toast({
        title: "Word Complete!",
        description: `+${wordScore} points | +${timeReward}s | Streak: ${streakCount + 1}`,
        duration: 3000,
      });
    }
  }, [isWordGuessed, gameOver, isLoading, currentWord.word.length, streakCount, fetchNewWord, wordLoadTime]);

  // Check for game over condition
  useEffect(() => {
    if (wrongGuesses >= MAX_WRONG_GUESSES && !gameOver) {
      setGameOver(true);
      playLose();
    }
  }, [wrongGuesses, gameOver, playLose]);

  // Save high scores when game is over
  useEffect(() => {
    if (gameOver) {
      setHighScores(score, wordCount);
    }
  }, [gameOver, score, wordCount]);

  const handleGameOver = useCallback(() => {
    playClick();
    playLose();
    setGameOver(true);
  }, [playClick, playLose]);

  if (isLoading) {
    return (
      <>
        <Header onGameOver={handleGameOver} />
        <Loader />
      </>
    );
  }

  if (showPlayModal) {
    return <PlayModal onStart={() => setShowPlayModal(false)} />;
  }

  return (
    <div className="flex flex-col h-full shadow-md">
      <Header onGameOver={handleGameOver} />
      <ScoreTimer score={score} time={timeLeft} maxTime={MAX_TIME} />
      
      <HangmanSVG
        wrongGuesses={wrongGuesses}
        maxGuesses={MAX_WRONG_GUESSES}
        isCorrectGuess={isCorrectGuess}
        isTimeRunningOut={isTimeRunningOut}
      />
      
      <WordDisplay 
        word={currentWord.word} 
        guessedLetters={guessedLetters} 
        hintLetters={hintLetters}
      />
      
      <HintSection
        category={currentWord.category || ''}
        definition={currentWord.definition || ''}
        similarWords={currentWord.similarWords || ''}
        hint={currentWord.hint}
        onRefresh={handleRefresh}
      />
      
      <Keyboard
        onKeyPress={handleGuess}
        correctLetters={correctLetters}
        wrongLetters={wrongLetters}
        disabled={gameOver || isLoading}
      />
      
      <GameOverModal
        word={currentWord.word}
        isVisible={gameOver}
        score={score}
        wordCount={wordCount}
        onRestart={startNewGame}
      />
    </div>
  );
};

export default HangmanGame;
