export function usePreloadAudio() {
  return (urls: string[]) => {
    urls.forEach((url) => {
      const audio = new Audio();
      audio.src = url;
      audio.preload = "auto";
      audio.load();
    });
  };
} 