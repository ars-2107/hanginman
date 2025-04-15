import { useState, useEffect, useRef } from 'react';

const MUSIC_OPTIONS = [
  { id: 'none', label: 'No Music', volumeScale: 0 },
  { id: 'mario', label: 'Mario', volumeScale: 0.2 },
  { id: 'a_night_alone', label: 'A Night Alone', volumeScale: 0.3 },
  { id: 'one_to_three', label: 'One to three', volumeScale: 0.1 },
];

const VOLUME_SCALING_FACTOR = 0.1;

export const useMusicPlayer = () => {
  const [selectedMusic, setSelectedMusic] = useState('none');
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Load saved music preference
    const savedMusic = localStorage.getItem('hangmanMusic');
    if (savedMusic) {
      setSelectedMusic(savedMusic);
    }

    // Initialize audio element
    audioRef.current = new Audio();
    audioRef.current.loop = true;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const playMusic = (musicId: string) => {
    if (!audioRef.current) return;

    // Stop current music
    audioRef.current.pause();
    audioRef.current.currentTime = 0;

    if (musicId === 'none') {
      setSelectedMusic('none');
      localStorage.setItem('hangmanMusic', 'none');
      return;
    }

    // Load and play new music
    audioRef.current.src = `/audio/music/${musicId}.mp3`;
    const savedVolume = parseInt(localStorage.getItem('hangmanMusicVolume') || '0');
    const musicOption = MUSIC_OPTIONS.find(option => option.id === musicId);
    const volumeScale = musicOption?.volumeScale || 0.1;
    audioRef.current.volume = (savedVolume / 100) * volumeScale;
    audioRef.current.play()
      .catch(error => console.error('Error playing music:', error));

    setSelectedMusic(musicId);
    localStorage.setItem('hangmanMusic', musicId);
  };

  const updateVolume = (volume: number) => {
    if (audioRef.current) {
      const musicOption = MUSIC_OPTIONS.find(option => option.id === selectedMusic);
      const volumeScale = musicOption?.volumeScale || 0.1;
      audioRef.current.volume = (volume / 100) * volumeScale;
    }
  };

  return {
    musicOptions: MUSIC_OPTIONS,
    selectedMusic,
    playMusic,
    updateVolume,
  };
}; 