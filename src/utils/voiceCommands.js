import { Platform } from "react-native";

function getRecognitionConstructor() {
  if (Platform.OS !== "web" || typeof window === "undefined") return null;
  return window.SpeechRecognition || window.webkitSpeechRecognition || null;
}

export function isVoiceRecognitionSupported() {
  return !!getRecognitionConstructor();
}

export function listenForCommand({
  onResult,
  onError,
  onStart,
  onEnd,
  lang = "en-US",
  timeoutMs = 6000,
}) {
  const Recognition = getRecognitionConstructor();
  if (!Recognition) {
    onError?.(new Error("Voice recognition not supported"));
    return () => {};
  }

  const recognition = new Recognition();
  recognition.lang = lang;
  recognition.continuous = false;
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  let settled = false;
  const stopTimer = setTimeout(() => {
    if (!settled) recognition.stop();
  }, timeoutMs);

  recognition.onstart = () => onStart?.();
  recognition.onresult = (event) => {
    clearTimeout(stopTimer);
    settled = true;
    const transcript = event.results?.[0]?.[0]?.transcript?.trim() ?? "";
    onResult?.(transcript.toLowerCase());
  };
  recognition.onerror = (event) => {
    clearTimeout(stopTimer);
    settled = true;
    onError?.(event);
  };
  recognition.onend = () => {
    clearTimeout(stopTimer);
    onEnd?.();
  };

  recognition.start();
  return () => {
    clearTimeout(stopTimer);
    recognition.stop();
  };
}
