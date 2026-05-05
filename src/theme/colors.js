// Zibhoz Brand Palette — optimized for visually impaired users
// High-contrast dark mode: true black + electric yellow + pure white
const colors = {
  // Backgrounds
  background: "#121212",
  backgroundAlt: "#181818",
  surface: "#1E1E1E",
  surfaceAlt: "#242424",
  surfaceElevated: "#2C2C2C",
  surfaceSoft: "#333333",

  // Brand
  primary: "#FFEB3B",          // Electric Yellow — highest visibility on black
  primaryDim: "rgba(255,235,59,0.15)",
  primaryGlow: "rgba(255,235,59,0.30)",
  primaryBorder: "rgba(255,235,59,0.45)",

  // Text
  textPrimary: "#FFFFFF",      // Pure White — max legibility
  textSecondary: "#CCCCCC",
  textMuted: "#888888",
  textOnYellow: "#121212",     // Dark text on yellow buttons

  // Borders
  border: "rgba(255,255,255,0.10)",
  borderStrong: "rgba(255,255,255,0.22)",

  // Semantic — finance
  positive: "#00E676",         // YES / profit
  negative: "#FF3B30",         // NO / loss / warnings (Bright Crimson)
  warning: "#FF3B30",          // Failed transactions
};

export default colors;
