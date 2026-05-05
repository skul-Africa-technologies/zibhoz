// Zibhoz Brand Palette — optimized for visually impaired users
// High-contrast dark mode: deep brand purple + electric yellow + pure white
const colors = {
  // Backgrounds
  background: "#0B0614",
  backgroundAlt: "#110C1C",
  surface: "#1A1228",
  surfaceAlt: "#201830",
  surfaceElevated: "#2A2040",
  surfaceSoft: "#332C50",

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
