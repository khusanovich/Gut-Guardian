import React, { useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, Typography, Spacing, Shadows } from '../constants/theme';
import { useApp } from '../context/AppContext';

export default function CaseSolvedScreen() {
  const { go } = useApp();
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const popAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Pulse animation for emoji
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.05,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Pop animation for verdict card
    Animated.sequence([
      Animated.timing(popAnim, {
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

  const solvedSummary = [
    { value: '23', label: 'meals logged' },
    { value: '8', label: 'symptom episodes' },
    { value: '3', label: 'strong correlations' },
    { value: '14/14', label: 'days completed' },
  ];

  return (
    <LinearGradient
      colors={['#159E72', '#0E7A57']}
      locations={[0, 0.7]}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 0.6 }}
      style={styles.container}
    >
      <View style={styles.content}>
        <Animated.Text
          style={[
            styles.emojiRow,
            { transform: [{ scale: pulseAnim }] },
          ]}
        >
          🎉 🎊 🎉
        </Animated.Text>

        <Text style={styles.title}>Case Solved!</Text>
        <Text style={styles.subtitle}>14 days of investigation complete</Text>

        <Animated.View
          style={[
            styles.verdictCard,
            {
              transform: [{ scale: popScale }],
              opacity: popAnim,
            },
          ]}
        >
          <Text style={styles.verdictEmoji}>🥛</Text>
          <Text style={styles.verdictTitle}>Lactose Intolerance</Text>
          <View style={styles.confidencePill}>
            <Text style={styles.confidenceText}>Confidence: 87%</Text>
          </View>
        </Animated.View>

        <View style={styles.summaryCard}>
          <Text style={styles.summaryLabel}>📊 Investigation Summary</Text>
          <View style={styles.summaryGrid}>
            {solvedSummary.map((item, idx) => (
              <View key={idx} style={styles.summaryItem}>
                <Text style={styles.summaryValue}>{item.value}</Text>
                <Text style={styles.summaryText}>{item.label}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.reportButton} activeOpacity={0.9}>
            <Text style={styles.reportButtonText}>View Full Report</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.shareButton} activeOpacity={0.9}>
            <Text style={styles.shareButtonText}>Share Result</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.feedbackLink}
            onPress={() => go('feedback')}
            activeOpacity={0.7}
          >
            <Text style={styles.feedbackLinkText}>Continue to feedback →</Text>
          </TouchableOpacity>
        </View>
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
    padding: 22,
    paddingTop: 38,
    paddingBottom: 30,
    gap: 18,
    alignItems: 'center',
  },
  emojiRow: {
    fontSize: 30,
    letterSpacing: 4,
  },
  title: {
    fontFamily: Typography.displayBold,
    fontSize: Typography.size40,
    color: Colors.white,
    textAlign: 'center',
    lineHeight: 40,
    textShadowColor: 'rgba(0,0,0,0.25)',
    textShadowOffset: { width: 0, height: 6 },
    textShadowRadius: 18,
  },
  subtitle: {
    fontSize: Typography.size14,
    fontFamily: Typography.bodyBold,
    color: 'rgba(255,255,255,0.85)',
  },
  verdictCard: {
    width: '100%',
    backgroundColor: Colors.white,
    borderRadius: 24,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.25,
    shadowRadius: 40,
    elevation: 10,
  },
  verdictEmoji: {
    fontSize: 56,
    marginBottom: 6,
  },
  verdictTitle: {
    fontFamily: Typography.displayBold,
    fontSize: Typography.size28,
    color: Colors.green,
    lineHeight: 29.4,
  },
  confidencePill: {
    backgroundColor: Colors.greenTintBg,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 999,
    marginTop: 10,
  },
  confidenceText: {
    fontFamily: Typography.bodyExtraBold,
    fontSize: Typography.size13,
    color: Colors.greenDark,
  },
  summaryCard: {
    width: '100%',
    backgroundColor: 'rgba(255,255,255,0.10)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.16)',
    borderRadius: 20,
    padding: 18,
  },
  summaryLabel: {
    fontFamily: Typography.bodyExtraBold,
    fontSize: Typography.size13,
    color: Colors.white,
    letterSpacing: 0.5,
    marginBottom: 12,
  },
  summaryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  summaryItem: {
    backgroundColor: 'rgba(255,255,255,0.10)',
    borderRadius: 14,
    padding: 12,
    width: '48%',
  },
  summaryValue: {
    fontFamily: Typography.displayBold,
    fontSize: Typography.size22,
    color: Colors.white,
  },
  summaryText: {
    fontSize: Typography.size11,
    fontFamily: Typography.bodyBold,
    color: 'rgba(255,255,255,0.85)',
  },
  buttonsContainer: {
    width: '100%',
    gap: 10,
    marginTop: 2,
  },
  reportButton: {
    backgroundColor: Colors.white,
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
  },
  reportButtonText: {
    fontFamily: Typography.display,
    fontSize: Typography.size17,
    color: Colors.greenDark,
  },
  shareButton: {
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.4)',
    backgroundColor: 'transparent',
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: 'center',
  },
  shareButtonText: {
    fontFamily: Typography.display,
    fontSize: Typography.size16,
    color: Colors.white,
  },
  feedbackLink: {
    paddingVertical: 6,
    alignItems: 'center',
  },
  feedbackLinkText: {
    fontFamily: Typography.bodyExtraBold,
    fontSize: Typography.size14,
    color: 'rgba(255,255,255,0.85)',
  },
});
