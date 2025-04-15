import { Moon, Sun, X } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";

interface HeaderProps {
  onGameOver: () => void;
}

const Header = ({ onGameOver }: HeaderProps) => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <header className="flex justify-between items-center w-full p-4">
      <div className="flex items-center sm:ml-6">
        <h1 className="text-xl font-bold">
          <span className="bg-gradient-to-r from-hangman-primary to-hangman-secondary bg-clip-text text-transparent">
            HANGIN'<span className="text-black dark:text-white">MAN</span>
          </span>
        </h1>
      </div>
      
      <div className="flex-grow"></div>
      
      <div className="flex items-center sm:mr-6 gap-2">
        <button
          onClick={onGameOver}
          className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors"
          aria-label="End Game"
        >
          <X size={20} className="text-hangman-primary dark:text-hangman-secondary" />
        </button>
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors"
          aria-label="Toggle theme"
        >
          {theme === "light" ? (
            <Moon size={20} className="text-hangman-primary" />
          ) : (
            <Sun size={20} className="text-hangman-secondary" />
          )}
        </button>
      </div>
    </header>
  );
};

export default Header;
