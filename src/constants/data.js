// Prediction market data
export const MARKETS = [
  {
    id: 1,
    symbol: "BTC",
    question: "Will BTC exceed $100K by June 2025?",
    yes: 67,
    no: 33,
    volume: "$2.4M",
    deadline: "Jun 30",
  },
  {
    id: 2,
    symbol: "ETH",
    question: "Will ETH flip BTC market cap in 2025?",
    yes: 12,
    no: 88,
    volume: "$890K",
    deadline: "Dec 31",
  },
  {
    id: 3,
    symbol: "SOL",
    question: "Will SOL reach $300 this month?",
    yes: 41,
    no: 59,
    volume: "$1.1M",
    deadline: "May 31",
  },
];

export const PORTFOLIO = [
  { id: "p1", symbol: "BTC", outcome: "YES", amount: "$50.00", pnl: "+$12.40", status: "active" },
  { id: "p2", symbol: "SOL", outcome: "NO", amount: "$30.00", pnl: "-$4.20", status: "active" },
];

export const CHAT = [
  {
    id: "c1",
    role: "ai",
    text: "Welcome to Zibhoz. I can help you discover markets, explain outcomes, and execute trades by voice. What would you like to explore?",
  },
  { id: "c2", role: "user", text: "Show me the BTC market" },
  {
    id: "c3",
    role: "ai",
    text: "BTC market: \"Will BTC exceed $100K by June?\" — 67% YES, 33% NO. Volume: $2.4M. Deadline: June 30. Would you like to place a trade?",
  },
];
