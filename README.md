# Zibhoz — Voice Trading AI

Zibhoz is a mobile application built with **Expo** and **React Native** that lets you monitor crypto markets and interact with an AI trading assistant using your voice.

---

## Features

- **Onboarding** — branded splash screen to get started
- **Wallet connection** — connect via Phantom Wallet or WalletConnect
- **Markets tab** — live-style market cards with price and change data
- **Chat tab** — conversational AI interface for voice-driven trading queries
- **Mic button** — tap-to-speak interaction

---

## Project Structure

```
zibhoz/
├── App.js                  # Root component & screen router
├── app.json                # Expo configuration
├── eas.json                # EAS Build profiles
├── assets/                 # App icons and splash images
└── src/
    ├── constants/          # Static data (markets, chat messages)
    ├── theme/              # Color palette
    ├── components/         # Reusable UI components
    │   ├── ChatBubble.js
    │   ├── MarketCard.js
    │   ├── MicButton.js
    │   └── TabBar.js
    └── screens/            # Full-screen views
        ├── OnboardScreen.js
        ├── WalletScreen.js
        └── MainAppScreen.js
```

---

## Prerequisites

| Tool | Version | Notes |
|---|---|---|
| [Node.js](https://nodejs.org) | 18 LTS or newer | Required by Expo |
| [npm](https://www.npmjs.com) | Comes with Node.js | Used to install packages |
| [Expo Go](https://expo.dev/go) | Latest | Install on your iOS or Android device |

> **No Android Studio or Xcode required** to run the app in development — Expo Go handles it.

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/xtreemtechnology/zibhoz.git
cd zibhoz
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the Expo development server

```bash
npm start
# or equivalently
npx expo start
```

This opens the **Expo Dev Tools** in your terminal and shows a QR code.

### 4. Run on your device

**iOS or Android (physical device)**

1. Install the **Expo Go** app from the [App Store](https://apps.apple.com/app/expo-go/id982107779) or [Google Play](https://play.google.com/store/apps/details?id=host.exp.exponent).
2. Open Expo Go and scan the QR code shown in your terminal.

**iOS Simulator (macOS only)**

```bash
npm run ios
```

> Requires Xcode to be installed.

**Android Emulator**

```bash
npm run android
```

> Requires Android Studio and an AVD (Android Virtual Device) to be set up.

**Web browser**

```bash
npm run web
```

---

## EAS Build (optional — for production builds)

[EAS Build](https://docs.expo.dev/build/introduction/) lets you compile a standalone `.apk` / `.ipa` without Xcode or Android Studio.

### Install the EAS CLI

```bash
npm install -g eas-cli
```

### Log in to your Expo account

```bash
eas login
```

> No account? Sign up free at [expo.dev](https://expo.dev/signup).

### Link the project to your account

```bash
eas init
```

### Trigger a build

```bash
# Internal / preview build (shareable link)
eas build --profile preview --platform android
eas build --profile preview --platform ios

# Production build
eas build --profile production --platform android
eas build --profile production --platform ios
```

Build profiles are defined in `eas.json`:

| Profile | Distribution | Notes |
|---|---|---|
| `development` | Internal | Includes development client |
| `preview` | Internal | Shareable test build |
| `production` | Store | Ready for App Store / Google Play |

---

## Environment

| Package | Version |
|---|---|
| expo | ~51.0.0 |
| react-native | 0.74.1 |
| react | 18.2.0 |

---

## Continuous deployment (Vercel)

This repository includes a GitHub Actions workflow that builds the Expo web output and deploys it to Vercel on pushes to `main`.

What to configure in GitHub:

1. Go to the repository → Settings → Secrets → Actions and add these secrets:
    - `VERCEL_TOKEN` — your Vercel personal token (https://vercel.com/account/tokens)
    - `VERCEL_ORG_ID` — Vercel organization ID (found in your Vercel project settings)
    - `VERCEL_PROJECT_ID` — Vercel project ID (found in your Vercel project settings)

2. Connect the repository in the Vercel dashboard (https://vercel.com/new) and create a project if you haven't already. You can also use the Vercel UI to configure the build output if needed.

What the workflow does:

- Installs dependencies with `npm ci`.
- Runs `npx expo export:web --output web-build` to produce a static web bundle.
- Uses `amondnet/vercel-action` to upload and deploy the `web-build` output to your Vercel project.

After you add the three secrets and push to `main`, the workflow will run and Vercel will publish the site. You can view the deployment logs in the repository's Actions tab.


## License

Private — all rights reserved.