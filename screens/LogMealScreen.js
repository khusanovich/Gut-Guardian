import React from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, Typography, Spacing, Shadows } from '../constants/theme';
import { useApp } from '../context/AppContext';

export default function LogMealScreen() {
  const { state, back, selectMealType, toggleSymptom, setSeverity, submitLog, updateState } = useApp();
  const { mealType, mealText, symptoms, severity } = state;

  const mealTypes = [
    { type: 'Breakfast', icon: '🍳' },
    { type: 'Lunch', icon: '🥗' },
    { type: 'Dinner', icon: '🍝' },
  ];

  const symptomChips = [
    { name: 'Bloating', icon: '😣', color: Colors.red },
    { name: 'Headache', icon: '🤕', color: Colors.red },
    { name: 'Nausea', icon: '🤢', color: Colors.red },
    { name: 'Fatigue', icon: '😴', color: Colors.red },
    { name: 'None', icon: '✅', color: Colors.green },
  ];

  const severityLevels = [1, 2, 3, 4, 5];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={back} activeOpacity={0.7}>
          <Text style={styles.backText}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Log Your Meal</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Meal Type */}
        <View>
          <Text style={styles.label}>MEAL TYPE</Text>
          <View style={styles.pillRow}>
            {mealTypes.map((m) => (
              <TouchableOpacity
                key={m.type}
                style={[
                  styles.pill,
                  mealType === m.type && styles.pillActive,
                ]}
                onPress={() => selectMealType(m.type)}
                activeOpacity={0.8}
              >
                {mealType === m.type ? (
                  <LinearGradient
                    colors={['#6C4DDA', '#4B2FAE']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.pillGradient}
                  >
                    <Text style={styles.pillTextActive}>
                      {m.icon} {m.type}
                    </Text>
                  </LinearGradient>
                ) : (
                  <Text style={styles.pillText}>
                    {m.icon} {m.type}
                  </Text>
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Meal Text */}
        <View>
          <Text style={styles.label}>WHAT DID YOU EAT?</Text>
          <TextInput
            style={styles.textArea}
            placeholder="Type your meal here..."
            placeholderTextColor={Colors.textFaint}
            value={mealText}
            onChangeText={(text) => updateState({ mealText: text })}
            multiline
          />
        </View>

        {/* Symptoms */}
        <View>
          <Text style={styles.label}>ANY SYMPTOMS?</Text>
          <View style={styles.chipsWrap}>
            {symptomChips.map((chip) => (
              <TouchableOpacity
                key={chip.name}
                style={[
                  styles.chip,
                  symptoms.includes(chip.name) && [
                    styles.chipActive,
                    { backgroundColor: chip.color },
                  ],
                ]}
                onPress={() => toggleSymptom(chip.name)}
                activeOpacity={0.8}
              >
                <Text
                  style={[
                    styles.chipText,
                    symptoms.includes(chip.name) && styles.chipTextActive,
                  ]}
                >
                  {chip.icon} {chip.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Severity */}
        <View>
          <Text style={styles.label}>SEVERITY (1–5)</Text>
          <View style={styles.severityRow}>
            {severityLevels.map((n) => (
              <TouchableOpacity
                key={n}
                style={[
                  styles.sevButton,
                  n <= severity && styles.sevButtonActive,
                ]}
                onPress={() => setSeverity(n)}
                activeOpacity={0.8}
              >
                {n <= severity ? (
                  <LinearGradient
                    colors={['#E2664B', '#D14E33']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.sevGradient}
                  >
                    <Text style={styles.sevTextActive}>{n}</Text>
                  </LinearGradient>
                ) : (
                  <Text style={styles.sevText}>{n}</Text>
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Submit Button */}
        <TouchableOpacity
          style={styles.submitButton}
          onPress={submitLog}
          activeOpacity={0.9}
        >
          <LinearGradient
            colors={['#6C4DDA', '#4B2FAE']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.submitGradient}
          >
            <Text style={styles.submitText}>Submit · +10 XP</Text>
          </LinearGradient>
        </TouchableOpacity>

        <Text style={styles.footnote}>
          Every log brings you closer to solving the mystery
        </Text>
      </ScrollView>
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
    paddingBottom: 8,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 13,
    backgroundColor: Colors.purpleTintBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backText: {
    fontSize: 20,
    color: Colors.primaryPurple,
    fontFamily: Typography.bodyBold,
  },
  headerTitle: {
    fontFamily: Typography.display,
    fontSize: Typography.size24,
    color: Colors.textPrimary,
  },
  content: {
    padding: 20,
    paddingTop: 14,
    paddingBottom: 26,
    gap: 22,
  },
  label: {
    fontSize: Typography.size12,
    fontFamily: Typography.bodyExtraBold,
    letterSpacing: 1,
    color: Colors.textMuted,
    marginBottom: 10,
  },
  pillRow: {
    flexDirection: 'row',
    gap: 10,
  },
  pill: {
    flex: 1,
    borderWidth: 2,
    borderColor: Colors.border,
    borderRadius: 14,
    overflow: 'hidden',
  },
  pillActive: {
    borderWidth: 0,
  },
  pillGradient: {
    paddingVertical: 13,
    paddingHorizontal: 8,
    alignItems: 'center',
  },
  pillText: {
    fontFamily: Typography.bodyExtraBold,
    fontSize: Typography.size14,
    color: Colors.textMuted,
    textAlign: 'center',
    paddingVertical: 11,
    paddingHorizontal: 8,
  },
  pillTextActive: {
    fontFamily: Typography.bodyExtraBold,
    fontSize: Typography.size14,
    color: Colors.white,
    textAlign: 'center',
  },
  textArea: {
    borderWidth: 2,
    borderColor: Colors.border,
    borderRadius: 16,
    padding: 14,
    fontFamily: Typography.bodySemiBold,
    fontSize: Typography.size15,
    color: Colors.textPrimary,
    backgroundColor: Colors.white,
    minHeight: 74,
    textAlignVertical: 'top',
  },
  chipsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  chip: {
    borderWidth: 2,
    borderColor: Colors.border,
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 8,
    backgroundColor: Colors.white,
  },
  chipActive: {
    borderWidth: 0,
    ...Shadows.card,
  },
  chipText: {
    fontFamily: Typography.bodyExtraBold,
    fontSize: Typography.size13_5,
    color: Colors.textMuted,
  },
  chipTextActive: {
    color: Colors.white,
  },
  severityRow: {
    flexDirection: 'row',
    gap: 10,
  },
  sevButton: {
    flex: 1,
    borderWidth: 2,
    borderColor: Colors.border,
    borderRadius: 13,
    overflow: 'hidden',
  },
  sevButtonActive: {
    borderWidth: 0,
  },
  sevGradient: {
    paddingVertical: 14,
    alignItems: 'center',
  },
  sevText: {
    fontFamily: Typography.display,
    fontSize: Typography.size18,
    color: Colors.textFaint,
    textAlign: 'center',
    paddingVertical: 12,
  },
  sevTextActive: {
    fontFamily: Typography.display,
    fontSize: Typography.size18,
    color: Colors.white,
  },
  submitButton: {
    borderRadius: 18,
    overflow: 'hidden',
    ...Shadows.buttonPurple,
  },
  submitGradient: {
    paddingVertical: 18,
    alignItems: 'center',
  },
  submitText: {
    fontFamily: Typography.display,
    fontSize: Typography.size18,
    color: Colors.white,
  },
  footnote: {
    fontSize: Typography.size13,
    fontFamily: Typography.bodySemiBold,
    color: Colors.textMuted,
    textAlign: 'center',
  },
});
