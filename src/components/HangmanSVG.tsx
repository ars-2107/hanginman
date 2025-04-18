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
  const showHead = wrongGuesses >= 1;
  const showBody = wrongGuesses >= 2;
  const showLeftArm = wrongGuesses >= 3;
  const showRightArm = wrongGuesses >= 4;
  const showLeftLeg = wrongGuesses >= 5;
  const showRightLeg = wrongGuesses >= 6;
  const isGameOver = wrongGuesses >= maxGuesses;

  const [headAccessory, setHeadAccessory] = useState("none");
  const [headType, setHeadType] = useState("circleFace");

  useEffect(() => {
    const savedHeadAccessory = localStorage.getItem("characterHeadAccessories");
    const savedHeadType = localStorage.getItem("characterHeadType");
    if (savedHeadAccessory) {
      setHeadAccessory(savedHeadAccessory);
    }
    if (savedHeadType) {
      setHeadType(savedHeadType);
    } else {
      setHeadType("circleFace");
    }
  }, []);

  const hairBow = headAccessory === "hairBow";
  const purpleFlower = headAccessory === "purpleFlower";
  const sharpHat = headAccessory === "sharpHat";
  const roundHat = headAccessory === "roundHat";
  const baseballHat = headAccessory === "baseballHat";
  const crown = headAccessory === "crown";
  const circleFace = headType === "circleFace";
  const squareFace = headType === "squareFace";

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

  const [eyesClosed, setEyesClosed] = useState(false);

  useEffect(() => {
    const blink = () => {
      setEyesClosed(true);
      setTimeout(() => setEyesClosed(false), 100);
      setTimeout(() => {
        setEyesClosed(true);
        setTimeout(() => setEyesClosed(false), 100);
      }, 200);
    };

    const blinkInterval = setInterval(blink, 5000);
    return () => clearInterval(blinkInterval);
  }, []);

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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wrongGuesses, isCorrectGuess]);

  return (
    <div className="relative w-full m-3 mt-5 mb-2 max-w-[200px] h-[180px] mx-auto">
      <svg
        viewBox="0 0 200 180"
        className={`w-full h-full transition-all duration-300 ${
          isGameOver ? "opacity-80" : ""
        }`}
      >
        <path 
          d="M40,150 H160 M60,150 V30 C60,24 62,20 68,20 H114 C120,20 120,26 120,30 V40" 
          stroke="currentColor" 
          strokeWidth="3" 
          fill="none" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />

        {showHead && (
          <>
            {circleFace &&
              <circle
                cx="120"
                cy="50"
                r="10"
                fill="currentColor"
                stroke="currentColor"
                strokeWidth="1"
                className={isGameOver ? "opacity-80" : ""}
              />
            }

            {squareFace && 
              <rect
                x="110.5"
                y="40"
                width="19"
                height="19"
                fill="currentColor"
                stroke="currentColor"
                strokeWidth="1"
                rx="4"
                ry="4"
              />
            }
          </>
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

        {showHead && !isGameOver && (
          <g>
            {hairBow && (
              <g transform="translate(125, 42) rotate(25)">
                <path
                  d="M0,0 L-7,-4.4 L-10.5,0 L-7,4.4 Z"
                  fill="#ff69b4"
                />
                <path
                  d="M0,0 L7,-4.4 L10.5,0 L7,4.4 Z"
                  fill="#ff69b4"
                />
                <circle cx="0" cy="0" r="1.75" fill="#ff1493" />
              </g>            
            )}

            {purpleFlower && (
              <g transform="translate(127, 42) scale(0.35)">
                <path
                  d="M0,0 C-5,-10 -15,-10 -20,0 C-15,5 -5,5 0,0 Z"
                  fill="#9b59b6"
                  transform="rotate(0)"
                />
                <path
                  d="M0,0 C5,-10 15,-10 20,0 C15,5 5,5 0,0 Z"
                  fill="#9b59b6"
                  transform="rotate(60)"
                />
                <path
                  d="M0,0 C-5,-10 -15,-10 -20,0 C-15,5 -5,5 0,0 Z"
                  fill="#9b59b6"
                  transform="rotate(120)"
                />
                <path
                  d="M0,0 C5,-10 15,-10 20,0 C15,5 5,5 0,0 Z"
                  fill="#9b59b6"
                  transform="rotate(180)"
                />
                <path
                  d="M0,0 C-5,-10 -15,-10 -20,0 C-15,5 -5,5 0,0 Z"
                  fill="#9b59b6"
                  transform="rotate(240)"
                />
                <path
                  d="M0,0 C5,-10 15,-10 20,0 C15,5 5,5 0,0 Z"
                  fill="#9b59b6"
                  transform="rotate(300)"
                />
                <circle cx="0" cy="0" r="6" fill="#ff69b4" />
              </g>
            )}

            {roundHat && (
              <g transform="translate(120, 41)">
                <ellipse cx="0" cy="0" rx="20" ry="3" fill="#8B4513" />
                
                <path
                  d="M-10,-2 Q0,-15 10,-2 Z"
                  fill="#A0522D"
                />
              </g>
            )}

            {sharpHat && (
              <g transform="translate(120, 41)">
                <ellipse cx="0" cy="0" rx="18" ry="4" fill="#6B3F2A" />

                <path
                  d="
                    M -10,0
                    L -6,-10
                    L 6,-10
                    L 10,0
                    Z
                  "
                  fill="#4E2A1A"
                />
              </g>
            )}

            {baseballHat && (
              <g transform="translate(120, 42)">
                <path
                  d="
                    M -8,2
                    A 10,3 0 0 1 18,2
                    Z
                  "
                  fill="#4aa8ff"
                />
                <path
                  d="
                    M -10,2
                    A 7,6 0 0 1 10,2
                    Z
                  "
                  fill="#1E90FF"
                />
                <text
                  x="0"
                  y="-1"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontSize="6"
                  fontWeight="bold"
                  fill="white"
                >
                  H
                </text>
              </g>
            )}
            
            {crown && (
              <g transform="translate(120, 38)">
                <path
                  d="M-4,0 L-2.5,-9 L-1,0 Z"
                  fill="#b8860b"
                />
                <path
                  d="M1,0 L2.5,-9 L4,0 Z"
                  fill="#b8860b"
                />
                <path
                  d="M-7.5,0 L-5,-7.5 L-2.5,0 Z"
                  fill="#ffd700"
                />
                <path
                  d="M2.5,0 L5,-7.5 L7.5,0 Z"
                  fill="#ffd700"
                />
                <path
                  d="M-2.5,0 L0,-10.5 L2.5,0 Z"
                  fill="#ffd700"
                />
                <path
                  d="M-10,0 L-7.5,-9 L-5,0 Z"
                  fill="#ffd700"
                />
                <path
                  d="M5,0 L7.5,-9 L10,0 Z"
                  fill="#ffd700"
                />
                <rect
                  x="-10"
                  y="0"
                  width="20"
                  height="7"
                  fill="#ffd700"
                />
                <circle cx="-6" cy="3" r="1.2" fill="red" />
                <circle cx="0" cy="3" r="1.2" fill="red" />
                <circle cx="6" cy="3" r="1.2" fill="red" />
              </g>            
            )}

            {!eyesClosed && (
              <ellipse
                cx="116"
                cy="48"
                rx="1"
                ry="2"
                fill="currentColor"
                className="invert"
              />
            )}
            {!eyesClosed && (
              <ellipse
                cx="124"
                cy="48"
                rx="1"
                ry="2"
                fill="currentColor"
                className="invert"
              />
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