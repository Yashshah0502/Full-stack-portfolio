import { createContext, useContext, useEffect, useState } from "react";

type Theme = "dark" | "gray";
type Font = "inter" | "poppins";

interface ThemeState {
  theme: Theme;
  font: Font;
  setTheme: (t: Theme) => void;
  setFont: (f: Font) => void;
}

const ThemeContext = createContext<ThemeState | undefined>(undefined);

const THEME_KEY = "isu_theme";
const FONT_KEY = "isu_font";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("dark");
  const [font, setFontState] = useState<Font>("inter");

  useEffect(() => {
    const storedTheme = localStorage.getItem(THEME_KEY) as Theme | null;
    const storedFont = localStorage.getItem(FONT_KEY) as Font | null;
    if (storedTheme) setThemeState(storedTheme);
    if (storedFont) setFontState(storedFont);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.dataset.font = font;
    localStorage.setItem(THEME_KEY, theme);
    localStorage.setItem(FONT_KEY, font);
  }, [theme, font]);

  const setTheme = (t: Theme) => setThemeState(t);
  const setFont = (f: Font) => setFontState(f);

  return (
    <ThemeContext.Provider value={{ theme, font, setTheme, setFont }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
