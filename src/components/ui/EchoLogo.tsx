import React from "react";

interface EchoLogoProps {
  size?: number; // высота SVG
  color?: string; // общий цвет
  iconColor?: string; // цвет точки
  waveColor?: string; // цвет волн
  textColor?: string; // цвет текста
  waveCount?: number; // количество волн
  text?: string; // надпись
  fontSize?: number;
  strokeWidth?: number;
}

export const EchoLogo: React.FC<EchoLogoProps> = ({
  size = 36,
  color = "#4F46E5",
  iconColor,
  waveColor,
  textColor,
  waveCount = 2,
  text = "",
  fontSize = 18,
  strokeWidth = 2,
}) => {
  const cColor = iconColor || color;
  const wColor = waveColor || color;
  const tColor = textColor || color;

  const waves = Array.from({ length: waveCount });

  return (
    <svg
      height={size}
      viewBox="0 0 160 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="echo logo"
    >
      <circle cx="12" cy="20" r={size / 9} fill={cColor} />

      {waves.map((_, i) => (
        <path
          key={i}
          d={`
            M ${20 + i * 6} ${14 - i} 
            C ${26 + i * 8} ${18}, ${26 + i * 8} ${22}, ${20 + i * 6} ${26 + i}
          `}
          stroke={wColor}
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
        />
      ))}

      <text
        x={44}
        y={26}
        fontSize={fontSize}
        fontFamily="Inter, system-ui, -apple-system, BlinkMacSystemFont, sans-serif"
        fontWeight={600}
        fill={tColor}
        letterSpacing={-0.3}
      >
        {text}
      </text>
    </svg>
  );
};
