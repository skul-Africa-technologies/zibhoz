import React, {
  useState,
  useCallback,
  useRef,
  useEffect,
} from "react";
import {
  View,
  SafeAreaView,
  StyleSheet,
  Text,
  ScrollView,
  Pressable,
  Animated,
  Modal,
  FlatList,
  AccessibilityInfo,
  TouchableOpacity,
  Platform,
} from "react-native";

import { MARKETS, CHAT, PORTFOLIO } from "../constants/data";
import colors from "../theme/colors";
import MarketCard from "../components/MarketCard";
import ChatBubble from "../components/ChatBubble";
import MicButton from "../components/MicButton";
import ConfirmationCard from "../components/ConfirmationCard";
import PortfolioCard from "../components/PortfolioCard";
import SvgIcon from "../components/SvgIcon";
import { isVoiceRecognitionSupported, listenForCommand } from "../utils/voiceCommands";

/* ─────────────────────────────────────────────────────────
   VOICE PHASE CONFIG
───────────────────────────────────────────── */
const VOICE = {
  idle:       { label: "Listening for command", color: "#FFFFFF",         sub: "Say markets, portfolio, history, settings, or trade" },
  listening:  { label: "Listening…",            color: colors.primary,    sub: "Go ahead, I'm ready"          },
  processing: { label: "Thinking…",             color: "#F7931A",         sub: "Fetching market data"          },
  speaking:   { label: "Speaking…",             color: "#0ECB81",         sub: "Playing voice response"        },
  error:      { label: "Couldn't hear you",     color: "#F6465D",         sub: "Listening again in a moment"   },
};

function resolveVoiceIntent(command) {
  if (command.includes("portfolio")) return { type: "portfolio" };
  if (command.includes("history") || command.includes("chat")) return { type: "chat" };
  if (command.includes("setting")) return { type: "settings" };
  if (command.includes("menu")) return { type: "menu" };
  if (command.includes("trade")) return { type: "trade" };
  if (command.includes("market") || command.includes("btc")) return { type: "market" };
  return { type: "unknown" };
}

/* ─────────────────────────────────────────────────────────
   RESULT CARD — shown boldly after voice interaction
   (replaces busy persistent tabs)
───────────────────────────────────────────── */
function VoiceResultCard({ result, onDismiss }) {
  const slideY  = useRef(new Animated.Value(60)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (result) {
      Animated.parallel([
        Animated.spring(slideY,  { toValue: 0, tension: 55, friction: 10, useNativeDriver: true }),
        Animated.timing(opacity, { toValue: 1, duration: 250, useNativeDriver: true }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(slideY,  { toValue: 60, duration: 200, useNativeDriver: true }),
        Animated.timing(opacity, { toValue: 0,  duration: 200, useNativeDriver: true }),
      ]).start();
    }
  }, [result]);

  if (!result) return null;

  return (
    <Animated.View
      style={[styles.resultCard, { opacity, transform: [{ translateY: slideY }] }]}
      accessible
      accessibilityLiveRegion="polite"
      accessibilityLabel={result.text}
    >
      {/* Market result */}
      {result.type === "market" && (
        <>
          <Text style={styles.resultEyebrow}>MARKET FOUND</Text>
          <Text style={styles.resultTitle}>{result.symbol}</Text>
          <Text style={styles.resultQuestion}>{result.question}</Text>
          <View style={styles.resultOddsRow}>
            <View style={styles.resultOddsBlock}>
              <Text style={styles.resultOddsYes}>{result.yes}%</Text>
              <Text style={styles.resultOddsLabel}>YES</Text>
            </View>
            <View style={styles.resultOddsDivider} />
            <View style={styles.resultOddsBlock}>
              <Text style={styles.resultOddsNo}>{result.no}%</Text>
              <Text style={styles.resultOddsLabel}>NO</Text>
            </View>
          </View>
          {/* Odds bar */}
          <View style={styles.oddsBar}>
            <View style={[styles.oddsBarYes, { flex: result.yes }]} />
            <View style={[styles.oddsBarNo,  { flex: result.no  }]} />
          </View>
          <View style={styles.resultMetaRow}>
            <Text style={styles.resultMeta}>Vol: {result.volume}</Text>
            <Text style={styles.resultMeta}>Closes: {result.deadline}</Text>
          </View>
        </>
      )}

      {/* AI text result */}
      {result.type === "text" && (
        <>
          <Text style={styles.resultEyebrow}>ZIBHOZ AI</Text>
          <Text style={styles.resultAiText}>{result.text}</Text>
        </>
      )}

      {/* Portfolio snapshot */}
      {result.type === "portfolio" && (
        <>
          <Text style={styles.resultEyebrow}>YOUR PORTFOLIO</Text>
          <Text style={styles.resultTitle}>$284.50</Text>
          <Text style={[styles.resultAiText, { color: "#0ECB81", marginTop: 4 }]}>▲ +$19.80 this week</Text>
          <View style={styles.resultMetaRow}>
            <Text style={styles.resultMeta}>3 open positions</Text>
            <Text style={styles.resultMeta}>Tap Portfolio for details</Text>
          </View>
        </>
      )}

      {/* Actions */}
      <View style={styles.resultActions}>
        <Pressable
          onPress={onDismiss}
          style={styles.resultDismiss}
          accessibilityLabel="Dismiss result"
          accessibilityRole="button"
        >
          <Text style={styles.resultDismissText}>Dismiss</Text>
        </Pressable>
        {result.type === "market" && (
          <Pressable
            onPress={result.onTrade}
            style={styles.resultTradeBtn}
            accessibilityLabel={`Trade ${result.symbol}`}
            accessibilityRole="button"
          >
            <Text style={styles.resultTradeBtnText}>Place Trade →</Text>
          </Pressable>
        )}
      </View>
    </Animated.View>
  );
}

