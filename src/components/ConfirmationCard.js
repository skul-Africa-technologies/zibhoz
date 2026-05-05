import React from "react";
import { View, Text, Pressable, StyleSheet, Modal } from "react-native";
import colors from "../theme/colors";

// Displayed as a modal overlay before any trade executes.
// Safety requirement: always read out details + require double confirmation.
export default function ConfirmationCard({ visible, trade, onConfirm, onCancel }) {
  if (!trade) return null;

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.card}>
          {/* Header */}
          <View style={styles.cardHeader}>
            <View style={styles.warningBadge}>
              <Text style={styles.warningDot}>⚠</Text>
              <Text style={styles.warningText}>CONFIRM TRADE</Text>
            </View>
          </View>

          {/* Trade summary */}
          <View style={styles.summaryBox}>
            <Text style={styles.actionLabel}>{trade.action}</Text>
            <Text style={styles.amount}>{trade.amount}</Text>
            <View style={styles.outcomePill}>
              <Text style={styles.outcomeText}>{trade.outcome}</Text>
            </View>
          </View>

          <View style={styles.marketRow}>
            <Text style={styles.marketLabel}>MARKET</Text>
            <Text style={styles.market}>{trade.market}</Text>
          </View>

          {/* Divider */}
          <View style={styles.divider} />

          <Text style={styles.confirmNote}>
            This trade will be submitted to the blockchain and cannot be undone.
          </Text>

          {/* Actions */}
          <View style={styles.actionRow}>
            <Pressable style={styles.cancelButton} onPress={onCancel}>
              <Text style={styles.cancelButtonText}>✕  CANCEL</Text>
            </Pressable>
            <Pressable style={styles.confirmButton} onPress={onConfirm}>
              <Text style={styles.confirmButtonText}>✓  CONFIRM</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.90)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  card: {
    width: "100%",
    backgroundColor: colors.surface,
    borderRadius: 28,
    padding: 24,
    borderWidth: 1,
    borderColor: colors.primaryBorder,
    gap: 18,
  },
  cardHeader: {
    alignItems: "center",
  },
  warningBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "rgba(255,59,48,0.12)",
    borderWidth: 1,
    borderColor: "rgba(255,59,48,0.30)",
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 999,
  },
  warningDot: {
    fontSize: 12,
    color: colors.negative,
  },
  warningText: {
    color: colors.negative,
    fontWeight: "900",
    fontSize: 12,
    letterSpacing: 1.2,
  },
  summaryBox: {
    backgroundColor: colors.surfaceAlt,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 20,
    alignItems: "center",
    gap: 8,
  },
  actionLabel: {
    color: colors.textMuted,
    fontSize: 11,
    fontWeight: "900",
    letterSpacing: 2,
    textTransform: "uppercase",
  },
  amount: {
    color: colors.primary,
    fontSize: 56,
    fontWeight: "900",
    lineHeight: 64,
  },
  outcomePill: {
    backgroundColor: colors.primaryDim,
    borderWidth: 1,
    borderColor: colors.primaryBorder,
    paddingHorizontal: 20,
    paddingVertical: 6,
    borderRadius: 999,
  },
  outcomeText: {
    color: colors.primary,
    fontWeight: "900",
    fontSize: 16,
    letterSpacing: 1,
  },
  marketRow: {
    gap: 4,
  },
  marketLabel: {
    color: colors.textMuted,
    fontSize: 10,
    fontWeight: "900",
    letterSpacing: 1.5,
  },
  market: {
    color: colors.textSecondary,
    fontSize: 14,
    fontWeight: "600",
    lineHeight: 20,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
  },
  confirmNote: {
    color: colors.textMuted,
    fontSize: 13,
    lineHeight: 20,
    textAlign: "center",
  },
  actionRow: {
    flexDirection: "row",
    gap: 10,
  },
  confirmButton: {
    flex: 1,
    backgroundColor: colors.primary,
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: "center",
    shadowColor: colors.primary,
    shadowOpacity: 0.35,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },
  confirmButtonText: {
    color: colors.textOnYellow,
    fontWeight: "900",
    fontSize: 15,
    letterSpacing: 0.6,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: colors.surfaceElevated,
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.borderStrong,
  },
  cancelButtonText: {
    color: colors.negative,
    fontWeight: "900",
    fontSize: 15,
    letterSpacing: 0.6,
  },
});
