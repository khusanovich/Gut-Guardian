import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Colors, Typography, Shadows } from '../constants/theme';

export default function TodaysMeals({ meals, onEditMeal }) {
  if (!meals || meals.length === 0) {
    return null;
  }

  const getTimeSince = (timestamp) => {
    const now = new Date();
    const mealTime = new Date(timestamp);
    const diffMinutes = Math.floor((now - mealTime) / (1000 * 60));

    if (diffMinutes < 60) {
      return `${diffMinutes}m ago`;
    }
    const diffHours = Math.floor(diffMinutes / 60);
    return `${diffHours}h ago`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Today's Meals</Text>
      <Text style={styles.subtitle}>Add symptoms to meals after eating</Text>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.mealsScroll}>
        {meals.map((meal) => (
          <TouchableOpacity
            key={meal.id}
            style={styles.mealCard}
            onPress={() => onEditMeal(meal.id)}
            activeOpacity={0.7}
          >
            <View style={styles.mealHeader}>
              <Text style={styles.mealType}>{meal.mealType}</Text>
              <Text style={styles.timeAgo}>{getTimeSince(meal.timestamp)}</Text>
            </View>

            <Text style={styles.mealText} numberOfLines={2}>
              {meal.mealText || 'No description'}
            </Text>

            {meal.symptoms && meal.symptoms.length > 0 && !meal.symptoms.includes('None') ? (
              <View style={styles.symptomsContainer}>
                <Text style={styles.symptomsBadge}>
                  {meal.symptoms.length} symptom{meal.symptoms.length > 1 ? 's' : ''}
                </Text>
              </View>
            ) : (
              <View style={styles.noSymptomsContainer}>
                <Text style={styles.noSymptomsText}>No symptoms yet</Text>
                <Text style={styles.addPrompt}>Tap to add →</Text>
              </View>
            )}

            {meal.updatedAt && (
              <Text style={styles.updatedText}>Updated</Text>
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  title: {
    fontFamily: Typography.displayBold,
    fontSize: Typography.size20,
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  subtitle: {
    fontFamily: Typography.bodySemiBold,
    fontSize: Typography.size13,
    color: Colors.textMuted,
    marginBottom: 12,
  },
  mealsScroll: {
    marginHorizontal: -20,
    paddingHorizontal: 20,
  },
  mealCard: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 14,
    marginRight: 12,
    width: 220,
    ...Shadows.card,
  },
  mealHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  mealType: {
    fontFamily: Typography.displayBold,
    fontSize: Typography.size16,
    color: Colors.primaryPurple,
  },
  timeAgo: {
    fontFamily: Typography.bodySemiBold,
    fontSize: Typography.size12,
    color: Colors.textMuted,
  },
  mealText: {
    fontFamily: Typography.body,
    fontSize: Typography.size14,
    color: Colors.textPrimary,
    marginBottom: 10,
    lineHeight: 20,
  },
  symptomsContainer: {
    backgroundColor: Colors.purpleTintBg,
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 10,
    alignSelf: 'flex-start',
  },
  symptomsBadge: {
    fontFamily: Typography.bodyBold,
    fontSize: Typography.size12,
    color: Colors.primaryPurple,
  },
  noSymptomsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  noSymptomsText: {
    fontFamily: Typography.bodySemiBold,
    fontSize: Typography.size13,
    color: Colors.textMuted,
  },
  addPrompt: {
    fontFamily: Typography.bodyBold,
    fontSize: Typography.size12,
    color: Colors.gold,
  },
  updatedText: {
    fontFamily: Typography.bodySemiBold,
    fontSize: Typography.size11,
    color: Colors.green,
    marginTop: 6,
  },
});
