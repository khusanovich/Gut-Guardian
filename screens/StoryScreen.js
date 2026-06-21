import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, Typography, Spacing, Shadows } from '../constants/theme';
import { useApp } from '../context/AppContext';

export default function StoryScreen() {
  const { go } = useApp();

  return (
    <LinearGradient
      colors={['#2C2150', '#3A2675', '#4B2FAE']}
      locations={[0, 0.6, 1]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.badgeRow}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>CHAPTER 1</Text>
          </View>
          <View style={[styles.badge, styles.badgeGold]}>
            <Text style={styles.badgeTextDark}>📅 14 DAYS</Text>
          </View>
        </View>

        <Text style={styles.heading}>The First Clue</Text>

        <Text style={styles.body}>
          Detective, your investigation begins. For the past week you've felt strange after meals — <Text style={styles.highlight}>bloating, fatigue, headaches.</Text> Something in your diet is causing chaos in your body.
        </Text>

        <Text style={styles.body}>
          Your mission: log every meal and symptom for 14 days. Each entry adds evidence to your board — watch as connections reveal themselves. By Day 14, your case will be solved.
        </Text>

        <View style={styles.drCard}>
          <View style={styles.drAvatar}>
            <Text style={styles.drEmoji}>🧬</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.drName}>Dr. Microbe</Text>
            <Text style={styles.drQuote}>
              "I'll help you find the answer. Every meal you log becomes a clue on your Evidence Board. Let's start with breakfast."
            </Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={() => go('home', 'home')}
          activeOpacity={0.9}
        >
          <Text style={styles.buttonText}>Begin Investigation →</Text>
        </TouchableOpacity>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 26,
    paddingTop: 40,
    paddingBottom: 36,
    gap: 22,
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  badge: {
    backgroundColor: 'rgba(255,255,255,0.14)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
  },
  badgeGold: {
    backgroundColor: Colors.gold,
  },
  badgeText: {
    fontSize: Typography.size12,
    fontFamily: Typography.bodyExtraBold,
    letterSpacing: 1.5,
    color: Colors.white,
  },
  badgeTextDark: {
    fontSize: Typography.size12,
    fontFamily: Typography.bodyExtraBold,
    color: Colors.textPrimary,
  },
  heading: {
    fontFamily: Typography.displayBold,
    fontSize: Typography.size38,
    color: Colors.white,
    lineHeight: 40,
  },
  body: {
    fontSize: Typography.size15_5,
    fontFamily: Typography.body,
    lineHeight: 25.5,
    color: 'rgba(255,255,255,0.88)',
  },
  highlight: {
    color: Colors.highlightCream,
    fontFamily: Typography.bodyBold,
  },
  drCard: {
    backgroundColor: 'rgba(255,255,255,0.10)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.14)',
    borderRadius: 20,
    padding: 18,
    flexDirection: 'row',
    gap: 14,
    alignItems: 'flex-start',
  },
  drAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.green,
    alignItems: 'center',
    justifyContent: 'center',
  },
  drEmoji: {
    fontSize: 26,
  },
  drName: {
    fontFamily: Typography.display,
    fontSize: Typography.size16,
    color: Colors.white,
    marginBottom: 4,
  },
  drQuote: {
    fontSize: Typography.size14,
    fontFamily: Typography.body,
    lineHeight: 21.7,
    color: 'rgba(255,255,255,0.85)',
  },
  button: {
    backgroundColor: Colors.gold,
    paddingVertical: 18,
    borderRadius: 18,
    alignItems: 'center',
    marginTop: 6,
    ...Shadows.buttonGold,
  },
  buttonText: {
    fontFamily: Typography.display,
    fontSize: Typography.size18,
    color: Colors.textPrimary,
  },
});
