import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, Typography, Spacing, Shadows } from '../constants/theme';
import { useApp } from '../context/AppContext';

export default function CaseFileScreen() {
  const { state, go } = useApp();
  const { xp, level, streak } = state;

  const caseStats = [
    { value: `Lv ${level}`, label: 'Rank', color: Colors.primaryPurple },
    { value: `${streak}d`, label: 'Streak', color: Colors.goldDark },
    { value: xp, label: 'XP Points', color: Colors.green },
    { value: '62%', label: 'Clarity', color: Colors.purpleLight },
  ];

  const badges = [
    { name: 'First Clue', state: 'earned', icon: '🔍', bg: Colors.greenTintBg },
    { name: 'Week 1 Survivor', state: 'locked', icon: '🔒', bg: Colors.border3 },
    { name: 'Pattern Finder', state: 'locked', icon: '🔒', bg: Colors.border3 },
    { name: 'Gut Hero', state: 'locked', icon: '🔒', bg: Colors.border3 },
  ];

  const weekDays = [
    { label: 'Mo', done: true },
    { label: 'Tu', done: true },
    { label: 'We', done: true },
    { label: 'Th', done: true },
    { label: 'Fr', done: true },
    { label: 'Sa', done: false },
    { label: 'Su', done: false },
  ];

  const recentClues = [
    { text: 'Bloating after dinner on Monday', tag: 'CLUE #1', icon: '⚠️', color: Colors.red },
    { text: 'No symptoms after breakfast', tag: 'CLUE #2', icon: '✅', color: Colors.green },
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View>
        <Text style={styles.title}>Case File</Text>
        <Text style={styles.subtitle}>Your investigation progress</Text>
      </View>

      {/* Stats Grid */}
      <View style={styles.statsGrid}>
        {caseStats.map((stat, idx) => (
          <View key={idx} style={styles.statCard}>
            <Text style={[styles.statValue, { color: stat.color }]}>
              {stat.value}
            </Text>
            <Text style={styles.statLabel}>{stat.label}</Text>
          </View>
        ))}
      </View>

      {/* Evidence Board Button */}
      <TouchableOpacity
        style={styles.evidenceButton}
        onPress={() => go('evidence')}
        activeOpacity={0.9}
      >
        <LinearGradient
          colors={['#5A6B56', '#74896D']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.evidenceGradient}
        >
          <Text style={styles.evidenceText}>🔍 View Evidence Board</Text>
        </LinearGradient>
      </TouchableOpacity>

      {/* Badges */}
      <View>
        <Text style={styles.sectionLabel}>BADGES</Text>
        <View style={styles.badgesGrid}>
          {badges.map((badge, idx) => (
            <View
              key={idx}
              style={[
                styles.badgeCard,
                { opacity: badge.state === 'earned' ? 1 : 0.55 },
              ]}
            >
              <View style={[styles.badgeIcon, { backgroundColor: badge.bg }]}>
                <Text style={styles.badgeEmoji}>{badge.icon}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.badgeName}>{badge.name}</Text>
                <Text
                  style={[
                    styles.badgeTag,
                    {
                      color:
                        badge.state === 'earned'
                          ? Colors.green
                          : Colors.textFaint,
                    },
                  ]}
                >
                  {badge.state === 'earned' ? 'EARNED ✓' : 'LOCKED'}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Weekly Progress */}
      <View style={styles.weeklyCard}>
        <Text style={styles.sectionLabel}>WEEKLY PROGRESS</Text>
        <View style={styles.weekRow}>
          {weekDays.map((day, idx) => (
            <View key={idx} style={styles.dayColumn}>
              <View
                style={[
                  styles.dayCircle,
                  {
                    backgroundColor: day.done ? Colors.green : Colors.border3,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.dayMark,
                    { color: day.done ? Colors.white : Colors.textFaint },
                  ]}
                >
                  {day.done ? '✓' : ''}
                </Text>
              </View>
              <Text style={styles.dayLabel}>{day.label}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Recent Clues */}
      <View>
        <Text style={styles.sectionLabel}>RECENT CLUES</Text>
        <View style={{ gap: 10 }}>
          {recentClues.map((clue, idx) => (
            <View
              key={idx}
              style={[styles.clueCard, { borderLeftColor: clue.color }]}
            >
              <Text style={styles.clueIcon}>{clue.icon}</Text>
              <View style={{ flex: 1 }}>
                <Text style={styles.clueText}>{clue.text}</Text>
                <Text style={styles.clueTag}>{clue.tag}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Feedback Button */}
      <TouchableOpacity
        style={styles.feedbackButton}
        onPress={() => go('feedback')}
        activeOpacity={0.9}
      >
        <Text style={styles.feedbackText}>Give Feedback</Text>
      </TouchableOpacity>
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
    paddingTop: 24,
    paddingBottom: 26,
    gap: 18,
  },
  title: {
    fontFamily: Typography.display,
    fontSize: Typography.size26,
    color: Colors.textPrimary,
  },
  subtitle: {
    fontSize: Typography.size13,
    fontFamily: Typography.bodyBold,
    color: Colors.textMuted,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  statCard: {
    backgroundColor: Colors.white,
    borderRadius: 18,
    padding: 16,
    width: '48%',
    ...Shadows.card,
  },
  statValue: {
    fontFamily: Typography.displayBold,
    fontSize: Typography.size24,
  },
  statLabel: {
    fontSize: Typography.size12,
    fontFamily: Typography.bodyBold,
    color: Colors.textMuted,
  },
  evidenceButton: {
    borderRadius: 18,
    overflow: 'hidden',
    ...Shadows.buttonPurple,
  },
  evidenceGradient: {
    paddingVertical: 17,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  evidenceText: {
    fontFamily: Typography.display,
    fontSize: Typography.size17,
    color: Colors.white,
  },
  sectionLabel: {
    fontSize: Typography.size12,
    fontFamily: Typography.bodyExtraBold,
    letterSpacing: 1,
    color: Colors.textMuted,
    marginBottom: 12,
  },
  badgesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  badgeCard: {
    backgroundColor: Colors.white,
    borderRadius: 18,
    padding: 14,
    width: '48%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    ...Shadows.card,
  },
  badgeIcon: {
    width: 44,
    height: 44,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeEmoji: {
    fontSize: 24,
  },
  badgeName: {
    fontFamily: Typography.display,
    fontSize: Typography.size14,
    color: Colors.textPrimary,
    lineHeight: 15.4,
  },
  badgeTag: {
    fontSize: Typography.size11,
    fontFamily: Typography.bodyExtraBold,
  },
  weeklyCard: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    padding: 18,
    ...Shadows.card,
  },
  weekRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dayColumn: {
    alignItems: 'center',
    gap: 8,
  },
  dayCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayMark: {
    fontSize: Typography.size13,
    fontFamily: Typography.bodyExtraBold,
  },
  dayLabel: {
    fontSize: Typography.size11,
    fontFamily: Typography.bodyBold,
    color: Colors.textMuted,
  },
  clueCard: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderLeftWidth: 4,
    ...Shadows.card,
  },
  clueIcon: {
    fontSize: 22,
  },
  clueText: {
    fontSize: Typography.size14,
    fontFamily: Typography.bodyBold,
    color: Colors.textPrimary,
    lineHeight: 18.2,
  },
  clueTag: {
    fontSize: Typography.size11,
    fontFamily: Typography.bodyExtraBold,
    color: Colors.textMuted,
  },
  feedbackButton: {
    borderWidth: 1.5,
    borderColor: Colors.border,
    backgroundColor: Colors.white,
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: 'center',
  },
  feedbackText: {
    fontFamily: Typography.display,
    fontSize: Typography.size15,
    color: Colors.textMuted,
  },
});
