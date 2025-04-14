
import { RefreshCcw } from "lucide-react";

type HintSectionProps = {
  category: string;
  definition: string;
  hint: string;
  similarWords: string;
  onRefresh: () => void;
};

const HintSection = ({ category, definition, hint, similarWords, onRefresh }: HintSectionProps) => {
  return (
    <div className="flex items-center justify-between w-full max-w-md mx-auto my-4 px-2">
      <div className="flex-1 space-y-2">
        {category && category != '' && (
          <div className="hint-box">
            <span className="font-semibold">Category:</span> {category}
          </div>
        )}
        {definition && definition != '' && (
          <div className="hint-box">
            <span className="font-semibold">Definition:</span> {definition}
          </div>
        )}
        {similarWords && similarWords != '' && (
          <div className="hint-box">
            <span className="font-semibold">Similar Words:</span> {similarWords}
          </div>
        )}
        {hint && hint != '' && (
          <div className="hint-box">
            <span className="font-semibold">Hint:</span> {hint}
          </div>
        )}
      </div>
      <button
        onClick={onRefresh}
        className="ml-4 p-3 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors"
      >
        <RefreshCcw size={20} className="text-hangman-primary" />
      </button>
    </div>
  );
};

export default HintSection;
