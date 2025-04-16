import { useEffect, useState } from "react";

type CharacterPreviewProps = {
  headAccessory?: string;
  showTorso?: boolean;
  showArms?: boolean;
  showLegs?: boolean;
};

const CharacterPreview = ({
  headAccessory = "none",
  showTorso = false,
  showArms = false,
  showLegs = false,
}: CharacterPreviewProps) => {
  const [eyesClosed, setEyesClosed] = useState(false);
  const hairBow = headAccessory === "hairBow";
  const purpleFlower = headAccessory === "purpleFlower";
  const sharpHat = headAccessory === "sharpHat";
  const roundHat = headAccessory === "roundHat";
  const baseballHat = headAccessory === "baseballHat";
  const crown = headAccessory === "crown";

  const getViewBox = () => {
    if (showLegs) return "0 0 200 180";
    if (showArms) return "0 0 200 120";
    if (showTorso) return "0 0 200 100";
    return "0 0 200 100";
  };

  const getScale = () => {
    if (showLegs) return 1;
    if (showArms) return 1.2;
    if (showTorso) return 1.5;
    return 2;
  };

  
  useEffect(() => {
    const blink = () => {
      setEyesClosed(true);
      setTimeout(() => setEyesClosed(false), 100);
    };

    const blinkInterval = setInterval(blink, 3000);
    return () => clearInterval(blinkInterval);
  }, []);

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <svg
        viewBox={getViewBox()}
        className="w-full h-full"
        style={{ 
          transform: `scale(${getScale()})`,
          transformOrigin: 'center center'
        }}
      >
        {/* Head */}
        <circle
          cx="100"
          cy="50"
          r="10"
          fill="currentColor"
          stroke="currentColor"
          strokeWidth="1"
        />

        {/* Head Accessories */}
        {hairBow && (
          <g transform="translate(105, 42) rotate(25)">
            {/* Left petal */}
            <path
              d="M0,0 L-7,-4.4 L-10.5,0 L-7,4.4 Z"
              fill="#ff69b4"
            />
            {/* Right petal */}
            <path
              d="M0,0 L7,-4.4 L10.5,0 L7,4.4 Z"
              fill="#ff69b4"
            />
            {/* Center knot */}
            <circle cx="0" cy="0" r="1.75" fill="#ff1493" />
          </g>            
        )}

        {purpleFlower && (
          <g transform="translate(107, 42) scale(0.35)">
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
          <g transform="translate(100, 41)">
            <ellipse cx="0" cy="0" rx="20" ry="3" fill="#8B4513" />
            <path
              d="M-10,-2 Q0,-15 10,-2 Z"
              fill="#A0522D"
            />
          </g>
        )}

        {sharpHat && (
          <g transform="translate(100, 41)">
            <ellipse cx="0" cy="0" rx="18" ry="4" fill="#6B3F2A" />
            <path
              d="M -10,0 L -6,-10 L 6,-10 L 10,0 Z"
              fill="#4E2A1A"
            />
          </g>
        )}

        {baseballHat && (
          <g transform="translate(100, 42)">
            <path
              d="M -8,2 A 10,3 0 0 1 18,2 Z"
              fill="#4aa8ff"
            />
            <path
              d="M -10,2 A 7,6 0 0 1 10,2 Z"
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
          <g transform="translate(100, 38)">
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

        {/* Face */}
        {!eyesClosed && (
          <ellipse
            cx="96"
            cy="48"
            rx="1"
            ry="2"
            fill="currentColor"
            className="invert"
          />
        )}

        {!eyesClosed && (
          <ellipse
            cx="104"
            cy="48"
            rx="1"
            ry="2"
            fill="currentColor"
            className="invert"
          />
        )}

        <path
          d="M96,54 C98,56 102,56 104,54"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          fill="none"
        />

        {/* Torso */}
        {showTorso && (
          <path
            d="M100,60 C100,75 100,85 100,100"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
          />
        )}

        {/* Arms */}
        {showArms && (
          <>
            <path
              d="M100,70 C90,75 85,82 80,90"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M100,70 C110,75 115,82 120,90"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
            />
          </>
        )}

        {/* Legs */}
        {showLegs && (
          <>
            <path
              d="M100,100 C95,110 85,120 80,130"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M100,100 C105,110 115,120 120,130"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
            />
          </>
        )}
      </svg>
    </div>
  );
};

export default CharacterPreview; 