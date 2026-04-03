interface BrainProps {
  clockLabel?: string;
  size?: number;
}

const Brain = ({ clockLabel = "5:00", size = 220 }: BrainProps) => {
  return (
    <svg
      viewBox="0 0 220 200"
      width={size}
      height={size * 0.91}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id="brainG" cx="45%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#ffd0d8" />
          <stop offset="100%" stopColor="#f09ab0" />
        </radialGradient>
        <radialGradient id="blushG" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#f4a0b8" stopOpacity={0.7} />
          <stop offset="100%" stopColor="#f4a0b8" stopOpacity={0} />
        </radialGradient>
      </defs>

      <ellipse cx="118" cy="108" rx="72" ry="62" fill="#d4709a" opacity={0.3} />
      <path
        d="M60 130 Q40 125 38 108 Q36 88 52 80 Q50 62 68 58 Q72 42 90 44 Q98 32 116 36 Q132 28 148 40 Q166 38 172 56 Q188 60 186 80 Q198 92 192 110 Q190 126 172 132 Q168 148 150 148 Q138 158 118 154 Q100 162 84 152 Q66 152 60 130Z"
        fill="url(#brainG)"
        stroke="#e080a0"
        strokeWidth={2.5}
      />
      {[
        "M90 48 Q95 38 105 42 Q108 32 118 36",
        "M118 36 Q128 30 138 38 Q148 32 155 42",
        "M68 62 Q72 52 82 56",
        "M155 44 Q165 42 170 54",
        "M52 82 Q48 72 58 66 Q62 58 72 60",
        "M186 82 Q192 72 182 64 Q176 56 166 58",
        "M60 128 Q50 120 50 108 Q48 96 56 88",
        "M172 130 Q182 120 184 108 Q186 96 178 86",
        "M84 150 Q76 144 70 134",
        "M150 148 Q160 142 166 132",
      ].map((d, i) => (
        <path
          key={i}
          d={d}
          fill="none"
          stroke="#e898b4"
          strokeWidth={2}
          strokeLinecap="round"
        />
      ))}

      <ellipse cx="100" cy="102" rx="7" ry="8" fill="#4a2030" />
      <ellipse cx="136" cy="102" rx="7" ry="8" fill="#4a2030" />
      <circle cx="102" cy="100" r="2.5" fill="#fff" opacity={0.8} />
      <circle cx="138" cy="100" r="2.5" fill="#fff" opacity={0.8} />
      <path
        d="M108 118 Q118 126 128 118"
        fill="none"
        stroke="#c05878"
        strokeWidth={2.5}
        strokeLinecap="round"
      />
      <ellipse cx="88" cy="112" rx="10" ry="6" fill="url(#blushG)" />
      <ellipse cx="148" cy="112" rx="10" ry="6" fill="url(#blushG)" />

      <g transform="translate(28, 92)">
        <ellipse
          cx="22"
          cy="22"
          rx="20"
          ry="20"
          fill="#c8d8f0"
          stroke="#a0b8e0"
          strokeWidth={2}
        />
        <ellipse
          cx="22"
          cy="22"
          rx="15"
          ry="15"
          fill="#e8f0f8"
          stroke="#a0b8e0"
          strokeWidth={1}
        />
        <line
          x1="22"
          y1="10"
          x2="22"
          y2="22"
          stroke="#8090b0"
          strokeWidth={2}
          strokeLinecap="round"
        />
        <line
          x1="22"
          y1="22"
          x2="30"
          y2="16"
          stroke="#8090b0"
          strokeWidth={1.5}
          strokeLinecap="round"
        />
        <text
          x="22"
          y="36"
          textAnchor="middle"
          fontFamily="Quicksand, sans-serif"
          fontSize={9}
          fontWeight={700}
          fill="#a06878"
        >
          {clockLabel}
        </text>
        <ellipse cx="22" cy="4" rx="3" ry="4" fill="#a0b8e0" />
        <rect x="16" y="38" width="12" height="4" rx="2" fill="#a0b8e0" />
      </g>
    </svg>
  );
};

export default Brain;
