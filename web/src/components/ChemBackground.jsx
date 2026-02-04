import React from 'react';

export default function ChemBackground() {
  return (
    <div className="chem-bg" aria-hidden="true">
      <div className="chem-smoke"></div>

      {/* SVG overlay with different cyclic compounds distributed across entire viewport */}
      <svg className="molecule-svg" viewBox="0 0 2000 1200" preserveAspectRatio="xMidYMid slice">
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <linearGradient id="strokeGrad" x1="0" x2="1">
            <stop offset="0%" stopColor="#3d4d7a" stopOpacity="0.7" />
            <stop offset="50%" stopColor="#4a3559" stopOpacity="0.65" />
            <stop offset="100%" stopColor="#7d5891" stopOpacity="0.7" />
          </linearGradient>
        </defs>

        {/* Benzene rings (6-membered aromatic) */}
        <g className="molecule-group" transform="translate(100,100) scale(1)" filter="url(#glow)">
          <polygon className="molecule-path" points="-30,-17 -15,-26 0,-17 0,17 -15,26 -30,17" />
          <circle className="molecule-path" cx="0" cy="0" r="20" fill="none" stroke-dasharray="2,2" opacity="0.5"/>
        </g>
        <g className="molecule-group" transform="translate(400,80) scale(1.2)" filter="url(#glow)">
          <polygon className="molecule-path" points="-30,-17 -15,-26 0,-17 0,17 -15,26 -30,17" />
          <circle className="molecule-path" cx="0" cy="0" r="24" fill="none" stroke-dasharray="2,2" opacity="0.5"/>
        </g>
        <g className="molecule-group" transform="translate(700,120) scale(0.9)" filter="url(#glow)">
          <polygon className="molecule-path" points="-30,-17 -15,-26 0,-17 0,17 -15,26 -30,17" />
          <circle className="molecule-path" cx="0" cy="0" r="18" fill="none" stroke-dasharray="2,2" opacity="0.5"/>
        </g>

        {/* Cyclopentane (5-membered rings) */}
        <g className="molecule-group" transform="translate(1000,90) scale(1.1)" filter="url(#glow)">
          <polygon className="molecule-path" points="0,-25 24,-8 15,20 -15,20 -24,-8" />
        </g>
        <g className="molecule-group" transform="translate(1300,110) scale(1)" filter="url(#glow)">
          <polygon className="molecule-path" points="0,-25 24,-8 15,20 -15,20 -24,-8" />
        </g>
        <g className="molecule-group" transform="translate(1600,100) scale(1.3)" filter="url(#glow)">
          <polygon className="molecule-path" points="0,-25 24,-8 15,20 -15,20 -24,-8" />
        </g>

        {/* Cyclopropane (3-membered rings) */}
        <g className="molecule-group" transform="translate(200,300) scale(1.1)" filter="url(#glow)">
          <polygon className="molecule-path" points="0,-20 17,10 -17,10" />
        </g>
        <g className="molecule-group" transform="translate(500,280) scale(0.8)" filter="url(#glow)">
          <polygon className="molecule-path" points="0,-20 17,10 -17,10" />
        </g>
        <g className="molecule-group" transform="translate(800,320) scale(1.2)" filter="url(#glow)">
          <polygon className="molecule-path" points="0,-20 17,10 -17,10" />
        </g>

        {/* Cyclobutane (4-membered rings) */}
        <g className="molecule-group" transform="translate(1100,290) scale(1)" filter="url(#glow)">
          <polygon className="molecule-path" points="-20,-20 20,-20 20,20 -20,20" />
        </g>
        <g className="molecule-group" transform="translate(1400,310) scale(1.4)" filter="url(#glow)">
          <polygon className="molecule-path" points="-20,-20 20,-20 20,20 -20,20" />
        </g>
        <g className="molecule-group" transform="translate(1700,300) scale(0.9)" filter="url(#glow)">
          <polygon className="molecule-path" points="-20,-20 20,-20 20,20 -20,20" />
        </g>

        {/* Fused ring systems (naphthalene-like) */}
        <g className="molecule-group" transform="translate(150,500) scale(1.3)" filter="url(#glow)">
          <polygon className="molecule-path" points="-40,-17 -20,-26 0,-17 0,17 -20,26 -40,17" />
          <polygon className="molecule-path" points="0,-17 20,-26 40,-17 40,17 20,26 0,17" />
        </g>
        <g className="molecule-group" transform="translate(450,480) scale(1)" filter="url(#glow)">
          <polygon className="molecule-path" points="-40,-17 -20,-26 0,-17 0,17 -20,26 -40,17" />
          <polygon className="molecule-path" points="0,-17 20,-26 40,-17 40,17 20,26 0,17" />
        </g>
        <g className="molecule-group" transform="translate(750,520) scale(0.7)" filter="url(#glow)">
          <polygon className="molecule-path" points="-40,-17 -20,-26 0,-17 0,17 -20,26 -40,17" />
          <polygon className="molecule-path" points="0,-17 20,-26 40,-17 40,17 20,26 0,17" />
        </g>

        {/* Cycloheptane (7-membered rings) */}
        <g className="molecule-group" transform="translate(1050,490) scale(1.1)" filter="url(#glow)">
          <polygon className="molecule-path" points="0,-30 26,-15 26,15 0,30 -26,15 -26,-15" />
        </g>
        <g className="molecule-group" transform="translate(1350,510) scale(1.2)" filter="url(#glow)">
          <polygon className="molecule-path" points="0,-30 26,-15 26,15 0,30 -26,15 -26,-15" />
        </g>
        <g className="molecule-group" transform="translate(1650,500) scale(0.8)" filter="url(#glow)">
          <polygon className="molecule-path" points="0,-30 26,-15 26,15 0,30 -26,15 -26,-15" />
        </g>

        {/* Cyclooctane (8-membered rings) */}
        <g className="molecule-group" transform="translate(250,700) scale(0.9)" filter="url(#glow)">
          <polygon className="molecule-path" points="-20,-28 20,-28 28,0 20,28 -20,28 -28,0" />
        </g>
        <g className="molecule-group" transform="translate(550,680) scale(1.2)" filter="url(#glow)">
          <polygon className="molecule-path" points="-20,-28 20,-28 28,0 20,28 -20,28 -28,0" />
        </g>
        <g className="molecule-group" transform="translate(850,720) scale(1)" filter="url(#glow)">
          <polygon className="molecule-path" points="-20,-28 20,-28 28,0 20,28 -20,28 -28,0" />
        </g>

        {/* Pyridine-like (6-membered with nitrogen) */}
        <g className="molecule-group" transform="translate(1150,690) scale(1.3)" filter="url(#glow)">
          <polygon className="molecule-path" points="-30,-17 -15,-26 0,-17 0,17 -15,26 -30,17" />
          <circle className="molecule-path" cx="0" cy="-26" r="3" fill="#f093fb" />
        </g>
        <g className="molecule-group" transform="translate(1450,710) scale(0.8)" filter="url(#glow)">
          <polygon className="molecule-path" points="-30,-17 -15,-26 0,-17 0,17 -15,26 -30,17" />
          <circle className="molecule-path" cx="0" cy="-26" r="3" fill="#f093fb" />
        </g>
        <g className="molecule-group" transform="translate(1750,700) scale(1.1)" filter="url(#glow)">
          <polygon className="molecule-path" points="-30,-17 -15,-26 0,-17 0,17 -15,26 -30,17" />
          <circle className="molecule-path" cx="0" cy="-26" r="3" fill="#f093fb" />
        </g>

        {/* Cyclohexane (simple 6-membered) */}
        <g className="molecule-group" transform="translate(100,900) scale(1.1)" filter="url(#glow)">
          <polygon className="molecule-path" points="-30,-17 -15,-26 0,-17 0,17 -15,26 -30,17" />
        </g>
        <g className="molecule-group" transform="translate(400,880) scale(0.8)" filter="url(#glow)">
          <polygon className="molecule-path" points="-30,-17 -15,-26 0,-17 0,17 -15,26 -30,17" />
        </g>
        <g className="molecule-group" transform="translate(700,920) scale(1.2)" filter="url(#glow)">
          <polygon className="molecule-path" points="-30,-17 -15,-26 0,-17 0,17 -15,26 -30,17" />
        </g>

        {/* Additional scattered compounds for better coverage - Row 1 */}
        <g className="molecule-group" transform="translate(300,200) scale(0.6)" filter="url(#glow)">
          <polygon className="molecule-path" points="0,-25 24,-8 15,20 -15,20 -24,-8" />
        </g>
        <g className="molecule-group" transform="translate(600,400) scale(0.7)" filter="url(#glow)">
          <polygon className="molecule-path" points="-20,-20 20,-20 20,20 -20,20" />
        </g>
        <g className="molecule-group" transform="translate(900,600) scale(0.8)" filter="url(#glow)">
          <polygon className="molecule-path" points="0,-20 17,10 -17,10" />
        </g>
        <g className="molecule-group" transform="translate(1200,800) scale(0.6)" filter="url(#glow)">
          <polygon className="molecule-path" points="-40,-17 -20,-26 0,-17 0,17 -20,26 -40,17" />
          <polygon className="molecule-path" points="0,-17 20,-26 40,-17 40,17 20,26 0,17" />
        </g>
        <g className="molecule-group" transform="translate(1500,1000) scale(0.7)" filter="url(#glow)">
          <polygon className="molecule-path" points="0,-30 26,-15 26,15 0,30 -26,15 -26,-15" />
        </g>

        {/* Row 2 - Additional compounds */}
        <g className="molecule-group" transform="translate(250,150) scale(0.5)" filter="url(#glow)">
          <polygon className="molecule-path" points="-30,-17 -15,-26 0,-17 0,17 -15,26 -30,17" />
          <circle className="molecule-path" cx="0" cy="0" r="15" fill="none" stroke-dasharray="2,2" opacity="0.5"/>
        </g>
        <g className="molecule-group" transform="translate(550,250) scale(0.6)" filter="url(#glow)">
          <polygon className="molecule-path" points="0,-25 24,-8 15,20 -15,20 -24,-8" />
        </g>
        <g className="molecule-group" transform="translate(850,350) scale(0.7)" filter="url(#glow)">
          <polygon className="molecule-path" points="0,-20 17,10 -17,10" />
        </g>
        <g className="molecule-group" transform="translate(1150,450) scale(0.5)" filter="url(#glow)">
          <polygon className="molecule-path" points="-20,-20 20,-20 20,20 -20,20" />
        </g>
        <g className="molecule-group" transform="translate(1450,550) scale(0.6)" filter="url(#glow)">
          <polygon className="molecule-path" points="0,-30 26,-15 26,15 0,30 -26,15 -26,-15" />
        </g>

        {/* Row 3 - More compounds */}
        <g className="molecule-group" transform="translate(180,280) scale(0.4)" filter="url(#glow)">
          <polygon className="molecule-path" points="-30,-17 -15,-26 0,-17 0,17 -15,26 -30,17" />
        </g>
        <g className="molecule-group" transform="translate(380,380) scale(0.5)" filter="url(#glow)">
          <polygon className="molecule-path" points="0,-25 24,-8 15,20 -15,20 -24,-8" />
        </g>
        <g className="molecule-group" transform="translate(580,480) scale(0.6)" filter="url(#glow)">
          <polygon className="molecule-path" points="0,-20 17,10 -17,10" />
        </g>
        <g className="molecule-group" transform="translate(780,580) scale(0.4)" filter="url(#glow)">
          <polygon className="molecule-path" points="-20,-20 20,-20 20,20 -20,20" />
        </g>
        <g className="molecule-group" transform="translate(980,680) scale(0.5)" filter="url(#glow)">
          <polygon className="molecule-path" points="0,-30 26,-15 26,15 0,30 -26,15 -26,-15" />
        </g>
        <g className="molecule-group" transform="translate(1180,780) scale(0.4)" filter="url(#glow)">
          <polygon className="molecule-path" points="-30,-17 -15,-26 0,-17 0,17 -15,26 -30,17" />
          <circle className="molecule-path" cx="0" cy="0" r="12" fill="none" stroke-dasharray="2,2" opacity="0.5"/>
        </g>

        {/* Row 4 - Even more compounds */}
        <g className="molecule-group" transform="translate(320,320) scale(0.5)" filter="url(#glow)">
          <polygon className="molecule-path" points="0,-25 24,-8 15,20 -15,20 -24,-8" />
        </g>
        <g className="molecule-group" transform="translate(520,420) scale(0.4)" filter="url(#glow)">
          <polygon className="molecule-path" points="0,-20 17,10 -17,10" />
        </g>
        <g className="molecule-group" transform="translate(720,520) scale(0.5)" filter="url(#glow)">
          <polygon className="molecule-path" points="-20,-20 20,-20 20,20 -20,20" />
        </g>
        <g className="molecule-group" transform="translate(920,620) scale(0.4)" filter="url(#glow)">
          <polygon className="molecule-path" points="0,-30 26,-15 26,15 0,30 -26,15 -26,-15" />
        </g>
        <g className="molecule-group" transform="translate(1120,720) scale(0.5)" filter="url(#glow)">
          <polygon className="molecule-path" points="-30,-17 -15,-26 0,-17 0,17 -15,26 -30,17" />
        </g>
        <g className="molecule-group" transform="translate(1320,820) scale(0.4)" filter="url(#glow)">
          <polygon className="molecule-path" points="0,-25 24,-8 15,20 -15,20 -24,-8" />
        </g>

        {/* Row 5 - Additional scattered compounds */}
        <g className="molecule-group" transform="translate(150,450) scale(0.3)" filter="url(#glow)">
          <polygon className="molecule-path" points="0,-20 17,10 -17,10" />
        </g>
        <g className="molecule-group" transform="translate(350,550) scale(0.4)" filter="url(#glow)">
          <polygon className="molecule-path" points="-20,-20 20,-20 20,20 -20,20" />
        </g>
        <g className="molecule-group" transform="translate(550,650) scale(0.3)" filter="url(#glow)">
          <polygon className="molecule-path" points="0,-30 26,-15 26,15 0,30 -26,15 -26,-15" />
        </g>
        <g className="molecule-group" transform="translate(750,750) scale(0.4)" filter="url(#glow)">
          <polygon className="molecule-path" points="-30,-17 -15,-26 0,-17 0,17 -15,26 -30,17" />
        </g>
        <g className="molecule-group" transform="translate(950,850) scale(0.3)" filter="url(#glow)">
          <polygon className="molecule-path" points="0,-25 24,-8 15,20 -15,20 -24,-8" />
        </g>
        <g className="molecule-group" transform="translate(1150,950) scale(0.4)" filter="url(#glow)">
          <polygon className="molecule-path" points="0,-20 17,10 -17,10" />
        </g>

        {/* Row 6 - Edge compounds */}
        <g className="molecule-group" transform="translate(80,50) scale(0.4)" filter="url(#glow)">
          <polygon className="molecule-path" points="-30,-17 -15,-26 0,-17 0,17 -15,26 -30,17" />
          <circle className="molecule-path" cx="0" cy="-26" r="2" fill="#f093fb" />
        </g>
        <g className="molecule-group" transform="translate(280,50) scale(0.3)" filter="url(#glow)">
          <polygon className="molecule-path" points="0,-25 24,-8 15,20 -15,20 -24,-8" />
        </g>
        <g className="molecule-group" transform="translate(480,50) scale(0.4)" filter="url(#glow)">
          <polygon className="molecule-path" points="0,-20 17,10 -17,10" />
        </g>
        <g className="molecule-group" transform="translate(680,50) scale(0.3)" filter="url(#glow)">
          <polygon className="molecule-path" points="-20,-20 20,-20 20,20 -20,20" />
        </g>
        <g className="molecule-group" transform="translate(880,50) scale(0.4)" filter="url(#glow)">
          <polygon className="molecule-path" points="0,-30 26,-15 26,15 0,30 -26,15 -26,-15" />
        </g>
        <g className="molecule-group" transform="translate(1080,50) scale(0.3)" filter="url(#glow)">
          <polygon className="molecule-path" points="-30,-17 -15,-26 0,-17 0,17 -15,26 -30,17" />
        </g>
        <g className="molecule-group" transform="translate(1280,50) scale(0.4)" filter="url(#glow)">
          <polygon className="molecule-path" points="0,-25 24,-8 15,20 -15,20 -24,-8" />
        </g>
        <g className="molecule-group" transform="translate(1480,50) scale(0.3)" filter="url(#glow)">
          <polygon className="molecule-path" points="0,-20 17,10 -17,10" />
        </g>

        {/* Row 7 - Bottom edge compounds */}
        <g className="molecule-group" transform="translate(80,950) scale(0.3)" filter="url(#glow)">
          <polygon className="molecule-path" points="-20,-20 20,-20 20,20 -20,20" />
        </g>
        <g className="molecule-group" transform="translate(280,950) scale(0.4)" filter="url(#glow)">
          <polygon className="molecule-path" points="0,-30 26,-15 26,15 0,30 -26,15 -26,-15" />
        </g>
        <g className="molecule-group" transform="translate(480,950) scale(0.3)" filter="url(#glow)">
          <polygon className="molecule-path" points="-30,-17 -15,-26 0,-17 0,17 -15,26 -30,17" />
        </g>
        <g className="molecule-group" transform="translate(680,950) scale(0.4)" filter="url(#glow)">
          <polygon className="molecule-path" points="0,-25 24,-8 15,20 -15,20 -24,-8" />
        </g>
        <g className="molecule-group" transform="translate(880,950) scale(0.3)" filter="url(#glow)">
          <polygon className="molecule-path" points="0,-20 17,10 -17,10" />
        </g>
        <g className="molecule-group" transform="translate(1080,950) scale(0.4)" filter="url(#glow)">
          <polygon className="molecule-path" points="-20,-20 20,-20 20,20 -20,20" />
        </g>
        <g className="molecule-group" transform="translate(1280,950) scale(0.3)" filter="url(#glow)">
          <polygon className="molecule-path" points="0,-30 26,-15 26,15 0,30 -26,15 -26,-15" />
        </g>
        <g className="molecule-group" transform="translate(1480,950) scale(0.4)" filter="url(#glow)">
          <polygon className="molecule-path" points="-30,-17 -15,-26 0,-17 0,17 -15,26 -30,17" />
          <circle className="molecule-path" cx="0" cy="-26" r="2" fill="#f093fb" />
        </g>

        {/* Row 8 - Left edge compounds */}
        <g className="molecule-group" transform="translate(50,200) scale(0.3)" filter="url(#glow)">
          <polygon className="molecule-path" points="0,-25 24,-8 15,20 -15,20 -24,-8" />
        </g>
        <g className="molecule-group" transform="translate(50,400) scale(0.4)" filter="url(#glow)">
          <polygon className="molecule-path" points="0,-20 17,10 -17,10" />
        </g>
        <g className="molecule-group" transform="translate(50,600) scale(0.3)" filter="url(#glow)">
          <polygon className="molecule-path" points="-20,-20 20,-20 20,20 -20,20" />
        </g>
        <g className="molecule-group" transform="translate(50,800) scale(0.4)" filter="url(#glow)">
          <polygon className="molecule-path" points="0,-30 26,-15 26,15 0,30 -26,15 -26,-15" />
        </g>

        {/* Row 9 - Right edge compounds */}
        <g className="molecule-group" transform="translate(1550,200) scale(0.3)" filter="url(#glow)">
          <polygon className="molecule-path" points="-30,-17 -15,-26 0,-17 0,17 -15,26 -30,17" />
        </g>
        <g className="molecule-group" transform="translate(1550,400) scale(0.4)" filter="url(#glow)">
          <polygon className="molecule-path" points="0,-25 24,-8 15,20 -15,20 -24,-8" />
        </g>
        <g className="molecule-group" transform="translate(1550,600) scale(0.3)" filter="url(#glow)">
          <polygon className="molecule-path" points="0,-20 17,10 -17,10" />
        </g>
        <g className="molecule-group" transform="translate(1550,800) scale(0.4)" filter="url(#glow)">
          <polygon className="molecule-path" points="-20,-20 20,-20 20,20 -20,20" />
        </g>

        {/* Additional center fill compounds */}
        <g className="molecule-group" transform="translate(400,300) scale(0.3)" filter="url(#glow)">
          <polygon className="molecule-path" points="0,-30 26,-15 26,15 0,30 -26,15 -26,-15" />
        </g>
        <g className="molecule-group" transform="translate(600,500) scale(0.4)" filter="url(#glow)">
          <polygon className="molecule-path" points="-30,-17 -15,-26 0,-17 0,17 -15,26 -30,17" />
        </g>
        <g className="molecule-group" transform="translate(800,400) scale(0.3)" filter="url(#glow)">
          <polygon className="molecule-path" points="0,-25 24,-8 15,20 -15,20 -24,-8" />
        </g>
        <g className="molecule-group" transform="translate(1000,600) scale(0.4)" filter="url(#glow)">
          <polygon className="molecule-path" points="0,-20 17,10 -17,10" />
        </g>
        <g className="molecule-group" transform="translate(1200,500) scale(0.3)" filter="url(#glow)">
          <polygon className="molecule-path" points="-20,-20 20,-20 20,20 -20,20" />
        </g>
        <g className="molecule-group" transform="translate(1400,700) scale(0.4)" filter="url(#glow)">
          <polygon className="molecule-path" points="0,-30 26,-15 26,15 0,30 -26,15 -26,-15" />
        </g>

      </svg>
    </div>
  );
}
