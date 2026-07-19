import React from 'react';
import { View, Text, StyleSheet, Animated, Easing, PanResponder } from 'react-native';
import { Colors, Typography, Spacing, Shadows } from '../constants/theme';

export default function GuideCharacter({ message, autoHideDelay = 5000 }) {
  const [bubbleVisible, setBubbleVisible] = React.useState(true);
  const [hasInteracted, setHasInteracted] = React.useState(false);

  // Animations
  const bubbleOpacity = React.useRef(new Animated.Value(0)).current;
  const bubbleSlide = React.useRef(new Animated.Value(20)).current;
  const characterBounce = React.useRef(new Animated.Value(0)).current;
  const characterRotate = React.useRef(new Animated.Value(0)).current;
  const breathe = React.useRef(new Animated.Value(1)).current;
  const float = React.useRef(new Animated.Value(0)).current;

  // Draggable position
  const pan = React.useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;

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

  // Pan responder for dragging
  const panResponder = React.useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        pan.setOffset({
          x: pan.x._value,
          y: pan.y._value,
        });
        pan.setValue({ x: 0, y: 0 });
      },
      onPanResponderMove: Animated.event(
        [null, { dx: pan.x, dy: pan.y }],
        { useNativeDriver: false }
      ),
      onPanResponderRelease: (_evt, gestureState) => {
        // If barely moved (less than 5 pixels), treat as click, not drag
        const didNotMove = Math.abs(gestureState.dx) < 5 && Math.abs(gestureState.dy) < 5;

        if (didNotMove) {
          // Reset position to before "drag"
          pan.setOffset({
            x: pan.x._offset,
            y: pan.y._offset,
          });
          pan.setValue({ x: 0, y: 0 });
          pan.flattenOffset();

          // Trigger click handler
          handlePress();
        } else {
          // Apply boundary constraints
          pan.flattenOffset();

          // Get screen dimensions (approximate safe bounds)
          const maxX = 150;  // Right boundary
          const minX = -150; // Left boundary
          const maxY = 200;  // Down boundary
          const minY = -300; // Up boundary

          let finalX = pan.x._value;
          let finalY = pan.y._value;

          // Constrain to boundaries
          if (finalX > maxX) finalX = maxX;
          if (finalX < minX) finalX = minX;
          if (finalY > maxY) finalY = maxY;
          if (finalY < minY) finalY = minY;

          // Animate to constrained position if needed
          if (finalX !== pan.x._value || finalY !== pan.y._value) {
            Animated.spring(pan, {
              toValue: { x: finalX, y: finalY },
              useNativeDriver: false,
            }).start();
          }
        }
      },
    })
  ).current;

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
    <Animated.View
      style={[
        styles.container,
        {
          transform: [{ translateX: pan.x }, { translateY: pan.y }],
        },
      ]}
    >
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

      {/* Interactive Character - Draggable wrapper */}
      <Animated.View
        style={styles.characterContainer}
        {...panResponder.panHandlers}
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
      </Animated.View>
    </Animated.View>
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
