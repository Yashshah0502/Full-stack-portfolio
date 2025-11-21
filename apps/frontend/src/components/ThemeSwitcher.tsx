import { useTheme } from "../theme/ThemeContext";
import { logAnalytics } from "../api";

export function ThemeSwitcher() {
  const { theme, font, setTheme, setFont } = useTheme();

  const handleThemeChange = async (t: "dark" | "gray") => {
    setTheme(t);
    await logAnalytics("themeChange", { theme: t });
  };

  return (
    <div style={{ display: "flex", gap: "0.5rem" }}>
      <select
        value={theme}
        onChange={(e) => handleThemeChange(e.target.value as "dark" | "gray")}
      >
        <option value="dark">Dark</option>
        <option value="gray">Gray</option>
      </select>

      <select
        value={font}
        onChange={(e) => setFont(e.target.value as any)}
      >
        <option value="inter">Inter</option>
        <option value="poppins">Poppins</option>
      </select>
    </div>
  );
}
