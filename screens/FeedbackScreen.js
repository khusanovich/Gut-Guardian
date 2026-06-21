import React, { useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, ScrollView, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, Typography, Spacing, Shadows } from '../constants/theme';
import { useApp } from '../context/AppContext';

export default function FeedbackScreen() {
  const { state, back, setFbStars, setFbHelp, setFbUse, submitFeedback, updateState } = useApp();
  const { fbStars, fbLike, fbHelp, fbUse, fbSuggest, fbSent } = state;

  const popAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (fbSent) {
      Animated.sequence([
        Animated.timing(popAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [fbSent]);

  const popScale = popAnim.interpolate({
    inputRange: [0, 0.6, 1],
    outputRange: [0.6, 1.08, 1],
  });

  const helpOpts = [
    { value: 'yes', label: 'Yes, definitely' },
    { value: 'somewhat', label: 'Somewhat' },
    { value: 'no', label: 'No' },
  ];

  const useOpts = [
    { value: 'yes', label: 'Yes' },
    { value: 'maybe', label: 'Maybe' },
    { value: 'no', label: 'No' },
  ];

  if (fbSent) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={back} activeOpacity={0.7}>
            <Text style={styles.backText}>‹</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Rate Your Experience</Text>
        </View>
        <View style={styles.thankYouContainer}>
          <Animated.Text
            style={[
              styles.thankYouEmoji,
              {
                transform: [{ scale: popScale }],
                opacity: popAnim,
              },
            ]}
          >
            💜
          </Animated.Text>
          <Text style={styles.thankYouTitle}>Thank you, Detective!</Text>
          <Text style={styles.thankYouSub}>
            Your feedback helps us improve the investigation.
          </Text>
          <TouchableOpacity style={styles.doneButton} onPress={back} activeOpacity={0.9}>
            <LinearGradient
              colors={['#8CCBF7', '#74896D']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.doneGradient}
            >
              <Text style={styles.doneText}>Done</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={back} activeOpacity={0.7}>
          <Text style={styles.backText}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Rate Your Experience</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Star Rating */}
        <View>
          <Text style={styles.label}>HOW WAS THE GAME?</Text>
          <View style={styles.starsRow}>
            {[1, 2, 3, 4, 5].map((n) => (
              <TouchableOpacity key={n} onPress={() => setFbStars(n)} activeOpacity={0.7}>
                <Text
                  style={[
                    styles.star,
                    { color: n <= fbStars ? Colors.gold : '#E4DECF' },
                  ]}
                >
                  ★
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* What did you like */}
        <View>
          <Text style={styles.label}>WHAT DID YOU LIKE MOST?</Text>
          <TextInput
            style={styles.textArea}
            placeholder="Write here..."
            placeholderTextColor={Colors.textFaint}
            value={fbLike}
            onChangeText={(text) => updateState({ fbLike: text })}
            multiline
          />
        </View>

        {/* Help tracking */}
        <View>
          <Text style={styles.label}>DID THIS HELP YOU TRACK FOOD BETTER?</Text>
          <View style={styles.segmentedRow}>
            {helpOpts.map((opt) => (
              <TouchableOpacity
                key={opt.value}
                style={[
                  styles.segment,
                  fbHelp === opt.value && styles.segmentActive,
                ]}
                onPress={() => setFbHelp(opt.value)}
                activeOpacity={0.8}
              >
                {fbHelp === opt.value ? (
                  <LinearGradient
                    colors={['#8CCBF7', '#74896D']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.segmentGradient}
                  >
                    <Text style={styles.segmentTextActive}>{opt.label}</Text>
                  </LinearGradient>
                ) : (
                  <Text style={styles.segmentText}>{opt.label}</Text>
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Would you use */}
        <View>
          <Text style={styles.label}>WOULD YOU USE GUT GUARDIAN AFTER THIS?</Text>
          <View style={styles.segmentedRow}>
            {useOpts.map((opt) => (
              <TouchableOpacity
                key={opt.value}
                style={[
                  styles.segment,
                  fbUse === opt.value && styles.segmentActive,
                ]}
                onPress={() => setFbUse(opt.value)}
                activeOpacity={0.8}
              >
                {fbUse === opt.value ? (
                  <LinearGradient
                    colors={['#8CCBF7', '#74896D']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.segmentGradient}
                  >
                    <Text style={styles.segmentTextActive}>{opt.label}</Text>
                  </LinearGradient>
                ) : (
                  <Text style={styles.segmentText}>{opt.label}</Text>
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Suggestions */}
        <View>
          <Text style={styles.label}>ANY SUGGESTIONS?</Text>
          <TextInput
            style={styles.textArea}
            placeholder="Type here..."
            placeholderTextColor={Colors.textFaint}
            value={fbSuggest}
            onChangeText={(text) => updateState({ fbSuggest: text })}
            multiline
          />
        </View>

        {/* Submit Button */}
        <TouchableOpacity
          style={styles.submitButton}
          onPress={submitFeedback}
          activeOpacity={0.9}
        >
          <LinearGradient
            colors={['#8CCBF7', '#74896D']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.submitGradient}
          >
            <Text style={styles.submitText}>Submit Review</Text>
          </LinearGradient>
        </TouchableOpacity>
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
    fontSize: Typography.size23,
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
  starsRow: {
    flexDirection: 'row',
    gap: 8,
  },
  star: {
    fontSize: 38,
    lineHeight: 38,
  },
  textArea: {
    borderWidth: 2,
    borderColor: Colors.border,
    borderRadius: 16,
    padding: 14,
    fontFamily: Typography.bodySemiBold,
    fontSize: Typography.size15,
    color: Colors.textPrimary,
    minHeight: 64,
    textAlignVertical: 'top',
  },
  segmentedRow: {
    flexDirection: 'row',
    gap: 10,
  },
  segment: {
    flex: 1,
    borderWidth: 2,
    borderColor: Colors.border,
    borderRadius: 13,
    overflow: 'hidden',
  },
  segmentActive: {
    borderWidth: 0,
  },
  segmentGradient: {
    paddingVertical: 13,
    paddingHorizontal: 6,
    alignItems: 'center',
  },
  segmentText: {
    fontFamily: Typography.bodyExtraBold,
    fontSize: Typography.size13_5,
    color: Colors.textMuted,
    textAlign: 'center',
    paddingVertical: 11,
    paddingHorizontal: 6,
  },
  segmentTextActive: {
    fontFamily: Typography.bodyExtraBold,
    fontSize: Typography.size13_5,
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
  thankYouContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
    padding: 40,
  },
  thankYouEmoji: {
    fontSize: 64,
  },
  thankYouTitle: {
    fontFamily: Typography.display,
    fontSize: Typography.size24,
    color: Colors.textPrimary,
  },
  thankYouSub: {
    fontSize: Typography.size14,
    fontFamily: Typography.bodySemiBold,
    color: Colors.textMuted,
    textAlign: 'center',
  },
  doneButton: {
    borderRadius: 16,
    overflow: 'hidden',
    marginTop: 8,
  },
  doneGradient: {
    paddingVertical: 15,
    paddingHorizontal: 40,
  },
  doneText: {
    fontFamily: Typography.display,
    fontSize: Typography.size16,
    color: Colors.white,
  },
});
