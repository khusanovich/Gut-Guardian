import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors, Typography, Shadows } from '../constants/theme';
import { useApp } from '../context/AppContext';

// Import screens
import SplashScreen from '../screens/SplashScreen';
import StoryScreen from '../screens/StoryScreen';
import HomeScreen from '../screens/HomeScreen';
import LogMealScreen from '../screens/LogMealScreen';
import RewardScreen from '../screens/RewardScreen';
import CaseFileScreen from '../screens/CaseFileScreen';
import ProfileScreen from '../screens/ProfileScreen';
import EvidenceBoardScreen from '../screens/EvidenceBoardScreen';
import FeedbackScreen from '../screens/FeedbackScreen';
import CaseSolvedScreen from '../screens/CaseSolvedScreen';
import CalendarScreen from '../screens/CalendarScreen';

const BottomNav = () => {
  const { state, nav } = useApp();
  const { activeTab } = state;

  const navItems = [
    { key: 'home', label: 'Home', icon: '🏠' },
    { key: 'investigate', label: 'Investigate', icon: '🔍' },
    { key: 'case', label: 'Case File', icon: '🗂️' },
    { key: 'profile', label: 'Profile', icon: '🕵️' },
  ];

  return (
    <View style={styles.navContainer}>
      {navItems.map((item) => (
        <TouchableOpacity
          key={item.key}
          style={styles.navItem}
          onPress={() => nav(item.key)}
          activeOpacity={0.7}
        >
          <Text
            style={[
              styles.navIcon,
              {
                opacity: activeTab === item.key ? 1 : 0.7,
                transform: [
                  { scale: activeTab === item.key ? 1 : 0.95 },
                ],
              },
            ]}
          >
            {item.icon}
          </Text>
          <Text
            style={[
              styles.navLabel,
              {
                color: activeTab === item.key ? Colors.primaryPurple : Colors.textFaint,
              },
            ]}
          >
            {item.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default function AppNavigator() {
  const { state } = useApp();
  const { screen } = state;

  // Screens with bottom navigation
  const navScreens = ['home', 'casefile', 'profile'];
  const showNav = navScreens.includes(screen);

  const renderScreen = () => {
    switch (screen) {
      case 'splash':
        return <SplashScreen />;
      case 'story':
        return <StoryScreen />;
      case 'home':
        return <HomeScreen />;
      case 'log':
        return <LogMealScreen />;
      case 'reward':
        return <RewardScreen />;
      case 'casefile':
        return <CaseFileScreen />;
      case 'profile':
        return <ProfileScreen />;
      case 'evidence':
        return <EvidenceBoardScreen />;
      case 'feedback':
        return <FeedbackScreen />;
      case 'solved':
        return <CaseSolvedScreen />;
      case 'calendar':
        return <CalendarScreen />;
      default:
        return <SplashScreen />;
    }
  };

  return (
    <View style={styles.container}>
      {renderScreen()}
      {showNav && <BottomNav />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.appBg,
  },
  navContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.96)',
    borderTopWidth: 1,
    borderTopColor: Colors.border2,
    paddingHorizontal: 8,
    paddingTop: 8,
    paddingBottom: 6,
    ...Shadows.nav,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    gap: 3,
    paddingVertical: 6,
  },
  navIcon: {
    fontSize: 21,
  },
  navLabel: {
    fontSize: Typography.size11,
    fontFamily: Typography.bodyExtraBold,
  },
});
