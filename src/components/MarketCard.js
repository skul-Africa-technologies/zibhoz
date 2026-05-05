import React from "react";
import { View, Text, StyleSheet } from "react-native";
import colors from "../theme/colors";

export default function MarketCard({ symbol, question, yes, no, volume, deadline }) {
  return (
    <View style={styles.card}>
      {/* Header row */}
      <View style={styles.row}>
        <View style={styles.icon}>
          <Text style={styles.iconText}>{symbol.slice(0, 1)}</Text>
        </View>
        <View style={styles.meta}>
          <Text style={styles.symbol}>{symbol}</Text>
          <Text style={styles.deadlineLabel}>Closes {deadline}</Text>
        </View>
        <View style={styles.headerRight}>
          <View style={styles.liveBadge}>
            <View style={styles.liveDot} />
            <Text style={styles.liveText}>LIVE</Text>
          </View>
          <Text style={styles.volume}>{volume}</Text>
        </View>
      </View>

      {/* Market question */}
      <Text style={styles.question}>{question}</Text>

      {/* Stats row */}
      <View style={styles.statsRow}>
        <View style={[styles.statBox, styles.yesBox]}>
          <Text style={styles.statLabel}>YES</Text>
          <Text style={[styles.statValue, { color: colors.positive }]}>{yes}%</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={[styles.statBox, styles.noBox]}>
          <Text style={styles.statLabel}>NO</Text>
          <Text style={[styles.statValue, { color: colors.negative }]}>{no}%</Text>
        </View>
      </View>

      {/* YES / NO probability bar */}
      <View style={styles.barWrap}>
        <View style={[styles.yesBar, { flex: yes }]} />
        <View style={[styles.noBar, { flex: no }]} />
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
    backgroundColor: colors.primaryDim,
    borderWidth: 1,
    borderColor: colors.primaryBorder,
    alignItems: "center",
    justifyContent: "center",
  },
  iconText: {
    color: colors.primary,
    fontWeight: "900",
    fontSize: 20,
  },
  meta: {
    flex: 1,
    gap: 3,
  },
  symbol: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: "900",
    letterSpacing: 0.5,
  },
  deadlineLabel: {
    color: colors.textMuted,
    fontSize: 11,
    fontWeight: "600",
  },
  headerRight: {
    alignItems: "flex-end",
    gap: 5,
  },
  liveBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "rgba(0,230,118,0.12)",
    borderWidth: 1,
    borderColor: "rgba(0,230,118,0.30)",
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  liveDot: {
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: colors.positive,
  },
  liveText: {
    color: colors.positive,
    fontSize: 10,
    fontWeight: "900",
    letterSpacing: 0.5,
  },
  volume: {
    color: colors.textMuted,
    fontSize: 11,
    fontWeight: "700",
  },
  question: {
    color: colors.textPrimary,
    fontSize: 15,
    fontWeight: "700",
    lineHeight: 22,
  },
  statsRow: {
    flexDirection: "row",
    backgroundColor: colors.surfaceAlt,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: "hidden",
  },
  statBox: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 10,
    gap: 2,
  },
  yesBox: {
    borderRightWidth: 0,
  },
  noBox: {},
  statDivider: {
    width: 1,
    backgroundColor: colors.border,
    marginVertical: 8,
  },
  statLabel: {
    color: colors.textMuted,
    fontSize: 10,
    fontWeight: "900",
    letterSpacing: 1,
  },
  statValue: {
    fontSize: 22,
    fontWeight: "900",
  },
  barWrap: {
    flexDirection: "row",
    height: 6,
    borderRadius: 999,
    overflow: "hidden",
    gap: 2,
  },
  yesBar: {
    borderRadius: 999,
    backgroundColor: colors.positive,
  },
  noBar: {
    borderRadius: 999,
    backgroundColor: colors.negative,
  },
});

