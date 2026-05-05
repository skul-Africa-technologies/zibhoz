import React from "react";
import { View, Text, StyleSheet } from "react-native";
import colors from "../theme/colors";

export default function PortfolioCard({ symbol, outcome, amount, pnl, status }) {
  const isProfit = pnl.startsWith("+");
  const isYes = outcome === "YES";
  const outcomeColor = isYes ? colors.positive : colors.negative;
  const outcomeBg = isYes ? "rgba(0,230,118,0.10)" : "rgba(255,59,48,0.10)";
  const outcomeBorder = isYes ? "rgba(0,230,118,0.28)" : "rgba(255,59,48,0.28)";

  return (
    <View style={styles.card}>
      {/* Header row */}
      <View style={styles.row}>
        <View style={[styles.icon, { backgroundColor: outcomeBg, borderColor: outcomeBorder }]}>
          <Text style={[styles.iconText, { color: outcomeColor }]}>
            {symbol.slice(0, 1)}
          </Text>
        </View>
        <View style={styles.meta}>
          <Text style={styles.symbol}>{symbol}</Text>
          <View style={[styles.outcomePill, { backgroundColor: outcomeBg, borderColor: outcomeBorder }]}>
            <Text style={[styles.outcomeText, { color: outcomeColor }]}>
              {outcome}
            </Text>
          </View>
        </View>
        <View style={[styles.statusBadge, status === "active" && styles.activeBadge]}>
          <Text style={[styles.statusText, status === "active" && styles.activeStatusText]}>
            {status.toUpperCase()}
          </Text>
        </View>
      </View>

      {/* Divider */}
      <View style={styles.divider} />

      {/* Stats row */}
      <View style={styles.statsRow}>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>INVESTED</Text>
          <Text style={styles.statValue}>{amount}</Text>
        </View>
        <View style={styles.statSep} />
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>P&L</Text>
          <Text style={[styles.statValue, { color: isProfit ? colors.positive : colors.negative }]}>
            {pnl}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    padding: 18,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: colors.border,
    gap: 14,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  icon: {
    width: 46,
    height: 46,
    borderRadius: 14,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  iconText: {
    fontWeight: "900",
    fontSize: 20,
  },
  meta: {
    flex: 1,
    gap: 6,
  },
  symbol: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: "900",
    letterSpacing: 0.5,
  },
  outcomePill: {
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 999,
    borderWidth: 1,
  },
  outcomeText: {
    fontSize: 10,
    fontWeight: "900",
    letterSpacing: 1.2,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 999,
    backgroundColor: colors.surfaceElevated,
    borderWidth: 1,
    borderColor: colors.border,
  },
  activeBadge: {
    backgroundColor: "rgba(0,230,118,0.10)",
    borderColor: "rgba(0,230,118,0.28)",
  },
  statusText: {
    fontSize: 10,
    fontWeight: "900",
    letterSpacing: 0.8,
    color: colors.textMuted,
  },
  activeStatusText: {
    color: colors.positive,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
  },
  statsRow: {
    flexDirection: "row",
    gap: 0,
  },
  statItem: {
    flex: 1,
    alignItems: "center",
    gap: 4,
  },
  statSep: {
    width: 1,
    backgroundColor: colors.border,
    marginVertical: 2,
  },
  statLabel: {
    color: colors.textMuted,
    fontSize: 10,
    fontWeight: "900",
    letterSpacing: 1,
  },
  statValue: {
    color: colors.textPrimary,
    fontSize: 18,
    fontWeight: "900",
  },
});