/* ─────────────────────────────────────────────────────────
   BOTTOM DRAWER — slides up from bottom icon tap
───────────────────────────────────────────── */
function Drawer({ visible, title, titleIcon, onClose, children }) {
  const slideY = useRef(new Animated.Value(700)).current;

  useEffect(() => {
    Animated.spring(slideY, {
      toValue: visible ? 0 : 700,
      tension: 60,
      friction: 12,
      useNativeDriver: true,
    }).start();
  }, [visible]);

  return (
    <Modal
      transparent
      visible={visible}
      animationType="none"
      onRequestClose={onClose}
      accessibilityViewIsModal
    >
      <View style={styles.drawerBackdrop}>
        <Pressable style={StyleSheet.absoluteFill} onPress={onClose} accessibilityLabel="Close drawer" />
        <Animated.View style={[styles.drawerSheet, { transform: [{ translateY: slideY }] }]}>
          <View style={styles.drawerHandle} />
          <View style={styles.drawerHeader}>
            <View style={styles.drawerTitleRow}>
              {titleIcon ? (
                <SvgIcon name={titleIcon} size={18} color={colors.primary} strokeWidth={1.8} />
              ) : null}
              <Text style={styles.drawerTitle}>{title}</Text>
            </View>
            <Pressable onPress={onClose} style={styles.drawerClose} accessibilityLabel="Close" accessibilityRole="button">
              <SvgIcon name="close" size={20} color={colors.textMuted} />
            </Pressable>
          </View>
          {children}
        </Animated.View>
      </View>
    </Modal>
  );
}

/* ─────────────────────────────────────────────────────────
   PULSING RING — Shazam-style radar around mic
───────────────────────────────────────────── */
function RadarRings({ phase }) {
  const rings = [
    useRef(new Animated.Value(1)).current,
    useRef(new Animated.Value(1)).current,
    useRef(new Animated.Value(1)).current,
  ];
  const opacities = [
    useRef(new Animated.Value(0)).current,
    useRef(new Animated.Value(0)).current,
    useRef(new Animated.Value(0)).current,
  ];

  const active = phase === "listening" || phase === "speaking";
  const ringColor = VOICE[phase]?.color ?? "#fff";

  useEffect(() => {
    if (!active) {
      rings.forEach((r, i) => {
        Animated.timing(r,         { toValue: 1, duration: 300, useNativeDriver: true }).start();
        Animated.timing(opacities[i], { toValue: 0, duration: 300, useNativeDriver: true }).start();
      });
      return;
    }
    const anims = rings.map((r, i) =>
      Animated.loop(
        Animated.sequence([
          Animated.delay(i * 400),
          Animated.parallel([
            Animated.timing(r,            { toValue: 2.4, duration: 1400, useNativeDriver: true }),
            Animated.sequence([
              Animated.timing(opacities[i], { toValue: 0.35, duration: 200, useNativeDriver: true }),
              Animated.timing(opacities[i], { toValue: 0,    duration: 1200, useNativeDriver: true }),
            ]),
          ]),
          Animated.parallel([
            Animated.timing(r,            { toValue: 1, duration: 0, useNativeDriver: true }),
            Animated.timing(opacities[i], { toValue: 0, duration: 0, useNativeDriver: true }),
          ]),
        ])
      )
    );
    Animated.parallel(anims).start();
    return () => anims.forEach(a => a.stop());
  }, [active]);

  return (
    <View style={styles.radarWrap} pointerEvents="none">
      {rings.map((scale, i) => (
        <Animated.View
          key={i}
          style={[
            styles.radarRing,
            {
              borderColor: ringColor,
              opacity:     opacities[i],
              transform:   [{ scale }],
            },
          ]}
        />
      ))}
    </View>
  );
}

