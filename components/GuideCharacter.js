import React from 'react';
import { View, Text, StyleSheet, Animated, TouchableOpacity, Easing } from 'react-native';
import { Colors, Typography, Spacing, Shadows } from '../constants/theme';

export default function GuideCharacter({ message, autoHideDelay = 2000 }) {
  const [bubbleVisible, setBubbleVisible] = React.useState(true);
  const [hasInteracted, setHasInteracted] = React.useState(false);

  // Animations
  const bubbleOpacity = React.useRef(new Animated.Value(0)).current;
  const bubbleSlide = React.useRef(new Animated.Value(20)).current;
  const characterBounce = React.useRef(new Animated.Value(0)).current;
  const characterRotate = React.useRef(new Animated.Value(0)).current;
  const breathe = React.useRef(new Animated.Value(1)).current;
  const float = React.useRef(new Animated.Value(0)).current;

  // Show bubble animation
  const showBubble = () => {
    setBubbleVisible(true);
    Animated.parallel([
      Animated.timing(bubbleOpacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.spring(bubbleSlide, {
        toValue: 0,
        friction: 8,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start();
  };

  // Hide bubble animation
  const hideBubble = () => {
    Animated.parallel([
      Animated.timing(bubbleOpacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(bubbleSlide, {
        toValue: 20,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => setBubbleVisible(false));
  };

  // Character entrance animation (bounce in)
  const entranceAnimation = () => {
    Animated.sequence([
      Animated.spring(characterBounce, {
        toValue: 1,
        friction: 5,
        tension: 40,
        useNativeDriver: true,
      }),
      Animated.spring(characterBounce, {
        toValue: 0,
        friction: 7,
        tension: 50,
        useNativeDriver: true,
      }),
    ]).start();
  };

  // Continuous breathing animation
  const startBreathing = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(breathe, {
          toValue: 1.08,
          duration: 1500,
          easing: Easing.bezier(0.42, 0, 0.58, 1),
          useNativeDriver: true,
        }),
        Animated.timing(breathe, {
          toValue: 1,
          duration: 1500,
          easing: Easing.bezier(0.42, 0, 0.58, 1),
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  // Floating animation
  const startFloating = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(float, {
          toValue: -5,
          duration: 2000,
          easing: Easing.bezier(0.45, 0, 0.55, 1),
          useNativeDriver: true,
        }),
        Animated.timing(float, {
          toValue: 0,
          duration: 2000,
          easing: Easing.bezier(0.45, 0, 0.55, 1),
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  // Wave animation when clicked
  const waveAnimation = () => {
    Animated.sequence([
      Animated.timing(characterRotate, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(characterRotate, {
        toValue: -1,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(characterRotate, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(characterRotate, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();
  };

  React.useEffect(() => {
    entranceAnimation();
    startBreathing();
    startFloating();

    if (message) {
      showBubble();

      // Auto-hide after delay
      const timer = setTimeout(() => {
        if (!hasInteracted) {
          hideBubble();
        }
      }, autoHideDelay);

      return () => clearTimeout(timer);
    }
  }, [message]);

  const handlePress = () => {
    setHasInteracted(true);
    waveAnimation();

    if (bubbleVisible) {
      hideBubble();
    } else if (message) {
      showBubble();
    }
  };

  if (!message) return null;

  const rotation = characterRotate.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: ['-12deg', '0deg', '12deg'],
  });

  return (
    <View style={styles.container}>
      {/* Speech Bubble */}
      {bubbleVisible && (
        <Animated.View
          style={[
            styles.bubble,
            {
              opacity: bubbleOpacity,
              transform: [{ translateX: bubbleSlide }],
            },
          ]}
        >
          <View style={styles.arrow} />
          <Text style={styles.message}>{message}</Text>
        </Animated.View>
      )}

      {/* Interactive Character */}
      <TouchableOpacity
        onPress={handlePress}
        activeOpacity={0.8}
        style={styles.characterContainer}
      >
        <Animated.View
          style={[
            styles.character,
            {
              transform: [
                { translateY: Animated.add(characterBounce.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, -20],
                }), float) },
                { scale: breathe },
                { rotate: rotation },
              ],
            },
          ]}
        >
          <Text style={styles.characterEmoji}>🕵️</Text>

          {/* Thinking indicator when bubble hidden */}
          {!bubbleVisible && (
            <Animated.View style={styles.thinkingDots}>
              <Text style={styles.dotsText}>💭</Text>
            </Animated.View>
          )}
        </Animated.View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 110,
    left: 20,
    right: 20,
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 12,
    zIndex: 1000,
    pointerEvents: 'box-none',
  },
  characterContainer: {
    position: 'relative',
    pointerEvents: 'auto',
  },
  character: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.gold,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: Colors.white,
    ...Shadows.cardMedium,
  },
  characterEmoji: {
    fontSize: 32,
  },
  thinkingDots: {
    position: 'absolute',
    top: -15,
    right: -10,
  },
  dotsText: {
    fontSize: 20,
  },
  bubble: {
    flex: 1,
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 14,
    marginRight: 8,
    maxWidth: '75%',
    ...Shadows.cardMedium,
  },
  arrow: {
    position: 'absolute',
    right: -8,
    bottom: 12,
    width: 0,
    height: 0,
    borderTopWidth: 8,
    borderTopColor: 'transparent',
    borderBottomWidth: 8,
    borderBottomColor: 'transparent',
    borderLeftWidth: 10,
    borderLeftColor: Colors.white,
  },
  message: {
    fontFamily: Typography.bodySemiBold,
    fontSize: Typography.size14,
    color: Colors.textPrimary,
    lineHeight: 20,
  },
});
