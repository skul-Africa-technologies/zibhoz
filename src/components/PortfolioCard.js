import React from "react";
import { View, Text, StyleSheet } from "react-native";
import colors from "../theme/colors";

export default function PortfolioCard({ symbol, outcome, amount, pnl, status }) {
  const isProfit = pnl.startsWith("+");
  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <View style={[styles.icon, { backgroundColor: outcome === "YES" ? "rgba(0,230,118,0.12)" : "rgba(255,59,48,0.12)" }]}>
          <Text style={[styles.iconText, { color: outcome === "YES" ? colors.positive : colors.negative }]}>
            {symbol.slice(0, 1)}
          </Text>
        </View>
        <View style={styles.meta}>
          <Text style={styles.symbol}>{symbol}</Text>
          <View style={[styles.outcomePill, { backgroundColor: outcome === "YES" ? "rgba(0,230,118,0.15)" : "rgba(255,59,48,0.15)" }]}>
            <Text style={[styles.outcomeText, { color: outcome === "YES" ? colors.positive : colors.negative }]}>
              {outcome}
            </Text>
          </View>
        </View>
        <View style={styles.right}>
          <Text style={styles.amount}>{amount}</Text>
          <Text style={[styles.pnl, { color: isProfit ? colors.positive : colors.negative }]}>{pnl}</Text>
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
    alignItems: "center",
    justifyContent: "center",
  },
  iconText: {
    fontWeight: "900",
    fontSize: 18,
  },
  meta: {
    flex: 1,
    gap: 6,
  },
  symbol: {
    color: colors.textPrimary,
    fontSize: 17,
    fontWeight: "900",
  },
  outcomePill: {
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 999,
  },
  outcomeText: {
    fontSize: 11,
    fontWeight: "900",
    letterSpacing: 1,
  },
  right: {
    alignItems: "flex-end",
    gap: 4,
  },
  amount: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: "900",
  },
  pnl: {
    fontSize: 14,
    fontWeight: "800",
  },
});
