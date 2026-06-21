import React, { useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, Typography, Spacing, Shadows } from '../constants/theme';
import { useApp } from '../context/AppContext';

export default function RewardScreen() {
  const { state, continueReward } = useApp();
  const { xp, xpMax, level, streak, reward } = state;

  const popAnim = useRef(new Animated.Value(0)).current;
  const riseAnim = useRef(new Animated.Value(0)).current;
  const popAnim1 = useRef(new Animated.Value(0)).current;
  const popAnim2 = useRef(new Animated.Value(0)).current;

  const xpPct = (xp / xpMax) * 100;

  useEffect(() => {
    Animated.sequence([
      Animated.timing(popAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();

    Animated.timing(riseAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();

    Animated.sequence([
      Animated.delay(100),
      Animated.timing(popAnim1, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();

    Animated.sequence([
      Animated.delay(200),
      Animated.timing(popAnim2, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const popScale = popAnim.interpolate({
    inputRange: [0, 0.6, 1],
    outputRange: [0.6, 1.08, 1],
  });

  const riseTranslate = riseAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [14, 0],
  });

  const pop1Scale = popAnim1.interpolate({
    inputRange: [0, 0.6, 1],
    outputRange: [0.6, 1.08, 1],
  });

  const pop2Scale = popAnim2.interpolate({
    inputRange: [0, 0.6, 1],
    outputRange: [0.6, 1.08, 1],
  });

  return (
    <LinearGradient
      colors={['#8CCBF7', '#74896D']}
      locations={[0, 0.7]}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 0.7 }}
      style={styles.container}
    >
      <View style={styles.content}>
        <Animated.Text
          style={[
            styles.xpHeadline,
            {
              transform: [{ scale: popScale }],
              opacity: popAnim,
            },
          ]}
        >
          +{reward.xp} XP
        </Animated.Text>

        <Animated.Text
          style={[
            styles.congrats,
            {
              transform: [{ translateY: riseTranslate }],
              opacity: riseAnim,
            },
          ]}
        >
          Great investigation,{'\n'}Detective!
        </Animated.Text>

        <View style={styles.xpCard}>
          <View style={styles.xpHeader}>
            <Text style={styles.xpLabel}>
              {xp} / {xpMax} XP
            </Text>
            <Text style={styles.xpLevel}>Level {level}</Text>
          </View>
          <View style={styles.progressTrack}>
            <Animated.View
              style={[
                styles.progressFill,
                {
                  width: popAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['0%', `${xpPct}%`],
                  }),
                },
              ]}
            />
          </View>
          <Text style={styles.streakText}>🔥 {streak} day streak</Text>
        </View>

        <Animated.View
          style={[
            styles.badgeCard,
            {
              transform: [{ scale: pop1Scale }],
              opacity: popAnim1,
            },
          ]}
        >
          <View style={styles.badgeIcon}>
            <Text style={styles.badgeEmoji}>🏅</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.badgeLabel}>BADGE EARNED</Text>
            <Text style={styles.badgeName}>First Clue!</Text>
            <Text style={styles.badgeSub}>Your investigation has begun.</Text>
          </View>
        </Animated.View>

        <Animated.View
          style={[
            styles.clueCard,
            {
              transform: [{ scale: pop2Scale }],
              opacity: popAnim2,
            },
          ]}
        >
          <View style={styles.clueIcon}>
            <Text style={styles.clueEmoji}>🔍</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.clueLabel}>CLUE DISCOVERED</Text>
            <Text style={styles.clueText}>{reward.clue}</Text>
          </View>
        </Animated.View>

        <TouchableOpacity
          style={styles.button}
          onPress={continueReward}
          activeOpacity={0.9}
        >
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 24,
    paddingTop: 40,
    paddingBottom: 32,
    gap: 20,
    alignItems: 'center',
  },
  xpHeadline: {
    fontFamily: Typography.displayBold,
    fontSize: Typography.size56,
    color: Colors.white,
    textShadowColor: 'rgba(0,0,0,0.25)',
    textShadowOffset: { width: 0, height: 6 },
    textShadowRadius: 18,
  },
  congrats: {
    fontFamily: Typography.display,
    fontSize: Typography.size24,
    color: Colors.white,
    textAlign: 'center',
  },
  xpCard: {
    width: '100%',
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderRadius: 20,
    padding: 18,
  },
  xpHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 9,
  },
  xpLabel: {
    fontSize: Typography.size13,
    fontFamily: Typography.bodyExtraBold,
    color: Colors.white,
  },
  xpLevel: {
    fontSize: Typography.size13,
    fontFamily: Typography.bodyExtraBold,
    color: 'rgba(255,255,255,0.85)',
  },
  progressTrack: {
    height: 12,
    borderRadius: 999,
    backgroundColor: 'rgba(255,255,255,0.2)',
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 999,
    backgroundColor: Colors.gold,
  },
  streakText: {
    fontSize: Typography.size12,
    fontFamily: Typography.bodyBold,
    color: 'rgba(255,255,255,0.85)',
    marginTop: 8,
  },
  badgeCard: {
    width: '100%',
    backgroundColor: Colors.white,
    borderRadius: 20,
    padding: 18,
    flexDirection: 'row',
    gap: 14,
    alignItems: 'center',
  },
  badgeIcon: {
    width: 54,
    height: 54,
    borderRadius: 16,
    backgroundColor: Colors.goldTintBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeEmoji: {
    fontSize: 30,
  },
  badgeLabel: {
    fontSize: Typography.size11,
    fontFamily: Typography.bodyExtraBold,
    letterSpacing: 1,
    color: Colors.goldText,
  },
  badgeName: {
    fontFamily: Typography.display,
    fontSize: Typography.size18,
    color: Colors.textPrimary,
  },
  badgeSub: {
    fontSize: Typography.size12,
    fontFamily: Typography.bodySemiBold,
    color: Colors.textMuted,
  },
  clueCard: {
    width: '100%',
    backgroundColor: Colors.white,
    borderRadius: 20,
    padding: 18,
    flexDirection: 'row',
    gap: 14,
    alignItems: 'center',
  },
  clueIcon: {
    width: 54,
    height: 54,
    borderRadius: 16,
    backgroundColor: Colors.greenTintBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  clueEmoji: {
    fontSize: 28,
  },
  clueLabel: {
    fontSize: Typography.size11,
    fontFamily: Typography.bodyExtraBold,
    letterSpacing: 1,
    color: Colors.green,
  },
  clueText: {
    fontSize: Typography.size14,
    fontFamily: Typography.bodyBold,
    color: Colors.textPrimary,
    lineHeight: 18.9,
  },
  button: {
    width: '100%',
    backgroundColor: Colors.white,
    paddingVertical: 17,
    borderRadius: 18,
    alignItems: 'center',
    marginTop: 'auto',
  },
  buttonText: {
    fontFamily: Typography.display,
    fontSize: Typography.size18,
    color: Colors.primaryPurple,
  },
});
