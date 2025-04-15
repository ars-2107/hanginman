import { useState, useEffect } from "react";
import { ArrowLeft, Music, Volume2, Save } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMusicPlayer } from "@/hooks/useMusicPlayer";
import { useSoundEffects } from "@/hooks/useSoundEffects";

const Settings = () => {
  const navigate = useNavigate();
  const [musicVolume, setMusicVolume] = useState(50);
  const [soundVolume, setSoundVolume] = useState(75);
  const [difficulty, setDifficulty] = useState("medium");
  const [saveStatus, setSaveStatus] = useState("");
  const { musicOptions, selectedMusic, playMusic, updateVolume } = useMusicPlayer();
  const { playClick } = useSoundEffects();

  useEffect(() => {
    const savedMusicVolume = localStorage.getItem("hangmanMusicVolume");
    const savedSoundVolume = localStorage.getItem("hangmanSoundVolume");
    const savedDifficulty = localStorage.getItem("hangmanDifficulty");

    if (savedMusicVolume) setMusicVolume(parseInt(savedMusicVolume));
    if (savedSoundVolume) setSoundVolume(parseInt(savedSoundVolume));
    if (savedDifficulty) setDifficulty(savedDifficulty);
  }, []);

  const saveSettings = () => {
    playClick();

    localStorage.setItem("hangmanMusicVolume", musicVolume.toString());
    localStorage.setItem("hangmanSoundVolume", soundVolume.toString());
    localStorage.setItem("hangmanDifficulty", difficulty);
  
    toast({
      title: "Settings Saved",
      description: "Your preferences have been updated successfully!",
      duration: 3000,
    });
  };

  const handleMusicVolumeChange = (value: number) => {
    setMusicVolume(value);
    updateVolume(value);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black p-4">
      <div className="max-w-md mx-auto">
        <div className="flex items-center gap-2 mb-6">
          <button
            onClick={() => { playClick(); navigate(-1);}}
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors"
            aria-label="End Game"
          >
            <ArrowLeft size={20} className="text-hangman-primary dark:text-hangman-secondary" />
          </button>
          
          <h1 className="text-2xl ml-2 font-semibold">Settings</h1>
        </div>
        
        <div className="space-y-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-xl">
            <h2 className="text-xl font-semibold mb-5 mt-2 text-center">Game Settings</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Background Music
                </label>
                <Select value={selectedMusic} onValueChange={playMusic}>
                  <SelectTrigger className="w-full bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-hangman-primary focus:border-transparent">
                    <SelectValue placeholder="Select music" />
                  </SelectTrigger>
                  <SelectContent className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600">
                    {musicOptions.map((music) => (
                      <SelectItem 
                        key={music.id} 
                        value={music.id}
                        className="focus:bg-hangman-primary/10 focus:text-hangman-primary"
                      >
                        {music.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Music className="w-5 h-5" />
                  <span className="font-medium">Music Volume</span>
                  <span className="ml-auto">{musicVolume}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={musicVolume}
                  onChange={(e) => handleMusicVolumeChange(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-hangman-primary [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-hangman-primary [&::-moz-range-thumb]:cursor-pointer"
                />
              </div>

              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Volume2 className="w-5 h-5" />
                  <span className="font-medium">Sound Effects</span>
                  <span className="ml-auto">{soundVolume}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={soundVolume}
                  onChange={(e) => setSoundVolume(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-hangman-primary [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-hangman-primary [&::-moz-range-thumb]:cursor-pointer"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Difficulty
                </label>
                <Select value={difficulty} onValueChange={setDifficulty}>
                  <SelectTrigger className="w-full bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-hangman-primary focus:border-transparent">
                    <SelectValue placeholder="Select difficulty" />
                  </SelectTrigger>
                  <SelectContent className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600">
                    <SelectItem value="easy" className="focus:bg-hangman-primary/10 focus:text-hangman-primary">Easy</SelectItem>
                    <SelectItem value="medium" className="focus:bg-hangman-primary/10 focus:text-hangman-primary">Medium</SelectItem>
                    <SelectItem value="hard" className="focus:bg-hangman-primary/10 focus:text-hangman-primary">Hard</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="pt-4">
                <button 
                  onClick={saveSettings}
                  className="w-full flex items-center justify-center gap-2 bg-hangman-primary hover:bg-hangman-primary/90 text-white py-2 px-4 rounded-md transition-colors"
                >
                  <span>Save</span>
                </button>
                
                {saveStatus && (
                  <p className="text-green-500 dark:text-green-400 text-center mt-2 text-sm">
                    {saveStatus}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;