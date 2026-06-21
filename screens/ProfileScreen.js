import React, { useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, Typography, Spacing, Shadows } from '../constants/theme';
import { useApp } from '../context/AppContext';

export default function ProfileScreen() {
  const { state, go } = useApp();
  const { detectiveName, xp, level, streak } = state;
  const floatAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, {
          toValue: -7,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(floatAnim, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Animated.View style={{ transform: [{ translateY: floatAnim }] }}>
        <LinearGradient
          colors={['#8CCBF7', '#74896D']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.avatar}
        >
          <Text style={styles.avatarEmoji}>🕵️‍♀️</Text>
        </LinearGradient>
      </Animated.View>

      <View style={styles.nameSection}>
        <Text style={styles.name}>Detective {detectiveName}</Text>
        <Text style={styles.levelText}>Level {level} · Beginner Detective</Text>
      </View>

      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <Text style={[styles.statValue, { color: Colors.primaryPurple }]}>
            {xp}
          </Text>
          <Text style={styles.statLabel}>XP</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={[styles.statValue, { color: Colors.goldDark }]}>
            {streak}
          </Text>
          <Text style={styles.statLabel}>STREAK</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={[styles.statValue, { color: Colors.green }]}>1</Text>
          <Text style={styles.statLabel}>BADGES</Text>
        </View>
      </View>

      <View style={styles.menuList}>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => go('evidence')}
          activeOpacity={0.9}
        >
          <Text style={styles.menuText}>🔍 Evidence Board</Text>
          <Text style={styles.menuChevron}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => go('story')}
          activeOpacity={0.9}
        >
          <Text style={styles.menuText}>📖 Story Recap</Text>
          <Text style={styles.menuChevron}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => go('feedback')}
          activeOpacity={0.9}
        >
          <Text style={styles.menuText}>⭐ Rate Your Experience</Text>
          <Text style={styles.menuChevron}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.verdictButton}
          onPress={() => go('solved')}
          activeOpacity={0.9}
        >
          <LinearGradient
            colors={['#159E72', '#0F8460']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.verdictGradient}
          >
            <Text style={styles.verdictText}>🎉 Reveal Day 14 Verdict</Text>
            <Text style={styles.verdictChevron}>›</Text>
          </LinearGradient>
        </TouchableOpacity>
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
    paddingTop: 30,
    paddingBottom: 26,
    gap: 18,
    alignItems: 'center',
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    ...Shadows.buttonPurple,
  },
  avatarEmoji: {
    fontSize: 50,
  },
  nameSection: {
    alignItems: 'center',
  },
  name: {
    fontFamily: Typography.display,
    fontSize: Typography.size24,
    color: Colors.textPrimary,
  },
  levelText: {
    fontSize: Typography.size13,
    fontFamily: Typography.bodyBold,
    color: Colors.textMuted,
  },
  statsRow: {
    width: '100%',
    flexDirection: 'row',
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: Colors.white,
    borderRadius: 18,
    padding: 16,
    alignItems: 'center',
    ...Shadows.card,
  },
  statValue: {
    fontFamily: Typography.displayBold,
    fontSize: Typography.size22,
  },
  statLabel: {
    fontSize: Typography.size11,
    fontFamily: Typography.bodyExtraBold,
    color: Colors.textMuted,
  },
  menuList: {
    width: '100%',
    gap: 10,
    marginTop: 4,
  },
  menuItem: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    ...Shadows.card,
  },
  menuText: {
    fontFamily: Typography.bodyBold,
    fontSize: Typography.size15,
    color: Colors.textPrimary,
  },
  menuChevron: {
    fontSize: Typography.size15,
    color: Colors.textFaint,
  },
  verdictButton: {
    borderRadius: 16,
    overflow: 'hidden',
    ...Shadows.buttonGreen,
  },
  verdictGradient: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  verdictText: {
    fontFamily: Typography.display,
    fontSize: Typography.size15,
    color: Colors.white,
  },
  verdictChevron: {
    fontSize: Typography.size15,
    color: Colors.white,
  },
});
