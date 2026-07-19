import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, Typography, Spacing, Shadows } from '../constants/theme';
import { useApp } from '../context/AppContext';
import GuideCharacter from '../components/GuideCharacter';
import CalendarWidget from '../components/CalendarWidget';

export default function HomeScreen() {
  const { state, go, dismissGuide, markDayComplete } = useApp();
  const { detectiveName, xp, xpMax, level, streak, showGuide, tutorialStep, day } = state;

  const xpPct = (xp / xpMax) * 100;
  const xpToGo = Math.max(0, xpMax - xp);
  const nextLevel = level + 1;

  const homeTiles = [
    { label: 'Investigate', sub: 'Log a meal', icon: '🔍', bg: '#EFEAFB', screen: 'log' },
    { label: 'Case File', sub: 'Your progress', icon: '🗂️', bg: '#FCEFD9', screen: 'casefile' },
    { label: 'Evidence', sub: 'See the board', icon: '🧩', bg: '#E0F3EC', screen: 'evidence' },
    { label: 'Avatar', sub: 'Detective profile', icon: '🕵️', bg: '#FBE6E1', screen: 'profile' },
  ];

  const guideMessages = {
    0: "Welcome, Detective! This is your home base. Track your 14-day investigation here!",
    1: "See your XP progress below. Complete missions to level up!",
    2: "Tap 'Today's Mission' to log your meals and earn rewards!",
  };

  React.useEffect(() => {
    // Auto-dismiss guide after first visit
    const timer = setTimeout(() => {
      if (showGuide && tutorialStep === 0) {
        dismissGuide();
      }
    }, 8000);
    return () => clearTimeout(timer);
  }, [showGuide, tutorialStep]);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Guide Character */}
      {showGuide && guideMessages[tutorialStep] && (
        <GuideCharacter message={guideMessages[tutorialStep]} position="top" />
      )}

      {/* Calendar Widget - Top Right */}
      <View style={styles.calendarContainer}>
        <CalendarWidget />
      </View>

      {/* Header */}
      <View style={styles.header}>
        <LinearGradient
          colors={['#8CCBF7', '#74896D']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.avatar}
        >
          <Text style={styles.avatarEmoji}>🕵️‍♀️</Text>
        </LinearGradient>
        <View style={{ flex: 1 }}>
          <Text style={styles.name}>Detective {detectiveName}</Text>
          <Text style={styles.levelText}>Level {level} · Beginner Detective</Text>
        </View>
        <View style={styles.streakPill}>
          <Text style={styles.streakText}>🔥 {streak}</Text>
        </View>
      </View>

      {/* XP Card */}
      <View style={styles.xpCard}>
        <View style={styles.xpHeader}>
          <Text style={styles.xpLabel}>EXPERIENCE</Text>
          <Text style={styles.xpValue}>{xp} / {xpMax} XP</Text>
        </View>
        <View style={styles.progressTrack}>
          <View style={[styles.progressFill, { width: `${xpPct}%` }]} />
        </View>
        <Text style={styles.xpCaption}>{xpToGo} XP until Level {nextLevel}</Text>
      </View>

      {/* Today's Mission */}
      <TouchableOpacity
        style={styles.missionCard}
        onPress={() => go('log', 'investigate')}
        activeOpacity={0.9}
      >
        <LinearGradient
          colors={['#F9DD57', '#F4D03F']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.missionGradient}
        >
          <Text style={styles.missionEmoji}>🎯</Text>
          <Text style={styles.missionLabel}>TODAY'S MISSION</Text>
          <Text style={styles.missionTitle}>Log your lunch today</Text>
          <View style={styles.missionReward}>
            <Text style={styles.missionRewardText}>+20 XP reward</Text>
          </View>
        </LinearGradient>
      </TouchableOpacity>

      {/* Quick Tiles */}
      <View style={styles.tilesGrid}>
        {homeTiles.map((tile, idx) => (
          <TouchableOpacity
            key={idx}
            style={styles.tile}
            onPress={() => go(tile.screen)}
            activeOpacity={0.9}
          >
            <View style={[styles.tileIcon, { backgroundColor: tile.bg }]}>
              <Text style={styles.tileEmoji}>{tile.icon}</Text>
            </View>
            <Text style={styles.tileLabel}>{tile.label}</Text>
            <Text style={styles.tileSub}>{tile.sub}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.appBg,
  },
  content: {
    padding: 20,
    paddingTop: 26,
    paddingBottom: 26,
    gap: 18,
  },
  calendarContainer: {
    position: 'absolute',
    top: 26,
    right: 20,
    zIndex: 100,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  avatar: {
    width: 58,
    height: 58,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    ...Shadows.buttonPurple,
  },
  avatarEmoji: {
    fontSize: 30,
  },
  name: {
    fontFamily: Typography.display,
    fontSize: Typography.size22,
    color: Colors.textPrimary,
    lineHeight: 24,
  },
  levelText: {
    fontSize: Typography.size13,
    fontFamily: Typography.bodyBold,
    color: Colors.textMuted,
  },
  streakPill: {
    backgroundColor: Colors.goldTintBg,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 14,
  },
  streakText: {
    fontFamily: Typography.bodyExtraBold,
    fontSize: Typography.size13,
    color: Colors.goldText,
  },
  xpCard: {
    backgroundColor: Colors.white,
    borderRadius: 22,
    padding: 20,
    ...Shadows.cardMedium,
  },
  xpHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 10,
  },
  xpLabel: {
    fontSize: Typography.size12,
    fontFamily: Typography.bodyExtraBold,
    letterSpacing: 1,
    color: Colors.textMuted,
  },
  xpValue: {
    fontFamily: Typography.display,
    fontSize: Typography.size16,
    color: Colors.primaryPurple,
  },
  progressTrack: {
    height: 14,
    borderRadius: 999,
    backgroundColor: Colors.purpleTintBg,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 999,
    backgroundColor: Colors.purpleLight,
  },
  xpCaption: {
    fontSize: Typography.size12,
    fontFamily: Typography.bodySemiBold,
    color: Colors.textMuted,
    marginTop: 9,
  },
  missionCard: {
    borderRadius: 22,
    overflow: 'hidden',
    ...Shadows.buttonGold,
  },
  missionGradient: {
    padding: 20,
    position: 'relative',
    overflow: 'hidden',
  },
  missionEmoji: {
    position: 'absolute',
    right: -10,
    top: -14,
    fontSize: 78,
    opacity: 0.18,
  },
  missionLabel: {
    fontSize: Typography.size12,
    fontFamily: Typography.bodyExtraBold,
    letterSpacing: 1.5,
    color: 'rgba(255,255,255,0.9)',
  },
  missionTitle: {
    fontFamily: Typography.display,
    fontSize: Typography.size22,
    color: Colors.white,
    marginTop: 6,
    marginBottom: 4,
  },
  missionReward: {
    backgroundColor: 'rgba(255,255,255,0.22)',
    alignSelf: 'flex-start',
    paddingHorizontal: 11,
    paddingVertical: 5,
    borderRadius: 999,
  },
  missionRewardText: {
    fontFamily: Typography.bodyExtraBold,
    fontSize: Typography.size13,
    color: Colors.white,
  },
  tilesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 14,
  },
  tile: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    padding: 18,
    width: '48%',
    gap: 10,
    ...Shadows.card,
  },
  tileIcon: {
    width: 46,
    height: 46,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tileEmoji: {
    fontSize: 24,
  },
  tileLabel: {
    fontFamily: Typography.display,
    fontSize: Typography.size16,
    color: Colors.textPrimary,
  },
  tileSub: {
    fontSize: Typography.size12,
    fontFamily: Typography.bodySemiBold,
    color: Colors.textMuted,
    lineHeight: 15.6,
  },
});