/* ─────────────────────────────────────────────────────────
   WAVE BARS — subtle audio indicator
───────────────────────────────────────────── */
function WaveBars({ phase }) {
  const bars = useRef([...Array(7)].map(() => new Animated.Value(0.15))).current;
  const active = phase === "listening" || phase === "speaking" || phase === "processing";
  const col = VOICE[phase]?.color ?? "#fff";

  useEffect(() => {
    if (!active) {
      bars.forEach(b => Animated.timing(b, { toValue: 0.15, duration: 200, useNativeDriver: false }).start());
      return;
    }
    const anims = bars.map((b, i) =>
      Animated.loop(
        Animated.sequence([
          Animated.timing(b, { toValue: 0.2 + Math.random() * 0.8, duration: 180 + i * 30, useNativeDriver: false }),
          Animated.timing(b, { toValue: 0.1 + Math.random() * 0.3, duration: 180 + i * 30, useNativeDriver: false }),
        ])
      )
    );
    Animated.parallel(anims).start();
    return () => anims.forEach(a => a.stop());
  }, [phase]);

  return (
    <View style={styles.waveBars}>
      {bars.map((b, i) => (
        <Animated.View
          key={i}
          style={{
            width: 4,
            borderRadius: 2,
            backgroundColor: col,
            height: b.interpolate({ inputRange: [0, 1], outputRange: [4, 32] }),
            opacity: active ? 0.9 : 0.25,
          }}
        />
      ))}
    </View>
  );
}

