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
        <Text style={styles.volume}>{volume}</Text>
      </View>

      {/* Market question */}
      <Text style={styles.question}>{question}</Text>

      {/* YES / NO probability bar */}
      <View style={styles.barWrap}>
        <View style={[styles.barSegment, styles.yesBar, { flex: yes }]} />
        <View style={[styles.barSegment, styles.noBar, { flex: no }]} />
      </View>

      {/* YES / NO labels */}
      <View style={styles.probRow}>
        <View style={styles.probItem}>
          <View style={[styles.dot, { backgroundColor: colors.positive }]} />
          <Text style={[styles.probLabel, { color: colors.positive }]}>YES {yes}%</Text>
        </View>
        <View style={styles.probItem}>
          <View style={[styles.dot, { backgroundColor: colors.negative }]} />
          <Text style={[styles.probLabel, { color: colors.negative }]}>NO {no}%</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    padding: 18,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
    gap: 12,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  icon: {
    width: 44,
    height: 44,
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
    fontSize: 18,
  },
  meta: {
    flex: 1,
  },
  symbol: {
    color: colors.textPrimary,
    fontSize: 17,
    fontWeight: "900",
  },
  deadlineLabel: {
    color: colors.textMuted,
    fontSize: 12,
    marginTop: 2,
  },
  volume: {
    color: colors.textSecondary,
    fontSize: 13,
    fontWeight: "700",
  },
  question: {
    color: colors.textPrimary,
    fontSize: 15,
    fontWeight: "700",
    lineHeight: 22,
  },
  barWrap: {
    flexDirection: "row",
    height: 10,
    borderRadius: 999,
    overflow: "hidden",
    gap: 2,
  },
  barSegment: {
    borderRadius: 999,
  },
  yesBar: {
    backgroundColor: colors.positive,
  },
  noBar: {
    backgroundColor: colors.negative,
  },
  probRow: {
    flexDirection: "row",
    gap: 16,
  },
  probItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  probLabel: {
    fontSize: 13,
    fontWeight: "800",
  },
});

