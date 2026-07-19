import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors, Typography, Shadows } from '../constants/theme';
import { useApp } from '../context/AppContext';

export default function CalendarWidget() {
  const { state } = useApp();
  const { day, totalDays, completedDays, startDate } = state;

  const getCurrentWeekDays = () => {
    const days = [];
    const startDay = Math.max(1, day - 2);
    const endDay = Math.min(totalDays, startDay + 4);

    for (let i = startDay; i <= endDay; i++) {
      days.push(i);
    }
    return days;
  };

  const weekDays = getCurrentWeekDays();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>14-Day Challenge</Text>
        <Text style={styles.progress}>Day {day}/{totalDays}</Text>
      </View>
      <View style={styles.daysContainer}>
        {weekDays.map((dayNum) => {
          const isToday = dayNum === day;
          const isCompleted = completedDays.includes(dayNum);
          const isPast = dayNum < day;

          return (
            <View
              key={dayNum}
              style={[
                styles.dayCircle,
                isToday && styles.dayToday,
                isCompleted && styles.dayCompleted,
                isPast && !isCompleted && styles.dayPast,
              ]}
            >
              <Text
                style={[
                  styles.dayNumber,
                  isToday && styles.dayNumberToday,
                  isCompleted && styles.dayNumberCompleted,
                ]}
              >
                {dayNum}
              </Text>
              {isCompleted && <Text style={styles.checkmark}>✓</Text>}
            </View>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 10,
    ...Shadows.card,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontFamily: Typography.bodyBold,
    fontSize: Typography.size11,
    color: Colors.textMuted,
    letterSpacing: 0.5,
  },
  progress: {
    fontFamily: Typography.bodyExtraBold,
    fontSize: Typography.size12,
    color: Colors.primaryPurple,
  },
  daysContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 4,
  },
  dayCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: Colors.purpleTintBg,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  dayToday: {
    backgroundColor: Colors.gold,
    borderWidth: 2,
    borderColor: Colors.goldDark,
  },
  dayCompleted: {
    backgroundColor: Colors.primaryPurple,
  },
  dayPast: {
    backgroundColor: Colors.border2,
  },
  dayNumber: {
    fontFamily: Typography.bodyBold,
    fontSize: Typography.size11,
    color: Colors.textMuted,
  },
  dayNumberToday: {
    color: Colors.white,
  },
  dayNumberCompleted: {
    color: Colors.white,
  },
  checkmark: {
    position: 'absolute',
    fontSize: 10,
    color: Colors.white,
  },
});
