# Gut Guardian - Gamified Gut-Health Tracker

A React Native (Expo) mobile app that turns gut-health tracking into a detective game. Users log meals and symptoms over 14 days, earn XP and badges, and discover food-symptom correlations through an Evidence Board.

**Student Project** - University of Bamberg, Gamification Course

---

## 📱 Quick Start

### Prerequisites
- **Node.js** (v16 or higher) - [Download here](https://nodejs.org/)
- **npm** or **yarn** package manager
- **Expo Go app** on your phone (iOS or Android) - [Download from app store](https://expo.dev/client)

### Installation & Running

1. **Clone the repository**
   ```bash
   git clone https://github.com/khusanovich/Gut-Guardian.git
   cd Gut-Guardian/gut-guardian-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Run on your device**
   - Open **Expo Go** app on your phone
   - Scan the QR code shown in the terminal
   - The app will load on your device

### Alternative Testing Options

**Test on Web Browser:**
```bash
npm start
# Press 'w' when the terminal menu appears
```

**Test on Android Emulator:**
```bash
npm start
# Press 'a' (requires Android Studio installed)
```

**Test on iOS Simulator (Mac only):**
```bash
npm start
# Press 'i' (requires Xcode installed)
```

---

## ✨ Features

- **Detective Story Theme**: Engaging narrative that frames health tracking as a mystery investigation
- **Gamification**: XP system, levels, badges, and daily streaks
- **Meal & Symptom Logging**: Simple forms to track what you eat and how you feel
- **Evidence Board**: Visual correlations between foods and symptoms
- **14-Day Investigation**: Culminates in a diagnosis verdict with confidence score
- **Viatolea Color Scheme**: Calming green and blue palette for wellness focus

---

## 📐 Design System

### Color Palette (Viatolea Theme)
- **Primary Green**: `#74896D` RGB(116, 137, 109) - Brand color, primary actions
- **Light Green**: `#F2F8F2` RGB(242, 248, 242) - App background, cards
- **Yellow**: `#F9DD57` RGB(249, 221, 87) - Rewards, missions, CTAs
- **Blue**: `#8CCBF7` RGB(140, 203, 247) - Gradients, highlights
- **Red/Coral**: `#E2664B` - Symptoms, severity indicators

### Typography
- **Display/Headings**: Fredoka (Google Font, 400-700)
- **Body/Labels**: Nunito (Google Font, 400-800)

### Animations
- **Pop-in**: Scale 0.6 → 1.08 → 1 (rewards, badges)
- **Float**: TranslateY ±7px, 4s loop (logo, avatar)
- **Pulse**: Scale 1 → 1.05, 2s loop (celebration)
- **Rise-in**: TranslateY 14px + fade (text)

---

## 🗺️ App Structure

### Screens (10 Total)

1. **Splash** - Brand entry with animated floating logo
2. **Story** - Narrative setup explaining the 14-day detective mission
3. **Home** - Dashboard with XP progress, daily mission, and quick actions
4. **Log Meal** - Form to record meal type, food items, symptoms, and severity
5. **Reward** - Celebration screen with XP gain and discovered clues
6. **Case File** - Progress hub with stats, earned badges, and weekly tracker
7. **Profile** - Detective identity, stats, and settings
8. **Evidence Board** - Visual food-symptom correlation map
9. **Feedback** - User experience survey
10. **Case Solved** - Final diagnosis verdict (Day 14 reveal)

### Navigation Flow

```
Splash → Story → Home
                  ↓
     [Bottom Tab Navigation Active]
     Home ↔ Investigate ↔ Case File ↔ Profile
           ↓
     Log Meal (modal with back button)
           ↓
     Reward (auto-returns to Home)
```

**Bottom navigation** appears only on: Home, Case File, and Profile screens.
**Modal screens** (Log Meal, Evidence Board, Feedback) have back buttons (‹) in the top-left.

---

## 🏗️ Project Structure

```
gut-guardian-app/
├── constants/
│   └── theme.js          # Design tokens (Viatolea colors, typography, spacing)
├── context/
│   └── AppContext.js     # Global state management (navigation, user data)
├── navigation/
│   └── AppNavigator.js   # Screen router with bottom tab bar
├── screens/
│   ├── SplashScreen.js
│   ├── StoryScreen.js
│   ├── HomeScreen.js
│   ├── LogMealScreen.js
│   ├── RewardScreen.js
│   ├── CaseFileScreen.js
│   ├── ProfileScreen.js
│   ├── EvidenceBoardScreen.js
│   ├── FeedbackScreen.js
│   └── CaseSolvedScreen.js
├── App.js                # Entry point with font loading
├── app.json              # Expo configuration
└── package.json          # Dependencies
```

---

## 🔧 Tech Stack

- **React Native** 0.85.3
- **Expo** SDK 56
- **React Context API** for state management
- **expo-linear-gradient** for UI gradients
- **expo-font** for custom fonts (Fredoka, Nunito)
- **react-native-safe-area-context** for safe area handling
- No external navigation library - custom routing via context

---

## 💾 State Management

The app uses **React Context** (`AppContext`) to manage:

- **Navigation**: `screen` (current view), `activeTab` (bottom nav state)
- **User Progress**: `xp`, `xpMax`, `level`, `streak`, `day`, `totalDays`
- **Meal Logging**: `mealType`, `mealText`, `symptoms`, `severity`
- **Feedback**: Star rating, text responses, submission state

**Note**: All data is local mock state (no backend). In production, this would connect to:
- User profile API
- Meal/symptom log database
- ML-based correlation analysis engine
- Feedback submission endpoint

---

## 🎮 Key Interactions

### Gamification Mechanics
- **XP Rewards**: +10 XP per meal logged, +20 XP for daily missions
- **Leveling**: XP threshold increases with each level (currently 300 XP for Level 2)
- **Streaks**: Track consecutive days of logging
- **Badges**: Unlock achievements (e.g., "First Clue", "Week 1 Survivor")
- **Dynamic Clues**: Auto-generated based on logged symptoms

### Form Validation
- **Meal Type**: Single-select (Breakfast/Lunch/Dinner)
- **Symptoms**: Multi-select with mutual exclusion ("None" clears all others)
- **Severity**: 1-5 scale (default: 3)
- **Submit**: Only generates clue and navigates when form is filled

---

## 📱 Design Notes

- **Target Platform**: Android-first (412 × 892px canvas)
- **Icons**: All emoji-based (can be replaced with icon sets like `react-native-vector-icons`)
- **Accessibility**: Respects reduced motion preferences (disables animations)
- **Responsive**: Adapts to different screen sizes via Expo's layout system

---

## 🔮 Future Enhancements

Potential extensions for production version:

- [ ] Backend integration (Firebase, Supabase, or custom API)
- [ ] Real food-symptom correlation algorithm (ML-based)
- [ ] Push notifications for daily meal reminders
- [ ] Export diagnostic reports as PDF
- [ ] Social sharing features (share results with doctor)
- [ ] Multi-language support (i18n)
- [ ] Dark mode support
- [ ] Custom avatar/detective selection
- [ ] Integration with health tracking APIs (Apple Health, Google Fit)

---

## 📄 License & Credits

**Student Project** for the Gamification course at University of Bamberg.

**Design**: Based on HTML prototype with Viatolea color scheme
**Fonts**: Fredoka & Nunito (Google Fonts, Open Font License)
**Framework**: React Native (MIT License)

---

## 🐛 Troubleshooting

### Common Issues

**"Command not found: expo"**
- Run `npm install -g expo-cli` or use `npx expo start` instead

**QR code not scanning**
- Make sure your phone and computer are on the same WiFi network
- Try pressing `s` in terminal to switch to LAN connection

**Fonts not loading**
- Clear cache: `npm start -- --clear`
- Reinstall: `npm install`

**App crashes on launch**
- Check terminal for error messages
- Ensure all dependencies are installed: `npm install`

---

## 📧 Contact

For questions about this project, please contact the course instructor or project maintainer.

**Repository**: [https://github.com/khusanovich/Gut-Guardian](https://github.com/khusanovich/Gut-Guardian)
