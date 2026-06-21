import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, Typography, Spacing, Shadows } from '../constants/theme';
import { useApp } from '../context/AppContext';

export default function EvidenceBoardScreen() {
  const { state, back, go } = useApp();
  const { day, totalDays } = state;

  const evidence = [
    {
      food: 'Pizza',
      foodIcon: '🍕',
      symptom: 'Bloating',
      symIcon: '⚠️',
      level: 'strong',
    },
    {
      food: 'Pasta',
      foodIcon: '🍝',
      symptom: 'Fatigue',
      symIcon: '⚠️',
      level: 'possible',
    },
    {
      food: 'Ice cream',
      foodIcon: '🍦',
      symptom: 'Headache',
      symIcon: '⚠️',
      level: 'strong',
    },
    {
      food: 'Salad',
      foodIcon: '🥗',
      symptom: 'No symptoms',
      symIcon: '✓',
      level: 'none',
    },
  ];

  const getLevelColors = (level) => {
    const map = {
      strong: {
        line: Colors.red,
        tagBg: 'rgba(226,102,75,0.22)',
        tagFg: '#FFB9A6',
      },
      possible: {
        line: Colors.gold,
        tagBg: 'rgba(242,166,64,0.22)',
        tagFg: Colors.highlightCream,
      },
      none: {
        line: Colors.green,
        tagBg: 'rgba(21,158,114,0.22)',
        tagFg: '#9BE6C9',
      },
    };
    return map[level];
  };

  return (
    <LinearGradient
      colors={['#2C2150', '#241B3A']}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={back} activeOpacity={0.7}>
            <Text style={styles.backText}>‹</Text>
          </TouchableOpacity>
          <View style={{ flex: 1 }}>
            <Text style={styles.headerTitle}>Evidence Board</Text>
            <Text style={styles.headerSub}>
              14 entries · Day {day} of {totalDays}
            </Text>
          </View>
        </View>

        {/* Clarity Score */}
        <View style={styles.clarityCard}>
          <Text style={styles.clarityScore}>62%</Text>
          <View>
            <Text style={styles.clarityLabel}>Clarity Score</Text>
            <Text style={styles.claritySub}>The pattern is getting clearer</Text>
          </View>
        </View>

        {/* Evidence Rows */}
        <View style={{ gap: 12 }}>
          {evidence.map((ev, idx) => {
            const colors = getLevelColors(ev.level);
            return (
              <View key={idx} style={styles.evidenceRow}>
                <View style={styles.foodSection}>
                  <Text style={styles.foodIcon}>{ev.foodIcon}</Text>
                  <Text style={styles.foodName}>{ev.food}</Text>
                </View>
                <View style={[styles.connector, { backgroundColor: colors.line }]} />
                <View style={[styles.symptomPill, { backgroundColor: colors.tagBg }]}>
                  <Text style={[styles.symptomText, { color: colors.tagFg }]}>
                    {ev.symIcon} {ev.symptom}
                  </Text>
                </View>
              </View>
            );
          })}
        </View>

        {/* Legend */}
        <View style={styles.legend}>
          <View style={styles.legendItem}>
            <View style={[styles.legendBox, { backgroundColor: Colors.red }]} />
            <Text style={styles.legendText}>Strong link</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendBox, { backgroundColor: Colors.gold }]} />
            <Text style={styles.legendText}>Possible link</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendBox, { backgroundColor: Colors.green }]} />
            <Text style={styles.legendText}>No correlation</Text>
          </View>
        </View>

        {/* Log Button */}
        <TouchableOpacity
          style={styles.logButton}
          onPress={() => go('log', 'investigate')}
          activeOpacity={0.9}
        >
          <Text style={styles.logButtonText}>Log Today's Meal</Text>
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
    padding: 20,
    paddingTop: 22,
    paddingBottom: 26,
    gap: 18,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 13,
    backgroundColor: 'rgba(255,255,255,0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backText: {
    fontSize: 20,
    color: Colors.white,
    fontFamily: Typography.bodyBold,
  },
  headerTitle: {
    fontFamily: Typography.display,
    fontSize: Typography.size23,
    color: Colors.white,
  },
  headerSub: {
    fontSize: Typography.size12,
    fontFamily: Typography.bodyBold,
    color: 'rgba(255,255,255,0.6)',
  },
  clarityCard: {
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
    borderRadius: 18,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  clarityScore: {
    fontFamily: Typography.displayBold,
    fontSize: Typography.size30 + 4,
    color: Colors.purpleLighter,
  },
  clarityLabel: {
    fontFamily: Typography.bodyExtraBold,
    fontSize: Typography.size14,
    color: Colors.white,
  },
  claritySub: {
    fontSize: Typography.size12,
    fontFamily: Typography.bodySemiBold,
    color: 'rgba(255,255,255,0.6)',
  },
  evidenceRow: {
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.10)',
    borderRadius: 16,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  foodSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    minWidth: 108,
  },
  foodIcon: {
    fontSize: 24,
  },
  foodName: {
    fontFamily: Typography.bodyExtraBold,
    fontSize: Typography.size14,
    color: Colors.white,
  },
  connector: {
    flex: 1,
    height: 2,
  },
  symptomPill: {
    paddingHorizontal: 11,
    paddingVertical: 6,
    borderRadius: 999,
  },
  symptomText: {
    fontFamily: Typography.bodyExtraBold,
    fontSize: 12.5,
  },
  legend: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 14,
    padding: 14,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
  },
  legendBox: {
    width: 12,
    height: 12,
    borderRadius: 3,
  },
  legendText: {
    fontSize: Typography.size12,
    fontFamily: Typography.bodyBold,
    color: Colors.white,
  },
  logButton: {
    backgroundColor: Colors.gold,
    paddingVertical: 17,
    borderRadius: 18,
    alignItems: 'center',
    ...Shadows.buttonGold,
  },
  logButtonText: {
    fontFamily: Typography.display,
    fontSize: Typography.size17,
    color: Colors.textPrimary,
  },
});
