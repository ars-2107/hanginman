import { useRef, useEffect, useState } from 'react';

const audioCache = new Map<string, HTMLAudioElement>();

export const useSoundEffects = () => {
  const clickSound = useRef<HTMLAudioElement | null>(null);
  const rightGuessSound = useRef<HTMLAudioElement | null>(null);
  const wrongGuessSound = useRef<HTMLAudioElement | null>(null);
  const loseSound = useRef<HTMLAudioElement | null>(null);
  const [isEnabled, setIsEnabled] = useState(() => {
    const saved = localStorage.getItem('hangmanSoundEnabled');
    return saved === null ? true : saved === 'true';
  });

  useEffect(() => {
    if (!audioCache.has('click')) {
      audioCache.set('click', new Audio('/audio/sound/click.wav'));
    }
    if (!audioCache.has('right-guess')) {
      audioCache.set('right-guess', new Audio('/audio/sound/right-guess.wav'));
    }
    if (!audioCache.has('wrong-guess')) {
      audioCache.set('wrong-guess', new Audio('/audio/sound/wrong-guess.wav'));
    }
    if (!audioCache.has('lose')) {
      audioCache.set('lose', new Audio('/audio/sound/lose.wav'));
    }

    clickSound.current = audioCache.get('click')!;
    rightGuessSound.current = audioCache.get('right-guess')!;
    wrongGuessSound.current = audioCache.get('wrong-guess')!;
    loseSound.current = audioCache.get('lose')!;

    const savedVolume = parseInt(localStorage.getItem('hangmanSoundVolume') || '75');
    const volume = savedVolume / 100;

    clickSound.current.volume = volume;
    rightGuessSound.current.volume = volume * 0.2;
    wrongGuessSound.current.volume = volume * 0.4;
    loseSound.current.volume = volume * 0.3;

    return () => {
      clickSound.current = null;
      rightGuessSound.current = null;
      wrongGuessSound.current = null;
      loseSound.current = null;
    };
  }, []);

  const playClick = () => {
    if (clickSound.current && isEnabled) {
      clickSound.current.currentTime = 0;
      clickSound.current.play().catch(console.error);
    }
  };

  const playRightGuess = () => {
    if (rightGuessSound.current && isEnabled) {
      rightGuessSound.current.currentTime = 0;
      rightGuessSound.current.play().catch(console.error);
    }
  };

  const playWrongGuess = () => {
    if (wrongGuessSound.current && isEnabled) {
      wrongGuessSound.current.currentTime = 0;
      wrongGuessSound.current.play().catch(console.error);
    }
  };

  const playLose = () => {
    if (loseSound.current && isEnabled) {
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

  const toggleSoundEffects = () => {
    const newState = !isEnabled;
    setIsEnabled(newState);
    localStorage.setItem('hangmanSoundEnabled', newState.toString());
  };

  return {
    playClick,
    playRightGuess,
    playWrongGuess,
    playLose,
    updateVolume,
    isEnabled,
    toggleSoundEffects,
  };
}; 