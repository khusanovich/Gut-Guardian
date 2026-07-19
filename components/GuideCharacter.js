import React from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { Colors, Typography, Spacing, Shadows } from '../constants/theme';

export default function GuideCharacter({ message, position = 'bottom' }) {
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const slideAnim = React.useRef(new Animated.Value(20)).current;

  React.useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  if (!message) return null;

  const positionStyles = {
    bottom: styles.positionBottom,
    top: styles.positionTop,
    center: styles.positionCenter,
  };

  return (
    <Animated.View
      style={[
        styles.container,
        positionStyles[position],
        {
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
        },
      ]}
    >
      <View style={styles.character}>
        <Text style={styles.characterEmoji}>🕵️</Text>
      </View>
      <View style={styles.bubble}>
        <View style={styles.arrow} />
        <Text style={styles.message}>{message}</Text>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 20,
    right: 20,
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 12,
    zIndex: 1000,
  },
  positionBottom: {
    bottom: 20,
  },
  positionTop: {
    top: 80,
  },
  positionCenter: {
    top: '40%',
  },
  character: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: Colors.gold,
    alignItems: 'center',
    justifyContent: 'center',
    ...Shadows.cardMedium,
  },
  characterEmoji: {
    fontSize: 28,
  },
  bubble: {
    flex: 1,
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 14,
    position: 'relative',
    ...Shadows.cardMedium,
  },
  arrow: {
    position: 'absolute',
    left: -8,
    bottom: 12,
    width: 0,
    height: 0,
    borderTopWidth: 8,
    borderTopColor: 'transparent',
    borderBottomWidth: 8,
    borderBottomColor: 'transparent',
    borderRightWidth: 10,
    borderRightColor: Colors.white,
  },
  message: {
    fontFamily: Typography.bodySemiBold,
    fontSize: Typography.size14,
    color: Colors.textPrimary,
    lineHeight: 20,
  },
});