/* ─────────────────────────────────────────────────────────
   TX RESULT OVERLAY
───────────────────────────────────────────── */
function TxResult({ result, onClose }) {
  if (!result) return null;
  const ok = result.status === "success";
  const pending = result.status === "pending";
  return (
    <Modal transparent animationType="fade" visible accessibilityViewIsModal>
      <View style={styles.txBackdrop}>
        <View style={[styles.txCard, { borderColor: ok ? "rgba(14,203,129,.3)" : pending ? "rgba(247,147,26,.3)" : "rgba(246,70,93,.3)" }]}>
          <View style={styles.txIconWrap}>
            <SvgIcon
              name={ok ? "check" : pending ? "timer" : "closeCircle"}
              size={28}
              color={ok ? "#0ECB81" : pending ? "#F7931A" : colors.negative}
              strokeWidth={2}
            />
          </View>
          <Text style={styles.txTitle}>{ok ? "Trade Executed!" : pending ? "Pending…" : result.errorTitle ?? "Failed"}</Text>
          <Text style={styles.txBody}>
            {ok      && "0.5 SOL placed on YES. Est. return: ~0.71 SOL."}
            {pending && "Submitted. Awaiting on-chain confirmation."}
            {!ok && !pending && (result.errorMsg ?? "No funds moved. Try again.")}
          </Text>
          {(ok || pending) && (
            <View style={styles.txHash}>
              <Text style={styles.txHashLabel}>TX HASH</Text>
              <Text style={styles.txHashVal}>5xH7k…mNp3q</Text>
            </View>
          )}
          <Pressable onPress={onClose} style={[styles.txBtn, { backgroundColor: ok ? "#0ECB81" : pending ? "#F7931A" : colors.negative }]} accessibilityLabel="Close">
            <Text style={styles.txBtnText}>{ok ? "View Portfolio →" : "Got it"}</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

/* ─────────────────────────────────────────────────────────
   MAIN SCREEN
───────────────────────────────────────────── */
export default function MainAppScreen() {
  const [voicePhase, setVoicePhase] = useState("idle");
  const [voiceResult, setVoiceResult] = useState(null);
  const [confirmTrade, setConfirmTrade] = useState(null);
  const [txResult, setTxResult] = useState(null);
  const [messages, setMessages] = useState(CHAT);

  /* Drawer states — one at a time */
  const [drawer, setDrawer] = useState(null); // "markets" | "chat" | "portfolio" | "settings" | "menu"

  const msgCounter = useRef(CHAT.length);
  const stopListeningRef = useRef(null);

  const runResolvedIntent = useCallback((commandText) => {
    const command = (commandText || "show me btc market odds").toLowerCase();
    const intent = resolveVoiceIntent(command);
    setVoicePhase("speaking");

    if (intent.type === "portfolio") {
      setDrawer("portfolio");
      setVoiceResult({
        type: "portfolio",
        text: "Opening your portfolio snapshot.",
      });
      AccessibilityInfo.announceForAccessibility("Opening portfolio.");
    } else if (intent.type === "chat") {
      setDrawer("chat");
      setVoiceResult({ type: "text", text: "Opening your voice history now." });
      AccessibilityInfo.announceForAccessibility("Opening voice history.");
    } else if (intent.type === "settings") {
      setDrawer("settings");
      setVoiceResult({ type: "text", text: "Opening settings." });
      AccessibilityInfo.announceForAccessibility("Opening settings.");
    } else if (intent.type === "menu") {
      setDrawer("menu");
      setVoiceResult({ type: "text", text: "Opening menu." });
      AccessibilityInfo.announceForAccessibility("Opening menu.");
    } else if (intent.type === "trade") {
      setVoiceResult(null);
      setConfirmTrade({
        action: "BUY",
        amount: "0.5 SOL",
        outcome: "YES",
        market: "Will BTC exceed $100K by June 2025?",
      });
      AccessibilityInfo.announceForAccessibility("Preparing trade confirmation.");
    } else if (intent.type === "market") {
      const aiText = "BTC market: Will BTC exceed $100K by June? — 67% YES, 33% NO. Volume $2.4M. Want to place a trade?";
      msgCounter.current += 1;
      setMessages(prev => [...prev, { id: `msg-${msgCounter.current}`, role: "ai", text: aiText }]);
      setVoiceResult({
        type: "market",
        symbol: "BTC",
        question: "Will BTC exceed $100K by June 2025?",
        yes: 67,
        no: 33,
        volume: "$2.4M",
        deadline: "Jun 30",
        onTrade: () => {
          setVoiceResult(null);
          setConfirmTrade({
            action: "BUY",
            amount: "0.5 SOL",
            outcome: "YES",
            market: "Will BTC exceed $100K by June 2025?",
          });
        },
      });
      AccessibilityInfo.announceForAccessibility(aiText);
    } else {
      const text = "I can open markets, portfolio, history, settings, or start a trade. What should I do?";
      setVoiceResult({ type: "text", text });
      AccessibilityInfo.announceForAccessibility(text);
    }

    setTimeout(() => setVoicePhase("idle"), 1400);
  }, []);

  /* ── Voice mic handler ── */
  const handleMicPress = useCallback(() => {
    if (voicePhase !== "idle" || confirmTrade || txResult) return;
    setVoiceResult(null);
    stopListeningRef.current?.();
    AccessibilityInfo.announceForAccessibility("What would you like to do?");
    setVoicePhase("listening");
    const fallbackCommand = "show me btc market odds";

    if (isVoiceRecognitionSupported()) {
      stopListeningRef.current = listenForCommand({
        timeoutMs: 4200,
        onResult: (heard) => {
          setVoicePhase("processing");
          const spoken = heard || fallbackCommand;
          msgCounter.current += 1;
          setMessages(prev => [...prev, { id: `msg-${msgCounter.current}`, role: "user", text: spoken }]);
          setTimeout(() => runResolvedIntent(spoken), 900);
        },
        onError: () => {
          setVoicePhase("processing");
          msgCounter.current += 1;
          setMessages(prev => [...prev, { id: `msg-${msgCounter.current}`, role: "user", text: fallbackCommand }]);
          setTimeout(() => runResolvedIntent(fallbackCommand), 900);
        },
      });
      return;
    }

    setTimeout(() => {
      setVoicePhase("processing");
      msgCounter.current += 1;
      setMessages(prev => [...prev, { id: `msg-${msgCounter.current}`, role: "user", text: fallbackCommand }]);
      setTimeout(() => runResolvedIntent(fallbackCommand), 900);
    }, 1200);
  }, [voicePhase, confirmTrade, txResult, runResolvedIntent]);

  useEffect(() => {
    if (voicePhase === "idle" && !confirmTrade && !txResult) {
      const timer = setTimeout(() => handleMicPress(), 900);
      return () => clearTimeout(timer);
    }
  }, [voicePhase, confirmTrade, txResult, handleMicPress]);

  useEffect(() => () => stopListeningRef.current?.(), []);

  /* ── Confirm handlers ── */
  const handleConfirm = useCallback(() => {
    setConfirmTrade(null);
    const r = Math.random();
    if (r < 0.6)      setTxResult({ status: "success" });
    else if (r < 0.8) setTxResult({ status: "pending" });
    else               setTxResult({ status: "error", errorTitle: "Insufficient Balance", errorMsg: "Not enough SOL to cover trade + fees." });
  }, []);

  const handleCancel = useCallback(() => {
    setConfirmTrade(null);
    msgCounter.current += 1;
    setMessages(prev => [...prev, { id: `msg-${msgCounter.current}`, role: "ai", text: "Trade cancelled. No funds were moved." }]);
  }, []);

  const handleTxClose = useCallback(() => {
    const wasSuccess = txResult?.status === "success";
    setTxResult(null);
    if (wasSuccess) setDrawer("portfolio");
  }, [txResult]);

  /* ── Phase info ── */
  const phase = VOICE[voicePhase] ?? VOICE.idle;

  /* ── Bottom nav icons ── */
  const NAV = [
    { id: "menu",      icon: "hamburger", label: "Menu"      },
    { id: "markets",   icon: "markets",   label: "Markets"   },
    { id: "chat",      icon: "chat",      label: "History"   },
    { id: "portfolio", icon: "portfolio", label: "Portfolio" },
    { id: "settings",  icon: "settings",  label: "Settings"  },
  ];

  return (
    <SafeAreaView style={styles.container}>

      {/* ── AMBIENT GLOW (color shifts with voice phase) ── */}
      <View style={[styles.ambientGlow, { backgroundColor: `${phase.color}18` }]} />

      {/* ── TOP BAR: just brand + status pill ── */}
      <View style={styles.topBar}>
        <View>
          <Text style={styles.brand}>ZIBHOZ</Text>
          <Text style={styles.brandSub}>Voice-first prediction markets</Text>
        </View>
        <View style={[styles.statusPill, { borderColor: `${phase.color}60` }]}>
          <View style={[styles.statusDot, { backgroundColor: phase.color }]} />
          <Text style={[styles.statusText, { color: phase.color }]}>
            {voicePhase === "idle" ? "Ready" : voicePhase.charAt(0).toUpperCase() + voicePhase.slice(1)}
          </Text>
        </View>
      </View>

      {/* ── CORE HERO: Full-screen mic centrepiece ── */}
      <View style={styles.hero}>

        {/* Radar rings radiate from mic */}
        <RadarRings phase={voicePhase} />

        {/* Mic button — the ONE thing on screen */}
        <MicButton onPress={handleMicPress} voiceState={voicePhase} />

        {/* Phase label */}
        <View style={styles.phaseBlock}>
          <Text style={[styles.phaseLabel, { color: phase.color }]}>{phase.label}</Text>
          <Text style={styles.phaseSub}>{phase.sub}</Text>
        </View>

        {/* Audio wave (only when active) */}
        {voicePhase !== "idle" && <WaveBars phase={voicePhase} />}

        {/* Suggestion hints (idle only — minimal) */}
        {voicePhase === "idle" && (
          <View style={styles.hints}>
            {['"BTC market odds"', '"My portfolio"', '"Place a trade"'].map(h => (
              <View key={h} style={styles.hintChip}>
                <Text style={styles.hintText}>{h}</Text>
              </View>
            ))}
          </View>
        )}
      </View>

      {/* ── VOICE RESULT CARD — appears after AI responds ── */}
      <VoiceResultCard
        result={voiceResult}
        onDismiss={() => setVoiceResult(null)}
      />

      {/* ── BOTTOM NAV: slim icon row ── */}
      <View style={styles.navBar}>
        {NAV.map(n => (
          <Pressable
            key={n.id}
            onPress={() => setDrawer(n.id)}
            style={styles.navItem}
            accessibilityRole="button"
            accessibilityLabel={`Open ${n.label}`}
          >
            <SvgIcon name={n.icon} size={20} color={colors.textMuted} />
            <Text style={styles.navLabel}>{n.label}</Text>
          </Pressable>
        ))}
      </View>

      {/* ── DRAWERS ── */}

      {/* Markets drawer */}
      <Drawer visible={drawer === "markets"} title="Markets" titleIcon="markets" onClose={() => setDrawer(null)}>
        <ScrollView style={styles.drawerScroll} showsVerticalScrollIndicator={false}>
          <View style={{ gap: 12, paddingBottom: 40 }}>
            {MARKETS.map(item => (
              <Pressable
                key={item.id}
                onPress={() => {
                  setDrawer(null);
                  setConfirmTrade({ action: "BUY", amount: "0.5 SOL", outcome: "YES", market: item.question ?? item.symbol });
                }}
                accessibilityRole="button"
                accessibilityLabel={`${item.symbol} market. Tap to trade.`}
              >
                <MarketCard
                  symbol={item.symbol}
                  question={item.question}
                  yes={item.yes}
                  no={item.no}
                  volume={item.volume}
                  deadline={item.deadline}
                />
              </Pressable>
            ))}
          </View>
        </ScrollView>
      </Drawer>

      {/* Chat / History drawer */}
      <Drawer visible={drawer === "chat"} title="Voice History" titleIcon="chat" onClose={() => setDrawer(null)}>
        <ScrollView style={styles.drawerScroll} showsVerticalScrollIndicator={false}>
          <View style={{ gap: 10, paddingBottom: 40 }}>
            {messages.map(item => (
              <ChatBubble key={item.id} role={item.role} text={item.text} />
            ))}
          </View>
        </ScrollView>
      </Drawer>

      {/* Portfolio drawer */}
      <Drawer visible={drawer === "portfolio"} title="Portfolio" titleIcon="portfolio" onClose={() => setDrawer(null)}>
        {/* Summary */}
        <View style={styles.portfolioSummary}>
          <Text style={styles.portfolioSummaryLabel}>TOTAL VALUE</Text>
          <Text style={styles.portfolioSummaryValue}>$284.50</Text>
          <Text style={styles.portfolioSummaryPnl}>▲ +$19.80 (+7.5%) this week</Text>
        </View>
        <ScrollView style={[styles.drawerScroll, { marginTop: 14 }]} showsVerticalScrollIndicator={false}>
          <View style={{ gap: 12, paddingBottom: 40 }}>
            {PORTFOLIO.map(item => (
              <PortfolioCard
                key={item.id}
                symbol={item.symbol}
                outcome={item.outcome}
                amount={item.amount}
                pnl={item.pnl}
                status={item.status}
              />
            ))}
          </View>
        </ScrollView>
      </Drawer>

      {/* Settings drawer */}
      <Drawer visible={drawer === "settings"} title="Settings" titleIcon="settings" onClose={() => setDrawer(null)}>
        <ScrollView style={styles.drawerScroll} showsVerticalScrollIndicator={false}>
          <View style={{ gap: 12, paddingBottom: 40 }}>
            {[
              { icon: "settings", label: "Voice Output",  sub: "ElevenLabs · Neural TTS",          isCustom: true  },
              { icon: "voiceOrb",      label: "Microphone",     sub: "Input sensitivity & language",      isCustom: true  },
              { icon: "accessibility", label: "Accessibility",  sub: "Contrast, text size, screen reader", isCustom: true },
              { icon: "notifications", label: "Notifications",  sub: "Market alerts & trade updates",     isCustom: true },
              { icon: "shield",   label: "Security",       sub: "Wallet & transaction settings",     isCustom: true  },
            ].map(s => (
              <Pressable
                key={s.label}
                style={styles.settingRow}
                accessibilityRole="button"
                accessibilityLabel={`${s.label}. ${s.sub}`}
              >
                {s.isCustom ? (
                  <SvgIcon name={s.icon} size={20} color={colors.primary} strokeWidth={1.8} />
                ) : (
                  <Text style={styles.settingIcon}>{s.icon}</Text>
                )}
                <View style={{ flex: 1 }}>
                  <Text style={styles.settingLabel}>{s.label}</Text>
                  <Text style={styles.settingSub}>{s.sub}</Text>
                </View>
                <Text style={styles.settingChevron}>›</Text>
              </Pressable>
            ))}
          </View>
        </ScrollView>
      </Drawer>

      {/* Menu drawer */}
      <Drawer visible={drawer === "menu"} title="Menu" titleIcon="hamburger" onClose={() => setDrawer(null)}>
        <ScrollView style={styles.drawerScroll} showsVerticalScrollIndicator={false}>
          <View style={{ gap: 12, paddingBottom: 40 }}>
            {[
              { icon: "home",     label: "Home",          action: () => setDrawer(null),          isCustom: true  },
              { icon: "markets",  label: "Markets",       action: () => setDrawer("markets"),      isCustom: true  },
              { icon: "portfolio",label: "Portfolio",     action: () => setDrawer("portfolio"),    isCustom: true  },
              { icon: "chat",     label: "Voice History", action: () => setDrawer("chat"),         isCustom: true  },
              { icon: "settings", label: "Settings",      action: () => setDrawer("settings"),     isCustom: true  },
              { icon: "help",     label: "Help & Docs",   action: () => {},                        isCustom: true  },
            ].map(m => (
              <Pressable
                key={m.label}
                onPress={m.action}
                style={styles.menuRow}
                accessibilityRole="menuitem"
                accessibilityLabel={m.label}
              >
                {m.isCustom ? (
                  <SvgIcon name={m.icon} size={20} color={colors.primary} strokeWidth={1.8} />
                ) : (
                  <Text style={styles.menuIcon}>{m.icon}</Text>
                )}
                <Text style={styles.menuLabel}>{m.label}</Text>
                <Text style={styles.settingChevron}>›</Text>
              </Pressable>
            ))}
          </View>
        </ScrollView>
      </Drawer>

      {/* ── OVERLAYS ── */}
      <ConfirmationCard
        visible={!!confirmTrade}
        trade={confirmTrade}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
      <TxResult result={txResult} onClose={handleTxClose} />
    </SafeAreaView>
  );
}

/* ─────────────────────────────────────────────────────────
   STYLES
───────────────────────────────────────────── */
const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  /* Ambient glow behind everything */
  ambientGlow: {
    position: "absolute",
    top: "20%",
    alignSelf: "center",
    width: 340,
    height: 340,
    borderRadius: 170,
  },

  /* Top bar */
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 22,
    paddingTop: 10,
    paddingBottom: 6,
  },
  brand: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "900",
    letterSpacing: 4,
  },
  brandSub: {
    color: "rgba(255,255,255,0.3)",
    fontSize: 10,
    fontWeight: "600",
    letterSpacing: 0.3,
    marginTop: 1,
  },
  statusPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.05)",
    borderWidth: 1,
  },
  statusDot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
  },
  statusText: {
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 0.5,
  },

  /* Hero centrepiece */
  hero: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 24,
    paddingHorizontal: 24,
  },

  /* Radar */
  radarWrap: {
    position: "absolute",
    width: 180,
    height: 180,
    alignItems: "center",
    justifyContent: "center",
  },
  radarRing: {
    position: "absolute",
    width: 160,
    height: 160,
    borderRadius: 80,
    borderWidth: 1.5,
  },

  /* Phase text */
  phaseBlock: {
    alignItems: "center",
    gap: 4,
  },
  phaseLabel: {
    fontSize: 22,
    fontWeight: "900",
    letterSpacing: 0.3,
  },
  phaseSub: {
    color: "rgba(255,255,255,0.35)",
    fontSize: 13,
    fontWeight: "500",
  },

  /* Wave bars */
  waveBars: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    height: 36,
  },

  /* Suggestion hints */
  hints: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 8,
    marginTop: 8,
  },
  hintChip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.05)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.09)",
  },
  hintText: {
    color: "rgba(255,255,255,0.35)",
    fontSize: 12,
    fontWeight: "600",
  },

  /* Voice result card */
  resultCard: {
    marginHorizontal: 18,
    marginBottom: 12,
    backgroundColor: colors.surface,
    borderRadius: 22,
    padding: 20,
    borderWidth: 1,
    borderColor: colors.primaryBorder,
    gap: 10,
    shadowColor: colors.primary,
    shadowOpacity: 0.15,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 6 },
    elevation: 8,
  },
  resultEyebrow: {
    color: colors.primary,
    fontSize: 10,
    fontWeight: "900",
    letterSpacing: 2,
  },
  resultTitle: {
    color: "#fff",
    fontSize: 32,
    fontWeight: "900",
    letterSpacing: -1,
  },
  resultQuestion: {
    color: "rgba(255,255,255,0.55)",
    fontSize: 13,
    lineHeight: 19,
  },
  resultOddsRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    marginTop: 4,
  },
  resultOddsBlock: {
    alignItems: "center",
    flex: 1,
  },
  resultOddsYes: {
    color: "#0ECB81",
    fontSize: 28,
    fontWeight: "900",
  },
  resultOddsNo: {
    color: "#F6465D",
    fontSize: 28,
    fontWeight: "900",
  },
  resultOddsLabel: {
    color: "rgba(255,255,255,0.35)",
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 1,
  },
  resultOddsDivider: {
    width: 1,
    height: 44,
    backgroundColor: "rgba(255,255,255,0.1)",
  },
  oddsBar: {
    flexDirection: "row",
    height: 6,
    borderRadius: 3,
    overflow: "hidden",
    gap: 2,
  },
  oddsBarYes: {
    backgroundColor: "#0ECB81",
    borderRadius: 3,
  },
  oddsBarNo: {
    backgroundColor: "#F6465D",
    borderRadius: 3,
  },
  resultMetaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  resultMeta: {
    color: "rgba(255,255,255,0.3)",
    fontSize: 12,
  },
  resultAiText: {
    color: "rgba(255,255,255,0.75)",
    fontSize: 15,
    lineHeight: 22,
  },
  resultActions: {
    flexDirection: "row",
    gap: 10,
    marginTop: 4,
  },
  resultDismiss: {
    flex: 1,
    padding: 13,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
    alignItems: "center",
  },
  resultDismissText: {
    color: "rgba(255,255,255,0.4)",
    fontSize: 13,
    fontWeight: "700",
  },
  resultTradeBtn: {
    flex: 2,
    padding: 13,
    borderRadius: 12,
    backgroundColor: colors.primary,
    alignItems: "center",
  },
  resultTradeBtnText: {
    color: colors.textOnYellow,
    fontSize: 13,
    fontWeight: "900",
  },

  /* Bottom nav */
  navBar: {
    flexDirection: "row",
    paddingHorizontal: 8,
    paddingVertical: 10,
    paddingBottom: Platform.OS === "ios" ? 24 : 12,
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.06)",
    backgroundColor: "rgba(18,18,18,0.95)",
  },
  navItem: {
    flex: 1,
    alignItems: "center",
    gap: 3,
    paddingVertical: 4,
  },
  navLabel: {
    color: "rgba(255,255,255,0.3)",
    fontSize: 9,
    fontWeight: "700",
    letterSpacing: 0.3,
  },

  /* Drawer */
  drawerBackdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.75)",
    justifyContent: "flex-end",
  },
  drawerSheet: {
    backgroundColor: colors.surface,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    maxHeight: "80%",
    borderTopWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 20,
    paddingBottom: 0,
  },
  drawerHandle: {
    width: 38,
    height: 4,
    borderRadius: 2,
    backgroundColor: "rgba(255,255,255,0.15)",
    alignSelf: "center",
    marginTop: 12,
    marginBottom: 4,
  },
  drawerHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.06)",
    marginBottom: 14,
  },
  drawerTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  drawerTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "900",
  },
  drawerClose: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: "rgba(255,255,255,0.07)",
    alignItems: "center",
    justifyContent: "center",
  },
  drawerCloseText: {
    color: "rgba(255,255,255,0.5)",
    fontSize: 14,
    fontWeight: "800",
  },
  drawerScroll: {
    flexGrow: 0,
  },

  /* Portfolio summary in drawer */
  portfolioSummary: {
    backgroundColor: colors.primaryDim,
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: colors.primaryBorder,
    gap: 4,
  },
  portfolioSummaryLabel: {
    color: "rgba(255,255,255,0.35)",
    fontSize: 10,
    fontWeight: "900",
    letterSpacing: 1.5,
  },
  portfolioSummaryValue: {
    color: "#fff",
    fontSize: 34,
    fontWeight: "900",
    letterSpacing: -1,
  },
  portfolioSummaryPnl: {
    color: "#0ECB81",
    fontSize: 14,
    fontWeight: "700",
  },

  /* Settings rows */
  settingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    padding: 16,
    backgroundColor: "rgba(255,255,255,0.03)",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.07)",
  },
  settingIcon: { fontSize: 22 },
  settingLabel: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "800",
    marginBottom: 2,
  },
  settingSub: {
    color: "rgba(255,255,255,0.35)",
    fontSize: 11,
  },
  settingChevron: {
    color: "rgba(255,255,255,0.2)",
    fontSize: 22,
    fontWeight: "300",
  },

  /* Menu rows */
  menuRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    padding: 16,
    backgroundColor: "rgba(255,255,255,0.03)",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.07)",
  },
  menuIcon:  { fontSize: 22 },
  menuLabel: {
    flex: 1,
    color: "#fff",
    fontSize: 15,
    fontWeight: "800",
  },

  /* TX result */
  txBackdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.92)",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  txCard: {
    width: "100%",
    maxWidth: 340,
    backgroundColor: colors.surface,
    borderRadius: 28,
    padding: 32,
    alignItems: "center",
    borderWidth: 1,
    gap: 10,
  },
  txIconWrap: { width: 48, height: 48, borderRadius: 24, borderWidth: 1, borderColor: "rgba(255,255,255,0.14)", backgroundColor: "rgba(255,255,255,0.04)", alignItems: "center", justifyContent: "center" },
  txTitle:   { color: "#fff", fontSize: 21, fontWeight: "900", textAlign: "center" },
  txBody:    { color: "rgba(255,255,255,0.4)", fontSize: 13, textAlign: "center", lineHeight: 20 },
  txHash:    { backgroundColor: "rgba(255,255,255,0.04)", borderRadius: 10, padding: 12, width: "100%", alignItems: "center", borderWidth: 1, borderColor: "rgba(255,255,255,0.07)" },
  txHashLabel: { color: "rgba(255,255,255,0.25)", fontSize: 9, letterSpacing: 1, marginBottom: 3 },
  txHashVal: { color: colors.primary, fontSize: 12 },
  txBtn:     { width: "100%", padding: 15, borderRadius: 12, alignItems: "center", marginTop: 4 },
  txBtnText: { color: "#fff", fontSize: 15, fontWeight: "900" },
});
