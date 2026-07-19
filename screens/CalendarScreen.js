import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, Typography, Shadows } from '../constants/theme';
import { useApp } from '../context/AppContext';
import GuideCharacter from '../components/GuideCharacter';

export default function CalendarScreen() {
  const { state, back, markDayComplete } = useApp();
  const { day, totalDays, completedDays, startDate } = state;

  // Generate 14 days for the investigation
  const getDaysGrid = () => {
    const days = [];
    for (let i = 1; i <= totalDays; i++) {
      const isToday = i === day;
      const isCompleted = completedDays.includes(i);
      const isPast = i < day;
      const isFuture = i > day;

      days.push({
        day: i,
        isToday,
        isCompleted,
        isPast,
        isFuture,
      });
    }
    return days;
  };

  const daysGrid = getDaysGrid();
  const weekLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return (
    <View style={styles.container}>
      {/* Header */}
      <LinearGradient
        colors={['#A8E6CF', '#88D498']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <TouchableOpacity style={styles.backButton} onPress={back} activeOpacity={0.7}>
          <Text style={styles.backText}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>14-Day Investigation</Text>
      </LinearGradient>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Progress Card */}
        <View style={styles.progressCard}>
          <View style={styles.progressIconCircle}>
            <Text style={styles.progressEmoji}>📅</Text>
          </View>
          <View style={styles.progressInfo}>
            <Text style={styles.progressLabel}>YOUR PROGRESS</Text>
            <Text style={styles.progressDay}>Day {day} of {totalDays}</Text>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: `${(day / totalDays) * 100}%` }]} />
            </View>
            <Text style={styles.progressText}>
              {totalDays - day} days left · Keep going! 💪
            </Text>
          </View>
        </View>

        {/* Calendar Title */}
        <View style={styles.calendarHeader}>
          <Text style={styles.calendarTitle}>Track Your Journey</Text>
          <Text style={styles.calendarSubtitle}>Mark each day you complete your meal logging</Text>
        </View>

        {/* Week Labels */}
        <View style={styles.weekRow}>
          {weekLabels.map((label, idx) => (
            <View key={idx} style={styles.weekLabel}>
              <Text style={styles.weekLabelText}>{label}</Text>
            </View>
          ))}
        </View>

        {/* Days Grid */}
        <View style={styles.daysGrid}>
          {daysGrid.map((dayInfo) => {
            const CellWrapper = dayInfo.isCompleted || dayInfo.isToday ? LinearGradient : View;
            const gradientProps = dayInfo.isCompleted
              ? { colors: ['#74896D', '#5A6B56'], start: { x: 0, y: 0 }, end: { x: 1, y: 1 } }
              : dayInfo.isToday
              ? { colors: ['#FFE66D', '#F9DD57'], start: { x: 0, y: 0 }, end: { x: 1, y: 1 } }
              : {};

            return (
              <TouchableOpacity
                key={dayInfo.day}
                style={[
                  styles.dayCell,
                  dayInfo.isPast && !dayInfo.isCompleted && styles.dayCellMissed,
                  dayInfo.isFuture && styles.dayCellFuture,
                ]}
                activeOpacity={0.7}
                disabled={dayInfo.isFuture}
              >
                <CellWrapper
                  {...gradientProps}
                  style={styles.dayCellInner}
                >
                  <Text
                    style={[
                      styles.dayNumber,
                      (dayInfo.isToday || dayInfo.isCompleted) && styles.dayNumberActive,
                      dayInfo.isFuture && styles.dayNumberFuture,
                    ]}
                  >
                    {dayInfo.day}
                  </Text>
                  {dayInfo.isCompleted && (
                    <View style={styles.checkmarkContainer}>
                      <Text style={styles.checkmark}>✓</Text>
                    </View>
                  )}
                </CellWrapper>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Legend */}
        <View style={styles.legend}>
          <Text style={styles.legendTitle}>Color Guide</Text>
          <View style={styles.legendRow}>
            <View style={styles.legendItem}>
              <LinearGradient
                colors={['#FFE66D', '#F9DD57']}
                style={styles.legendCircle}
              />
              <Text style={styles.legendText}>Today</Text>
            </View>
            <View style={styles.legendItem}>
              <LinearGradient
                colors={['#74896D', '#5A6B56']}
                style={styles.legendCircle}
              />
              <Text style={styles.legendText}>Done ✓</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendCircle, { backgroundColor: Colors.white, opacity: 0.4 }]} />
              <Text style={styles.legendText}>Missed</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendCircle, { backgroundColor: Colors.white, opacity: 0.3 }]} />
              <Text style={styles.legendText}>Future</Text>
            </View>
          </View>
        </View>

        {/* Tips Card */}
        <View style={styles.tipsCard}>
          <Text style={styles.tipsEmoji}>💡</Text>
          <View style={{ flex: 1 }}>
            <Text style={styles.tipsTitle}>Detective Tip</Text>
            <Text style={styles.tipsText}>
              Log meals every day for the best results! Consistency helps you find patterns faster.
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Guide Character */}
      <GuideCharacter
        message="This is your investigation calendar! Track your 14-day journey here. Green days are complete!"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.appBg,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 20,
    paddingTop: 22,
    paddingBottom: 16,
    ...Shadows.cardMedium,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 13,
    backgroundColor: 'rgba(255,255,255,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backText: {
    fontSize: 20,
    color: Colors.white,
    fontFamily: Typography.bodyBold,
  },
  headerTitle: {
    fontFamily: Typography.displayBold,
    fontSize: Typography.size24,
    color: Colors.white,
  },
  content: {
    padding: 20,
    paddingBottom: 120,
    gap: 20,
  },
  progressCard: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    padding: 20,
    flexDirection: 'row',
    gap: 14,
    alignItems: 'center',
    ...Shadows.cardMedium,
  },
  progressIconCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.goldTintBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressEmoji: {
    fontSize: 32,
  },
  progressInfo: {
    flex: 1,
    gap: 6,
  },
  progressLabel: {
    fontFamily: Typography.bodyExtraBold,
    fontSize: Typography.size11,
    color: Colors.textMuted,
    letterSpacing: 1,
  },
  progressDay: {
    fontFamily: Typography.displayBold,
    fontSize: Typography.size26,
    color: Colors.primaryPurple,
  },
  progressBar: {
    height: 10,
    backgroundColor: Colors.purpleTintBg,
    borderRadius: 999,
    overflow: 'hidden',
    marginTop: 4,
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.primaryPurple,
    borderRadius: 999,
  },
  progressText: {
    fontFamily: Typography.bodySemiBold,
    fontSize: Typography.size13,
    color: Colors.textMuted,
    marginTop: 2,
  },
  calendarHeader: {
    gap: 4,
  },
  calendarTitle: {
    fontFamily: Typography.display,
    fontSize: Typography.size22,
    color: Colors.textPrimary,
  },
  calendarSubtitle: {
    fontFamily: Typography.bodySemiBold,
    fontSize: Typography.size13,
    color: Colors.textMuted,
  },
  weekRow: {
    flexDirection: 'row',
    gap: 8,
  },
  weekLabel: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },
  weekLabelText: {
    fontFamily: Typography.bodyExtraBold,
    fontSize: Typography.size11,
    color: Colors.textMuted,
    letterSpacing: 0.5,
  },
  daysGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  dayCell: {
    width: '13%',
    aspectRatio: 1,
    borderRadius: 14,
    overflow: 'hidden',
    ...Shadows.card,
  },
  dayCellInner: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.white,
    position: 'relative',
  },
  dayCellMissed: {
    opacity: 0.4,
  },
  dayCellFuture: {
    opacity: 0.3,
  },
  dayNumber: {
    fontFamily: Typography.displayBold,
    fontSize: Typography.size16,
    color: Colors.textPrimary,
  },
  dayNumberActive: {
    color: Colors.white,
  },
  dayNumberFuture: {
    color: Colors.textFaint,
  },
  checkmarkContainer: {
    position: 'absolute',
    top: 3,
    right: 3,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: 'rgba(255,255,255,0.9)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkmark: {
    fontSize: 11,
    color: Colors.primaryPurple,
    fontWeight: 'bold',
  },
  legend: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 16,
    gap: 12,
    ...Shadows.card,
  },
  legendTitle: {
    fontFamily: Typography.bodyBold,
    fontSize: Typography.size14,
    color: Colors.textPrimary,
  },
  legendRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  legendCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
  legendText: {
    fontFamily: Typography.bodySemiBold,
    fontSize: Typography.size13,
    color: Colors.textMuted,
  },
  tipsCard: {
    backgroundColor: Colors.goldTintBg,
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    gap: 12,
    alignItems: 'flex-start',
    borderWidth: 2,
    borderColor: Colors.gold,
  },
  tipsEmoji: {
    fontSize: 28,
  },
  tipsTitle: {
    fontFamily: Typography.display,
    fontSize: Typography.size16,
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  tipsText: {
    fontFamily: Typography.bodySemiBold,
    fontSize: Typography.size13,
    color: Colors.textMuted,
    lineHeight: 19,
  },
});
