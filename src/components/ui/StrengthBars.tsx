import React, { useEffect, useState } from "react";

type strength = "Too Weak" | "Weak" | "Medium" | "Strong";

interface Theme {
  status: strength;
  theme: string;
}

interface StrengthBarProps {
  strengthStatus: strength;
}

export default function StrengthBars({ strengthStatus }: StrengthBarProps) {
  const Themes: Theme[] = [
    {
      status: "Too Weak",
      theme: "#f74b4a",
    },
    {
      status: "Weak",
      theme: "#fb7d59",
    },
    {
      status: "Medium",
      theme: "#f9cd64",
    },
    {
      status: "Strong",
      theme: "#a4feae",
    },
  ];

  const [theme, setTheme] = useState<string>(
    Themes.find((t) => t.status === "Too Weak")?.theme || "transparent"
  );

  useEffect(() => {
    setTheme(
      Themes.find((t) => t.status === strengthStatus)?.theme || "transparent"
    );
  }, [strengthStatus]);

  const counts = {
    "Too Weak": 1,
    Weak: 2,
    Medium: 3,
    Strong: 4,
  };

  const count = counts[strengthStatus] || 0;

  if (!strengthStatus) return null;

  return (
    <div className="h-8 flex items-center gap-2 relative">
      <div className="h-full border-2 w-3"></div>
      <div className="h-full border-2 w-3"></div>
      <div className="h-full border-2 w-3"></div>
      <div className="h-full border-2 w-3"></div>

      <div className="flex items-center gap-2 absolute top-0 w-full h-full">
        {[...Array(count)].map((_, i) => (
          <div
            key={i}
            style={{ background: theme }}
            className="h-full w-3"
          ></div>
        ))}
      </div>
    </div>
  );
}
