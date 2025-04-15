import { useRef, useEffect } from 'react';

export const useSoundEffects = () => {
  const clickSound = useRef<HTMLAudioElement | null>(null);
  const rightGuessSound = useRef<HTMLAudioElement | null>(null);
  const wrongGuessSound = useRef<HTMLAudioElement | null>(null);
  const loseSound = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    clickSound.current = new Audio('/audio/sound/click.wav');
    rightGuessSound.current = new Audio('/audio/sound/right-guess.wav');
    wrongGuessSound.current = new Audio('/audio/sound/wrong-guess.wav');
    loseSound.current = new Audio('/audio/sound/lose.wav');

    // Set initial volume from localStorage
    const savedVolume = parseInt(localStorage.getItem('hangmanSoundVolume') || '75');
    const volume = savedVolume / 100;

    clickSound.current.volume = volume;
    rightGuessSound.current.volume = volume * 0.2;
    wrongGuessSound.current.volume = volume * 0.4;
    loseSound.current.volume = volume * 0.3;

    return () => {
      // Cleanup
      clickSound.current = null;
      rightGuessSound.current = null;
      wrongGuessSound.current = null;
      loseSound.current = null;
    };
  }, []);

  const playClick = () => {
    if (clickSound.current) {
      clickSound.current.currentTime = 0;
      clickSound.current.play().catch(console.error);
    }
  };

  const playRightGuess = () => {
    if (rightGuessSound.current) {
      rightGuessSound.current.currentTime = 0;
      rightGuessSound.current.play().catch(console.error);
    }
  };

  const playWrongGuess = () => {
    if (wrongGuessSound.current) {
      wrongGuessSound.current.currentTime = 0;
      wrongGuessSound.current.play().catch(console.error);
    }
  };

  const playLose = () => {
    if (loseSound.current) {
      loseSound.current.currentTime = 0;
      loseSound.current.play().catch(console.error);
    }
  };

  const updateVolume = (volume: number) => {
    const normalizedVolume = volume / 100;
    if (clickSound.current) clickSound.current.volume = normalizedVolume;
    if (rightGuessSound.current) rightGuessSound.current.volume = normalizedVolume;
    if (wrongGuessSound.current) wrongGuessSound.current.volume = normalizedVolume;
    if (loseSound.current) loseSound.current.volume = normalizedVolume;
  };

  return {
    playClick,
    playRightGuess,
    playWrongGuess,
    playLose,
    updateVolume,
  };
}; 