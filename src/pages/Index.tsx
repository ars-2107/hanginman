import { useEffect } from "react";
import { ThemeProvider } from "@/components/ThemeProvider";
import HangmanGame from "@/components/HangmanGame";
import { usePreloadAudio } from "@/hooks/usePreloadAudio";

const Index = () => {
  const preloadAudio = usePreloadAudio();
  useEffect(() => {
    preloadAudio([
      "/audio/sound/click.wav",
      "/audio/sound/right-guess.wav",
      "/audio/sound/wrong-guess.wav",
      "/audio/sound/lose.wav",
      "/audio/one_to_three.mp3",
      "/audio/mario.mp3",
      "/audio/night.mp3",
    ]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ThemeProvider defaultTheme="light">
      <div className="min-h-screen flex flex-col bg-white dark:bg-black text-black dark:text-white">
        <div className="w-full h-screen max-w-lg mx-auto shadow-xl rounded-lg overflow-hidden">
          <main className="flex-1 flex flex-col overflow-hidden">
            <HangmanGame />
          </main>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Index;