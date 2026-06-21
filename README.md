# Gut Guardian - Gamified Gut-Health Tracker

A React Native (Expo) mobile app that turns gut-health tracking into a detective game. Users log meals and symptoms over 14 days, earn XP and badges, and discover food-symptom correlations through an Evidence Board.

## Features

- **Detective Story Theme**: Engaging narrative that frames health tracking as a mystery investigation
- **Gamification**: XP system, levels, badges, and daily streaks
- **Meal & Symptom Logging**: Simple forms to track what you eat and how you feel
- **Evidence Board**: Visual correlations between foods and symptoms
- **14-Day Investigation**: Culminates in a diagnosis verdict with confidence score

## Screens

1. **Splash** - Brand entry with animated logo
2. **Story** - Narrative setup explaining the 14-day mission
3. **Home** - Dashboard with progress, daily mission, and quick actions
4. **Log Meal** - Form to record meals, symptoms, and severity
5. **Reward** - Celebration screen after logging with XP and clues
6. **Case File** - Progress hub with stats, badges, and weekly tracker
7. **Profile** - Detective identity and settings
8. **Evidence Board** - Food-symptom correlation visualization
9. **Feedback** - User experience survey
10. **Case Solved** - Final verdict reveal (Day 14)

## Tech Stack

- **React Native** with **Expo**
- **React Context** for state management
- **expo-linear-gradient** for gradients
- **Google Fonts** (Fredoka, Nunito)
- No external navigation library - custom routing via context

## Installation

```bash
# Install dependencies
npm install

# Start the development server
npm start

# Run on specific platforms
npm run android   # Android
npm run ios       # iOS
npm run web       # Web
```

## Project Structure

```
gut-guardian-app/
├── constants/
│   └── theme.js          # Design tokens (colors, typography, spacing)
├── context/
│   └── AppContext.js     # Global state management
├── navigation/
│   └── AppNavigator.js   # Screen router with bottom navigation
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
└── App.js                # Entry point
```

## Design System

### Colors
- **Primary Purple**: `#4B2FAE` - Brand color, primary actions
- **Gold**: `#F2A640` - Rewards, missions
- **Green**: `#159E72` - Success, no symptoms
- **Red/Coral**: `#E2664B` - Symptoms, alerts
- **App Background**: `#FBF6EE` - Light cream

### Typography
- **Display/Headings**: Fredoka (400-700)
- **Body/Labels**: Nunito (400-800)

### Animations
- **Pop-in**: Scale 0.6 → 1.08 → 1 (rewards, badges)
- **Float**: TranslateY ±7px, 4s loop (logo, avatar)
- **Pulse**: Scale 1 → 1.05, 2s loop (celebration)
- **Rise-in**: TranslateY 14px + fade (text)

## State Management

The app uses React Context (`AppContext`) to manage:
- Navigation state (`screen`, `activeTab`)
- User progress (`xp`, `level`, `streak`, `day`)
- Meal logging (`mealType`, `mealText`, `symptoms`, `severity`)
- Feedback form state

No backend - all data is local mock state. In production, this would connect to:
- User profile API
- Meals/symptoms log database
- Correlation analysis engine
- Feedback submission endpoint

## Development Notes

- The app is designed for Android-first (412 × 892 canvas)
- All icons use emoji (easily replaceable with icon sets)
- Animations can be disabled for reduced motion preferences
- Bottom navigation shows on Home, Case File, and Profile screens only

## Design Fidelity

This is a **high-fidelity implementation** matching the original HTML prototype. Colors, typography, spacing, copy, and interactions are recreated faithfully from the design handoff specifications.

## Future Enhancements

- [ ] Backend integration for data persistence
- [ ] Real correlation analysis algorithm
- [ ] Push notifications for daily reminders
- [ ] Export reports as PDF
- [ ] Social sharing features
- [ ] Multiple language support

## License

This is a student project for the Gamification course at University of Bamberg.
