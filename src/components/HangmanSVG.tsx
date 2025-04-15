import { useEffect, useState } from "react";
import ChatBubble from "./Chatbubble";

type HangmanProps = {
  wrongGuesses: number;
  maxGuesses: number;
  isCorrectGuess: boolean;
  isTimeRunningOut: boolean;
};

const HangmanSVG = ({
  wrongGuesses,
  maxGuesses,
  isCorrectGuess,
  isTimeRunningOut,
}: HangmanProps) => {
  // Calculate which body parts to show based on wrong guesses
  const showHead = wrongGuesses >= 1;
  const showBody = wrongGuesses >= 2;
  const showLeftArm = wrongGuesses >= 3;
  const showRightArm = wrongGuesses >= 4;
  const showLeftLeg = wrongGuesses >= 5;
  const showRightLeg = wrongGuesses >= 6;
  const isGameOver = wrongGuesses >= maxGuesses;

  // Animation states for visual feedback
  const [pulseEffect, setPulseEffect] = useState(false);
  
  const [showChat, setShowChat] = useState(false);
  const [chatMessage, setChatMessage] = useState("");

  const correctGuessMessages = [
    "Yes! Good job!",
    "That's right!",
    "Nice guess!",
    "You're smart!",
    "Keep going!",
    "You'll save me!",
    "Phew, that was close!",
    "You're on fire!",
    "Brilliant!",
    "That's the way!"
  ];

  const wrongGuessMessages = [
    "Oh no!",
    "That's not right...",
    "Try another letter!",
    "I'm getting nervous!",
    "Please be careful!",
    "I don't like heights!",
    "Help me please!",
    "Think harder!",
    "I'm feeling dizzy!",
    "Not that one!"
  ];

  useEffect(() => {
    setShowChat(false);

    if (Math.random() < 0.2) {
      let messages;
      if (isCorrectGuess) {
        messages = correctGuessMessages;
      } else if (wrongGuesses > 0 && wrongGuesses <= maxGuesses) {
        messages = wrongGuessMessages;
      } else {
        return;
      }
      
      const randomMessage = messages[Math.floor(Math.random() * messages.length)];
      setChatMessage(randomMessage);
      setShowChat(true);
      
      const timer = setTimeout(() => {
        setShowChat(false);
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [wrongGuesses, isCorrectGuess]);

  return (
    <div className="relative w-full m-3 mt-5 mb-2 max-w-[200px] h-[180px] mx-auto">
      <svg
        viewBox="0 0 200 180"
        className={`w-full h-full transition-all duration-300 ${
          isGameOver ? "opacity-80" : ""
        }`}
      >
        {/* Gallows structure with rounded corners */}
        <path 
          d="M40,150 H160 M60,150 V30 C60,24 62,20 68,20 H114 C120,20 120,26 120,30 V40" 
          stroke="currentColor" 
          strokeWidth="3" 
          fill="none" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />

        {/* Hangman body parts */}
        {showHead && (
          <circle
            cx="120"
            cy="50"
            r="10"
            fill="currentColor"
            stroke="currentColor"
            strokeWidth="1"
            className={isGameOver ? "opacity-80" : ""}
          />
        )}

        {showBody && (
          <path
            d="M120,60 C120,75 120,85 120,100"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            className={`transition-opacity duration-300 ${isGameOver ? "opacity-80" : ""}`}
            fill="none"
          />
        )}

        {showLeftArm && (
          <path
            d="M120,70 C110,75 105,82 100,90"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            className={`transition-opacity duration-300 ${isGameOver ? "opacity-80" : ""}`}
            fill="none"
          />
        )}

        {showRightArm && (
          <path
            d="M120,70 C130,75 135,82 140,90"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            className={`transition-opacity duration-300 ${isGameOver ? "opacity-80" : ""}`}
            fill="none"
          />
        )}

        {showLeftLeg && (
          <path
            d="M120,100 C115,110 105,120 100,130"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            className={`transition-opacity duration-300 ${isGameOver ? "opacity-80" : ""}`}
            fill="none"
          />
        )}

        {showRightLeg && (
          <path
            d="M120,100 C125,110 135,120 140,130"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            className={`transition-opacity duration-300 ${isGameOver ? "opacity-80" : ""}`}
            fill="none"
          />
        )}

        {/* Add a subtle platform at the bottom for aesthetic appeal */}
        <ellipse 
          cx="100" 
          cy="150" 
          rx="65" 
          ry="3" 
          fill="currentColor" 
          opacity="0.2" 
        />

        {showHead && !isGameOver && (
          <g>
            <circle cx="116" cy="48" r="1" fill="currentColor" />
            <circle cx="124" cy="48" r="1" fill="currentColor" />
            {wrongGuesses > 3 ? (
              <path d="M116,56 C118,54 122,54 124,56" stroke="currentColor" strokeWidth="1" strokeLinecap="round" fill="none" />
            ) : (
              <path d="M116,54 C118,56 122,56 124,54" stroke="currentColor" strokeWidth="1" strokeLinecap="round" fill="none" />
            )}
          </g>
        )}
      </svg>

      {showChat && (
        <ChatBubble
          isVisible={showChat} 
          message={chatMessage}
          position={"right"}
        />
      )}
    </div>
  );
};

export default HangmanSVG;